import { IWidget, IDashboard } from './../index';

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
  canPin?: boolean;
  dashboard?: IDashboard;
  widget?: IWidget;
}
