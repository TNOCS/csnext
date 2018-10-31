import { WidgetOptions } from '@csnext/cs-core';

export class VegaWidgetOptions extends WidgetOptions {
  /** enable HTML syntax in source, default true */
  public type?: 'vega' | 'vega-lite';
}
