import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard,
  ILayoutManagerConfig,
  IWidget,
  IGridDashboardOptions,
  IWidgetOptions
} from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './flex-grid.css';

@Component({
  template: require('./flex-grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class FlexGrid extends Vue {
  public dashboard!: IDashboard;

  get backgroundWidgets() {
    if (!this.dashboard || !this.dashboard.widgets) { return null; }
    return this.dashboard.widgets.filter(
      w => w.options && w.options.background
    );
  }

  get widgets() {
    if (!this.dashboard || !this.dashboard.widgets) { return null; }
    return this.dashboard.widgets.filter(
      w => !w.options || !w.options.background
    );
  }

  public flexClasses(widget: IWidget) {
    return 'md2 sm6 xs12';
  }

  public flexStyles(widget: IWidget) {
    return { padding: '5px' };
  }
}

export enum FlexSize {}

export interface IFlexWidgetOptions extends IWidgetOptions {
  size?: string;
}

LayoutManager.add({
  id: 'flex-grid',
  name: 'flex-grid page',
  component: FlexGrid
} as ILayoutManagerConfig);
