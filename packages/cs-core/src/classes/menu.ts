export interface IMenu {
  id: string;
  icon?: string;
  title?: string;
  enabled?: boolean;
  visible?: boolean;
  action?: (menu: IMenu) => void;
}
