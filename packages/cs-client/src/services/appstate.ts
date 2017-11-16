import Vue from 'vue';
import { csdashboard } from './../components/csdashboard/csdashboard';
import { IManagerConfig, Project, IDataSourceHandler, Dashboard, IDataSource, AppTheme, ThemeColors, FooterOptions, NavigationOptions, SidebarOptions } from '@csnext/cs-core';
import { Single, Grid, Logger, cswidget, WebRequestDataSourceHandler, Notification } from '../index';

/** AppState is a singleton class used for project defintion, keeping track of available dashboard managers and datasource handlers. It also includes a generic EventBus and logger instance */
export class AppState {

    /** Project definition */
    public project: Project = {};

    /** Available dashboard managers for layouting */
    public dashboardManagers: { [id: string]: IManagerConfig } = {};

    /** Available datasource handlers  */
    public dataSourceHandlers: { [id: string]: IDataSourceHandler } = {};

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

    public TriggerNotification(notification: Notification) {
        notification._visible = true;
        if (!notification.timeout) { notification.timeout = 1000; }
        this.EventBus.$emit('notification.new', notification);
        if (notification.remember) { this.notifications.push(notification); }
    }

    /** Registration of a new dashboard manager */
    public AddDashboardManager(manager: IManagerConfig) {
        this.dashboardManagers[manager.id] = manager;
    }

    /** Registration of a new data source handler */
    public AddDataSourceHandler(handler: IDataSourceHandler) {
        this.dataSourceHandlers[handler.id] = handler;
    }

    /** Load a data source using the assigned data source handler */
    public LoadDataSource(source: IDataSource | string): Promise<any> {
        return new Promise((resolve, reject) => {
            let src: IDataSource;
            if (typeof (source) === 'string') {
                if (this.project.dataSources && this.project.dataSources.hasOwnProperty(source)) {
                    src = this.project.dataSources[source];
                } else {
                    reject('data source not found');
                    return;
                }
            } else { src = source };

            if (src.handler && this.dataSourceHandlers.hasOwnProperty(src.handler)) {
                this.dataSourceHandlers[src.handler].load(src).then(data => {
                    resolve(data);
                    this.EventBus.$emit('data-' + source, 'loaded');
                }).catch(e => {
                    reject(e);
                });
            }
        });
    }

    /** load all data sources */
    public LoadDataSources() {
        if (this.project.dataSources) {
            for (let ds in this.project.dataSources) {
                let source = this.project.dataSources[ds];
                this.LoadDataSource(source);
            }
        }
    }

}
