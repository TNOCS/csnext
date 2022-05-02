import { IWidget } from '..';
import { IDashboard } from '../dashboard/dashboard';

export interface IMenu {
  id?: string;
  icon?: string;
  title?: string;
  type?: 'icon' | 'text' | 'icon-text' | 'fab';
  toggleGroup?: boolean;
  toggleButton?: boolean;
  toggleState?: boolean;
  toggleIcon?: string;
  toggleToolTip?: string;  
  buttonClass?: string;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
  canToggle?: boolean;
  hide?: boolean;
  color?: string;
  toolTip?: string;
  method?: string;
  items?: IMenu[];
  isActive?: boolean | Function;
  action?: (menu: IMenu, dashboard?: IDashboard, options?: any) => void;
  component?: any;
  plugin?: any;
  widget?: IWidget;
  closeOnContentClick?: boolean;
  data?: any;
  location?: 'sidebar' | 'header' | 'footer' | 'floating';
  _dashboard?: IDashboard;
}
