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
  canMinify?: boolean;
  width?: number;
  visible?: boolean;
  footer?: ISidebarFooterOptions;
  sidebars?: { [key: string]: IDashboard };
}

export interface ISidebarFooterOptions {
  icon?: string;
  tooltip?: string;
  title?: string;
}