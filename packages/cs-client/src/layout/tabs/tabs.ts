import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './tabs.css';

@Component({
  template: require('./tabs.html'),
  props: {
    dashboard: null
  }
} as any)
export class TabsLayout extends Vue {
  public dashboard?: IDashboard;
  public static id = 'tabs';
  public tab = null;

}




LayoutManager.addLayoutManager(TabsLayout);
