import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger, cswidget, AppState, DashboardManager } from '../../index';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

import './grid.css';
@Component({
  template: require('./grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class Grid extends Vue {
  public dashboard: Dashboard;
}

DashboardManager.add(({ id: 'grid', name: 'grid page', component: Grid } as IManagerConfig));
