<template>
  <v-container fluid class="pa-0 flex-column full-height">
  <template v-if="hasToolbar">      
    <v-toolbar
      v-if="dashboard.options.toolbarOptions"
      :absolute="dashboard.options.toolbarOptions.absolute"
      :prominent="dashboard.options.toolbarOptions.prominent"
      :color="dashboard.options.toolbarOptions.backgroundColor"
      :src="dashboard.options.toolbarOptions.backgroundImage"
      :elevation="dashboard.options.toolbarOptions.elevation"
      :dense="dashboard.options.toolbarOptions.dense"
      :collapse="dashboard.options.toolbarOptions.collapse"
      :flat="dashboard.options.toolbarOptions.flat"
      :outlined="dashboard.options.toolbarOptions.outlined"
    >
      <v-icon
        v-if="dashboard.options.icon && !dashboard.options.toolbarOptions.hideIcon"
        class="pr-3"
        >{{ dashboard.options.icon }}</v-icon
      >
      <v-toolbar-title
        v-if="!dashboard.options.toolbarOptions || !dashboard.options.toolbarOptions.hideTitle"
        >{{ $cs.Translate(dashboard.title) }}</v-toolbar-title
      >
    </v-toolbar>

    <template
      v-if="dashboard.parent && dashboard.parent.options && dashboard.parent.options.toolbarOptions && dashboard.parent.options.toolbarOptions.navigation && dashboard.parent.options.toolbarOptions.navigation === 'stepper-inline'"
    >
      <v-toolbar
        :absolute="dashboard.parent.options.toolbarOptions.absolute"
        :prominent="dashboard.parent.options.toolbarOptions.prominent"
        :color="dashboard.parent.options.toolbarOptions.backgroundColor"
        :elevation="dashboard.parent.options.toolbarOptions.elevation"
        :dense="dashboard.parent.options.toolbarOptions.dense"
        :collapse="dashboard.parent.options.toolbarOptions.collapse"
        :flat="dashboard.parent.options.toolbarOptions.flat"
        :outlined="dashboard.parent.options.toolbarOptions.outlined"
      >
        <v-stepper
          :value="selectedStepper"
          class="dashboard-stepper"
          non-linear
        >
          <v-stepper-header>
            <template v-for="(item, index) in dashboard.parent.dashboards">
              <v-stepper-step
                :key="index"
                :step="index + 1"
                editable
                @click="selectStepperDashboard(item)"
                >{{ $cs.Translate(item.title) }} </v-stepper-step
              ><v-divider></v-divider
            ></template>
          </v-stepper-header>
        </v-stepper>
      </v-toolbar>
    </template>

    <template
      v-if="dashboard.parent && dashboard.parent.options && dashboard.parent.options.toolbarOptions && dashboard.parent.options.toolbarOptions.navigation && dashboard.parent.options.toolbarOptions.navigation !== 'stepper-inline'"
    >
      <v-toolbar
        :absolute="dashboard.parent.options.toolbarOptions.absolute"
        :prominent="dashboard.parent.options.toolbarOptions.prominent"
        :color="dashboard.parent.options.toolbarOptions.backgroundColor"
        :elevation="dashboard.parent.options.toolbarOptions.elevation"
        :dense="dashboard.parent.options.toolbarOptions.dense"
        :collapse="dashboard.parent.options.toolbarOptions.collapse"
        :flat="dashboard.parent.options.toolbarOptions.flat"
        :outlined="dashboard.parent.options.toolbarOptions.outlined"
      >
        <template
          v-if="dashboard.parent.options.toolbarOptions.navigation === 'stepper'"
        >
          <v-stepper
            :value="selectedStepper"
            class="dashboard-stepper"
            non-linear
          >
            <v-stepper-header>
              <template v-for="(item, index) in dashboard.parent.dashboards">
                <v-stepper-step
                  :key="index"
                  :step="index + 1"
                  editable
                  @click="selectStepperDashboard(item)"
                  >{{ $cs.Translate(item.title) }} </v-stepper-step
                ><v-divider></v-divider
              ></template>
            </v-stepper-header>
          </v-stepper>
        </template>
        <template
          v-else-if="dashboard.parent.options.toolbarOptions.navigation=== 'tabs'"
        >
          <v-tabs v-model="selectedTab">
            <v-tab
              v-for="(item, index) in dashboard.parent.dashboards"
              @click="selectStepperDashboard(item)"
              :key="index"
            >
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              {{ $cs.Translate(item.title) }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </template>
  </template>
    <!--  -->
    <component
      v-show="!dashboard._loading"
      :is="component"
      :dashboard="dashboard"
      :id="'dashboard-' + dashboard.id"
      class="align-stretch dashboard-content"
      :class="dashboard.options.class"          
    ></component>
  
</v-container>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";
import {
  IDashboard,
  IWidget,  
  MessageBusService,
  idGenerator,
} from "@csnext/cs-core";

import {
  AppState,
  Logger,
  LayoutManager,
  DashboardManager,
  CsToolbarMenus,
} from "../../";
import { LayoutComponent } from "../../layout/layout-component";

@Component({
  name: "cs-dashboard",  
  components: { CsToolbarMenus }  
})
export default class CsDashboard extends Vue {

    private hasToolbar: boolean = false;

@Prop({ default: null })
  public dashboard?: IDashboard;
  public selectedStepper: number = 1;
  public selectedTab: number = 0;
  public layoutComponent?: LayoutComponent;

  @Watch("dashboard")
  public dashboardChanged(n: IDashboard) {
    this.initDashboard(n);
  }

  @Watch("dashboard.menus")
  public menusChanged() {
    this.$cs.bus.publish("menus", "changed");
  }

  @Watch("dashboard.layout", { immediate: true })
  public layoutChanged() {
    if (!this.dashboard) {
      return;
    }
    this.initDashboard(this.dashboard);
    this.$forceUpdate();
  }

  @Watch("dashboard.widgets", { immediate: true })
  public widgetsChanged(n: IWidget[]) {
    if (n && n.length > 0) {
      for (const w of n) {
        this.initWidget(w);
      }
    }
  }

  public selectStepperDashboard(dashboard: IDashboard) {
    if (this.$router && dashboard.pathLink) {
      this.$router.push(dashboard.pathLink).catch((err) => {});
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
    if (!this.dashboard) {
      return false;
    }
    if (this.dashboard.options && this.dashboard.options.showToolbar) {
      return true;
    }
    if (this.dashboard.parent) {
      if (
        this.dashboard.parent.options &&
        this.dashboard.parent.options.toolbarOptions &&
        this.dashboard.parent.options.toolbarOptions.hide
      ) {
        return false;
      }
    } else {
      if (
        this.dashboard.options &&
        this.dashboard.options.toolbarOptions &&
        !this.dashboard.options.toolbarOptions.hide
      ) {
        return true;
      }
    }
  }

  public denseToolbar() {
    if (!this.dashboard) {
      return false;
    }
    if (
      this.dashboard.options &&
      this.dashboard.options.toolbarOptions &&
      this.dashboard.options.toolbarOptions.dense
    ) {
      return true;
    }
    if (
      this.dashboard.parent &&
      this.dashboard.parent.options &&
      this.dashboard.parent.options.toolbarOptions &&
      this.dashboard.parent.options.toolbarOptions.dense
    ) {
      return true;
    }
  }

  public hideTitle() {
    if (!this.dashboard) {
      return false;
    }
    if (
      this.dashboard.options &&
      this.dashboard.options.toolbarOptions &&
      this.dashboard.options.toolbarOptions.hideTitle
    ) {
      return true;
    }
    if (
      this.dashboard.parent &&
      this.dashboard.parent.options &&
      this.dashboard.parent.options.toolbarOptions &&
      this.dashboard.parent.options.toolbarOptions.hideTitle
    ) {
      return true;
    }
  }

  /** init dashboard: load datasources, init widgets and init manager  */
  public initDashboard(dashboard: IDashboard) {    
    if (dashboard.data) { dashboard.data = {}};
    if (dashboard.showLoadAnimation) {
      dashboard._loading = true;
    }
    if (!dashboard.id) {
      dashboard.id = idGenerator();
    }
    if (!dashboard.events) {
      dashboard.events = new MessageBusService();
    }

    // init sub dashboards
    if (dashboard && dashboard.dashboards) {
      for (const d of dashboard.dashboards) {
        this.initDashboard(d);
      }
    }

    if (dashboard.hideFromNavigation === undefined) {
      dashboard.hideFromNavigation = false;
    }

    if (!dashboard.options) {
      dashboard.options = {};
    }

    if (
      dashboard.parent &&
      dashboard.parent.options &&
      dashboard.parent.options.toolbarOptions &&
      dashboard.parent.options.toolbarOptions.navigation &&
      dashboard.parent.dashboards
    ) {
      this.selectedTab = dashboard.parent.dashboards.findIndex(
        (d) => dashboard.title === d.title
      );
      this.selectedStepper = this.selectedTab + 1;
    }

    if (dashboard.options.info) {
      this.$cs.openInfo(dashboard.options.info);
    } else {
      this.$cs.closeInfo();
    }

    // if this is a main dashboard, set it as active dashboard on appstate
    if (dashboard.isMain) {
      this.$cs.activeDashboard = this.dashboard;
      this.$cs.bus.publish(AppState.DASHBOARD_MAIN, "init", this.dashboard);
      if (
        dashboard.options &&
        dashboard.options.closeRightSidebar &&
        this.$cs.project.rightSidebar
      ) {
        this.$cs.closeRightSidebar();
      }
      this.$cs.updateBreadCrumbs();
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
        DashboardManager.dashboardManagers.hasOwnProperty(dashboard.manager) &&
        typeof DashboardManager.dashboardManagers[dashboard.manager]
          .getInstance === "function"
      ) {
        // instantiate manager
        const man = DashboardManager.dashboardManagers[dashboard.manager];
        if (typeof man.getInstance === "function") {
          dashboard._manager = man.getInstance();
        }
      } else {
        Logger.error(
          "dashboard manager",
          `Dashboard manager ${dashboard.manager} not configured correctly`
        );
      }
    }

    // load default datasource, if configured
    if (dashboard.datasource) {
      this.$cs
        .loadDatasource(dashboard.datasource)
        .then((d) => {
          Vue.nextTick(() => {
            if (!this.dashboard) {
              return;
            }

            this.dashboard.content = d;

            // if dashboard manager availabe, trigger data loaded event
            if (
              this.dashboard._manager &&
              typeof this.dashboard._manager.dataLoaded === "function"
            ) {
              this.dashboard._manager.dataLoaded(d);
            }

            // if dashboard manager availabe, trigger data loaded event
            if (
              this.dashboard._manager &&
              typeof this.dashboard._manager.contentLoaded === "function"
            ) {
              if (!this.dashboard._manager._contentHasBeenLoaded) {
                this.dashboard._manager.contentLoaded(d);
                this.dashboard._manager._contentHasBeenLoaded = true;
              }
            }

            // if there are widgets without dashboards, use dashboard content, note: only works for widgets that are initially defined
            if (this.dashboard.widgets) {
              for (const w of this.dashboard.widgets) {
                if (!w.datasource && this.dashboard && this.dashboard.content) {
                  Vue.set(w, "content", this.dashboard.content);
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
          });
        })
        .catch(() => {
          if (!this.dashboard) {
            return;
          }
          Logger.error(
            "dashboard datasource",
            "error loading datasource " + this.dashboard.datasource
          );
        });
    }

    if (this.dashboard?.options?.toolbarOptions || this.dashboard?.parent?.options?.toolbarOptions) {
        this.hasToolbar = true;
    }
  }

  public created() {
    if (!this.dashboard) {
      return;
    }
    this.initDashboard(this.dashboard);
  }

  public startManager() {
    if (!this.dashboard) {
      return;
    }
    if (this.dashboard && this.dashboard._manager) {
      // start manager
      if (typeof this.dashboard._manager.start === "function") {
        this.dashboard._manager.start(this.dashboard);
      }
    }

    if (
      this.dashboard._manager &&
      typeof this.dashboard._manager.dashboardLoaded === "function"
    ) {
      this.dashboard._manager.dashboardLoaded();
    }
  }

  public beforeMount() {
    this.startManager();
  }

  public stopManager() {
    // call stop function for manager
    if (this.dashboard && this.dashboard._manager) {
      if (typeof this.dashboard._manager.stop === "function") {
        this.dashboard._manager.stop(this.dashboard);
      }
    }
  }

  /** dashboard will be closed. */
  public beforeDestroy() {
    this.stopManager();
  }

  public get component(): Vue {
    if (this.layoutComponent) {
      return this.layoutComponent;
    }
    if (this.dashboard) {
      // use default single layout, if no layout has been specified
      if (!this.dashboard.layout) {
        this.dashboard.layout = "grid";
      }

      // lookup layout manager
      if (LayoutManager.layoutManagers.hasOwnProperty(this.dashboard.layout)) {
        this.layoutComponent =
          LayoutManager.layoutManagers[this.dashboard.layout].component;
      } else {
        Logger.error(
          "dashboard",
          `Layout manager ${this.dashboard.layout} is not available, using grid instead`
        );
        this.layoutComponent = LayoutManager.layoutManagers.grid.component;
      }
      return this.layoutComponent || new Vue();
    }
    return new Vue();
  }
}

</script>

<style lang="css" scoped>


.dashboard-content {
  height: 100% !important;
   /* overflow-y: hidden; */
}

.cs-dashboard {
  height: 100%;
}

.dashboard-toolbar-flex {
  max-height: 100% !important;
  /* align-items: stretch; */
}

.cs-dashboard-col.col {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dashboard-stepper {
  background: transparent !important;
  box-shadow: none !important;
  width: 100%;
}

</style>