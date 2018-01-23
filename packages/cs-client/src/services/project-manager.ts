import { Project } from '@csnext/cs-core';
import { DashboardManager } from './dashboard-manager';
import { LayoutManager } from './layout-manager';
import { DatasourceManager } from './datasource-manager';

export class ProjectManager {
  public datasourceManager: DatasourceManager;
  public layoutManager: LayoutManager;
  public dashboardManager: DashboardManager;

  constructor(private project: Project = {}) {
    if (!project.datasources) { project.datasources = {}; }
    this.datasourceManager = new DatasourceManager(project.datasources);
    this.dashboardManager = new DashboardManager();
    this.layoutManager = new LayoutManager();
  }
}
