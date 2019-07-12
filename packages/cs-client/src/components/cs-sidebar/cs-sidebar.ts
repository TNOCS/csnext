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
  public menu = false;

  @Prop() public sideBar?: ISidebarOptions;

  @Watch('sideBar.dashboard')
  public sideBarChanged(n: any, o: any) {
    Vue.nextTick(() => {
      if (this.sideBar) {
        if (this.sideBar.dashboard && this.sideBar.dashboard.widgets) {
          this.sideBar.dashboard.widgets[0] = n.widgets[0];
        }

        if (!this.sideBar.width) {
          this.sideBar.width = 300;
        }
      }

      this.$forceUpdate();
    });
  }

  public toggleMini() {
    if (!this.sideBar) { return; }
    Vue.set(this.sideBar, 'mini', !this.sideBar.mini);
  }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.path);
    if (this.$router && d.path && !d.dashboards) {
      this.$router.push(d.path);
    }
  }
}
