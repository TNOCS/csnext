import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IDashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import { Logger, CsWidget, AppState, LayoutManager } from '../../';
import './single.css';

@Component({
  name: 'single',
  template: require('./single.html'),
  props: {
    dashboard: null
  }
} as any)
/** Single layout manager. Only shows first widget full screen */
export class Single extends Vue {
  public dashboard?: IDashboard;
  public widgetAvailable = false;
  private widget: IWidget | undefined;

  public created() {
    if (!this.dashboard || !this.dashboard.widgets || this.dashboard.widgets.length === 0) { return; }
    this.widget = this.dashboard.widgets.find(w => !w.hasOwnProperty('sideNav'));
    this.widgetAvailable = false;
  }

}
LayoutManager.add({ id: 'single', name: 'single page', component: Single } as ILayoutManagerConfig);
