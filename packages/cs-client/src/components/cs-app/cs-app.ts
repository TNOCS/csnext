import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router/types/router';
import {
  IDashboard,
  INotification,
  ThemeColors,
  ISidebarOptions,
  IWidget,
  IMenu
} from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard, CsSettings } from '../../';
import './cs-app.css';
import './../../sass/main.scss';
import { CsSidebar } from '../cs-sidebar/cs-sidebar';

// register needed plugins
Vue.use(VueRouter);

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
  public static DASHBOARD_EDIT_ID = 'edit_dashboard';

  public app = AppState.Instance;
  public settingsDialog = false;
  // public $vuetify: any;
  public active = null;
  public leftSidebar: ISidebarOptions = {};
  public rightSidebar: ISidebarOptions = {};

  // notification properties
  public lastNotification: INotification = { _visible: false } as INotification;
  public showNotifications = false;
  public unReadNotifications: INotification[] = [];

  public settings = [
    // {
    //   id: 'dashboard_settings',
    //   title: 'dashboard settings'
    // }
  ];

  constructor() {
    super();
    this.app.router = router;
    this.InitNavigation();
    this.app.bus.subscribe('right-sidebar', (action: string, data: any) => {
      switch (action) {
        case 'open-widget':
          if (
            this.app.project.rightSidebar &&
            this.app.project.rightSidebar.dashboard &&
            this.app.project.rightSidebar.dashboard.widgets
          ) {
            while (this.app.project.rightSidebar.dashboard.widgets.length > 0) {
              this.app.project.rightSidebar.dashboard.widgets.pop();
            }
            this.app.project.rightSidebar.dashboard.widgets.push(data);
            this.app.project.rightSidebar.open = true;
          }
          break;
      }
    });
    this.app.bus.subscribe('widget', (action: string, widget: IWidget) => {
      switch (action) {
        case 'edit':
          if (this.app.project.leftSidebar) {
            this.app.project.leftSidebar.component = CsSettings;
            // this.$set(this.app.project.rightSidebar, 'component', CsSettings);
            this.app.project.leftSidebar.open = true;
          }
          break;
      }
    });
  }

  @Watch('app.project.dashboards')
  public projectChanged(data: any) {
    this.InitNavigation();
    this.InitTheme();
    this.InitMenus();
  }

  @Watch('app.project.notifications', { deep: true })
  public noticationsUpdated(n: INotification[], o: INotification[]) {
    this.UpdateNotifications();
  }

  @Watch('app.project.rightSidebar.dashboard')
  public sideBarChanged(n: IDashboard, o: IDashboard) {
    if (!this.rightSidebar) { return; }
    this.rightSidebar.dashboard = n;
  }

  @Watch('$route')
  public routeChanged(n: any, o: any) {
    if (
      this.app.project &&
      this.app.project.header &&
      this.app.project.header.breadcrumbs
    ) {
      this.app.project.header.breadcrumbItems = [];
      n.fullPath.split('/').forEach(s => {
        if (
          s &&
          this.app.project.header &&
          this.app.project.header.breadcrumbItems
        ) {
          this.app.project.header.breadcrumbItems.push(s);
        }
      });
    }
  }

  public InitMenus() {
    if (!this.app.project.menus) {
      this.app.project.menus = [];
    }
    // create edit dashboard button
    if (!this.app.project.menus.find(m => m.id === CsApp.DASHBOARD_EDIT_ID)) {
      this.app.project.menus.push({
        id: CsApp.DASHBOARD_EDIT_ID,
        icon: 'mode_edit',
        title: 'Edit Dashboard',
        enabled: true,
        visible: true,
        action: m => {
          // notify dashboard manager that edit was started
          if (
            this.app.activeDashboard &&
            this.app.activeDashboard._manager &&
            this.app.activeDashboard._manager.editDashboard
          ) {
            this.app.activeDashboard._manager.editDashboard(
              this.app.activeDashboard
            );
          }
          // }
          // if (this.app.project.rightSidebar) {
          //   this.app.project.rightSidebar.component = CsSettings;
          //   // this.$set(this.app.project.rightSidebar, 'component', CsSettings);
          //   this.app.project.rightSidebar.open = true;
          // }
        }
      });
    }
  }

  // menu button was clicked
  public activateMenu(menu: IMenu) {
    if (menu.action) {
      menu.action(menu);
    }
  }

  public onResize() {
    this.app.windowSize = { x: window.innerWidth, y: window.innerHeight };
  }

  public InitTheme() {
    if (this.app.project && this.app.project.theme) {
      // this.$vuetify.theme = this.app.project.theme.colors;
    }
  }

  public getAdjacentDashboard(
    direction: string,
    active: IDashboard,
    dashboards?: IDashboard[]
  ): IDashboard {
    if (!dashboards) {
      return active;
    }
    let index = dashboards.indexOf(active);
    switch (direction) {
      case 'Left':
        index += 1;
        if (index >= dashboards.length) {
          index = 0;
        }
        break;
      case 'Right':
        index -= 1;
        if (index < 0) {
          index = dashboards.length - 1;
        }
        break;
    }
    return dashboards[index];
  }

  // swipe gesture
  public swipe(direction: string) {
    if (
      !this.app.activeDashboard ||
      !this.app.activeDashboard.touchGesturesEnabled
    ) {
      return;
    }
    const d = this.app.activeDashboard;
    const adjacent = this.getAdjacentDashboard(
      direction,
      this.app.activeDashboard,
      d.parent && d.parent.dashboards
        ? d.parent.dashboards
        : this.app.project.dashboards
    );
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
      });
    } else if (d.path) {
      router.addRoutes([
        {
          name: d.id,
          path: d.path,
          component: CsDashboard,
          props: route => ({ dashboard: d }),
          alias: d.title,
          meta: d
        } as RouteConfig
      ]);
    }
  }

  // Make sure all dashboards are available as routes
  public InitNavigation() {
    if (!this.app || !this.app.project || !this.app.project.dashboards) {
      return;
    }

    // create routes for dashboards
    this.app.project.dashboards.forEach(d => {
      this.AddDashboardRoute(d);
    });

    Logger.info('navigation', 'navigation initialized');
  }

  // tslint:disable-next-line:no-empty
  public selectBreadCrumb(item: any) {}

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.path);
    if (router && d.path && !d.dashboards) {
      router.push(d.path);
    }
  }

  public OpenSettings() {
    this.settingsDialog = true;
  }

  public UpdateSideBars(d: IDashboard) {
    Vue.nextTick(() => {
      // update left sidebar
      if (d.leftSidebar) {
        this.leftSidebar = d.leftSidebar;
        this.leftSidebar.visible = true;
        // Vue.set(this, 'leftSidebar', d.leftSidebar);
      } else {
        if (this.app.project.leftSidebar) {
          this.leftSidebar = this.app.project.leftSidebar;
          this.leftSidebar.visible = true;
          // Vue.set(this, 'leftSidebar', this.app.project.leftSidebar);
        }
      }

      if (d.rightSidebar) {
        this.rightSidebar = d.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
        // Vue.set(this, 'rightSidebar', d.rightSidebar);
      } else {
        if (this.app.project.rightSidebar) {
          this.rightSidebar = this.app.project.rightSidebar;
          this.rightSidebar.visible = true;
          this.rightSidebar.right = true;
          // Vue.set(this, 'rightSidebar', this.app.project.rightSidebar);
        }
      }
    });
  }

  public created() {
    this.onResize();
    this.InitNotifications();

    // listen to dashboard init events
    this.app.bus.subscribe('dashboard.main', (action, dashboard) => {
      this.UpdateSideBars(dashboard);
    });

    if (this.app.activeDashboard) {
      this.UpdateSideBars(this.app.activeDashboard);
    }
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
    if (
      !this.app.project.notifications ||
      !this.app.project.notifications.items
    ) {
      return;
    }
    this.$set(
      this,
      'unReadNotifications',
      this.app.project.notifications.items.filter(not => !not.isRead)
    );
  }
  public InitNotifications() {
    if (this.app.bus) {
      this.app.bus.subscribe(
        'notification',
        (action: string, notification: INotification) => {
          if (action === 'new') {
            this.lastNotification = notification;
            this.UpdateNotifications();
          }
        }
      );
    }
  }
}
