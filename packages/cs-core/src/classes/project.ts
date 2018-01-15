import { FooterOptions } from './footeroptions';
import { IDatasource, Dashboard, IServiceConfig } from '../index';
import { NavigationOptions } from './navigationoptions';
import { SidebarOptions } from './sidebaroptions';
import { AppTheme } from './apptheme';

export class Project {
  public id?: string;
  public title?: string;
  public logo?: string;
  public navigation?: NavigationOptions = {};
  public footer?: FooterOptions = {};
  public datasources?: { [id: string]: IDatasource } = {};
  public dashboards?: Dashboard[] = [];
  public services?: { [id: string]: IServiceConfig } = {};
  public leftSidebar?: SidebarOptions = {};
  public rightSidebar?: SidebarOptions = {};
  public theme?: AppTheme;
}
