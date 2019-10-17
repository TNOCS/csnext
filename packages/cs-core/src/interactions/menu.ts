export interface IMenu {
  id?: string;
  icon?: string;
  title?: string;
  type?: 'icon' | 'text' | 'list' | 'component';
  toggleGroup?: boolean;
  toggleButton?: boolean;
  toggleState?: boolean;
  toggleIcon?: string;
  toggleToolTip?: string;
  textButton?: boolean;
  buttonClass?: string;
  outlined?: boolean;
  enabled?: boolean;
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
