import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify, { UserVuetifyPreset } from 'vuetify';
import vuetifyEN from 'vuetify/es5/locale/en';
import vuetifyNL from 'vuetify/es5/locale/nl';
import Component from 'vue-class-component';
import VueRouter, { RouteConfig } from 'vue-router';
import {
  IDashboard,
  INotification,
  ISidebarOptions,
  IFooterOptions,
  IDialog,
  MessageBusManager,
  Topics
} from '@csnext/cs-core';
import { Ref, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard, CsSettings } from '../../';

import { CsSidebar } from '../cs-sidebar/cs-sidebar';
import { CsFooter } from '../cs-footer/cs-footer';

// tslint:disable-next-line:no-var-requires
const en = require('./../../assets/translations/en.json');
// tslint:disable-next-line:no-var-requires
const nl = require('./../../assets/translations/nl.json');
import 'vuetify/dist/vuetify.min.css';
import { CsHeader } from '../cs-header/cs-header';
import { CsLoader } from '../cs-loader/cs-loader';

import './../../assets/fonts/fonts.css';
import './cs-app.css';
// import 'simplebar/dist/simplebar.css';
// import Vuetify from 'vuetify/lib';

Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'nl',
  messages: { 'en': {}, 'nl': {} } as VueI18n.LocaleMessages,  // set locale messages
  silentTranslationWarn: true
});

const vuetifyOpts = {
  icons: {
    iconfont: 'md' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg',    
  }
  // lang: {
  //   t: (key, ...params) => i18n.t(key, params)
  // }
} as UserVuetifyPreset;

Vue.use(Vuetify);

const router = AppState.Instance.router; // new VueRouter({ routes: [] });

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
    'cs-loading': CsLoader
  }
} as any)
export class CsApp extends Vue {
  public static LANGUAGE_SWITCH_ID = 'switch_language';
  public static LOADING_MENU_ID = 'loading_menu';
  public app = AppState.Instance;

  public settingsDialog = false;
  public active = null;
  public leftSidebar: ISidebarOptions = {};
  public rightSidebar: ISidebarOptions = {};
  public footer: IFooterOptions = {};
  public dialog: IDialog = { visible: false };
  // notification properties
  public lastNotification: INotification = { _visible: false } as INotification;
  public showNotifications = false;
  public unReadNotifications: INotification[] = [];
  public isLoading: boolean = true;
  private busManager = new MessageBusManager();
  public dialogInput: string = '';
  private fileUploadCallback?: Function; 
  @Ref()
  public uploader!: HTMLElement;

  constructor() {
    super();        
    this.$cs.vuetify = this.$vuetify;
    this.$cs.router = router;
    this.$cs.i18n = i18n;
    this.$cs.i18n.mergeLocaleMessage('en', { '$vuetify': vuetifyEN });
    this.$cs.i18n.mergeLocaleMessage('nl', { '$vuetify': vuetifyNL });
    this.$cs.i18n.mergeLocaleMessage('en', (en as any).default ? (en as any).default : en);
    this.$cs.i18n.mergeLocaleMessage('nl', (nl as any).default ? (nl as any).default : nl);
    this.InitNavigation();

    this.busManager.subscribe(this.$cs.bus, 'right-sidebar', (action: string, data: any) => {
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
    this.busManager.subscribe(this.$cs.bus, 'widget', (action: string) => {
      switch (action) {
        case 'edit':
          if (this.$cs.project.leftSidebar) {
            this.$cs.project.leftSidebar.component = CsSettings;
            this.$cs.openLeftSidebar();
            // this.$set(this.$cs.project.rightSidebar, 'component', CsSettings);
            
          }
          break;
      }
    });
  }

  public beforeDestroy() {
    this.busManager.stop();
    document.removeEventListener('backbutton', this.backButtonPressed);
  }

  public filesChange(fieldName: string, fileList: any[]) {
    if (this.fileUploadCallback) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData

      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append("file", fileList[x], fileList[x].name);
      });

      this.fileUploadCallback(formData);
    }
    
