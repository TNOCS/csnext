import { csdashboard } from './../components/csdashboard/csdashboard';
import Vue from 'vue';
// import { Single, IManagerConfig } from './../index';
import * as cs from '@csnext/cs-core';
import { Single, Grid, Logger, IManagerConfig, WebRequestDataSourceHandler } from '../index';

export class AppState {

    public project: cs.Project = {};
    public dashboardManagers: { [id: string]: IManagerConfig } = {};
    public dataSourceHandlers: { [id: string]: cs.IDataSourceHandler } = {};
    public data: { [id: string] : any} = {};
    public L = Logger.Instance;
    public EventBus = new Vue();
    public sideBarComponents: any[] = [];
    private static _instance: AppState;
    public isInitialized = false;

    constructor() {
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public Init() {
        this.L.info('appstate', 'Init AppState');
        this.AddManager(<IManagerConfig>{ id: 'single', name: 'single page', component: Single });
        this.AddManager(<IManagerConfig>{ id: 'grid', name: 'grid page', component: Grid });
        this.AddDataSourceHandler(new WebRequestDataSourceHandler());
        this.isInitialized = true;
        this.EventBus.$emit('init');
    }

    public AddManager(manager: IManagerConfig) {
        this.dashboardManagers[manager.id] = manager;
    }

    public AddDataSourceHandler(handler: cs.IDataSourceHandler) {
        this.dataSourceHandlers[handler.id] = handler;
    }

    public AddDashboard(elementId: string, dashboard: cs.Dashboard) {
        let dash = csdashboard;
    }

    public LoadDataSource(source: cs.IDataSource | string): Promise<any> {
        return new Promise((resolve, reject) => {
            let src: cs.IDataSource;
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
    public LoadDataSources() {
        if (this.project.dataSources) {
            for (let ds in this.project.dataSources) {
                let source = this.project.dataSources[ds];
                this.LoadDataSource(source);
            }
        }
    }

}
