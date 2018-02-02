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

  constructor() {
    super();
    // this.dashboard = new Dashboard();
  }

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

  public created() {
    if (!this.dashboard) { return; }

    // if this is a main dashboard, set it as active dashboard on appstate
    if (this.dashboard.isMain) {
      this.app.activeDashboard = this.dashboard;
      this.app.bus.publish('dashboard.main', 'init', this.dashboard);
    }

    // load default datasource, if configured
    if (this.dashboard.datasource) {
      this.app.loadDatasource(this.dashboard.datasource).catch(e => {
        if (!this.dashboard) { return; }
        Logger.error('dashboard datasource', 'error loading datasource ' + this.dashboard.datasource);
      }).then(d => {
        if (!this.dashboard) { return; }
        this.dashboard.content = d;

        // if dashboard manager availabe, trigger data loaded event
        if (this.dashboard._manager && this.dashboard._manager.dataLoaded) {
          this.dashboard._manager.dataLoaded(d);
        }
        // this.$nextTick(() => {
        //   Vue.set(this.dashboard, 'content', d);
        // });
      });
    }

    // init widgets
    if (this.dashboard && this.dashboard.widgets) {
      this.dashboard.widgets.forEach(w => {
        this.initWidget(w);
      });
    }

    // init dashboard manager
    if (this.dashboard.manager) {
      if (DashboardManager.dashboardManagers.hasOwnProperty(this.dashboard.manager)) {
        this.dashboard._manager = DashboardManager.dashboardManagers[this.dashboard.manager].getInstance();
        if (this.dashboard._manager) {
          this.dashboard._manager.start(this.dashboard);
        }
      }
    }
  }

  public get component(): Vue {
    if (this.dashboard) {
      if (!this.dashboard.layout) { this.dashboard.layout = 'single'; }
      if (LayoutManager.layoutManagers.hasOwnProperty(this.dashboard.layout)) {
        return LayoutManager.layoutManagers[this.dashboard.layout].component;
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
