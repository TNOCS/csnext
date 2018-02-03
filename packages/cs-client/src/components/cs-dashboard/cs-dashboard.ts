import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Project, IDashboard, IWidget } from '@csnext/cs-core';
import { AppState, Logger, guidGenerator, LayoutManager, DashboardManager } from '../../';

@Component({
  name: 'cs-dashboard',
  template: '<component :is="component" :dashboard="dashboard"></component>',
  props: {
    dashboard: null
  }
} as any)
export class CsDashboard extends Vue {

  public dashboard?: IDashboard;
  public app = AppState.Instance;

  @Watch('dashboard.widgets')
  public widgetsChanged(n: IWidget[], old: any) {
    n.forEach(w => {
      this.initWidget(w);
    });
  }

  public checkWidgetId(widget: IWidget) {
    if (!widget.id) { widget.id = 'widget-' + guidGenerator(); }
  }

  public initWidget(widget: IWidget) {
    // init widget
    if (widget._initalized) { return; }
    if (!widget.options) { widget.options = {}; }
    if (!widget.data) { widget.data = {}; }
    widget._dashboard = this.dashboard;
    this.checkWidgetId(widget);

    // load datasource, if configured
    if (widget.datasource !== undefined) {
      this.app.loadDatasource(widget.datasource).then(d => {
        this.$nextTick(() => {
          Vue.set(widget, 'content', d);
        });
      });
    } else if (this.dashboard && this.dashboard.content) {
      // w.content = this.dashboard.content;
    }
    widget._initalized = true;
  }

  /** init dashboard: load datasources, init widgets and init manager  */
  public initDashboard(dashboard: IDashboard) {

    // if this is a main dashboard, set it as active dashboard on appstate
    if (dashboard.isMain) {
      this.app.activeDashboard = this.dashboard;
      this.app.bus.publish('dashboard.main', 'init', this.dashboard);
    }

    // init widgets
    if (this.dashboard && this.dashboard.widgets) {
      this.dashboard.widgets.forEach(w => {
        this.initWidget(w);
      });
    }

    // init dashboard manager
    if (dashboard.manager) {
      if (DashboardManager.dashboardManagers.hasOwnProperty(dashboard.manager)) {
        // instantiate manager
        dashboard._manager = DashboardManager.dashboardManagers[dashboard.manager].getInstance();
        if (dashboard._manager) {
          // start manager
          dashboard._manager.start(dashboard);
        }
      }
    }

    // load default datasource, if configured
    if (dashboard.datasource) {
      this.app.loadDatasource(dashboard.datasource).catch(e => {
        if (!this.dashboard) { return; }
        Logger.error('dashboard datasource', 'error loading datasource ' + this.dashboard.datasource);
      }).then(d => {
        if (!this.dashboard) { return; }
        this.dashboard.content = d;

        // if dashboard manager availabe, trigger data loaded event
        if (this.dashboard._manager && this.dashboard._manager.dataLoaded) {
          this.dashboard._manager.dataLoaded(d);
        }
      });
    }
  }

  public created() {
    if (!this.dashboard) { return; }
    this.initDashboard(this.dashboard);
  }

  public get component(): Vue {
    if (this.dashboard) {
      // use default single layout, if no layout has been specified
      if (!this.dashboard.layout) { this.dashboard.layout = 'single'; }

      // lookup layout manager
      if (LayoutManager.layoutManagers.hasOwnProperty(this.dashboard.layout)) {
        return LayoutManager.layoutManagers[this.dashboard.layout].component;
      }
    }
    return new Vue();
  }
}
