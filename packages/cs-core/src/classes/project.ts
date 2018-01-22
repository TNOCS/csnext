import { IFooterOptions } from './footer-options';
import { IDatasource, Dashboard } from '../index';
import { NavigationOptions } from './..';
import { ISidebarOptions } from './..';
import { AppTheme } from './apptheme';
import { IHeaderOptions } from './header-options';

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
}
