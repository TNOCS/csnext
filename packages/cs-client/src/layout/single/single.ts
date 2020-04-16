import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IDashboard, ILayoutManagerConfig, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../../';
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
  public static id = 'single';
  public dashboard?: IDashboard;
  public widgetAvailable = false;
  public widget?: IWidget;

  public created() {
    if (!this.dashboard || !this.dashboard.widgets || this.dashboard.widgets.length === 0) { return; }
    this.widget = this.dashboard.widgets.find(w => !w.hasOwnProperty('sideNav'));
    this.widgetAvailable = false;
  }

}
LayoutManager.add({ id: Single.id, name: 'single page', component: Single } as ILayoutManagerConfig);

export function SingleDashboard(definition?: IDashboard): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: Single.id, options: { } }, ...definition };
  } else {
    return {};
  }
}
