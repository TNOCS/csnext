import Vue from 'vue';
import {
  AppStateBase,
  MessageBusService,
  IProject,
  INotification,
  IDashboard,
  IWidget,
  IDatasource,
  ISidebarOptions,
  IDialog,
  guidGenerator,
  idGenerator,
  InfoOptions
} from '@csnext/cs-core';
// tslint:disable-next-line:no-var-requires
import { ProjectManager } from './project-manager';
import { CsApp, CsDashboard, Logger, CsWidget } from '../';
import VueRouter from 'vue-router';
import VueI18n, { LocaleMessageObject } from 'vue-i18n';
import io from 'socket.io-client';
import { DefaultProject } from './default-project';
import { CsDialog } from '../components/cs-dialog/cs-dialog';
import { MdWidget } from '../widgets/markdown/md-widget';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
// TODO Should we use idiomatic Typescript instead, as in
// https://github.com/Badacadabra/JavaScript-Design-Patterns/blob/master/GoF/idiomatic/Creational/Singleton/TypeScript/API/me.ts
export class AppState extends AppStateBase {

  public static DIALOG = 'dialog';
  public static DIALOG_ADDED = 'dialog-added';
  public static RIGHTSIDEBAR = 'rightsidebar';
  public static RIGHTSIDEBAR_REMOVED = 'rightsidebar-removed';
  public static RIGHTSIDEBAR_ADDED = 'rightsidebar-added';
  public static DASHBOARD_MAIN = 'dashboard.main';
  public static DASHBOARD_CHANGED = 'dashboard-changed';
  public static LOADERS = 'loaders';
  public static YES = 'YES';
  public static NO = 'NO';

  /** used for singleton  */
  private static pInstance: AppState;

  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  public socket?: SocketIOClient.Socket;
  /** Manages active project */
  public projectManager?: ProjectManager;
  /** Logger */
  public logger = Logger.Instance;
  /** Vue router instance */
  public router?: VueRouter;
  /** Vue i18n instance */
  public i18n?: VueI18n;

  protected loaders: { [key: string]: any } = {};

