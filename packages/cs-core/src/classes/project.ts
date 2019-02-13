import {
  AppTheme,
  IHeaderOptions,
  IFooterOptions,
  IDatasource,
  IDashboard,
  ISidebarOptions,
  NavigationOptions,
  AppStateBase,
  ILanguageOptions
} from './..';
import { IMenu } from './menu';
import { INotificationOptions } from './notification-options';

/** project definition */
export interface IProject {
  id?: string;
  title?: string;
  logo?: string;
  navigation?: NavigationOptions;
  footer?: IFooterOptions;
  datasources?: { [id: string]: IDatasource | any };
  dashboards?: IDashboard[];
  leftSidebar?: ISidebarOptions;
  rightSidebar?: ISidebarOptions;
  theme?: AppTheme;
  header?: IHeaderOptions;
  notifications?: INotificationOptions;
  menus?: IMenu[];
  languages?: ILanguageOptions;
  data?: any;
  useSocket?: boolean;
  socketServerUrl?: string;
  _appState?: AppStateBase;
  init?();
}