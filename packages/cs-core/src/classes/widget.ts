import { IMessageBusService } from './../utils/message-bus/message-bus-service';
import { EditorSchema } from './editor-schema';
import { IDashboard } from '../index';
import { WidgetOptions } from './widget-options';
import { IProject } from './project';

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
  options?: WidgetOptions;
  editorWidget?: IWidget;
  Schema?: EditorSchema;
  events?: IMessageBusService;
  _dashboard?: IDashboard;
  _initalized?: boolean;
  _style?: any;
  _project?: IProject;
  _size?: IWidgetSize;
}

export interface IWidgetSize {
  width: number;
  height: number;
}
