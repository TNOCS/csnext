import { Project, IDatasourceHandler, Dashboard, IDatasource, AppTheme, ThemeColors, FooterOptions, NavigationOptions, SidebarOptions, ILayoutManagerConfig } from '@csnext/cs-core';

// TODO Is this the correct name, since it only stores a reference to existing dashboard managers, and doesn't do any management.
export class LayoutManager {
  // TODO Make private (only reference is in the csdashboard.ts)
  /** Available dashboard managers for layouting */
  public static layoutManagers: { [id: string]: ILayoutManagerConfig } = {};

  /** Registration of a new dashboard manager */
  public static add(manager: ILayoutManagerConfig) {
    LayoutManager.layoutManagers[manager.id] = manager;
  }
}
