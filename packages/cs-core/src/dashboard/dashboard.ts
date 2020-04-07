import { IFooterOptions, IDashboardManager, IWidget, WidgetOptions, ISidebarOptions, IDashboardOptions, IMessageBusService, IMenu, Info } from '../';

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

  // if specified this url will be opened, instead of a dashboard
  url?: string;

  // manager id that is responsible for managing dashboard
  manager?: string;

  // active dashboard manager (if set in manager)
  // tslint:disable-next-line:variable-name
  _manager?: IDashboardManager;

  options?: IDashboardOptions;

  // list of widgets
  widgets?: IWidget[];
  active?: boolean;

  icon?: string;

  badgeType?: 'none' | 'icon' | 'text';

  badgeColor?: string;

  badgeText?: string;

  badgeIcon?: string;

  // id of default datasource
  datasource?: string;

  // if datasource is set, result will be available in content
  content?: any;

  // generic data field for passing dashboard data
  data?: any;

  // default options for all widgets
  defaultWidgetOptions?: WidgetOptions;

  // options for left sidebar
  leftSidebar?: ISidebarOptions;

  // options for right sidebar
  rightSidebar?: ISidebarOptions;

  footer?: IFooterOptions;

  /** dashboard specific sidebars */
  sidebars?: { [key: string]: IDashboard };

  // optional list of sub dashboards
  dashboards?: IDashboard[];

  // parent dashboard, if this is a child dashboard
  parent?: IDashboard;

  // enabled for main dashboard, disabled if dashboards are used for left/right panels
  isMain?: boolean;

  // event bus for widget specific events. e.g. resize
  events?: IMessageBusService;

  // menus only visible for this dashboard
  menus?: IMenu[];

  component?: any;

  /** Background information description. Only available in UI if used in combination with cs-info component from @csnext/cs-markdown */
  info?: Info;

  // if true, won't be visible in navigation
  hideFromNavigation?: boolean;

  hide?: boolean;

  showLoadAnimation?: boolean;
  _loading?: boolean;
}
