import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify, { VuetifyObject } from 'vuetify';
import vuetifyEN from 'vuetify/es5/locale/en';
import vuetifyNL from 'vuetify/es5/locale/nl';
import Component from 'vue-class-component';
import VueRouter, { RouteConfig } from 'vue-router';
import {
  IDashboard,
  INotification,
  ISidebarOptions,
  IWidget,
  IMenu,
  IFooterOptions,
  IDialog,
  MessageBusHandle
} from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard, CsSettings, CsLanguageSwitch } from '../../';
import './cs-app.css';
import { CsSidebar } from '../cs-sidebar/cs-sidebar';
import { CsFooter } from '../cs-footer/cs-footer';
import './../../assets/fonts/fonts.css';
// tslint:disable-next-line:no-var-requires
const en = require('./../../assets/translations/en.json');
// tslint:disable-next-line:no-var-requires
const nl = require('./../../assets/translations/nl.json');
import 'vuetify/dist/vuetify.min.css';
import { CsHeader } from '../cs-header/cs-header';
// import 'simplebar/dist/simplebar.min.css';
import { CsLoading } from '../cs-loader/cs-loader';
import { VuetifyPreset } from 'vuetify/types/presets';

// register needed plugins'
// tslint:disable-next-line:no-console

Vue.use(VueRouter);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'nl',
  messages: { 'en': {}, 'nl': {} } as VueI18n.LocaleMessages // set locale messages
});

// tslint:disable-next-line:align
// const vuetify = new Vuetify({
//     // lang: {
//     //     t: (key, ...params) => i18n.t(key, params)
//     // },
//     icons: {
//         iconfont: 'mdi'
//     }
// });

const vuetifyOpts = {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  icons: {
    iconfont: 'mdi'
  }
} as VuetifyPreset;

Vue.use(Vuetify);

const router = new VueRouter({ routes: [] });

@Component({
  name: 'cs-app',
  router,
  i18n,
  vuetify: new Vuetify(vuetifyOpts),
  template: require('./cs-app.html'),
  components: {
    'cs-sidebar': CsSidebar,
    'cs-footer': CsFooter,
    'cs-header': CsHeader,
    'cs-loading': CsLoading
  }
} as any)
export class CsApp extends Vue {
  public static DASHBOARD_EDIT_ID = 'edit_dashboard';
  public static LANGUAGE_SWITCH_ID = 'switch_language';
  public app = AppState.Instance;

  public settingsDialog = false;
  public $vuetify!: VuetifyObject;
  public active = null;
  public leftSidebar: ISidebarOptions = {};
  public rightSidebar: ISidebarOptions = {};
  public footer: IFooterOptions = {};
  public dialog: IDialog = { visible: false, toolbar: true };
  // notification properties
  public lastNotification: INotification = { _visible: false } as INotification;
  public showNotifications = false;
  public unReadNotifications: INotification[] = [];
  public isLoading: boolean = true;

  public settings = [
    // {
    //   id: 'dashboard_settings',
    //   title: 'dashboard settings'
    // }
  ];

  private rightSideBarHandle?: MessageBusHandle;
  private widgetHandle?: MessageBusHandle;
  private dialogHandle?: MessageBusHandle;
  private dashboardHandle?: MessageBusHandle;
  private notificationHandle?: MessageBusHandle;

  constructor() {
    super();
    this.$cs.router = router;
    this.$cs.i18n = i18n;
    this.$cs.i18n.mergeLocaleMessage('en', { '$vuetify': vuetifyEN });
    this.$cs.i18n.mergeLocaleMessage('nl', { '$vuetify': vuetifyNL });
    this.$cs.i18n.mergeLocaleMessage('en', (en as any).default ? (en as any).default : en);
    this.$cs.i18n.mergeLocaleMessage('nl', (nl as any).default ? (nl as any).default : nl);
    this.InitNavigation();

    this.rightSideBarHandle = this.$cs.bus.subscribe('right-sidebar', (action: string, data: any) => {
      switch (action) {
        case 'open-widget':
          if (
            this.$cs.project.rightSidebar &&
            this.$cs.project.rightSidebar.dashboard &&
            this.$cs.project.rightSidebar.dashboard.widgets
          ) {
            while (this.$cs.project.rightSidebar.dashboard.widgets.length > 0) {
              this.$cs.project.rightSidebar.dashboard.widgets.pop();
            }
            this.$cs.project.rightSidebar.dashboard.widgets.push(data);
            this.$cs.project.rightSidebar.open = true;
          }
          break;
      }
    });
    this.widgetHandle = this.$cs.bus.subscribe('widget', (action: string, widget: IWidget) => {
      switch (action) {
        case 'edit':
          if (this.$cs.project.leftSidebar) {
            this.$cs.project.leftSidebar.component = CsSettings;
            // this.$set(this.$cs.project.rightSidebar, 'component', CsSettings);
            this.$cs.project.leftSidebar.open = true;
          }
          break;
      }
    });
  }

  public beforeDestroy() {
    if (this.rightSideBarHandle) {
      this.$cs.bus.unsubscribe(this.rightSideBarHandle);
    }

    if (this.widgetHandle) {
      this.$cs.bus.unsubscribe(this.widgetHandle);
    }

    if (this.dialogHandle) {
      this.$cs.bus.unsubscribe(this.dialogHandle);
    }

    if (this.dashboardHandle) {
      this.$cs.bus.unsubscribe(this.dashboardHandle);
    }

    if (this.notificationHandle) {
      this.$cs.bus.unsubscribe(this.notificationHandle);
    }
  }

  @Watch('app.project.dashboards')
  public projectChanged(data: any) {
    this.InitNavigation();
    this.InitTheme();
    // this.InitMenus();
  }

