import Vue from 'vue';
import {
  AppStateBase,
  IProject,
  INotification,
  IDashboard,
  IWidget,
  IDatasource,
  ISidebarOptions,
  IDialog,
  guidGenerator,
  InfoOptions,
  Loader,
  IMenu,
  INotificationOptions
} from '@csnext/cs-core';
// tslint:disable-next-line:no-var-requires
import { CsApp, CsDashboard, Logger, CsWidget, HtmlWidget, DatasourceManager, LayoutManager, DashboardManager } from '../';
import VueRouter from 'vue-router';
import VueI18n, { LocaleMessageObject } from 'vue-i18n';
import io from 'socket.io-client';
import { DefaultProject } from './default-project';
import { KeyboardManager } from './keyboard-manager';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
export class AppState extends AppStateBase {

  public static DIALOG = 'dialog';
  public static DIALOG_ADDED = 'dialog-added';
  public static DIALOG_CLOSED = 'dialog-closed';
  public static RIGHTSIDEBAR = 'rightsidebar';
  public static RIGHTSIDEBAR_REMOVED = 'rightsidebar-removed';
  public static RIGHTSIDEBAR_ADDED = 'rightsidebar-added';
  public static DASHBOARD_MAIN = 'dashboard.main';
  public static DASHBOARD_CHANGED = 'dashboard-changed';
  public static APP_STATE = 'app-state';
  public static YES = 'YES';
  public static NO = 'NO';

  /** used for singleton  */
  private static pInstance: AppState;

  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  public datasourceManager: DatasourceManager;
  public layoutManager: LayoutManager;
  public dashboardManager: DashboardManager;
  public loader: Loader;

  public socket?: SocketIOClient.Socket;
  /** Manages active project */
  // public projectManager?: ProjectManager;
  /** Logger */
  public logger = Logger.Instance;
  /** Vue router instance */
  public router?: VueRouter;
  /** Vue i18n instance */
  public i18n?: VueI18n;
  /** manages keyboard shortcuts */
  public keyboard: KeyboardManager = new KeyboardManager();

  private constructor() {
    super();
    if (!this.project.datasources) { this.project.datasources = {}; }
    if (!this.project.header) { this.project.header = {}; }
    if (!this.project.notifications) { this.project.notifications = {}; }
    Object.assign(this.project.notifications, { enabled: false, items: [], listStyle: 'popup' } as INotificationOptions);
    this.datasourceManager = new DatasourceManager();
    this.dashboardManager = new DashboardManager();
    this.layoutManager = new LayoutManager();
    this.loader = new Loader(this.bus);
  }

  public initSocket() {
    if (
      this.project &&
      this.project.server &&
      this.project.server.useSocket &&
      this.project.server.socketServerUrl
    ) {
      this.socket = io(this.project.server.socketServerUrl);
      // this.socket.on('connect', () => {

      // });
      // this.socket.on('reconnect', () => {

      // });
      // this.socket.on('disconnected', () => {

      // });
    }
  }

  public get isMobile(): boolean {
    return window.innerWidth < 800;
  }

  public initApp(element: string = '#app', project?: IProject) {
    new Vue({
      render: h => h(CsApp)
    }).$mount(element);
    this.init(project);
  }

  /** Initialize the project state, dashboard managers and data summaries handlers */
  public init(project: IProject = {}) {
    Logger.info('app-state', 'Init AppState');

    Vue.config.productionTip = false;

    // init basic common sense components
    Vue.component('cs-dashboard', CsDashboard);
    Vue.component('cs-widget', CsWidget);
    Vue.component('cs-app', CsApp);

    this.keyboard.init();

    // merge new project details, with default project to make sure all required properties are available
    // this.project = merge(DefaultProject, project);
    this.project = { ...DefaultProject, ...project };

    if (this.isMobile && this.project.navigation && this.project.navigation.autoMobileBottom) {
      this.project.navigation.style = 'bottom';
    }

    if (project.init) {
      this.project.init = project.init;
    }

    if (project.languages && this.i18n && this.i18n.messages) {
      if (project.languages.localeMessages) {
        const messages = Object.keys(project.languages.localeMessages);
        for (const lang of messages) {
          this.i18n!.mergeLocaleMessage(lang, project.languages!
            .localeMessages![lang] as LocaleMessageObject);
        }
      }
      this.i18n.locale = project.languages.defaultLanguage || 'en';
      this.i18n.fallbackLocale = project.languages.fallbackLanguage || 'nl';
    }

    // check if navigation style requires a leftSidebar, add one if not available
    if (
      this.project.navigation &&
      this.project.navigation.style &&
      ['left-hierarchy'].includes(this.project.navigation.style) &&
      !this.project.leftSidebar
    ) {
      this.project.leftSidebar = {
        open: false,
        mini: false,
        clipped: true,
        permanent: false,
        temporary: true
      };
    }


    // make sure all dashboards are marked as main
    if (this.project.dashboards) {
      this.initializeDashboards(this.project.dashboards);
    }

    // mark app as initialized
    this.isInitialized = true;
    this.bus.publish(AppState.APP_STATE, 'init', null);
    if (typeof this.project.init === 'function') {
      this.project.init();
    }
    this.initSocket();
  }

