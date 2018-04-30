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
}

LayoutManager.add({
  id: 'grid',
  name: 'grid page',
  component: Grid
} as ILayoutManagerConfig);
