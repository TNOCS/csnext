import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import {
  IDashboard,
  IWidget,
  guidGenerator,
  MessageBusService
} from '@csnext/cs-core';
import './cs-dashboard.css';
import {
  AppState,
  Logger,
  LayoutManager,
  DashboardManager
} from '../../';

@Component({
  name: 'cs-dashboard',
  template: require('./cs-dashboard.html'),
  props: {
    dashboard: null
  }
} as any)
export class CsDashboard extends Vue {
  public dashboard?: IDashboard;
  public selectedStepper: number = 1;
  public selectedTab: number = 0;

  @Watch('dashboard')
  public dashboardChanged(n: IDashboard) {
    this.initDashboard(n);
  }

  @Watch('dashboard.menus')
  public menusChanged() {
    this.$cs.bus.publish('menus', 'changed');
  }

  @Watch('dashboard.widgets', { immediate: true })
  public widgetsChanged(n: IWidget[]) {
    if (n && n.length > 0) {
      for (const w of n) {
        this.initWidget(w);
      }
    }
  }

  public selectStepperDashboard(dashboard: IDashboard) {
    if (this.$router && dashboard.pathLink) {
      this.$router.push(dashboard.pathLink).catch(err => { });
    }
  }

  public checkWidgetId(widget: IWidget) {
    if (widget && !widget.id) {
      widget.id = 'widget-' + guidGenerator();
    }
  }

  public initWidget(widget: IWidget) {
    if (this.dashboard && !widget._dashboard) {
      widget._dashboard = this.dashboard;
      if (this.dashboard._manager) {
        widget._manager = this.dashboard._manager;
      }
    }
  }

  public showToolbar() {
    if (!this.dashboard) { return false; }
    if (this.dashboard.options && this.dashboard.options.showToolbar) { return true; }
    if (this.dashboard.parent) {
      if (this.dashboard.parent.options && this.dashboard.parent.options.toolbarOptions && this.dashboard.parent.options.toolbarOptions.hide) { return false; }
    } else {
      if (this.dashboard.options && this.dashboard.options.toolbarOptions && !this.dashboard.options.toolbarOptions.hide) { return true; }
    }


  }

  public denseToolbar() {

    if (!this.dashboard) { return false; }
    if (this.dashboard.options && this.dashboard.options.toolbarOptions && this.dashboard.options.toolbarOptions.dense) { return true; }
    if (this.dashboard.parent && this.dashboard.parent.options && this.dashboard.parent.options.toolbarOptions && this.dashboard.parent.options.toolbarOptions.dense) { return true; }
  }

  public hideTitle() {
    if (!this.dashboard) { return false; }
    if (this.dashboard.options && this.dashboard.options.toolbarOptions && this.dashboard.options.toolbarOptions.hideTitle) { return true; }
    if (this.dashboard.parent && this.dashboard.parent.options && this.dashboard.parent.options.toolbarOptions && this.dashboard.parent.options.toolbarOptions.hideTitle) { return true; }
  }

