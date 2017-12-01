import { Project } from '@csnext/cs-core';
import { DashboardManager } from './dashboard-manager';
import { DatasourceManager } from './datasource-manager';

export class ProjectManager {

    public datasourceManager: DatasourceManager;
    public dashboardManager: DashboardManager;

    constructor(private project: Project) {
        if (!project.dataSources) { project.dataSources = {} };
        this.datasourceManager = new DatasourceManager(project.dataSources);
        this.dashboardManager = new DashboardManager();
    }
}