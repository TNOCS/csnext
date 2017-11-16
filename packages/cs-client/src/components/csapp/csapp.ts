
import { Dashboard, ThemeColors } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger, Notification, csdashboard } from '../../index';
import { RouteConfig } from 'vue-router/types/router';
import { Watch, Prop } from 'vue-property-decorator';
import Vuetify from 'vuetify';
import { setInterval } from 'timers';
import './main.scss';

// register needed plugins
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({ routes: [] });


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
    public lastNotification: Notification = <Notification>{ _visible: false};

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

    // Add a dashboard as a route 
    public AddDashboardRoute(d: Dashboard) {
        if (d.dashboards && d.dashboards.length > 0) {
            d.dashboards.forEach(dash => this.AddDashboardRoute(dash));
        } else if (d.path) {
            router.addRoutes([<RouteConfig>{ name: d.id, path: d.path, component: csdashboard, props: (route) => ({ dashboard: d }), alias: d.title, meta: d }]); // 
        }
    }

    // Make sure all dashboards are available as routes
    public InitNavigation() {
        if (!this.app || !this.app.project || !this.app.project.dashboards) { return; }

        // create routes for dashboards
        this.app.project.dashboards.forEach(d => {
            this.AddDashboardRoute(d);
        });

        this.L.info('navigation', 'navigation initialized');

    }

    public SelectDashboard(d: Dashboard) {
        console.log(d.path);
        if (router && d.path && !d.dashboards) { router.push(d.path); }
    }

    public OpenSettings() {
        this.settingsDialog = true;
    }

    public created() {
        this.InitNotifications();
    }

    public InitNotifications() {
        if (this.app.EventBus) {
            this.app.EventBus.$on('notification.new', (not: Notification) => {
                this.lastNotification = not;
            });
        }
    }
}
