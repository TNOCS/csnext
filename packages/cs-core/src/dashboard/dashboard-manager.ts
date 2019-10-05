import { IWidget, IDashboard } from './..';
/** Interface for dashboard manager */
export interface IDashboardManager {
    start?: (dashboard: IDashboard) => void;
    stop?: (dashboard: IDashboard) => void;
    dashboardLoaded?: () => void;
    contentLoaded?: (d: any) => void;
    editDashboard?: (dashboard: IDashboard) => void;
    dataLoaded?: (d: any) => void;
    removeWidget?: (widget: IWidget) => void;
}