  private constructor() {
    super();
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

  /** Initialize the project state, dashboard managers and data summaries handlers */
  public init(project: IProject) {
    Logger.info('app-state', 'Init AppState');

    // init basic common sense components
    Vue.component('cs-dashboard', CsDashboard);
    Vue.component('cs-widget', CsWidget);
    Vue.component('cs-app', CsApp);

    // merge new project details, with default project to make sure all required properties are available
    // this.project = merge(DefaultProject, project);
    this.project = project;
    this.project.header = Object.assign(DefaultProject.header, project.header);
    this.project.theme = Object.assign(DefaultProject.theme, project.theme);
    this.project.menus = Object.assign(DefaultProject.menus, project.menus);
    this.project.dashboards = Object.assign(
      DefaultProject.dashboards,
      project.dashboards
    );
    this.project.navigation = Object.assign(
      DefaultProject.navigation,
      project.navigation
    );

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
      ['left', 'left-hierarchy', 'tabs-left'].includes(this.project.navigation.style) &&
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

    // setup project manager
    this.projectManager = new ProjectManager(project);

    // mark app as initialized
    this.isInitialized = true;
    this.bus.publish('app-state', 'init', null);
    this.project._appState = this;
    if (typeof this.project.init === 'function') {
      this.project.init();
    }
    this.initSocket();
  }

  // add a new loader, if enabled it can enable the loading icon in the header 
  public AddLoader(id?: string, title?: string): string {
    if (id === undefined) {
      id = guidGenerator();
    }
    this.loaders[id] = title || id;
    this.bus.publish(AppState.LOADERS, 'updated');
    return id;
  }

  // remove a loader, if this is the last loader it disables the loading icon in the header
  public RemoveLoader(id: string) {
    if (this.loaders.hasOwnProperty(id)) {
      delete this.loaders[id];
      this.bus.publish(AppState.LOADERS, 'updated');
    }
  }

  // returns the list of existing loaders
  public GetLoaders(): { [key: string]: string } {
    return this.loaders;
  }

  public UpdateBreadCrumbs(d?: IDashboard, main = true) {
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
        this.UpdateBreadCrumbs(d.parent, false);
      }
    }
  }



  public updateDatasource(id: string, value: any) {
    if (!this.project) {
      return;
    }
    if (!this.project.datasources) {
      this.project.datasources = {};
    }
    this.project.datasources[id] = value;
    this.bus.publish('ds-' + id, 'updated', value);
  }

  /** loads specific datasource in memory. Returns selected datasource as a promise  */
  public loadDatasource<T>(source: IDatasource | string): Promise<T> {
    if (!this.projectManager) {
      return Promise.reject('Project Manager not initialized');
    }
    return this.projectManager.datasourceManager.load<T>(source);
  }

  public OpenInfo(options: InfoOptions | string, source: any) {
    if (typeof options === 'string') {
      options = { type: 'string', data: options};
    }
    if (options && !options.type) { options.type = 'string'}
    switch (options.type) {
      case "string":
        this.OpenRightSidebarWidget({ component: MdWidget, data: options.data, options: { showToolbar: false, title: options.title} }, { open: false}, 'info');
        break;
    }
  }

  /** Triggers notification */
  public TriggerNotification(notification: INotification) {
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

  public ClearNotifications() {
    this.bus.publish('notification', 'clear-all');
    if (this.project.notifications && this.project.notifications.items) {
      this.project.notifications.items.length = 0;
    }
  }

  public TriggerDialog(dialog: IDialog): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!dialog.actionCallback) {
        dialog.actionCallback = (action: string) => {
          resolve(action);
        };
      }
      this.bus.publish(AppState.DIALOG, AppState.DIALOG_ADDED, dialog);
    });
  }

  public TriggerYesNoQuestionDialog(title: string, text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const cb = (action: string) => {
        resolve(action === this.Translate(AppState.YES) ? AppState.YES : AppState.NO);
      };
      const d = {
        fullscreen: false, toolbar: true, title: this.Translate(title), text: this.Translate(text), visible: true, persistent: true, width: 400, actions: [this.Translate(AppState.YES), this.Translate(AppState.NO)], actionCallback: cb
      } as IDialog;
      this.TriggerDialog(d);
    });
  }

  public TriggerQuestionDialog(title: string, text: string, actions: string[]): Promise<string> {
    const d = {
      fullscreen: false, toolbar: true, title: this.Translate(title), text: this.Translate(text), visible: true, persistent: true, width: 400, actions: actions.map(a => this.Translate(a))
    } as IDialog;
    return this.TriggerDialog(d);
  }

  /** if rightsidebar exists, clear component and close */
  public ClearRightSidebar() {
    if (
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.project.rightSidebar.dashboard.widgets
    ) {
      while (this.project.rightSidebar.dashboard.widgets.length > 0) {
        if (this.project.rightSidebar.dashboard.widgets[0].id) {
          this.CloseRightSidebarWidget(this.project.rightSidebar.dashboard.widgets[0].id);
        }
        this.project.rightSidebar.dashboard.widgets.shift();
      }
      this.project.rightSidebar.open = false;
    }
  }

  public CloseRightSidebarKey(id: string): boolean {
    if (this.project.rightSidebar && this.project.rightSidebar.sidebars && this.project.rightSidebar.sidebars.hasOwnProperty(id)) {
      this.project.rightSidebar.sidebars[id].hide = true;
      return true;
    } else {
      return false;
    }
  }

  public CloseInfo() {

    this.CloseRightSidebarKey('info');
  }

  /** If a rightsidebar exists, it will remove a specific widget */
  public CloseRightSidebarWidget(id: string): boolean {
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

  public OpenRightSidebarKey(key: string) {
    if (this.project.rightSidebar) {
      if (!this.project.rightSidebar.sidebars) { this.project.rightSidebar.sidebars = {}; }
      if (!this.project.rightSidebar.sidebars.hasOwnProperty(key)) {
        this.project.rightSidebar.sidebars[key] = { id: key, widgets: [] };        
      }
      const d = this.project.rightSidebar.sidebars[key];
      d.hide = false;
      this.OpenRightSidebar(d);
    }
  }

  public OpenRightSidebar(dashboard?: IDashboard) {
    if (this.project.rightSidebar) {
      Vue.set(this.project.rightSidebar, 'dashboard', dashboard);
      this.project.rightSidebar.open = true;
    }
  }

  public ToggleRightSidebar(key?: string) {
    if (!this.project.rightSidebar) { return; }
    if (key && this.project.rightSidebar.sidebars && this.project.rightSidebar.sidebars.hasOwnProperty(key)) {
      const d = this.project.rightSidebar.sidebars[key];
      if (!this.project.rightSidebar.dashboard) {
        this.OpenRightSidebar(d);
      } else if (this.project.rightSidebar.dashboard.id === d.id) {
        this.project.rightSidebar.open = !this.project.rightSidebar.open;
        delete this.project.rightSidebar.dashboard;
        this.ClearRightSidebar();
      } else {
        // delete this.project.rightSidebar.dashboard;
        this.OpenRightSidebar(d);
      }
    } else {
      this.project.rightSidebar.open = !this.project.rightSidebar.open;
    }
  }

  /** If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget */
  public OpenRightSidebarWidget(widget: IWidget, options?: ISidebarOptions, key = 'default') {

    this.OpenRightSidebarKey(key);
    this.ClearRightSidebar();

    Vue.nextTick(() => {
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

  public ToggleRightSidebarWidget(widget: IWidget, options?: ISidebarOptions) {
    if (!widget.id || !this.CloseRightSidebarWidget(widget.id)) {
      this.OpenRightSidebarWidget(widget, options);
    }
  }

  public Translate(textKey: string, values?: { [key: string]: any }): string {
    if (this.i18n) {
      return this.i18n.t(textKey, values).toString();
    } else {
      return textKey;
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
