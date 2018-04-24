import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, ILayoutManagerConfig, IWidget, IGridDashboardOptions } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './grid.css';

@Component({
  template: require('./grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class Grid extends Vue {
  public dashboard?: IDashboard;

  public gridStyle() {
    if (!this.dashboard) { return; }
    let style = {} as any;
    const options = this.dashboard.options as IGridDashboardOptions;

    return { 'grid-template-columns': '300px 100px 100px 100px'};
  }

  public gridWidgetClass(widget: IWidget) {
    let style: any = {};
    const options = widget.options as IGridWidgetOptions;
    if (options.columnStart) { style['grid-column-start'] = options.columnStart; }
    if (options.columnEnd) { style['grid-column-end'] = options.columnEnd; }
    if (options.rowStart) { style['grid-row-start'] = options.rowStart; }
    if (options.rowEnd) { style['grid-row-end'] = options.rowEnd; }
    return style;
  }
}

LayoutManager.add({
  id: 'grid',
  name: 'grid page',
  component: Grid
} as ILayoutManagerConfig);
