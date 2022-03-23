import { DocDatasource } from './../../datasources/doc-datasource';
import { DashboardManagerBase, HtmlWidget } from "@csnext/cs-client";
import { IDashboard, IWidget } from "@csnext/cs-core";
import search from "./search.vue";

export class SearchManager extends DashboardManagerBase {
  public static id = "search-manager";

  constructor() {
    super();
  }

  public get source(): DocDatasource | undefined {
    if (this.dashboard?.content) {
      return this.dashboard.content as DocDatasource;
    }
  }

  public start(dashboard: IDashboard) {
    super.start(dashboard);
  }

  public stop() {
    if (!this.source) {
      return;
    }
  }

  public async contentLoaded() {
    if (!this.source || !this.dashboard) {
      return;
    }
    // alert('start search manager');
    let widgets: IWidget[] = [
      {
        component: search,
        id: "graph-elements-list",
        title: "Search",
        datasource: this.dashboard.datasource,
      },
    ];

    if (this.source?.searchPlugins) {
      for (const plugin of this.source.searchPlugins) {
        if (plugin.component) {
          widgets.push({
            component: plugin.component,
            id: plugin.id,
            title: plugin.title,
            datasource: this.dashboard.datasource,
            data: {
              plugin: plugin,
            },
          });
        }
      }
    }

    this.dashboard.widgets = widgets;
  }
}
