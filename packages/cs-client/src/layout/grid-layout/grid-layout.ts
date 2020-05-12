import { LayoutComponent } from './../layout-component';
import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './grid-layout.css';

@Component({
  template: require('./grid-layout.html'),
  props: {
    dashboard: null
  }
} as any)
export class GridLayout extends LayoutComponent {
  public static id = 'grid';
  public dashboard?: IDashboard;
}

LayoutManager.addLayoutManager(GridLayout);

export function GridDashboard(definition?: IDashboard): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: GridLayout.id, options: { } }, ...definition };
  } else {
    return {};
  }
}

