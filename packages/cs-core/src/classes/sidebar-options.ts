import { Dashboard } from './dashboard';
export interface ISidebarOptions {
  open?: boolean;
  title?: string;
  component?: any;
  permanent?: boolean;
  persistent?: boolean;
  temporary?: boolean;
  floating?: boolean;
  mini?: boolean;
  clipped?: boolean;
  canpin?: boolean;
  dashboard?: Dashboard;
}
