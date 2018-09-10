import { WidgetOptions } from '@csnext/cs-core';
import { FlexSize } from './flex-size';
export class FlexWidgetOptions extends WidgetOptions {
  public size?: FlexSize;
  public container?: number;
}
