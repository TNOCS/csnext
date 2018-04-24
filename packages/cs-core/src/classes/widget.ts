import { IMessageBusService } from './../utils/message-bus/message-bus-service';
import { IMenu } from './menu';
import { EditorSchema } from './editor-schema';
import { IDashboard } from '../index';
import { IWidgetOptions } from './widget-options';

export enum WidgetType {
  component,
  html
}
export interface IWidget {
  id?: string;
  title?: string;
  type?: WidgetType;
  reference?: string;
  component?: any;
  content?: any;
  datasource?: string;
  data?: any;
  options?: IWidgetOptions;
  editorWidget?: IWidget;
  Schema?: EditorSchema;
  events?: IMessageBusService;
  _dashboard?: IDashboard;
  _initalized?: boolean;
  _style?: any;
}
