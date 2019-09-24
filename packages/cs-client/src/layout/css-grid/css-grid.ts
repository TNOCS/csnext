import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard,
  ILayoutManagerConfig,
  CssGridDashboardOptions,
  CssGridWidgetOptions,
  IWidget
} from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './css-grid.css';

@Component({
  template: require('./css-grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class CssGrid extends Vue {
  public dashboard?: IDashboard;
  public static id = 'css-grid';

  public gridStyle() {
    if (!this.dashboard) {
      return;
    }
    if (!this.dashboard.options) {
      this.dashboard.options = {};
    }
    const options = this.dashboard.options as CssGridDashboardOptions;
    
    const style = { 'grid-gap': options.gap, 'column-gap': options.columnGap, 'row-gap': options.rowGap } as any;
    if (!options.template) {
      // style['grid-template-columns'] = 'repeat(auto-fill, minmax(150px,1fr))';
      // style['grid-template-rows'] = 'repeat(auto-fill, minmax(150px,1fr))';
    }
    return style;
  }

  public gridWidgetStyle(widget: IWidget) {
    const style: any = {};
    const options = widget.options as CssGridWidgetOptions;
    if (!options) return style;
    if (options.area) {
      style['grid-area'] = options.area;
    }
    if (options.columnStart) {
      style['grid-column-start'] = options.columnStart;
    }
    if (options.columnEnd) {
      style['grid-column-end'] = options.columnEnd;
    }
    if (options.rowStart) {
      style['grid-row-start'] = options.rowStart;
    }
    if (options.rowEnd) {
      style['grid-row-end'] = options.rowEnd;
    }
    return style;
  }
}

LayoutManager.add({
  id: CssGrid.id,
  name: 'css-grid page',
  component: CssGrid
} as ILayoutManagerConfig);
