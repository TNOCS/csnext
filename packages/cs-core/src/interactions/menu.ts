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
  action?: (menu: IMenu) => void;
  component?: any;
  data?: any;
}
