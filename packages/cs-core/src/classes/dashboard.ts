import { IDashboardManager, Page, IWidget, IWidgetOptions, ISidebarOptions, IDashboardOptions, IMessageBusService } from '../';
import { IFooterOptions } from './footer-options';

export interface IDashboard {
  // dashboard id
  id?: string;

  // router path
  path?: string;

  // use this path for the actual link, you might require it if you are using params in your path. if not set, it will use path
  pathLink?: string;

  // dashboard title
  title?: string;

  // manager that is responsible for layout
  layout?: string;

  // manager id that is responsible for managing dashboard
  manager?: string;

  // active dashboard manager (if set in manager)
  // tslint:disable-next-line:variable-name
  _manager?: IDashboardManager;

  options?: any; // IDashboardOptions;

  // list of widgets
  widgets?: IWidget[];
  active?: boolean;

  icon?: string;
  // allow left & right swipe gestures to switch between dashboards
  touchGesturesEnabled?: boolean;

  // id of default datasource
  datasource?: string;

  // if datasource is set, result will be available in content
  content?: any;

  // generic data field for passing dashboard data
  data?: any;

  defaultWidgetOptions?: IWidgetOptions;

  // options for left sidebar
  leftSidebar?: ISidebarOptions;

  // options for right sidebar
  rightSidebar?: ISidebarOptions;

  footer?: IFooterOptions;

  // optional list of sub dashboards
  dashboards?: IDashboard[];

  // parent dashboard, if this is a child dashboard
  parent?: IDashboard;

  // enabled for main dashboard, disabled if dashboards are used for left/right panels
  isMain?: boolean;

  events?: IMessageBusService;

  component?: any;

  // if true, won't be visible in navigation
  hideFromNavigation?: boolean;

}