  public addDashboard(dashboard: IDashboard): IDashboard {
    if (!this.project.dashboards) { this.project.dashboards = []; }
    this.initializeDashboards([dashboard]);
    this.project.dashboards.push(dashboard);
    return dashboard;
  }

  public addDatasource<T>(datasource: IDatasource): T {
    if (!this.project.datasources) { this.project.datasources = {}; }
    if (!datasource.id) { datasource.id = guidGenerator(); }
    this.project.datasources[datasource.id] = datasource;
    return datasource as T;
  }

  public addMenu(menu: IMenu) {
    if (!this.project.menus) { this.project.menus = []; }
    if (!menu.type) { menu.type = 'icon'; }
    if (this.project.menus.findIndex(m => m.id === menu.id) === -1) {
      Vue.nextTick(() => {
        if (this.project.menus) {
          this.project.menus.push(menu);
        }
      });
    }
  }

  public removeMenu(menuId: string) {
    if (!this.project.menus) { return; }
    const menuItemIndex = this.project.menus.findIndex(m => m.id === menuId);
    if (menuItemIndex >= 0) {
      this.project.menus.splice(menuItemIndex, 1);
    }
  }

  public get visibleSidebars(): { [key: string]: IDashboard } | undefined {
    if (!this.project.rightSidebar) { return undefined; }
    let res = this.project.rightSidebar.sidebars;
    if (this.activeDashboard && this.activeDashboard.sidebars) {
      for (const sb in this.activeDashboard.sidebars) {
        if (this.activeDashboard.sidebars.hasOwnProperty(sb)) {
          const element = this.activeDashboard.sidebars[sb];
          if (!element.id) { element.id = sb; }
        }
      }
      res = { ...res, ...this.activeDashboard.sidebars };
    }
    return res;
  }

  public addSidebar(id: string, sidebar: IDashboard, dashboard?: IDashboard) {
    if (!sidebar) { return; }
    sidebar = { ...{ id, widgets: [] }, ...sidebar };
    if (dashboard) {
      if (!dashboard.sidebars) {
        dashboard.sidebars = {};
      }
      if (!dashboard.sidebars.hasOwnProperty(id)) {
        dashboard.sidebars[id] = sidebar;
      }
    } else {
      if (!this.project.rightSidebar) {
        this.project.rightSidebar = {};
      }
      if (!this.project.rightSidebar.sidebars) {
        this.project.rightSidebar.sidebars = {};
      }
      if (!this.project.rightSidebar.sidebars.hasOwnProperty(id)) {
        this.project.rightSidebar.sidebars[id] = sidebar;
      }
    }
  }

  public removeSidebar(id: string) {
    if (!this.project.rightSidebar || !this.project.rightSidebar.sidebars || !this.project.rightSidebar.sidebars.hasOwnProperty(id)) {
      return;
    }
    delete this.project.rightSidebar.sidebars[id];
  }

  public updateBreadCrumbs(d?: IDashboard, main = true) {
    if (!d) { d = this.activeDashboard; }
    if (
      d &&
      this.project &&
      this.project.header &&
      this.project.header.breadcrumbs
    ) {
      if (!this.project.header.breadcrumbItems || main) {
        Vue.set(this.project.header, 'breadcrumbItems', []);
        // this.project.header.breadcrumbItems = [];
      }
      if (d.title && this.project.header.breadcrumbItems) {
        this.project.header.breadcrumbItems.unshift(d.title);
      }
      if (d.parent) {
        this.updateBreadCrumbs(d.parent, false);
      }
    }
  }

