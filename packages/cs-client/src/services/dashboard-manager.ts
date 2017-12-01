import { IManagerConfig, Project, IDatasourceHandler, Dashboard, IDatasource, AppTheme, ThemeColors, FooterOptions, NavigationOptions, SidebarOptions } from '@csnext/cs-core';

export class DashboardManager {

    /** Available dashboard managers for layouting */
    public dashboardManagers: { [id: string]: IManagerConfig } = {};

    /** Registration of a new dashboard manager */
    public add(manager: IManagerConfig) {
        this.dashboardManagers[manager.id] = manager;
    }


}