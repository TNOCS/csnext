import Vue from 'vue';
import Component from 'vue-class-component';
import { ISidebarOptions, IDashboard, MessageBusHandle } from '@csnext/cs-core';
import { Prop, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import './cs-sidebar.css';
import simplebar from 'simplebar-vue';

@Component({
  name: 'cs-sidebar',
  components: { simplebar },
  template: require('./cs-sidebar.html')
} as any)
export class CsSidebar extends Vue {
  public app = AppState.Instance;
  public menu = false;

  @Prop() public sideBar?: ISidebarOptions;
  private dashboardChangedHandle?: MessageBusHandle;

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
    });
  }

  public toggleMini() {
    if (!this.sideBar) { return; }
    Vue.set(this.sideBar, 'mini', !this.sideBar.mini);
  }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.pathLink);
    if (this.$router && d.pathLink && !d.dashboards) {
      this.$router.push(d.pathLink).catch(err => { 
        // console.log(err); 
      });
    }
  }

  public mounted() {
    this.dashboardChangedHandle = AppState.Instance.bus.subscribe('dashboards', (a, e) => {
      if (a === AppState.DASHBOARD_CHANGED) {
        this.$forceUpdate();
      }
    });
  }

  public beforeDestroy() {
    if (this.dashboardChangedHandle) {
      AppState.Instance.bus.unsubscribe(this.dashboardChangedHandle);
    }

  }
}
