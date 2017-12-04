import { Project, Dashboard, Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger, cswidget, guidGenerator, DashboardManager } from '../../index';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'csdashboard',
  template: '<component :is="component" :dashboard="dashboard"></component>',
  props: {
    dashboard: null
  }
} as any)
// tslint:disable-next-line:class-name
export class csdashboard extends Vue {

  public dashboard: Dashboard;
  public app = AppState.Instance;

  public checkWidgetId(widget) {
    if (!widget.id) { widget.id = 'widget-' + guidGenerator(); }
  }

  public created() {
    if (this.dashboard && this.dashboard.widgets) {
      this.dashboard.widgets.forEach(w => {
        w._dashboard = this.dashboard;
        this.checkWidgetId(w);
      });
    }
  }

  public get component(): Vue {
    if (this.dashboard && this.dashboard.manager) {
      if (DashboardManager.dashboardManagers.hasOwnProperty(this.dashboard.manager)) {
        return DashboardManager.dashboardManagers[this.dashboard.manager].component;
      }
    }
    return new Vue();
  }

  // public beforeMount() {
  //   if (!this.app.isInitialized) { this.app.Init(); }
  //   // if (this.dashboard && this.dashboard.manager) {
  //   //     if (this.app.dashboardManagers.hasOwnProperty(this.dashboard.manager)) {
  //   //         this.component = this.app.dashboardManagers[this.dashboard.manager].component;
  //   //     }
  //   // }
  // }

}
