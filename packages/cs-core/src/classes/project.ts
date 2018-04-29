import {
  AppTheme,
  IHeaderOptions,
  IFooterOptions,
  IDatasource,
  IDashboard,
  ISidebarOptions,
  NavigationOptions
} from './..';
import { IMenu } from './menu';
import * as deepmerge from 'deepmerge';

/** project definition */
export interface IProject {
  id?: string;
  title?: string;
  logo?: string;
  navigation?: NavigationOptions;
  footer?: IFooterOptions;
  datasources?: { [id: string]: IDatasource };
  dashboards?: IDashboard[];
  leftSidebar?: ISidebarOptions;
  rightSidebar?: ISidebarOptions;
  theme?: AppTheme;
  header?: IHeaderOptions;
  notifications?: INotificationOptions;
  menus?: IMenu[];
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
  public dashboards?: IDashboard[] = [];
  public leftSidebar?: ISidebarOptions = {};
  public rightSidebar?: ISidebarOptions = {};
  public theme?: AppTheme;
  public header?: IHeaderOptions;
  public notifications?: INotificationOptions;
  public menus?: IMenu[] = [];

  
}
