import { ThemeColors } from './../../../../cs-core/src/classes/project';
import { csdashboard } from './../csdashboard/csdashboard';
import { Dashboard } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger } from '../../index';
import { RouteConfig } from 'vue-router/types/router';
import { Watch } from 'vue-property-decorator';
import Vuetify from 'vuetify';
import './main.scss';

let router = new VueRouter({ routes: [] });


// register needed plugins
Vue.use(VueRouter);
Vue.use(Vuetify);

@Component(<any>{
    name: 'csapp',
    router: router,
    template: require('./csapp.html'),
    components: {}
})

// tslint:disable-next-line:class-name
export class csapp extends Vue {
    $vuetify: any;
    public app = AppState.Instance;
    public L = Logger.Instance;
    public settingsDialog = false;



    public items = [
        'web', 'shopping', 'videos', 'images', 'news'
    ];
    public text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'


    constructor() {
        super();
        this.InitNavigation();
    }

    @Watch('app.project.dashboards')
    projectChanged(data: any) {
        this.InitNavigation();
        this.InitTheme();
    }

    public InitTheme() {
        if (this.app.project && this.app.project.theme) {
            this.$vuetify.theme = this.app.project.theme.colors;
        }
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
    }

    public OpenSettings() {
        this.settingsDialog = true;
    }
}
