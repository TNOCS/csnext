import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger, cswidget, AppState, DashboardManager } from '../../index';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'single',
  template: require('./single.html'),
  props: {
    dashboard: null
  }
} as any)
/** Single layout manager. Only shows first widget full screen */
export class Single extends Vue {
  public dashboard: Dashboard;
  private widget: Widget | undefined;

  public created() {
    if (!this.dashboard.widgets || this.dashboard.widgets.length === 0) { return; }
    this.widget = this.dashboard.widgets.find(w => !w.hasOwnProperty('sideNav'));
  }
}
DashboardManager.add({ id: 'single', name: 'single page', component: Single } as IManagerConfig);
