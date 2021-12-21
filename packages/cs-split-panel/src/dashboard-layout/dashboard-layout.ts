import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard } from '@csnext/cs-core';

import './dashboard-layout.css';
import { Prop } from 'vue-property-decorator';
import {
  SplitElement,
  SplitPanelDashboardOptions,
  SplitPanelOptions,
} from '..';

@Component({
  template: require('./dashboard-layout.html'),
  props: {
    dashboard: null,
  },
} as any)
export class DashboardLayout extends Vue {
  public dashboard!: IDashboard;

  @Prop()
  public data?: { dashboard: IDashboard };

  public get options(): SplitPanelDashboardOptions | undefined {
    if (this.data?.dashboard?.options) {
      return this.data?.dashboard?.options;
    }
  }

  public togglePanel(panel: SplitElement) {
    panel.hide = !panel.hide;
    this.data!.dashboard.events?.publish('panel', 'changed', panel);
    this.$forceUpdate();
  }

  public panels: SplitElement[] = [];

  private updatePanels(options: SplitPanelOptions) {
    if (options.elements) {
      for (const el of options.elements) {
        if (el.splitpanel) {
          this.updatePanels(el.splitpanel);
        } else if (el.widgetId) {
          this.panels.push(el);
        } else if (el.dashboardId) {
          this.panels.push(el);
        }
      }
    }
  }

  mounted() {
    if (this.options?.splitpanel) {
      this.updatePanels(this.options.splitpanel);

      console.log(this.data?.dashboard.widgets);
    }
    console.log('init dashboard layout component');
  }
}
