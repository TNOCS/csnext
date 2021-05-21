import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, TabDashboardOptions, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './tabs.css';
import { Watch } from 'vue-property-decorator';

@Component({
  template: require('./tabs.html'),
  props: {
    dashboard: null
  }
} as any)
export class TabsLayout extends Vue {
  public static id = 'tabs';
  public dashboard?: IDashboard;  
  public tab : number | null = null;

  @Watch('tab')
  public updateTab() {
    if (this.dashboard?.id && this.options?.storeActive) {
      if (this.tab === null) {
        $cs.removeRouteQueryParam(this.dashboard.id);
      } else {
        $cs.addRouteQueryParam(this.dashboard.id, this.tab.toString())
      }
    }

  }

  public get options(): TabDashboardOptions {
    if (this.dashboard && this.dashboard.options) {
      return this.dashboard.options as TabDashboardOptions;
    }
    return {};
  }

  public mounted() {
    if (this.dashboard?.id && this.options?.storeActive) {
      this.tab = parseInt($cs.getRouteQuery(this.dashboard.id) ?? "0");

      // alert('store active');
    }
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
