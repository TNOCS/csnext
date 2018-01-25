import { IFooterOptions } from './footer-options';
import { IDatasource, Dashboard } from '../index';
import { NavigationOptions } from './..';
import { ISidebarOptions } from './..';
import { AppTheme } from './apptheme';
import { IHeaderOptions } from './header-options';

/** project definition */
export interface IProject {
  id?: string;
  title?: string;
  logo?: string;
  navigation?: NavigationOptions;
  footer?: IFooterOptions;
  datasources?: { [id: string]: IDatasource };
  dashboards?: Dashboard[];
  leftSidebar?: ISidebarOptions;
  rightSidebar?: ISidebarOptions;
  theme?: AppTheme;
  header?: IHeaderOptions;
  notifications?: INotificationOptions;
}

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

/** options for notifications in project */
export interface INotificationOptions {
  /** show/hide notifictions */
  enabled?: boolean;
  /** list of existing notifications */
  items?: INotification[];
  listStyle?: 'popup' | 'right-sidebar';
}

export class Project implements IProject {
  public id?: string;
  public navigation?: NavigationOptions = {};
  public footer?: IFooterOptions = {};
  public datasources?: { [id: string]: IDatasource } = {};
  public dashboards?: Dashboard[] = [];
  public leftSidebar?: ISidebarOptions = {};
  public rightSidebar?: ISidebarOptions = {};
  public theme?: AppTheme;
  public header?: IHeaderOptions;
  public notifications?: INotificationOptions;
}
