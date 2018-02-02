import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router/types/router';
import { IDashboard, INotification, ThemeColors, ISidebarOptions } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import { setInterval } from 'timers';
import './cs-app.css';
import './../../sass/main.scss';
import { CsSidebar } from '../cs-sidebar/cs-sidebar';

// register needed plugins
Vue.use(VueRouter);
// Vue.use(Vuetify);

const router = new VueRouter({ routes: [] });

@Component({
  name: 'cs-app',
  router,
  template: require('./cs-app.html'),
  components: {
    'cs-sidebar': CsSidebar
  }
} as any)
export class CsApp extends Vue {
  public app = AppState.Instance;
  public settingsDialog = false;
  public $vuetify: any;
  public active = null;
  public leftSideBar: ISidebarOptions = {};

  // notification properties
  public lastNotification: INotification = { _visible: false } as INotification;
  public showNotifications = true;
  public unReadNotifications: INotification[] = [];

  public settings = [
    {
      id: 'dashboard_settings',
      title: 'dashboard settings'
    }
  ];

  constructor() {
    super();
    this.InitNavigation();
  }

  @Watch('app.project.dashboards')
  public projectChanged(data: any) {
    this.InitNavigation();
    this.InitTheme();
  }

  @Watch('app.project.notifications', { deep: true })
  public noticationsUpdated(n: INotification[], o: INotification[]) {
    this.UpdateNotifications();
  }

  @Watch('$route')
  public routeChanged(n: any, o: any) {
    if (this.app.project && this.app.project.header && this.app.project.header.breadcrumbs) {
      this.app.project.header.breadcrumbItems = [];
      n.fullPath.split('/').forEach(s => {
        if (s && this.app.project.header && this.app.project.header.breadcrumbItems) {
          this.app.project.header.breadcrumbItems.push(s);
        }
      });
    }
  }

  public onResize() {
    this.app.windowSize = { x: window.innerWidth, y: window.innerHeight };
  }

  public InitTheme() {
    if (this.app.project && this.app.project.theme) {
      this.$vuetify.theme = this.app.project.theme.colors;
    }
  }

  public getAdjacentDashboard(direction: string, active: IDashboard, dashboards?: IDashboard[]): IDashboard {
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

  // swipe gesture
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
  public AddDashboardRoute(d: IDashboard) {
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

    Logger.info('navigation', 'navigation initialized');
  }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.path);
    if (router && d.path && !d.dashboards) { router.push(d.path); }
  }

  public OpenSettings() {
    this.settingsDialog = true;
  }

  public UpdateSideBars(d: IDashboard) {
    Vue.nextTick(() => {

      // update left sidebar
      if (d.leftSidebar) {
        this.leftSideBar = d.leftSidebar;
        Vue.set(this, 'leftSideBar', d.leftSidebar);
      } else {
        if (this.app.project.leftSidebar) {
          this.leftSideBar = this.app.project.leftSidebar;
          Vue.set(this, 'leftSideBar', this.app.project.leftSidebar);
        }
      }
    });
  }

  public created() {
    this.InitNotifications();

    // listen to dashboard init events
    this.app.bus.subscribe('dashboard.main', (action, dashboard) => {
      this.UpdateSideBars(dashboard);
    });

    if (this.app.activeDashboard) { this.UpdateSideBars(this.app.activeDashboard); }
  }

  public SelectNotification(notification: INotification) {
    notification.isRead = true;
    this.UpdateNotifications();
    if (notification.clickCallback) {
      notification.clickCallback();
    }
  }

  /** Update list of unread notification  */
  public UpdateNotifications() {
    if (!this.app.project.notifications || !this.app.project.notifications.items) { return; }
    this.$set(this, 'unReadNotifications', this.app.project.notifications.items.filter(not => !not.isRead));
  }
  public InitNotifications() {
    if (this.app.bus) {
      this.app.bus.subscribe('notification', (action: string, notification: INotification) => {
        if (action === 'new') {
          this.lastNotification = notification;
          this.UpdateNotifications();
        }
      });
    }
  }
}
