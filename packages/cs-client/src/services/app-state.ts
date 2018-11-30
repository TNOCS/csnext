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
  guidGenerator
} from '@csnext/cs-core';
// tslint:disable-next-line:no-var-requires
import merge from 'deepmerge';
import { ProjectManager } from './project-manager';
import { CsApp, CsDashboard, Logger, CsWidget } from '../';
import VueRouter from 'vue-router';
import { DefaultProject } from './default-project';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
// TODO Should we use idiomatic Typescript instead, as in
// https://github.com/Badacadabra/JavaScript-Design-Patterns/blob/master/GoF/idiomatic/Creational/Singleton/TypeScript/API/me.ts
export class AppState extends AppStateBase {
  /** used for singleton  */
  private static pInstance: AppState;

  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  /** Manages active project */
  public projectManager?: ProjectManager;
  /** Logger */
  public logger = Logger.Instance;
  /** Vue router instance */
  public router?: VueRouter;

  private constructor() {
    super();
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

    // check if navigation style requires a leftSidebar, add one if not available
    if (
      this.project.navigation &&
      this.project.navigation.style &&
      ['left', 'left-hierarchy'].includes(this.project.navigation.style) &&
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

  /** Triggers notification */
  public TriggerNotification(notification: INotification) {
    Object.assign(notification, {
      id: guidGenerator(),
      timeout: 3000,
      created: new Date(),
      isRead: false,
      remember: true,
      _visible: true
    } as INotification);
    this.bus.publish('notification', 'new', notification);
    if (
      this.project.notifications &&
      this.project.notifications.items &&
      notification.remember
    ) {
      this.project.notifications.items.push(notification);
    }
  }

  public TriggerDialog(dialog: IDialog) {
    this.bus.publish('dialog', 'new', dialog);
  }

  /** if rightsidebar exists, clear component and close */
  public ClearRightSidebar() {
    if (
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.project.rightSidebar.dashboard.widgets
    ) {
      while (this.project.rightSidebar.dashboard.widgets.length > 0) {
        this.project.rightSidebar.dashboard.widgets.pop();
      }
      this.project.rightSidebar.open = false;
    }
  }

  /** If a rightsidebar exists, it will replaces all rightsidebar content with this specific widget */
  public OpenRightSidebarWidget(widget: IWidget, options?: ISidebarOptions) {
    if (
      this.project.rightSidebar &&
      this.project.rightSidebar.dashboard &&
      this.project.rightSidebar.dashboard.widgets
    ) {
      while (this.project.rightSidebar.dashboard.widgets.length > 0) {
        this.project.rightSidebar.dashboard.widgets.pop();
      }
      this.project.rightSidebar.dashboard.widgets.push(widget);
      if (options) {
        if (options.open) {
          this.project.rightSidebar.open = options.open;
        }
      } else {
        this.project.rightSidebar.open = true;
      }
    }
  }

  /** initializes given dashboards */
  private initializeDashboards(dashboards: IDashboard[]) {
    if (dashboards) {
      dashboards.forEach(d => {
        d.isMain = true;
        if (!d.pathLink) {
          d.pathLink = d.path;
        }
        if (d.dashboards) {
          this.initializeDashboards(d.dashboards);
        }
      });
    }
  }
}
