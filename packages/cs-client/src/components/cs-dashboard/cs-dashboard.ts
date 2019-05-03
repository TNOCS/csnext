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
  public app = AppState.Instance;

  @Watch('dashboard')
  public dashboardChanged(n: IDashboard) {
    this.initDashboard(n);
  }

  @Watch('dashboard.menus')
  public menusChanged() {
    this.app.bus.publish('menus', 'changed');
  }

  @Watch('dashboard.widgets', { immediate: true })
  public widgetsChanged(n: IWidget[]) {
    if (n && n.length > 0) {
      n.forEach(w => {
        this.initWidget(w);
      });
    }
  }

  public checkWidgetId(widget: IWidget) {
    if (widget && !widget.id) {
      widget.id = 'widget-' + guidGenerator();
    }
  }

  public initWidget(widget: IWidget) {
    // init widget
    if (!widget) {
      return;
    }
    if (widget._initalized) {
      return;
    }

    if (typeof widget.component === 'string') {
      // var classNameString = 'MyClass';
      // tslint:disable-next-line:no-eval
      widget.component = widget.component;
    }

    if (!widget.events) {
      widget.events = new MessageBusService();
    }
    if (!widget.options) {
      widget.options = {};
    }
    if (!widget.data) {
      widget.data = {};
    }
    if (this.dashboard) {
      widget._dashboard = this.dashboard;
      if (this.dashboard._manager) {
        widget._manager = this.dashboard._manager;
      }
    }
    widget._project = AppState.Instance.project;
    this.checkWidgetId(widget);
    this.checkDefaultWidgetOptions(widget);

    // load datasource, if configured
    if (widget.datasource !== undefined) {
      // widget.content = {};
      this.app.loadDatasource(widget.datasource).then(d => {
        this.setWidgetContent(widget, d);
      });
    } else if (this.dashboard && this.dashboard.content) {
      this.setWidgetContent(widget, this.dashboard.content);
    }
    widget._initalized = true;
  }

  public setWidgetContent(widget: IWidget, content: any) {
    Vue.set(widget, 'content', content);
    if (widget._component && widget._component.dataLoaded) {
      widget.component.dataLoaded(content);
    }
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
    if (dashboard.hideFromNavigation === undefined) {
      dashboard.hideFromNavigation = false;
    }

    if (!dashboard.options) {
      dashboard.options = {};
    }
    // if (dashboard.options) {
    //   dashboard.options._dashboard = dashboard;
    // }

    if (this.app.project.menus && dashboard.isMain) {
      const dashboardEditButton = this.app.project.menus.find(
        mi => mi.id === CsApp.DASHBOARD_EDIT_ID
      );
      if (dashboardEditButton) {
        dashboardEditButton.visible =
          dashboardEditButton && dashboard.options.EditButton;
      }
    }
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
      this.app
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

  private checkDefaultWidgetOptions(widget: IWidget) {
    if (
      !widget.options ||
      !widget._dashboard ||
      !widget._dashboard.defaultWidgetOptions
    ) {
      return;
    }
    if (widget._dashboard && widget._dashboard.defaultWidgetOptions) {
      for (const key in widget._dashboard.defaultWidgetOptions) {
        if (!widget.options.hasOwnProperty(key)) {
          widget.options[key] = widget._dashboard.defaultWidgetOptions[key];
        }
      }
    }
  }
}
