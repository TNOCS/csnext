/** notification object */
export interface INotification {
  id?: string;
  type?: string;
  title?: string;
  text?: string;
  remember?: boolean;
  created?: Date;
  priority?: number;
  isRead?: boolean;
  actionTitle?: string;
  // tslint:disable-next-line:variable-name
  _visible?: boolean;
  timeout?: number;
  icon?: string;
  clickCallback?: () => {};
}
