import { IDashboardOptions, IWidget, IWidgetOptions } from '@csnext/cs-core';
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

export interface IFlexGridOptions extends IDashboardOptions {
  direction: 'row' | 'column';
  containers?: IFlexGridContainerOptions[];
}

export interface IFlexWidgetOptions extends IWidgetOptions {
  size?: FlexSize;
  container?: number;
}
