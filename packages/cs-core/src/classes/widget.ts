import { Dashboard } from '../index';

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
  datasource?: string;
  data?: any;
  options?: IWidgetOptions;
  _dashboard?: Dashboard;

}
