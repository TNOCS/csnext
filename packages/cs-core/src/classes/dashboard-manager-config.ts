import { IDashboard } from '../';

export interface IDashboardManagerConfig {
  id: string;
  name: string;
  getInstance: () => IDashboardManager;
}

export interface IDashboardManager {
  start: (dashboard: IDashboard) => any;
  stop: (dashboard: IDashboard) => any;
  dataLoaded?: (d: any) => void;
}