  public updateDatasource(id: string, value: any) {
    if (!this.datasourceManager) {
      return Promise.reject('Datasource Manager not initialized');
    }
    this.datasourceManager.update(id, value);
  }

  /** loads specific datasource in memory. Returns selected datasource as a promise  */
  public loadDatasource<T>(source: IDatasource | string): Promise<T> {
    if (!this.datasourceManager) {
      return Promise.reject('Datasource Manager not initialized');
    }
    return this.datasourceManager.load<T>(source);
  }

  public openInfo(options: InfoOptions | string) {
    if (typeof options === 'string') {
      options = { type: 'string', data: options };
    }
    if (options && !options.type) { options.type = 'string'; }
    switch (options.type) {
      case 'string':
        this.openRightSidebarWidget({ component: HtmlWidget, data: options.data, options: { showToolbar: false, title: options.title } }, { open: false }, 'info');
        break;
    }
  }

  /** Triggers notification */
  public triggerNotification(notification: INotification) {
    notification = {
      ...{
        id: guidGenerator(),
        timeout: 3000,
        created: new Date(),
        isRead: false,
        buttonText: 'CLOSE',
        remember: true,
        _visible: true
      },
      ...notification
    };

    this.bus.publish('notification', 'new', notification);
    if (
      this.project.notifications &&
      this.project.notifications.items &&
      notification.remember
    ) {
      this.project.notifications.items.push(notification);
    }
  }

  public clearNotifications() {
    this.bus.publish('notification', 'clear-all');
    if (this.project.notifications && this.project.notifications.items) {
      this.project.notifications.items.length = 0;
    }
  }

  public closeDialog() {
    this.bus.publish(AppState.DIALOG, AppState.DIALOG_CLOSED);
  }

  public triggerDialog(dialog: IDialog): Promise<string> {
    return new Promise((resolve) => {
      if (!dialog.actionCallback) {
        dialog.actionCallback = (action: string) => {
          resolve(action);
        };
      }
      this.bus.publish(AppState.DIALOG, AppState.DIALOG_ADDED, dialog);
    });
  }

  public triggerYesNoQuestionDialog(title: string, text: string): Promise<string> {
    return new Promise((resolve) => {
      const cb = (action: string) => {
        resolve(action === this.Translate(AppState.YES) ? AppState.YES : AppState.NO);
      };
      const d = {
        fullscreen: false, toolbar: true, title: this.Translate(title), text: this.Translate(text), visible: true, persistent: true, width: 400, actions: [this.Translate(AppState.YES), this.Translate(AppState.NO)], actionCallback: cb
      } as IDialog;
      this.triggerDialog(d);
    });
  }

  public triggerQuestionDialog(title: string, text: string, actions: string[]): Promise<string> {
    const d = {
      fullscreen: false, toolbar: true, title: this.Translate(title), text: this.Translate(text), visible: true, persistent: true, width: 400, actions: actions.map(a => this.Translate(a))
    } as IDialog;
    return this.triggerDialog(d);
  }

  /** if rightsidebar exists, clear component and close */
  public clearRightSidebar() {
    if (
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.project.rightSidebar.dashboard.widgets
    ) {
      while (this.project.rightSidebar.dashboard.widgets.length > 0) {
        if (this.project.rightSidebar.dashboard.widgets[0].id) {
          this.closeRightSidebarWidget(this.project.rightSidebar.dashboard.widgets[0].id);
        }
        this.project.rightSidebar.dashboard.widgets.shift();
      }
      this.project.rightSidebar.open = false;
    }
  }

  public closeRightSidebar(): boolean {
    if (this.project.rightSidebar) {
      this.project.rightSidebar.open = false;
      return true;
    } else {
      return false;
    }
  }

  public closeRightSidebarKey(id: string): boolean {
    if (this.project.rightSidebar && this.project.rightSidebar.sidebars && this.project.rightSidebar.sidebars.hasOwnProperty(id)) {
      this.project.rightSidebar.sidebars[id].hide = true;
      return true;
    } else {
      return false;
    }
  }

  public closeInfo() {

    this.closeRightSidebarKey('info');
  }

