import { IDashboardManagerConfig } from '@csnext/cs-core';

// TODO Is this the correct name, since it only stores a reference to existing dashboard managers, and doesn't do any management.
export class DashboardManager {
  // TODO Make private (only reference is in the csdashboard.ts)
  /** Available dashboard managers for layouting */
  public static dashboardManagers: { [id: string]: IDashboardManagerConfig } = {};

  /** Registration of a new dashboard manager */
  public static add(manager: IDashboardManagerConfig) {
    DashboardManager.dashboardManagers[manager.id] = manager;
  }
}
