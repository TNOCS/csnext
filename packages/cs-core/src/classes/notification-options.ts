import { INotification } from './notification';
/** options for notifications in project */
export interface INotificationOptions {
  /** show/hide notifictions */
  enabled?: boolean;
  /** list of existing notifications */
  items?: INotification[];
  listStyle?: 'popup' | 'right-sidebar';
}