  /** If a rightsidebar exists, it will remove a specific widget */
  public closeRightSidebarWidget(id: string): boolean {
    if (
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.project.rightSidebar.dashboard.widgets
    ) {
      const wi = this.project.rightSidebar.dashboard.widgets.findIndex(w => w.id === id);
      if (wi >= 0) {
        const widget = this.project.rightSidebar.dashboard.widgets.splice(wi, 1)[0];
        this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_REMOVED, widget);
        if (this.project.rightSidebar.dashboard.widgets.length === 0) {
          this.project.rightSidebar.open = false;
        }
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public openRightSidebarKey(key: string) {
    if (this.project.rightSidebar) {
      if (!this.project.rightSidebar.sidebars) { this.project.rightSidebar.sidebars = {}; }
      if (!this.project.rightSidebar.sidebars.hasOwnProperty(key)) {
        this.project.rightSidebar.sidebars[key] = { id: key, widgets: [] };
      }
      const d = this.project.rightSidebar.sidebars[key];
      d.hide = false;
      this.openRightSidebar(d);
    }
  }

  public openRightSidebar(dashboard?: IDashboard) {
    if (this.project.rightSidebar) {
      Vue.set(this.project.rightSidebar, 'dashboard', dashboard);
      this.project.rightSidebar.open = true;
    }
  }

  public toggleRightSidebar(key?: string) {
    const visible = this.visibleSidebars;
    if (!visible || !this.project.rightSidebar) { return; }

    if (key && visible.hasOwnProperty(key)) {
      const d = visible[key];
      if (this.project.rightSidebar.dashboard && this.project.rightSidebar.dashboard.id === d.id) {
        this.project.rightSidebar.open = !this.project.rightSidebar.open;
      } else {
        this.openRightSidebar(d);
      }
    } else {
      this.project.rightSidebar.open = !this.project.rightSidebar.open;
    }
  }

  /** If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget */
  public openRightSidebarWidget(widget: IWidget, options?: ISidebarOptions, key = 'default', replace = true) {

    if (!replace && widget.id && this.project.rightSidebar && this.project.rightSidebar.dashboard && this.findWidget(widget.id, this.project.rightSidebar.dashboard)) {
      return;
    }

    

    Vue.nextTick(() => {
      this.openRightSidebarKey(key);
    this.clearRightSidebar();
      if (
        this.project.rightSidebar &&
        this.project.rightSidebar.dashboard &&
        this.project.rightSidebar.dashboard.widgets
      ) {
        this.project.rightSidebar.dashboard.widgets.push(widget);
        if (options) {
          if (options.open !== undefined) {
            this.project.rightSidebar.open = options.open;
          }
          if (options.width !== undefined) {
            this.project.rightSidebar.width = options.width;
          }
        } else {
          this.project.rightSidebar.open = true;
        }
      }
    });
    // }
    this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_ADDED, widget);
  }

  public toggleRightSidebarWidget(widget: IWidget, options?: ISidebarOptions) {
    if (!widget.id || !this.closeRightSidebarWidget(widget.id)) {
      this.openRightSidebarWidget(widget, options);
    }
  }

  public Translate(textKey: string, values?: { [key: string]: any }): string {
    if (this.i18n) {
      return this.i18n.t(textKey, values).toString();
    } else {
      return textKey;
    }
  }

  public findWidget(id: string, dashboard?: IDashboard): IWidget | undefined {
    if (!dashboard && this.project.dashboards) {
      for (const d of this.project.dashboards) {
        const w = this.findWidget(id, d);
        if (w) { return w; }
      }
    } else if (dashboard) {
      if (dashboard.widgets && dashboard.widgets.length > 0) {
        const widget = dashboard.widgets.find(w => w.id === id);
        if (widget) { return widget; }
      } else if (dashboard.dashboards && dashboard.dashboards.length > 0) {
        for (const d of dashboard.dashboards) {
          const widget = this.findWidget(id, d);
          if (widget) {
            return widget;
          }
        }
      }
    }
  }

  /** initializes given dashboards */
  private initializeDashboards(dashboards: IDashboard[]) {
    if (dashboards) {
      for (const d of dashboards) {
        d.isMain = true;
        if (!d.pathLink) {
          d.pathLink = d.path;
        }
        if (d.dashboards) {
          this.initializeDashboards(d.dashboards);
        }
      }
    }
  }
}
