import { IMenu } from './menu';

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
  widgetBorder?: string;
}
