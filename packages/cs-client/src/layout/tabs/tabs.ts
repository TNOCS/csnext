import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, TabDashboardOptions, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './tabs.css';
import { Prop } from 'vue-property-decorator';

@Component({
  template: require('./tabs.html'),
  props: {
    dashboard: null
  }
} as any)
export class TabsLayout extends Vue {
  public static id = 'tabs';
  public dashboard?: IDashboard;  
  public tab = null;

  public get options(): TabDashboardOptions {
    if (this.dashboard && this.dashboard.options) {
      return this.dashboard.options as TabDashboardOptions;
    }
    return {};
  }
}

LayoutManager.addLayoutManager(TabsLayout);

export function TabDashboard(definition?: IDashboard, options?: TabDashboardOptions): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: TabsLayout.id, options }, ...definition };
  } else {
    return {};
  }
}
