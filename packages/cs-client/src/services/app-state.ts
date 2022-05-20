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
  INotificationOptions,
  idGenerator,
  SyncStore,
} from '@csnext/cs-core';
// tslint:disable-next-line:no-var-requires
import { CsApp, CsDashboard, Logger, CsWidget, HtmlWidget, DatasourceManager, LayoutManager, DashboardManager } from '../';
import VueRouter, { RouteConfig } from 'vue-router';
import VueI18n, { LocaleMessageObject } from 'vue-i18n';

import io, { Socket } from 'socket.io-client';
import { DefaultProject } from './default-project';
import { KeyboardManager } from './keyboard-manager';
import { Framework } from 'vuetify';
import Axios from 'axios';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
export class AppState extends AppStateBase {
  public static DIALOG = 'dialog';
  public static DIALOG_ADDED = 'dialog-added';
  public static DIALOG_CLOSED = 'dialog-closed';
  public static RIGHTSIDEBAR = 'rightsidebar';
  public static RIGHTSIDEBAR_REMOVED = 'rightsidebar-removed';
  public static RIGHTSIDEBAR_ADDED = 'rightsidebar-added';
  public static RIGHTSIDEBAR_CLOSED = 'rightsidebar-closed';
  public static RIGHTSIDEBAR_BADGES_CHANGED = 'rightsidebar-badges-changed';
  public static DASHBOARD_MAIN = 'dashboard.main';
  public static DASHBOARD_CHANGED = 'dashboard-changed';
  public static APP_STATE = 'app-state';
  public static SOCKET = 'socket';
  public static SOCKET_CONNECTED = 'socket-connected';
  public static SOCKET_DISCONNECTED = 'socket-disconnected';
  public static SOCKET_RECONNECTING = 'socket-reconnecting';
  public static YES = 'YES';
  public static NO = 'NO';
  public static INFO_WIDGET = 'info-widget';
  public static INFO_WIDGET_ADDED = 'info-widget-added';
  public static INFO_WIDGET_CLEARED = 'info-widget-cleared';
  public static NOTIFICATION = 'notification';
  public static NOTIFICATION_ADDED = 'new';
  public static NOTIFICATION_CLEARED = 'clear-all';
  public static FILE_UPLOAD = 'file-upload';
  public static FILE_UPLOAD_START = 'file-upload-start';
  public static LEFT_SIDEBAR_STATE = 'lsb';

  /** used for singleton  */
  private static pInstance: AppState;

  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  public datasourceManager: DatasourceManager;
  public layoutManager: LayoutManager;
  public dashboardManager: DashboardManager;
  public activeInfoWidget?: IWidget;

  public loadConfig() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      // if (process.env.NODE_ENV === 'production') {
        Axios.get<any>('/config').then( r=> {
          (window as any)._env = r.data;
          resolve(true);
        }).catch( e => {
          resolve(false);
        })
       
