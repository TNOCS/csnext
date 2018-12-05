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
export class Tabs extends Vue {
  public dashboard?: IDashboard;
}

LayoutManager.add({
  id: 'tabs',
  name: 'tabs layout',
  component: Tabs
} as ILayoutManagerConfig);
