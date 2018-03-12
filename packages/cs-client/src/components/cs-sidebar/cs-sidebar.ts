import Vue from 'vue';
import Component from 'vue-class-component';
import { ISidebarOptions, IDashboard } from '@csnext/cs-core';
import { Prop, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import './cs-sidebar.css';

@Component({
  name: 'cs-sidebar',
  template: require('./cs-sidebar.html')
} as any)
export class CsSidebar extends Vue {
  public app = AppState.Instance;

  @Prop()
  public sideBar?: ISidebarOptions;

  @Watch('sideBar.dashboard')
  public sideBarChanged(n: any, o: any) {
    Vue.nextTick(() => {
      if (this.sideBar && this.sideBar.dashboard && this.sideBar.dashboard.widgets) {
        this.sideBar.dashboard.widgets[0] = n.widgets[0];
      }
      this.$forceUpdate();
    });
  }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.path);
    if (this.$router && d.path && !d.dashboards) { this.$router.push(d.path); }
  }

}
