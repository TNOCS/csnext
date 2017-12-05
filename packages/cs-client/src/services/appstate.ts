import { ProjectManager } from './project-manager';
import Vue from 'vue';
import { csdashboard } from './../components/csdashboard/csdashboard';
import { IManagerConfig, Project, IDatasourceHandler, Dashboard, IDatasource, AppTheme, ThemeColors, FooterOptions, NavigationOptions, SidebarOptions } from '@csnext/cs-core';
import { Single, Grid, Logger, cswidget, WebRequestDatasourceProcessor, Notification, DashboardManager } from '../index';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
export class AppState {

    /** Project definition */
    public project: Project = {};

    /** Manages active project */
    public projectManager: ProjectManager;

    /** Logger */
    public L = Logger.Instance;

    /** Event bus for publish/subscribe events in application */
    public EventBus = new Vue();

    /** True if the application has been initialized */
    public isInitialized = false;

    /** list of past notifications */
    public notifications: Notification[] = [];

    /** used for singleton  */
    private static _instance: AppState;

    /** Get singleton instance of appstate */
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public data: { [id: string]: any } = {};

    constructor() {
        this.projectManager = new ProjectManager(this.project);
    }

    /** Initialize the project state, dashboard managers and data source handlers */
    public Init() {
        this.L.info('appstate', 'Init AppState');

        Vue.component('csdashboard', csdashboard);
        Vue.component('cswidget', cswidget);

        // TODO: use object.assign 
        if (!this.project) { this.project = new Project(); };
        if (!this.project.theme) { this.project.theme = new AppTheme(); }
        if (!this.project.theme.colors) { this.project.theme.colors = new ThemeColors() }
        if (!this.project.footer) { this.project.footer = new FooterOptions(); }
        if (!this.project.dashboards) { this.project.dashboards = []; }
        if (!this.project.navigation) {
            this.project.navigation = new NavigationOptions();
            this.project.navigation.style = 'right';
        }

        this.isInitialized = true;
        this.EventBus.$emit('init');
    }

    public loadDatasource(source: IDatasource | string) {
        let src: IDatasource;
        if (typeof (source) === 'string') {
            if (this.project.dataSources && this.project.dataSources.hasOwnProperty(source)) {
                src = this.project.dataSources[source];
                return this.projectManager.datasourceManager.load(src);
            }
        } else {
            src = source;
            return this.projectManager.datasourceManager.load(src);
        }       
    }

    public TriggerNotification(notification: Notification) {
        notification._visible = true;
        if (!notification.timeout) { notification.timeout = 1000; }
        this.EventBus.$emit('notification.new', notification);
        if (notification.remember) { this.notifications.push(notification); }
    }


}
