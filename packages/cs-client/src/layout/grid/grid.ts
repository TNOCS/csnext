import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './grid.css';
@Component({
  template: require('./grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class Grid extends Vue {
  public dashboard?: Dashboard;
}

LayoutManager.add(({ id: 'grid', name: 'grid page', component: Grid } as ILayoutManagerConfig));
