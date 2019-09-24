import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import {
  IDashboard,
  IWidget,
  guidGenerator,
  MessageBusService,
  isFunction
} from '@csnext/cs-core';
import './cs-dashboard.css';
import {
  CsApp,
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
      this.$router.push(dashboard.pathLink).catch(err => {});
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
    if (this.dashboard.options && this.dashboard.options.toolbar) { return true; }
    if (this.dashboard.parent && this.dashboard.parent.options && this.dashboard.parent.options.toolbar && this.dashboard.parent.options.toolbar.navigation) { return true; }
  }

  public denseToolbar() {
    if (!this.dashboard) { return false; }
    if (this.dashboard.options && this.dashboard.options.toolbar && this.dashboard.options.toolbar.dense) { return true; }
    if (this.dashboard.parent && this.dashboard.parent.options && this.dashboard.parent.options.toolbar && this.dashboard.parent.options.toolbar.dense) { return true; }
  }

  public hideTitle() {
    if (!this.dashboard) { return false; }
    if (this.dashboard.options && this.dashboard.options.toolbar && this.dashboard.options.toolbar.hideTitle) { return true; }
    if (this.dashboard.parent && this.dashboard.parent.options && this.dashboard.parent.options.toolbar && this.dashboard.parent.options.toolbar.hideTitle) { return true; }
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
    if (this.dashboard && this.dashboard.dashboards && this.dashboard.dashboards) {
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

    if (dashboard.parent && dashboard.parent.options && dashboard.parent.options.toolbar && dashboard.parent.options.toolbar.navigation && dashboard.parent.dashboards) {
      this.selectedTab = dashboard.parent.dashboards.findIndex(d => dashboard.title === d.title);
      this.selectedStepper = this.selectedTab + 1;
    }

    if (this.$cs.project.menus && dashboard.isMain) {
      const dashboardEditButton = this.$cs.project.menus.find(
        mi => mi.id === CsApp.DASHBOARD_EDIT_ID
      );
      if (dashboardEditButton) {
        dashboardEditButton.visible =
          dashboardEditButton && dashboard.options.editButton;
      }
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
        DashboardManager.dashboardManagers.hasOwnProperty(dashboard.manager)
      ) {
        // instantiate manager
        dashboard._manager = DashboardManager.dashboardManagers[
          dashboard.manager
        ].getInstance();
        if (dashboard._manager) {
          // start manager
          dashboard._manager.start(dashboard);
        }
      }
    }
    if (dashboard._manager && dashboard._manager.dashboardLoaded) {
      dashboard._manager.dashboardLoaded(dashboard);
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

          // if there are widgets without dashboards, use dashboard content, note: only works for widgets that are initially defined
          if (this.dashboard.widgets) {
            this.dashboard.widgets.forEach(w => {
              if (!w.datasource && this.dashboard && this.dashboard.content) {
                Vue.set(w, 'content', this.dashboard.content);
              }

              // if a component is available with a dataSourceUpdated function, call it
              if (w._component && w._component.dataSourceUpdated) {
                w._component.dataSourceUpdated(d);
              }
            });
          }

          // if dashboard manager availabe, trigger data loaded event
          if (this.dashboard._manager && typeof this.dashboard._manager.dataLoaded === 'function') {
            this.dashboard._manager.dataLoaded(d);
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

  /** dashboard will be closed. */
  public beforeDestroy() {
    // call stop function for manager
    if (this.dashboard && this.dashboard._manager) {
      this.dashboard._manager.stop(this.dashboard);
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
