import { IDashboardManager } from '..';

export interface IDashboardManagerConfig {
  id?: string;
  getInstance?: () => IDashboardManager;
}