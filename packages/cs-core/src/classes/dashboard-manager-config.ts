import { Dashboard } from '../';

export interface IDashboardManagerConfig {
  id: string;
  name: string;
  getInstance: () => IDashboardManager;
}

export interface IDashboardManager {
  start: (dashboard: Dashboard) => any;
  stop: (dashboard: Dashboard) => any;
  dataLoaded?: (d: any) => void;
}
