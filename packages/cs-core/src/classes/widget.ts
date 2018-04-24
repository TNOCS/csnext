import { IWidgetOptions } from "./../../dist/classes/widget.d";
import { IMessageBusService } from "./../utils/message-bus/message-bus-service";
import { IMenu } from "./menu";
import { EditorSchema } from "./editor-schema";
import { IDashboard } from "../index";

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
  margin?: number;
  x?: number;
  y?: number;
  background?: boolean;
  canRemove?: boolean;
  canEdit?: boolean;
  menus?: IMenu[];
}

export interface IGridWidgetOptions extends IWidgetOptions {
  columnStart?: number;
  columnEnd?: number;
  rowStart?: number;
  rowEnd?: number;

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
