import { IWidget, IDashboard } from './..';

export interface ISidebarOptions {
  open?: boolean;
  title?: string;
  titleClose?: string;
  component?: any;
  right?: boolean;
  permanent?: boolean;
  persistent?: boolean;
  temporary?: boolean;
  floating?: boolean;
  mini?: boolean;
  clipped?: boolean;
  canPin?: boolean;
  dashboard?: IDashboard;
  widget?: IWidget;
  canMinifiy?: boolean;
  width?: number;
  visible?: boolean;
}
