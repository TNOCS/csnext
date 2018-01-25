import { IProject, INotificationOptions } from '@csnext/cs-core';
import { DashboardManager } from './dashboard-manager';
import { LayoutManager } from './layout-manager';
import { DatasourceManager } from './datasource-manager';

export class ProjectManager {
  public datasourceManager: DatasourceManager;
  public layoutManager: LayoutManager;
  public dashboardManager: DashboardManager;

  constructor(private project: IProject = {}) {
    if (!project.datasources) { project.datasources = {}; }
    Object.assign(project.notifications, { enabled: false, items: [], listStyle: 'popup' } as INotificationOptions);
    this.datasourceManager = new DatasourceManager(project.datasources);
    this.dashboardManager = new DashboardManager();
    this.layoutManager = new LayoutManager();
  }
}