    this.isLoading = true;    
    $cs.triggerNotification({
      title: $cs.Translate("PDF_IMPORT_STARTED"),
      color: "green",
    });
    
  }

  @Watch('app.project.dashboards')
  public projectChanged() {
    this.InitNavigation();
    this.InitTheme();
    // this.InitMenus();
  }

  @Watch('app.project.theme.dark')
  public themeChanged() {
    this.$vuetify.theme.dark = this.app.project.theme ? (this.app.project.theme.dark === true) : false;
  }

  @Watch('app.project.rightSidebar.sidebars')
  /** register keyboard shortcuts for sidebars */
  public rightSidebarsChanged(n: any) {
    for (const key in n) {
      if (n.hasOwnProperty(key)) {
        const sidebar = n[key] as IDashboard;
        if (sidebar && sidebar.options && sidebar.options.shortcut) {
          const sc = sidebar.options.shortcut;
          if (!sc.id) { sc.id = 'sidebar-' + key; }
          sc._callback = () => {
            AppState.Instance.openRightSidebarKey(key);
          };
          AppState.Instance.keyboard.register(sc);
        }

      }
    }
  }

  @Watch('app.project.notifications', { deep: true })
  public noticationsUpdated() {
    this.UpdateNotifications();
  }

  @Watch('app.project.rightSidebar.dashboard')
  public rightSidebarChanged(n: IDashboard) {
    if (!this.rightSidebar) {
      return;
    }
    this.rightSidebar.dashboard = n;
  }

  public closeDialog() {
    if (this.dialog.widget?._component) {
      (this.dialog.widget._component as Vue).$destroy();
      delete this.dialog.widget;
    }
  }

  public onResize() {
    this.$cs.windowSize = { x: window.innerWidth, y: window.innerHeight };    
  }

  public InitTheme() {
    if (this.$cs.project && this.$cs.project.theme) {
      if (this.$cs.project.theme.lightColors) {
        this.$vuetify.theme.themes.light = { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.lightColors };
      } else {
        this.$vuetify.theme.themes.light = { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.colors };
      }
      if (this.$cs.project.theme.darkColors) {
        this.$vuetify.theme.themes.dark = { ...this.$vuetify.theme.themes.dark, ...this.$cs.project.theme.darkColors };
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
  }

  public backButtonPressed() {
    if ($cs.isMobile && $cs.project.rightSidebar && $cs.project.rightSidebar.open) {
      $cs.closeRightSidebar();
    }
  }

  public onDeviceReady() {
    // alert('device ready');
  }

  public mounted() {
    this.isLoading = false;    
    document.addEventListener('deviceready', this.onDeviceReady, false);
    setTimeout(() => {
      document.addEventListener('backbutton', this.backButtonPressed, false);
    }, 1000);    
  }

  

  // Make sure all dashboards are available as routes
  public InitNavigation() {
    if (!this.$cs || !this.$cs.project || !this.$cs.project.dashboards) {
      return;
    }

    // create routes for dashboards
    for (const d of this.$cs.project.dashboards) {
      $cs.addDashboardRoute(d);
    }
    Logger.info('navigation', 'navigation initialized');
  }

  // tslint:disable-next-line:no-empty
  public selectBreadCrumb() { }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.pathLink);
    if (router && d.pathLink && !d.dashboards) {
      router.push(d.pathLink).catch((e) => { console.log(e); });
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
      } else if (this.$cs.project.leftSidebar) {
        this.leftSidebar = this.$cs.project.leftSidebar;
        this.leftSidebar.visible = true;
      } else {
        this.leftSidebar = {};
      }

      if (d.rightSidebar) {
        this.rightSidebar = d.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
      }
      else if (this.$cs.project.rightSidebar) {
        this.rightSidebar = this.$cs.project.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
      } else {
        this.rightSidebar = {};
      }
    });
  }

  public updateFooter(d: IDashboard) {
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

  public saveDialogInput() {

  }

  public actionCallback(action: string) {
    if (this.dialog && this.dialog.actionCallback) {
      this.dialog.visible = false;
      if (this.dialog.textInput) {
        this.dialog.textInput = undefined;
      }
      this.dialog.actionCallback(action);
    }
  }

  public created() {
    this.onResize();
    this.InitNotifications();
    window.addEventListener("resize", this.onResize);        

    this.busManager.subscribe(this.$cs.bus, AppState.DIALOG, (action: string, dialog: IDialog) => {
      switch (action) {
        case AppState.DIALOG_ADDED:
          const emptyDialog = {component: undefined, actions: undefined, persistent: false, actionCallback: undefined, widget: undefined } as IDialog;
          this.dialog = Object.assign(this.dialog, emptyDialog, dialog);          
          this.dialog.visible = true;          
          break;
        case AppState.DIALOG_CLOSED:                              
          this.dialog.visible = false;
          this.dialog.widget = undefined;
          break;

      }
    });

    // listen to dashboard init events
    this.busManager.subscribe(this.$cs.bus,
      AppState.DASHBOARD_MAIN,
      (action: string, dashboard: IDashboard) => {
        this.UpdateSideBars(dashboard);
        this.updateFooter(dashboard);
      }
    );

    this.busManager.subscribe(this.$cs.bus,
      AppState.FILE_UPLOAD,
      (action: string, data) => {
        this.fileUploadCallback = data.callback;
        this.uploader.click();
      }      
    );

    if (this.$cs.activeDashboard) {
      this.UpdateSideBars(this.$cs.activeDashboard);
      this.updateFooter(this.$cs.activeDashboard);
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

  public clickNotification() {
    if (this.lastNotification.clickCallback) {
      this.lastNotification.clickCallback();
    }
    this.closeNotification();
  }

  public closeNotification() {
    if (this.lastNotification) {
      this.lastNotification = { _visible: false } as INotification;
    }
    this.UpdateNotifications();
  }

  public openMobileDashboard(dashboard: IDashboard) {
    if (dashboard) {
      if (dashboard === $cs.activeDashboard) {
        dashboard.events?.publish(Topics.DASHBOARD, Topics.DASHBOARD_RELOAD, dashboard);
      } else
        if (dashboard.url) {
          // window.location.replace(dashboard.url);
          window.open(dashboard.url, '_blank');
        } else if (dashboard.pathLink) {
          this.$router.push(dashboard.pathLink).then(e => {

          }).catch(err => {
            if (err.name = 'NavigationDuplicated') {

            }

            // console.log(err);
          });
        }
    }
  }

  public InitNotifications() {
    if (this.$cs.bus) {
      this.busManager.subscribe(this.$cs.bus,
        AppState.NOTIFICATION,
        (action: string, notification: INotification) => {
          if (action === AppState.NOTIFICATION_ADDED) {
            if (this.lastNotification.clickCallback) {
              // Call callback of previous notification before closing it
              // this.lastNotification.clickCallback();
            }
            this.lastNotification = notification;
            this.UpdateNotifications();
          } else if (action === AppState.NOTIFICATION_CLEARED) {
            if (this.lastNotification && this.lastNotification.clickCallback) {
              // Call callback of previous notification before closing it
              this.lastNotification.clickCallback(true);
            }
            this.closeNotification();
          }
        }
      );
    }
  }

}
