import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './grid-layout.css';

@Component({
  template: require('./grid-layout.html'),
  props: {
    dashboard: null
  }
} as any)
export class GridLayout extends Vue {
  public dashboard?: IDashboard;
  public static id = 'grid';
}

LayoutManager.addLayoutManager(GridLayout);

