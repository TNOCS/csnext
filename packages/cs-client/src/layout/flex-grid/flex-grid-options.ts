import { IWidget, BaseDashboardOptions } from '@csnext/cs-core';

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
