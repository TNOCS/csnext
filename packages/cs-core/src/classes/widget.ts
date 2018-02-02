import { EditorSchema } from './editor-schema';
import { IDashboard } from '../index';

export enum WidgetType {
  component,
  html
}

export interface IWidgetOptions {
  datasource?: string;
  card?: boolean;
  class?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  background?: boolean;
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
  Schema?: EditorSchema;
  _dashboard?: IDashboard;
  _initalized?: boolean;
  _style?: any;
}