  @Watch('app.project.notifications', { deep: true })
  public noticationsUpdated(n: INotification[], o: INotification[]) {
    this.UpdateNotifications();
  }

  @Watch('app.project.rightSidebar.dashboard')
  public sideBarChanged(n: IDashboard, o: IDashboard) {
    if (!this.rightSidebar) {
      return;
    }
    this.rightSidebar.dashboard = n;
  }

  public onResize() {
    this.$cs.windowSize = { x: window.innerWidth, y: window.innerHeight };
  }

  public InitTheme() {
    // debugger
    if (this.$cs.project && this.$cs.project.theme) {
      if (this.$cs.project.theme.lightColors) {
        this.$vuetify.theme.themes.light =  { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.lightColors };
      } else {
        this.$vuetify.theme.themes.light =  { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.colors };
      }
      if (this.$cs.project.theme.darkColors) {
        this.$vuetify.theme.themes.dark =  { ...this.$vuetify.theme.themes.dark, ...this.$cs.project.theme.darkColors };
      }
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
      !this.$cs.activeDashboard ||
      !this.$cs.activeDashboard.options ||
      !this.$cs.activeDashboard.options.touchGesturesEnabled
    ) {
      return;
    }
    const d = this.$cs.activeDashboard;
    const adjacent = this.getAdjacentDashboard(
      direction,
      this.$cs.activeDashboard,
      d.parent && d.parent.dashboards
        ? d.parent.dashboards
        : this.$cs.project.dashboards
    );
    if (adjacent) {
      this.SelectDashboard(adjacent);
    }
    // console.log(adjacent);
  }

  public mounted() {
    this.isLoading = false;
  }

  // Add a dashboard as a route
  public AddDashboardRoute(d: IDashboard) {
    if (d.dashboards && d.dashboards.length > 0) {
      for (const dash of d.dashboards) {
        dash.parent = d;
        this.AddDashboardRoute(dash);
      }
      if (d.options && d.options.toolbar && d.options.toolbar.navigation && d.dashboards && d.dashboards.length > 0) {
        this.AddDashboardRoute({ ...d.dashboards[0], ...{ path: d.path } });
      }
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
    if (!this.$cs || !this.$cs.project || !this.$cs.project.dashboards) {
      return;
    }

    // create routes for dashboards
    for (const d of this.$cs.project.dashboards) {
      this.AddDashboardRoute(d);
    }
    Logger.info('navigation', 'navigation initialized');
  }

  // tslint:disable-next-line:no-empty
  public selectBreadCrumb(item: any) { }

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
      } else if (this.$cs.project.leftSidebar) {
        this.leftSidebar = this.$cs.project.leftSidebar;
        this.leftSidebar.visible = true;
        // Vue.set(this, 'leftSidebar', this.$cs.project.leftSidebar);
      } else {
        this.leftSidebar = {};
      }

      if (d.rightSidebar) {
        this.rightSidebar = d.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
        // Vue.set(this, 'rightSidebar', d.rightSidebar);
      } else if (this.$cs.project.rightSidebar) {
        this.rightSidebar = this.$cs.project.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
        // Vue.set(this, 'rightSidebar', this.$cs.project.rightSidebar);
      } else {
        this.rightSidebar = {};
      }
    });
  }

  public UpdateFooter(d: IDashboard) {
    if (d.footer) {
      this.footer = d.footer;
      if (!this.footer.hasOwnProperty('visible')) {
        this.footer.visible = true;
      }
      // Vue.set(this, 'rightSidebar', d.rightSidebar);
    } else if (this.$cs.project.footer) {
      this.footer = this.$cs.project.footer;
      // Vue.set(this, 'rightSidebar', this.$cs.project.rightSidebar);
    } else {
      this.footer = {};
    }
  }

  public actionCallback(action: string) {
    if (this.dialog && this.dialog.actionCallback) {
      this.dialog.visible = false;
      this.dialog.actionCallback(action);
    }
  }

  public created() {
    this.onResize();
    this.InitNotifications();

    this.dialogHandle = this.$cs.bus.subscribe(AppState.DIALOG, (action: string, dialog: IDialog) => {
      switch (action) {
        case AppState.DIALOG_ADDED:
          Vue.set(this, 'dialog', dialog);
          this.dialog.visible = true;
          break;
      }
    });

    // listen to dashboard init events
    this.dashboardHandle = this.$cs.bus.subscribe(
      AppState.DASHBOARD_MAIN,
      (action: string, dashboard: IDashboard) => {
        this.UpdateSideBars(dashboard);
        this.UpdateFooter(dashboard);
      }
    );

    if (this.$cs.activeDashboard) {
      this.UpdateSideBars(this.$cs.activeDashboard);
      this.UpdateFooter(this.$cs.activeDashboard);
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
      !this.$cs.project.notifications ||
      !this.$cs.project.notifications.items
    ) {
      return;
    }
    this.$set(
      this,
      'unReadNotifications',
      this.$cs.project.notifications.items.filter(not => !not.isRead)
    );
  }
  public InitNotifications() {
    if (this.$cs.bus) {
      this.notificationHandle = this.$cs.bus.subscribe(
        'notification',
        (action: string, notification: INotification) => {
          if (action === 'new') {
            if (this.lastNotification.clickCallback) {
              // Call callback of previous notification before closing it
              // this.lastNotification.clickCallback();
            }
            this.lastNotification = notification;
            this.UpdateNotifications();
          }
        }
      );
    }
  }
  private clickNotification() {
    this.lastNotification._visible = false;
    if (this.lastNotification.clickCallback) {
      this.lastNotification.clickCallback();
    }
  }
}
