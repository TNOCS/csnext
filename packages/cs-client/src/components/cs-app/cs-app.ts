import { Dashboard, ThemeColors } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger, INotification, CsDashboard } from '../../index';
import { RouteConfig } from 'vue-router/types/router';
import { Watch, Prop } from 'vue-property-decorator';
import Vuetify from 'vuetify';
import { setInterval } from 'timers';
import './../../sass/main.scss';

// register needed plugins
Vue.use(VueRouter);
// Vue.use(Vuetify);

const router = new VueRouter({ routes: [] });

@Component({
  name: 'cs-app',
  router,
  template: require('./cs-app.html'),
  components: {}
} as any)
export class CsApp extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;
  public settingsDialog = false;
  public lastNotification: INotification = { _visible: false } as INotification;
  public $vuetify: any;
  public active = null;
  public tabs = ['tab-1', 'tab-2', 'tab-3'];
  public text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  public leftsidebarToggle = [0, 1, 2];
  constructor() {
    super();
    this.InitNavigation();
  }

  @Watch('app.project.dashboards')
  public projectChanged(data: any) {
    this.InitNavigation();
    this.InitTheme();
  }

  public InitTheme() {
    if (this.app.project && this.app.project.theme) {
      this.$vuetify.theme = this.app.project.theme.colors;
    }
  }

  public getAdjacentDashboard(direction: string, active: Dashboard, dashboards?: Dashboard[]): Dashboard {
    if (!dashboards) { return active; }
    let index = dashboards.indexOf(active);
    switch (direction) {
      case 'Left':
        index += 1;
        if (index >= dashboards.length) { index = 0; }
        break;
      case 'Right':
        index -= 1;
        if (index < 0) { index = dashboards.length - 1; }
        break;
    }
    return dashboards[index];
  }

  public swipe(direction: string) {
    if (!this.app.activeDashboard || !this.app.activeDashboard.touchGesturesEnabled) { return; }
    const d = this.app.activeDashboard;
    const adjacent = this.getAdjacentDashboard(direction, this.app.activeDashboard, (d.parent && d.parent.dashboards) ? d.parent.dashboards : this.app.project.dashboards);
    if (adjacent) {
      this.SelectDashboard(adjacent);
    }
    // console.log(adjacent);

  }

  // Add a dashboard as a route
  public AddDashboardRoute(d: Dashboard) {
    if (d.dashboards && d.dashboards.length > 0) {
      d.dashboards.forEach(dash => {
        dash.parent = d;
        this.AddDashboardRoute(dash);
      }
      );
    } else if (d.path) {
      router.addRoutes([{
        name: d.id,
        path: d.path,
        component: CsDashboard,
        props: (route) => ({ dashboard: d }),
        alias: d.title, meta: d
      } as RouteConfig]);
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
    this.L.info('SelectDashboard', d.path);
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
      this.app.EventBus.$on('notification.new', (not: INotification) => {
        this.lastNotification = not;
      });
    }
  }
}
