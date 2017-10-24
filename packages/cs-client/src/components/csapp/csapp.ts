import { csdashboard } from './../csdashboard/csdashboard';
import { Dashboard } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger } from '../../index';
import { RouteConfig } from 'vue-router/types/router';
import { Watch } from 'vue-property-decorator';
import Vuetify from 'vuetify';

let router = new VueRouter({ routes: [] });

// register needed plugins
Vue.use(VueRouter);
Vue.use(Vuetify);

@Component(<any>{
    name: 'csapp',
    router: router,
    template: require('./csapp.html'),
    components: { }
})

// tslint:disable-next-line:class-name
export class csapp extends Vue {
    public app = AppState.Instance;
    public L = Logger.Instance;    

    constructor()
    {
        super();
        this.InitNavigation();
    }

    @Watch('app.project.dashboards')
    projectChanged(data: any) {        
        this.InitNavigation();
    }

    public InitNavigation() {          
        if (!this.app || !this.app.project || !this.app.project.dashboards) { return; }
        // create routes for dashboards
        this.app.project.dashboards.forEach(d => {            
            let dash = csdashboard;            
            router.addRoutes([<RouteConfig>{ name: d.id, path: d.path, component: dash, props: { dashboard: d }, alias: d.title, meta: d }]);
        });

        this.L.info('navigation', 'navigation initialized');
    }

    public SelectDashboard(d: Dashboard) {
        if (router && d.path) { router.push(d.path); }
        if (this.app.project && this.app.project.leftSidebar) { this.app.project.leftSidebar.open = false; }
    }
}
