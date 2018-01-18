import { FooterOptions } from './footeroptions';
import { IDatasource, Dashboard } from '../index';
import { NavigationOptions } from './..';
import { SidebarOptions } from './..';
import { AppTheme } from './apptheme';

export interface IProject {
  id?: string;
  title?: string;
  logo?: string;
  navigation?: NavigationOptions;
  footer?: FooterOptions;
  datasources?: { [id: string]: IDatasource };
  dashboards?: Dashboard[];
  leftSidebar?: SidebarOptions;
  rightSidebar?: SidebarOptions;
  theme?: AppTheme;
}

export class Project implements IProject {
  public id?: string;
  public title?: string;
  public logo?: string;
  public navigation?: NavigationOptions = {};
  public footer?: FooterOptions = {};
  public datasources?: { [id: string]: IDatasource } = {};
  public dashboards?: Dashboard[] = [];
  public leftSidebar?: SidebarOptions = {};
  public rightSidebar?: SidebarOptions = {};
  public theme?: AppTheme;
}
