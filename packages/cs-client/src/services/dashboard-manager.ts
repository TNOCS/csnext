import { Logger } from './logger';
import { IDashboardManagerConfig } from '@csnext/cs-core';

export class DashboardManager {
  /** Available dashboard managers for layouting */
  public static dashboardManagers: { [id: string]: IDashboardManagerConfig } =
    {};

  public static add(manager: IDashboardManagerConfig) {
    const managers = DashboardManager.dashboardManagers;
    if (manager.id && managers && !managers.hasOwnProperty(manager.id)) {
      Logger.info('dashboard manager', 'added ' + manager.id);
      DashboardManager.dashboardManagers[manager.id] = manager;
    }
  }

  /** Registration of a new dashboard manager */
  public static addDashboardManager(comp: any, id?: string) {
    if (!id && comp.id) {
      id = comp.id;
    }
    if (id) {
      const manager: IDashboardManagerConfig = {
        id,
        getInstance: () => Object.create(comp.prototype),
      };
      DashboardManager.add(manager);
    }
  }
}
