import { IWidgetOptions } from './widget-options';

export interface IGridWidgetOptions extends IWidgetOptions {
  columnStart?: number;
  columnEnd?: number;
  rowStart?: number;
  rowEnd?: number;

}
