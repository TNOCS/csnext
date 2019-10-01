export interface IMenu {
  id: string;
  icon?: string;
  title?: string;
  toggleGroup?: boolean;
  toggleButton?: boolean;
  toggleState?: boolean;
  toggleIcon?: string;
  toggleToolTip?: string;
  textButton?: boolean;  
  buttonClass?: string;
  outlined?: boolean;
  enabled?: boolean;
  visible?: boolean;
  toolTip?: string;
  items?: IMenu[];
  action?: (menu: IMenu) => void;
  component?: any;
  data?: any;
}
