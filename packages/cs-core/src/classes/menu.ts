export interface IMenu {
  id: string;
  icon?: string;
  title?: string;
  enabled?: boolean;
  visible?: boolean;
  items?: IMenu[];
  action?: (menu: IMenu) => void;
  component?: any;
  data?: any;
}
