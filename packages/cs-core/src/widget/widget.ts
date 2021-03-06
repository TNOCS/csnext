import { WidgetOptions, IMessageBusService, IDashboard, IDashboardManager, IProject } from '..';
import { IWidgetSize } from './widget-size';

export interface IWidget {
  id?: string;
  title?: string;
  widgets?: IWidget[];
  reference?: string;
  component?: any;
  content?: any;
  datasource?: string;
  data?: any;
  options?: WidgetOptions;
  editorWidget?: IWidget;
  events?: IMessageBusService;
  dashboard?: IDashboard;
  _dashboard?: IDashboard;
  _manager?: IDashboardManager;
  _initalized?: boolean;
  _style?: any;
  _project?: IProject;
  _size?: IWidgetSize;
  _component?: any;
}


