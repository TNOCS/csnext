import { WidgetOptions } from './../widget/widget-options';

export class CssGridWidgetOptions extends WidgetOptions {
    public columnStart?: number;
    public columnEnd?: number;
    public rowStart?: number;
    public rowEnd?: number;
    public area?: string;
  }