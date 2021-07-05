import Vue from 'vue';
import Component from 'vue-class-component';
import { ISidebarOptions, IDashboard, MessageBusHandle } from '@csnext/cs-core';
import { Prop, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import './cs-sidebar.css';
import simplebar from 'simplebar-vue';


@Component({
  name: 'cs-sidebar',
  components: { simplebar,  },
  template: require('./cs-sidebar.html')
} as any)
export class CsSidebar extends Vue {
  public app = AppState.Instance;
  public menu = false;

  public dashboard?: IDashboard | null = null;

  @Prop() public sideBar?: ISidebarOptions;
  private dashboardChangedHandle?: MessageBusHandle;

  @Watch('sideBar.dashboard')
  public sideBarChanged(n: IDashboard, o: any) {
    
      if (this.sideBar?.dashboard) {       
        this.dashboard = null;
        Vue.nextTick(()=> {
          this.dashboard = this.sideBar?.dashboard;
        })

        if (!this.sideBar.width) {
          this.sideBar.width = 300;
        }
      }
    
  }

  @Watch('sideBar.canResize')
  public setResize(enabled: true) {
    if (enabled) {
      this.setBorderWidth();
      this.setEvents();
    } else {

    }

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

  @Watch('sideBar.width')
  public get sidebarWidth(): string {
    if ($cs.isMobile && this.sideBar) {
      return '100%';
    }
    if (this.sideBar?.width) {
      return this.sideBar.width.toString();
    }
    return '300px';
  }

  public mounted() {
    this.dashboardChangedHandle = AppState.Instance.bus.subscribe('dashboards', (a, e) => {
      if (a === AppState.DASHBOARD_CHANGED) {
        this.$forceUpdate();
      }
    });
    if (this.sideBar && this.sideBar.canResize) {
      this.setResize(true);
    }
  }

  public beforeDestroy() {
    if (this.dashboardChangedHandle) {
      AppState.Instance.bus.unsubscribe(this.dashboardChangedHandle);
    }
  }

  private setBorderWidth() {
    const i = (this.$el as HTMLElement).querySelector(
      '.v-navigation-drawer__border'
    ) as any;

    if (i && i.style) {

      i.style.width = '12px';
      i.style.cursor = 'ew-resize';
    }
  }

  public closeSidebar() {
    $cs.closeRightSidebar();
  }

  private setEvents() {
    const minSize = 12;
    const el = this.$el as HTMLElement;
    const drawerBorder = el.querySelector('.v-navigation-drawer__border');
    const vm = this;
    const direction = el.classList.contains('v-navigation-drawer--right')
      ? 'right'
      : 'left';

    function resize(e) {
      document.body.style.cursor = 'ew-resize';
      const f =
        direction === 'right'
          ? document.body.scrollWidth - e.clientX
          : e.clientX;
      el.style.width = f + 'px';
    }

    const downEvent = (e) => {
      if (e.offsetX < minSize) {
        el.style.transition = 'initial';
        document.addEventListener('mousemove', resize, false);
      }
    };

    if (drawerBorder) {
      drawerBorder.addEventListener('mousedown', downEvent, false);
    }

    document.addEventListener(
      'mouseup',
      () => {
        el.style.transition = '';
        if (this.sideBar) {
          this.sideBar.width = parseInt(el.style.width, 0);
        }
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', resize, false);
      },
      false
    );
  }
}
