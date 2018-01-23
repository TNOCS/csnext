import { AppTheme, IHeaderOptions, IFooterOptions, IDatasource, Dashboard, ISidebarOptions, NavigationOptions } from './..';

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
