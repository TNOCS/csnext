import { IWidget, IWidgetOptions, BaseDashboardOptions } from '@csnext/cs-core';
import { FlexSize } from './flex-size';

export interface IFlexGridContainerOptions {
  height?: string;
  maxHeight?: string;
}

export interface IFlexGridContainer {
  id: number;
  options?: IFlexGridContainerOptions;
  widgets: IWidget[];
}

export class FlexGridOptions extends BaseDashboardOptions {
  public direction?: 'row' | 'column';
  public containers?: IFlexGridContainerOptions[];
}

export interface IFlexWidgetOptions extends IWidgetOptions {
  size?: FlexSize;
  container?: number;
}