  /** init dashboard: load datasources, init widgets and init manager  */
  public initDashboard(dashboard: IDashboard) {
    if (dashboard.showLoadAnimation) {
      dashboard._loading = true;
    }
    if (!dashboard.id) {
      dashboard.id = guidGenerator();
    }
    if (!dashboard.events) {
      dashboard.events = new MessageBusService();
    }

    // init sub dashboards
    if (this.dashboard && this.dashboard.dashboards) {
      for (const d of this.dashboard.dashboards) {
        this.initDashboard(d);
      }
    }

    if (dashboard.hideFromNavigation === undefined) {
      dashboard.hideFromNavigation = false;
    }

    if (!dashboard.options) {
      dashboard.options = {};
    }

    if (dashboard.parent && dashboard.parent.options && dashboard.parent.options.toolbarOptions && dashboard.parent.options.toolbarOptions.navigation && dashboard.parent.dashboards) {
      this.selectedTab = dashboard.parent.dashboards.findIndex(d => dashboard.title === d.title);
      this.selectedStepper = this.selectedTab + 1;
    }

    if (dashboard.options.info) {
      this.$cs.OpenInfo(dashboard.options.info);
    } else {
      this.$cs.CloseInfo();
    }

    // if this is a main dashboard, set it as active dashboard on appstate
    if (dashboard.isMain) {
      this.$cs.activeDashboard = this.dashboard;
      this.$cs.bus.publish(AppState.DASHBOARD_MAIN, 'init', this.dashboard);
      if (dashboard.options && dashboard.options.closeRightSidebar && this.$cs.project.rightSidebar) {
        this.$cs.project.rightSidebar.open = false;
      }
      this.$cs.UpdateBreadCrumbs();
      this.$forceUpdate();
    }

    // init widgets
    if (this.dashboard && this.dashboard.widgets) {
      for (const w of this.dashboard.widgets) {
        this.initWidget(w);
      }
    }

    // init dashboard manager
    if (dashboard.manager && !dashboard._manager) {
      if (
        DashboardManager.dashboardManagers.hasOwnProperty(dashboard.manager) && typeof (DashboardManager.dashboardManagers[dashboard.manager].getInstance) === 'function'
      ) {
        // instantiate manager
        const man = DashboardManager.dashboardManagers[dashboard.manager];
        if (typeof (man.getInstance) === 'function') {
          dashboard._manager = man.getInstance();
        }
      } else {
        Logger.error('dashboard manager', `Dashboard manager ${dashboard.manager} not configured correctly`);
      }
    }

    // load default datasource, if configured
    if (dashboard.datasource) {
      this.$cs
        .loadDatasource(dashboard.datasource)
        .then(d => {
          if (!this.dashboard) {
            return;
          }
          this.dashboard.content = d;

          // if dashboard manager availabe, trigger data loaded event
          // TODO: more or less legacy, check if still used by projects, other wise use content loaded, simular to widgets
          if (this.dashboard._manager && typeof (this.dashboard._manager.dataLoaded) === 'function') {
            this.dashboard._manager.dataLoaded(d);
          }

          // if dashboard manager availabe, trigger data loaded event
          if (this.dashboard._manager && typeof (this.dashboard._manager.contentLoaded) === 'function') {
            this.dashboard._manager.contentLoaded(d);
          }

          // if there are widgets without dashboards, use dashboard content, note: only works for widgets that are initially defined
          if (this.dashboard.widgets) {
            for (const w of this.dashboard.widgets) {
              if (!w.datasource && this.dashboard && this.dashboard.content) {
                Vue.set(w, 'content', this.dashboard.content);
              }

              // if a component is available with a dataSourceUpdated function, call it
              if (w._component && w._component.dataSourceUpdated) {
                w._component.dataSourceUpdated(d);
              }

              if (w._component && w._component.contentLoaded) {
                w._component.contentLoaded(d);
              }
            }
          }
        })
        .catch(() => {
          if (!this.dashboard) {
            return;
          }
          Logger.error(
            'dashboard datasource',
            'error loading datasource ' + this.dashboard.datasource
          );
        });
    }
  }

  public created() {
    if (!this.dashboard) {
      return;
    }
    this.initDashboard(this.dashboard);

  }

  public beforeMount() {
    if (!this.dashboard) { return; }
    if (this.dashboard && this.dashboard._manager) {
      // start manager
      if (typeof (this.dashboard._manager.start) === 'function') {
        this.dashboard._manager.start(this.dashboard);
      }
    }

    if (this.dashboard._manager && typeof (this.dashboard._manager.dashboardLoaded) === 'function') {
      this.dashboard._manager.dashboardLoaded();
    }
  };

  /** dashboard will be closed. */
  public beforeDestroy() {
    // call stop function for manager
    if (this.dashboard && this.dashboard._manager) {
      if (typeof (this.dashboard._manager.stop) === 'function') {
        this.dashboard._manager.stop(this.dashboard);
      }
    }
  }

  public get component(): Vue {
    if (this.dashboard) {
      // use default single layout, if no layout has been specified
      if (!this.dashboard.layout) {
        this.dashboard.layout = 'grid';
      }

      // lookup layout manager
      if (LayoutManager.layoutManagers.hasOwnProperty(this.dashboard.layout)) {
        return LayoutManager.layoutManagers[this.dashboard.layout].component;
      } else {
        Logger.error('dashboard', `Layout manager ${this.dashboard.layout} is not available, using grid instead`);
        return LayoutManager.layoutManagers.grid.component;
      }
    }
    return new Vue();
  }

}
