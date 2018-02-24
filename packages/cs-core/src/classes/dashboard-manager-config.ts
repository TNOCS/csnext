import { IWidget } from './widget';
import { IDashboard } from './dashboard';

export interface IDashboardManagerConfig {
  id: string;
  name: string;
  getInstance: () => IDashboardManager;
}

/** Interface for dashboard manager */
export interface IDashboardManager {
  start: (dashboard: IDashboard) => void;
  stop: (dashboard: IDashboard) => void;
  dashboardLoaded?: (dashboard: IDashboard) => void;
  editDashboard?: (dashboard: IDashboard) => void;
  dataLoaded?: (d: any) => void;
  removeWidget?: (widget: IWidget) => void;
}