      // else {
      // resolve(true);
      // }
    });       
  }

  /** gets server url */
  public serverUrl(url?: string): string {
    if (process.env.VUE_APP_SERVER_URL) {
      return process.env.VUE_APP_SERVER_URL;
    } else if (window.hasOwnProperty('_env') && (window as any)._env.hasOwnProperty('VUE_APP_SERVER_URL')) {
      return (window as any)._env.VUE_APP_SERVER_URL;
    } else if (url !== undefined) {
      return url;
    } else {
      var protocol = window.location.protocol;
      var hostname = window.location.hostname;
      var port = window.location.port;
      const serverurl = `${protocol}//${hostname}:${port}`;
      return serverurl;
    }
  }

  public socket?: Socket;
  /** Manages active project */
  // public projectManager?: ProjectManager;
  /** Logger */
  public logger = Logger.Instance;
  /** Vue router instance */
  public router?: VueRouter = new VueRouter({ routes: [] });
  public vuetify?: Framework;
  /** Vue i18n instance */
  public i18n?: VueI18n;
  /** manages keyboard shortcuts */
  public keyboard: KeyboardManager = new KeyboardManager();

  private constructor() {
    super();
    if (!this.project.datasources) {
      this.project.datasources = {};
    }
    if (!this.project.header) {
      this.project.header = {};
    }
    if (!this.project.notifications) {
      this.project.notifications = {};
    }
    Object.assign(this.project.notifications, {
      enabled: false,
      items: [],
      listStyle: 'popup',
    } as INotificationOptions);
    this.datasourceManager = new DatasourceManager();
    this.dashboardManager = new DashboardManager();
    this.layoutManager = new LayoutManager();
    this.loader = new Loader(this.bus);
  }

  public removeRouteQueryParam(key: string) {
    if (!this.router?.currentRoute?.query) {
      return;
    }
    let query = Object.assign({}, this.router?.currentRoute?.query);
    if (query && query.hasOwnProperty(key)) {
      delete query[key];
      this.router
        .replace({ query })
        .then(() => {})
        .catch((e) => {});
    }
  }

  public addRouteQueryParam(key: string, value: string) {
    if (!this.router?.currentRoute?.query) {
      return;
    }
    let query = Object.assign({}, this.router?.currentRoute?.query);
    if (query) {
      query[key] = value;
      this.router
        .replace({ query })
        .then(() => {})
        .catch((e) => {});
    }
  }

  public getRouteQuery(key: string): string | undefined {
    if (!this.router?.currentRoute?.query) {
      return;
    }
    if (this.router.currentRoute.query.hasOwnProperty(key)) {
      return this.router.currentRoute.query[key] as string;
    }
  }

  public updateRouteQuery(params: { [key: string]: any }) {
    if (!this.router?.currentRoute?.query) {
      return;
    }
    let query = this.router?.currentRoute?.query;
    const combined = { ...query, ...params };
    this.router.replace(
      { path: this.router?.currentRoute.params[0], query: combined },
      () => {},
      (err) => {
        // console.log(err);
      }
    );
  }

  public initSocket() {
    if (this.project && this.project.server && this.project.server.useSocket && this.project.server.socketServerUrl) {
      this.socket = io(this.project.server.socketServerUrl, {});

      this.socket.on('connect', () => {
        this.bus.publish(AppState.SOCKET, AppState.SOCKET_CONNECTED, this.socket);
      });
      this.socket.on('reconnect', () => {
        this.bus.publish(AppState.SOCKET, AppState.SOCKET_RECONNECTING, this.socket);
      });
      this.socket.on('disconnect', (e) => {
        this.bus.publish(AppState.SOCKET, AppState.SOCKET_DISCONNECTED, this.socket);
      });
    }
  }

  public get isMobile(): boolean {
    if (this.project?.navigation?.forceDesktop) {
      return false;
    }
    return window.innerWidth < 800 || window.innerHeight < 800;
  }

  public get isFloatingHeader(): boolean {
    return this.project?.header?.floating === true && !this.isMobile;
  }

  public get isBottomNavigation(): boolean {
    return this.project?.navigation?.style === 'bottom' || (this.project?.navigation?.style === 'mobile-compact' && this.isMobile);
  }

  public setSidebarBadge(id: string, dot: boolean, color: string, badgeType: 'none' | 'text' | 'icon', content: string, onlyIfClosed?: boolean ) {
    if (
      this.project?.rightSidebar?.sidebars &&
      this.project.rightSidebar.sidebars.hasOwnProperty(id) &&
      this.project.rightSidebar.sidebars[id] !== undefined
    ) {
      const dashboard = this.project.rightSidebar.sidebars[id] as IDashboard;
      if (onlyIfClosed && this.project.rightSidebar.open) {
        return;
      }
      dashboard.badgeDot = dot;
      dashboard.badgeColor = color;
      dashboard.badgeType = badgeType;
      this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_BADGES_CHANGED, this.project.rightSidebar);
    }
  }

  public clearSidebarBadge(id: string) {
    this.setSidebarBadge(id, false, '', 'none', '');
  }

  public copyToClipboard(str: string) {
    const el = document.createElement('textarea');
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  public initApp(element: string = '#app', project?: IProject) {
    new Vue({
      render: (h) => h(CsApp),
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
          this.i18n!.mergeLocaleMessage(lang, project.languages!.localeMessages![lang] as LocaleMessageObject);
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
        temporary: true,
      };
    }

    this.checkLeftSidebarState();

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

  public addDashboard(dashboard: IDashboard, parent?: IDashboard, index?: number): IDashboard {
    this.initializeDashboards([dashboard]);
    if (parent) {
      if (!parent.dashboards) {
        parent.dashboards = [];
      }
      parent.dashboards.push(dashboard);
    } else if (index && this.project.dashboards && this.project.dashboards.length >= index) {
      this.project.dashboards.splice(index, 0, dashboard);
    } else {
      if (!this.project.dashboards) {
        this.project.dashboards = [];
      }
      this.project.dashboards.push(dashboard);
    }
    return dashboard;
  }

  // Add a dashboard as a route
  public addDashboardRoute(d: IDashboard) {
    if (!this.router) {
      return;
    }
    if (d.dashboards && d.dashboards.length > 0) {
      for (const dash of d.dashboards) {
        dash.parent = d;
        this.addDashboardRoute(dash);
      }
      if (d.options && d.options.toolbarOptions && d.options.toolbarOptions.navigation && d.dashboards && d.dashboards.length > 0) {
        this.addDashboardRoute({ ...d.dashboards[0], ...{ path: d.path } });
      }
    } else if (d.path) {
      const route = {
        name: d.id,
        path: d.path,
        component: CsDashboard,
        props: () => ({ dashboard: d }),
        alias: '/' + d.title,
        meta: d,
      } as RouteConfig;
      // router.addRoutes([route]);
      this.router.addRoute(route);

      // check for keyboard shortcut
      if (d.options && d.options.shortcut && d.pathLink) {
        const sc = d.options.shortcut;
        if (!sc.id) {
          sc.id = 'dashboard-' + d.id;
        }
        sc._callback = () => {
          this.router!.push(d.pathLink as any).catch(() => {
            // console.log(e);
          });
        };
        this.keyboard.register(sc);
      }
    }
  }

  public addDatasource<T>(datasource: IDatasource): T {
    if (!this.project.datasources) {
      this.project.datasources = {};
    }
    if (!datasource.id) {
      datasource.id = guidGenerator();
    }
    this.project.datasources[datasource.id] = datasource;
    return datasource as T;
  }

  public addMenu(menu: IMenu) {
    if (!this.project.menus) {
      this.project.menus = [];
    }
    if (!menu.type) {
      menu.type = 'icon';
    }
    if (this.project.menus.findIndex((m) => m.id === menu.id) === -1) {
      Vue.nextTick(() => {
        if (this.project.menus) {
          this.project.menus.push(menu);
        }
      });
    }
  }

  public removeMenu(menuId: string) {
    if (!this.project.menus) {
      return;
    }
    const menuItemIndex = this.project.menus.findIndex((m) => m.id === menuId);
    if (menuItemIndex >= 0) {
      this.project.menus.splice(menuItemIndex, 1);
    }
  }

  public get visibleSidebars(): { [key: string]: IDashboard } | undefined {
    if (!this.project.rightSidebar) {
      return undefined;
    }
    let res = this.project.rightSidebar.sidebars;
    if (this.activeDashboard && this.activeDashboard.sidebars) {
      for (const sb in this.activeDashboard.sidebars) {
        if (this.activeDashboard.sidebars.hasOwnProperty(sb)) {
          const element = this.activeDashboard.sidebars[sb];
          if (!element.id) {
            element.id = sb;
          }
        }
      }
      res = { ...res, ...this.activeDashboard.sidebars };
    }
    return res;
  }

  public addSidebar(id: string, sidebar: IDashboard, dashboard?: IDashboard) {
    if (!sidebar) {
      return;
    }
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
    if (!d) {
      d = this.activeDashboard;
    }
    if (d && this.project && this.project.header && this.project.header.breadcrumbs) {
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
    if (options && !options.type) {
      options.type = 'string';
    }
    switch (options.type) {
      case 'string':
        this.openRightSidebarWidget(
          {
            component: HtmlWidget,
            data: options.data,
            options: { showToolbar: false, title: options.title },
          },
          { open: false },
          'info'
        );
        break;
    }
  }

  public checkWidgetId(widget: IWidget) {
    if (widget && !widget.id) {
      widget.id = `widget-${widget.component?.name}-${idGenerator()}`;
    }
  }

  public addInfoWidget(widget: IWidget) {
    this.activeInfoWidget = widget;
    this.bus.publish(AppState.INFO_WIDGET, AppState.INFO_WIDGET_ADDED, widget);
  }

  public clearInfoWidget() {
    this.activeInfoWidget = undefined;
    this.bus.publish(AppState.INFO_WIDGET, AppState.INFO_WIDGET_CLEARED, undefined);
  }

  public TriggerNotification = this.triggerNotification;

  public removeNotification(id: string) {
    if (this.notifications) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index >= 0) {
        this.notifications.splice(index, 1);
      }
    }
  }

  /** Triggers notification */
  public triggerNotification(notification: INotification) {
    notification = {
      ...{
        id: guidGenerator(),
        timeout: notification.timeout ?? 3000,
        created: new Date(),
        isRead: false,
        group: false,
        buttonText: 'CLOSE',
        remember: true,
        _visible: true,
      },
      ...notification,
    };

    this.bus.publish(AppState.NOTIFICATION, AppState.NOTIFICATION_ADDED, notification);
    if (this.project.notifications && this.project.notifications.items && notification.remember) {
      if (!notification.group || this.project.notifications.items.findIndex((n) => n.text === notification.text) === -1) {
        this.project.notifications.items.push(notification);
      }
    }
  }

  public clearNotifications() {
    this.bus.publish(AppState.NOTIFICATION, AppState.NOTIFICATION_CLEARED);
    if (this.project.notifications && this.project.notifications.items) {
      this.project.notifications.items.length = 0;
    }
  }

  public closeDialog() {
    this.bus.publish(AppState.DIALOG, AppState.DIALOG_CLOSED);
  }

  public triggerDialog(dialog: IDialog): Promise<string | undefined> {
    return new Promise((resolve) => {
      dialog.input = dialog.defaultText ?? '';
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
        resolve(action === this.translate(AppState.YES) ? AppState.YES : AppState.NO);
      };
      const d = {
        fullscreen: false,
        toolbar: true,
        title: this.translate(title),
        text: this.translate(text),
        visible: true,
        persistent: true,
        width: 400,
        actions: [this.translate(AppState.YES), this.translate(AppState.NO)],
        actionCallback: cb,
      } as IDialog;
      this.triggerDialog(d);
    });
  }

  public triggerQuestionDialog(title: string, text: string, actions: string[]): Promise<string | undefined> {
    const d = {
      fullscreen: false,
      toolbar: true,
      title: this.translate(title),
      text: this.translate(text),
      visible: true,
      persistent: true,
      width: 400,
      actions: actions.map((a) => this.translate(a)),
    } as IDialog;
    return this.triggerDialog(d);
  }

  public triggerInputDialog(title: string, text: string, defaultValue?: string, placeholder?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const d = {
        fullscreen: false,
        toolbar: true,
        title: this.translate(title),
        text: this.translate(text),
        visible: true,
        textInput: true,
        defaultText: defaultValue,
        placeholder: placeholder,
        persistent: true,
        width: 400,
      } as IDialog;
      d.actionCallback = (action: string | undefined) => {
        if (!action) {
          reject();
        } else {
          resolve(action);
        }
      };
      this.triggerDialog(d);
    });
  }

  public triggerFileUpload(acceptTypes: string): Promise<FormData | undefined> {
    return new Promise((resolve, reject) => {
      this.bus.publish(AppState.FILE_UPLOAD, AppState.FILE_UPLOAD_START, {
        types: acceptTypes,
        callback: (r) => {
          resolve(r as FormData);
        },
      });
    });
  }

  public triggerFileDownload(fileName: string, content: any, contentType: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        resolve(true);
      } catch (e) {
        reject();
      }
    });
  }

  /** if rightsidebar exists, clear component and close */
  public clearRightSidebar() {
    if (this.project.rightSidebar && this.project.rightSidebar.dashboard && this.project.rightSidebar.dashboard.widgets) {
      while (this.project.rightSidebar.dashboard.widgets.length > 0) {
        if (this.project.rightSidebar.dashboard.widgets[0].id) {
          this.closeRightSidebarWidget(this.project.rightSidebar.dashboard.widgets[0].id);
        }
        this.project.rightSidebar.dashboard.widgets.shift();
      }
      this.closeRightSidebar();
    }
  }

  public toggleLeftSidebar() {
    if (!this.project?.leftSidebar) {
      return;
    }
    if (this.project.leftSidebar.open) {
      this.closeLeftSidebar();
    } else {
      this.openLeftSidebar();
    }
  }

  public openLeftSidebar() {
    if (this.project?.leftSidebar) {
      Vue.set(this.project.leftSidebar, 'open', true);
      this.addRouteQueryParam(AppState.LEFT_SIDEBAR_STATE, '1');
    }
  }

  public closeLeftSidebar() {
    if (this.project?.leftSidebar) {
      Vue.set(this.project.leftSidebar, 'open', false);
      this.addRouteQueryParam(AppState.LEFT_SIDEBAR_STATE, '0');
    }
  }

  public checkLeftSidebarState() {
    if (this.router?.currentRoute.query[AppState.LEFT_SIDEBAR_STATE]) {
      if (this.router.currentRoute.query[AppState.LEFT_SIDEBAR_STATE] === '0') {
        this.closeLeftSidebar();
      }
      if (this.router.currentRoute.query[AppState.LEFT_SIDEBAR_STATE] === '1') {
        this.openLeftSidebar();
      }
    }
  }

  public closeRightSidebar(): boolean {
    if (this.project.rightSidebar) {
      this.project.rightSidebar.open = false;
      this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_CLOSED);
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
    if (this.project.rightSidebar && this.project.rightSidebar.dashboard && this.project.rightSidebar.dashboard.widgets) {
      const wi = this.project.rightSidebar.dashboard.widgets.findIndex((w) => w.id === id);
      if (wi >= 0) {
        const widget = this.project.rightSidebar.dashboard.widgets.splice(wi, 1)[0];
        this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_REMOVED, widget);
        if (this.project.rightSidebar.dashboard.widgets.length === 0) {
          this.closeRightSidebar();
        }
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public addRightSidebarKey(key: string, open: boolean = false, expanded = false, tab: string | undefined = undefined) {
    if (this.project.rightSidebar) {
      if (!this.project.rightSidebar.sidebars) {
        this.project.rightSidebar.sidebars = {};
      }
      if (!this.project.rightSidebar.sidebars.hasOwnProperty(key)) {
        this.project.rightSidebar.sidebars[key] = { id: key, widgets: [] };
      }
      const d = this.project.rightSidebar.sidebars[key];

      if (expanded) {
        if (!d.options) d.options = {};
        d.options.sidebarExpanded = expanded;
      }
      d.hide = false;
      if (open) {
        this.openRightSidebar(d);
      }
    }
  }

  public openRightSidebarKey(key: string, expanded = false, tab: string | undefined = undefined) {
    this.addRightSidebarKey(key, true);
  }

  public openRightSidebar(dashboard?: IDashboard) {
    if (this.project.rightSidebar) {
      Vue.set(this.project.rightSidebar, 'dashboard', dashboard);
      this.project.rightSidebar.open = true;
    }
  }

  public toggleRightSidebar(key?: string) {
    const visible = this.visibleSidebars;
    if (!visible || !this.project.rightSidebar) {
      return;
    }

    if (key && visible.hasOwnProperty(key)) {
      const d = visible[key];
      if (this.project.rightSidebar.dashboard && this.project.rightSidebar.dashboard.id === d.id) {
        if (this.project.rightSidebar.open) {
          this.closeRightSidebar();
        } else {
          this.project.rightSidebar.open = true;
        }
      } else {
        this.openRightSidebar(d);
      }
    } else {
      if (this.project.rightSidebar.open) {
        this.closeRightSidebar();
      } else {
        this.project.rightSidebar.open = true;
      }
    }
  }

  /** If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget */
  public openRightSidebarWidget(widget: IWidget, options?: ISidebarOptions, key = 'default', replace = true) {
    this.addRightSidebarWidget(widget, options, key, replace, true);
  }

  /** If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget */
  public addRightSidebarWidget(widget: IWidget, options?: ISidebarOptions, key = 'default', replace: boolean = true, open: boolean = false) {
    if (
      !replace &&
      widget.id &&
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.findWidget(widget.id, this.project.rightSidebar.dashboard)
    ) {
      return;
    }
    Vue.nextTick(() => {
      if (open) {
        this.openRightSidebarKey(key);
        this.clearRightSidebar();
      } else {
        this.addRightSidebarKey(key);
        if (this.project.rightSidebar && this.project.rightSidebar.sidebars) {
          if (this.project.rightSidebar.sidebars.hasOwnProperty(key) && this.project.rightSidebar.sidebars[key].widgets) {
            this.project.rightSidebar.sidebars[key].widgets!.push(widget);
          }
        }
      }
      if (this.project.rightSidebar && this.project.rightSidebar.dashboard && this.project.rightSidebar.dashboard.widgets) {
        this.project.rightSidebar.dashboard.widgets.push(widget);
        if (options) {
          if (options.open !== undefined) {
            this.project.rightSidebar.open = options.open;
          }
          if (options.width !== undefined) {
            this.project.rightSidebar.width = options.width;
          }
        } else {
          this.project.rightSidebar.open = this.project.rightSidebar.open !== undefined ? this.project.rightSidebar.open : true;
        }
      }
      this.bus.publish(AppState.DASHBOARD_MAIN, AppState.DASHBOARD_CHANGED, AppState.Instance.activeDashboard); //To trigger the watch on visibleHeaders
      this.bus.publish(AppState.RIGHTSIDEBAR, AppState.RIGHTSIDEBAR_ADDED, widget);
    });
    // }
  }

  public toggleRightSidebarWidget(widget: IWidget, options?: ISidebarOptions) {
    if (!widget.id || !this.closeRightSidebarWidget(widget.id)) {
      this.openRightSidebarWidget(widget, options);
    }
  }

  public static parseStateValue(state: any, value: string) {
    if (value?.startsWith('$state')) {
      const stateValue = state[value.substring(7)];
      if (stateValue) {
        return stateValue;
      }
    }
    return value;
  }

  public setState(store: SyncStore, key: string, value: any) {
    switch (store) {
      case 'global': {
        $cs.data[key] = value;
      }
    }
  }

  /**
   * @deprecated use translate
   */
  public Translate(textKey: string, values?: { [key: string]: any }): string {
    return this.translate(textKey, values);
  }

  public translate(textKey: string, values?: { [key: string]: any }): string {
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
        if (w) {
          return w;
        }
      }
    } else if (dashboard) {
      if (dashboard.widgets && dashboard.widgets.length > 0) {
        const widget = dashboard.widgets.find((w) => w.id === id);
        if (widget) {
          return widget;
        }
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
  public initializeDashboards(dashboards: IDashboard[]) {
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
