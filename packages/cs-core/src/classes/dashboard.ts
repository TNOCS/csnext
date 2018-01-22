import { IDashboardOptions } from './dashboard-options';
import { ISidebarOptions } from './sidebar-options';
import { IWidget, IWidgetOptions } from './widget';
import { Page } from './page';
import { IDashboardManager } from '../index';

export class Dashboard {
  // dashboard id
  public id?: string;

  // router path
  public path?: string;

  // dashboard title
  public title?: string;

  // manager that is responsible for layout
  public layout?: string;

  // manager id that is responsible for managing dashboard
  public manager?: string;

  // active dashboard manager (if set in manager)
  // tslint:disable-next-line:variable-name
  public _manager?: IDashboardManager;

  public options?: any; // IDashboardOptions;

  // list of widgets
  public widgets?: IWidget[] = [];
  public active?: boolean;

  public icon?: string;

  // allow left & right swipe gestures to switch between dashboards
  public touchGesturesEnabled?: boolean = false;

  // id of default datasource
  public datasource?: string;

  // if datasource is set, result will be available in content
  public content?: any;

  // generic data field for passing dashboard data
  public data?: any;

  public defaultWidgetOptions?: IWidgetOptions;

  // options for left sidebar
  public leftSidebar?: ISidebarOptions = {};

  // optional list of sub dashboards
  public dashboards?: Dashboard[];

  // parent dashboard, if this is a child dashboard
  public parent?: Dashboard;

  // enabled for main dashboard, disabled if dashboards are used for left/right panels
  public isMain?: boolean;

}
