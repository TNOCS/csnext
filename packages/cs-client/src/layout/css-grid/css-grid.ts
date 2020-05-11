import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard,
  ILayoutManagerConfig,
  CssGridDashboardOptions,
  CssGridWidgetOptions,
  IWidget,
  guidGenerator
} from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './css-grid.css';
import './css-grid-templates.css';
import { LayoutComponent } from '../layout-component';

@Component({
  template: require('./css-grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class CssGrid extends LayoutComponent {
  public static id = 'css-grid';
  public dashboard?: IDashboard;

  public get options(): CssGridDashboardOptions {
    if (this.dashboard && this.dashboard.options) { return this.dashboard.options as CssGridDashboardOptions; }
    return {};
  }

  constructor() {
    super();
    if (this.options.template && !this.options.class) {
      this.options.class = this.options.template;
    }
  }

  public gridStyle() {
    const style = { 'grid-gap': this.options.gap, 'column-gap': this.options.columnGap, 'row-gap': this.options.rowGap } as any;
    // style['grid-template-columns'] = 'repeat(auto-fill, minmax(150px,1fr))';
    // style['grid-template-rows'] = 'repeat(auto-fill, minmax(150px,1fr))';
    return style;
  }

  public gridWidgetStyle(widget: IWidget) {
    const style: any = {};
    const options = widget.options as CssGridWidgetOptions;
    if (!options) { return style; }
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

export function CssGridDashboard(definition?: IDashboard, options?: CssGridDashboardOptions): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: CssGrid.id, options }, ...definition };
  } else {
    return {};
  }
}
