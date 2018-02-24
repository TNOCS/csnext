import Vue from 'vue';
import { MessageBusService, Project, IProject, INotification, IDashboard, IDatasource } from '@csnext/cs-core';
import { CsApp } from './../components/cs-app/cs-app';
import { ProjectManager } from './project-manager';
import { CsSettings, CsDashboard, Logger, CsWidget, guidGenerator } from '../';
import VueRouter from 'vue-router';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
// TODO Should we use idiomatic Typescript instead, as in
// https://github.com/Badacadabra/JavaScript-Design-Patterns/blob/master/GoF/idiomatic/Creational/Singleton/TypeScript/API/me.ts
export class AppState {
  /** used for singleton  */
  private static pInstance: AppState;

  /** Project definition */
  public project: IProject = {};

  /** Manages active project */
  public projectManager?: ProjectManager;

  /** Logger */
  public logger = Logger.Instance;

  /** Event bus for publish/subscribe events in application */
  public bus = new MessageBusService();

  /** True if the application has been initialized */
  public isInitialized = false;

  public router?: VueRouter;

  /** list of past notifications */
  public notifications: INotification[] = [];

  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  public activeDashboard?: IDashboard;

  public data: { [id: string]: any } = {};

  public windowSize = { x: 0, y: 0 };

  private constructor() { }

  /** Initialize the project state, dashboard managers and data source handlers */
  public init(project: Project) {
    Logger.info('app-state', 'Init AppState');

    Vue.component('cs-dashboard', CsDashboard);
    Vue.component('cs-widget', CsWidget);
    Vue.component('cs-app', CsApp);

    this.project = project;

    // make sure all dashboards are marked as main
    if (this.project.dashboards) { this.initializeDashboards(this.project.dashboards); }

    this.projectManager = new ProjectManager(project);

    // if (this.project.datasources) {
    //   for (const ds in this.project.datasources) {
    //     if (this.project.datasources[ds].instant) {
    //       this.loadDatasource(this.project.datasources[ds]);
    //     }

    //   }
    // }

    this.isInitialized = true;
    this.bus.publish('app-state', 'init', null);
  }

  public initializeDashboards(dashboards: IDashboard[]) {
    if (dashboards) {
      dashboards.forEach(d => {
        d.isMain = true;
        if (d.dashboards) { this.initializeDashboards(d.dashboards); }
      });
    }
  }

  public loadDatasource(source: IDatasource | string): Promise<object> {
    if (!this.projectManager) { return Promise.reject('Project Manager not initialized'); }
    return this.projectManager.datasourceManager.load(source);
  }

  public TriggerNotification(notification: INotification) {
    Object.assign(notification, { id: guidGenerator(), timeout: 3000, created: new Date(), isRead: false, remember: true, _visible: true } as INotification);
    this.bus.publish('notification', 'new', notification);
    if (this.project.notifications && this.project.notifications.items && notification.remember) { this.project.notifications.items.push(notification); }
  }
}
