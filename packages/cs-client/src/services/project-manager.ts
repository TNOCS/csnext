import { Project } from '@csnext/cs-core';
import { DashboardManager } from './dashboard-manager';
import { DatasourceManager } from './datasource-manager';

export class ProjectManager {
  public datasourceManager: DatasourceManager;
  public dashboardManager: DashboardManager;

  constructor(private project: Project = {}) {
    if (!project.datasources) { project.datasources = {}; }
    this.datasourceManager = new DatasourceManager(project.datasources);
    this.dashboardManager = new DashboardManager();
  }
}
