import {
  DashboardManagerBase,
  HtmlWidget,
  TabsLayout,
} from "@csnext/cs-client";
import { IDashboard, IDashboardOptions, IWidget } from "@csnext/cs-core";
import {
  FeatureType,
  GraphElement,
  GraphPreset,
  IGraphFilter,
  PropertyType,
  PropertyValueType,
} from "@csnext/cs-data";
import { DragLayout, DragLayoutOptions } from "@csnext/cs-drag-grid";
import { DataGridOptions, DocDatasource, GridView } from "../";
import { CsTimeline, TimelineWidgetOptions } from "@csnext/cs-timeline";
import {
  ChartOptions,
  ChartEditor,
  CrossChart,
  HeatMap,
  Histogram,
  IChartType,
  RowChart,
  ScatterPlot,
  Stat,
  TimeChart,
  TimeRange,
  CrossFilterDatasource,
} from "@csnext/cs-crossfilter";
import { CrossGraphOptions } from "./cross-graph-options";
import { GraphCrossFilter } from "./graph-cross-filter";
import ElementDataGrid from "../components/data-grid/element-data-grid.vue";
import GraphMap from "../components/graph/graph-map.vue";
import { GraphMapOptions } from "../components/graph/graph-map-options";

export class CrossGraphManager extends DashboardManagerBase {
  public static id = "cross-graph-manager";

  public source?: DocDatasource;
  public chartDashboard?: IDashboard;
  public chartTypes: { [id: string]: IChartType } = {};
  public static filterProp = "dc_filter";
  public filter?: GraphCrossFilter;
  public featureType?: FeatureType;
  // public chartManagerId = "chart-dashboard-manager"

  public start(dashboard: IDashboard) {
    this.dashboard = dashboard;
    this.initChartTypes();
    this.initDashboard();
    this.initWidgets();
  }

  public initDashboard() {
    this.dashboard.options = {
      flat: true,
      raised: false,
      splitpanel: {
        direction: "horizontal",
        elements: [
          {
            size: 50,
            widgetId: "views",
          },
          {
            size: 50,
            splitpanel: {
              direction: "vertical",
              elements: [
                {
                  size: 70,
                  splitpanel: {
                    direction: "horizontal",
                    elements: [
                      {
                        size: 70,
                        widgetId: "graph-map",
                      },
                      {
                        size: 30,                        
                        widgetId: "graph-list",
                        hide: true
                      },
                    ],
                  },
                },
                {
                  size: 30,
                  widgetId: "timeline",
                  hide: false,
                },
              ],
            },
          },
        ],
      },
    } as IDashboardOptions;
  }

  public initWidgets() {
    let dragOptions = new DragLayoutOptions(({
      DragEnabled: false,
      ResizeEnabled: true,
      IsMirrored: false,
      ColNum: 12,
      RowHeight: 150,
      AutoSize: true,
      VerticalCompact: true,
      HorizontalMargin: 10,
      VerticalMargin: 10,
    } as unknown) as DragLayoutOptions);
    this.dashboard.widgets = [
      {
        component: GraphMap,
        title: "map",
        id: "graph-map",
        options: {
          area: "left",
          flat: true,
          class: "data-map-container",
          token:
            "pk.eyJ1IjoiZGFteWxlbiIsImEiOiJjazFqN2ljNzYwMTJlM2xucGV3enJvYjE4In0.kArBU3x7YIy3DhfyQhtSGw",
          mbOptions: {
            style: "mapbox://styles/mapbox/satellite-streets-v10",
            center: [-117.69298, 38.83915],
            zoom: 4.9,
          } as any,
          showDraw: true,
          showRuler: true,
          showGrid: true,
          showFeatureDetails: false,
          showStyles: true,
          showGeocoder: false,
          showPelias: true,
          showTraffic: false,
          showCursorLocationInfo: "DMS",
          mouseEventsOnIcon: false,
          showLayers: true,
          showLegend: true,
          showCompass: true,
          peliasOptions: {
            accessToken:
              "XiNgsCXbBqV4CPtilm1VkAyATed84mT7CLHXLZH1vx6LITo0XqAx1NiVATKHAfWz",
          },
          filter: this.dashboard.data?.filter,
        } as GraphMapOptions,
      },

      {
        component: ElementDataGrid,
        datasource: this.dashboard.datasource,
        id: "graph-list",
        options: {
          baseType: "project",
          defaultView: GridView.table,
          groupId: "classId",
          canDelete: false,
          hideViewSwitch: true,
          syncMode: "follow",
          canGraph: false,
          filter: this.dashboard.data?.filter,
          canAdd: false,
          hideFilter: true,
          selectedHeaders: [
            {
              key: "name",
            },
          ],
        } as DataGridOptions,
      },
      {
        component: CsTimeline,
        id: "timeline",
        datasource: "isrdTime",
        options: {
          logSource: "calendar",
          // class: 'widget-full-height',
          showToolbar: false,
          showFocusTime: true,
          showGroupSelectionButton: true,
          toggleSmallButton: true,
          showFitButton: true,
          timelineOptions: { height: "100%", locale: "nl" },
        } as TimelineWidgetOptions,
      },

      {
        id: "views",
        options: {
          class: "simple-widget",
          raised: false,
          elevation: 0,
          flat: true,
        },
        title: "Graph",
        dashboard: {
          layout: TabsLayout.id,
          options: {},
          widgets: [
            {
              id: "overview",
              title: "charts",
              options: {
                class: "operation-chart-dashboard",
              },
              dashboard: {
                id: "chart-dashboard",
                layout: DragLayout.id,
                options: dragOptions,
                // manager: CrossDashboardManager.id,
                datasource: this.dashboard.datasource,
                widgets: [
                  // {
                  //     component: HtmlWidget,
                  //     data: 'test',
                  //     options: {
                  //         class: 'test-widget',
                  //         width: 4,
                  //         height: 3
                  //     }
                  // },
                  // {
                  //     component: HtmlWidget,
                  //     data: 'test2',
                  //     options: {
                  //         class: 'test-widget',
                  //         width: 4,
                  //         height: 2
                  //     }
                  // }
                ],
              },
            } as IWidget,
          ],
        },
      },
    ];
    this.chartDashboard = this.findDashboard("chart-dashboard");
  }

  public initChartWidgets() {
    console.log("init charts");

    // const layer = await this.source.initLayer(this.graph.map, this.key, type);

    // this.source.updateLayer(type, true);

    // const chartDashboard = this.findDashboard("chart-dashboard", this.dashboard) as IDashboard;
    // console.log(this.chartManagerId);
    // console.log(chartDashboard);
    if (this.chartDashboard) {
      // const chartManager = chartDashboard._manager as CrossDashboardManager;
      // chartManager.source = this.mapSource;
      // this.mapSource ?.updateCrossfilter(this.graph.._source ?._data);

      if (this.crossDashboardOptions.charts) {
        for (const chart of this.crossDashboardOptions.charts) {
          this.updateWidget(
            this.createWidget({
              ...{
                _source: this.source,

                _manager: (this as unknown) as any,
              },
              ...chart,
            })
          );
        }
      }
      // chartManager.source!.activeResource = layer._source! as any;
    }
  }

  private getMonday(d: Date): Date {
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  public observationConfig: { [id: string]: string[] } = {};

  public initData() {
    if (
      !this.source ||
      !this.filter ||
      !this.source.featureTypes ||
      !this.crossDashboardOptions?.baseFeatureType
    ) {
      return;
    }

    this.observationConfig = this.crossDashboardOptions.mappingConfig ?? {};
    this.featureType = this.source.featureTypes[
      this.crossDashboardOptions.baseFeatureType
    ];

    // get pois
    if (this.featureType) {
      const data = this.source.getClassElements(
        this.crossDashboardOptions.baseFeatureType,
        true
      );

      const checkPropType = (
        featureType?: FeatureType,
        propType?: PropertyType
      ) => {
        if (!featureType || !propType) {
          return;
        }
        if (
          this.source &&
          propType.key &&
          featureType.propertyMap &&
          !featureType.propertyMap.hasOwnProperty(propType.key)
        ) {
          featureType.properties?.push(propType);
          this.source.updateFeatureTypePropertyMap(featureType);
        }
      };

      const matchRelations = (
        observation: GraphElement,
        key: string,
        relationClasses: string[],
        element: GraphElement
      ) => {
        if (relationClasses.length === 0) {
          return;
        }
        let relationClass = relationClasses[0];

        if (!element._flat) {
          element._flat = {};
        }
        if (!observation._flat) {
          observation._flat = {};
        }
        // check for property
        if (
          element.properties &&
          element.properties.hasOwnProperty(relationClass)
        ) {
          if (relationClasses.length === 1) {
            const k = `${key}:${relationClass}`;
            // observation.properties[k] = element.properties[relationClass];
            observation._flat[k] = element.properties[relationClass];

            checkPropType(this.featureType, {
              key: k,
              label: relationClass,
              type: PropertyValueType.string,
            });
          }
        } else if (
          element._elements &&
          element._elements.hasOwnProperty(relationClass) &&
          !Array.isArray(element._elements[relationClass])
        ) {
          const k = `${key}:${relationClass}`;
          observation._flat[k] = (element._elements[
            relationClass
          ] as GraphElement).properties!.name;
        } else {
          // check of elements

          // check for relations
          let rels: GraphElement[] | undefined = element._outgoing;
          let object = "to";

          if (relationClass.startsWith("-") && element._incomming) {
            relationClass = relationClass.substring(1, relationClass.length);
            rels = element._incomming;
            object = "from";
          }
          if (rels) {
            let found = false;
            const k = `${key}:${relationClass}`;
            for (const relation of rels) {
              if (relation.classId === relationClass) {
                const o = object === "to" ? relation.to : relation.from;
                if (!observation._flat) {
                  observation._flat = {};
                }
                if (o?.classId) {
                  found = true;

                  // target type
                  const targetType = this.source!.findObservation(o.classId);
                  if (
                    targetType &&
                    relationClasses.length === 1 &&
                    o.properties &&
                    o.properties.hasOwnProperty("name")
                  ) {
                    checkPropType(this.featureType, {
                      key: k,
                      label: relationClass,
                      type: PropertyValueType.string,
                    });
                    observation._flat[k] = o.properties.name;
                    observation._flat[`${key}:type`] = o._featureType?.title;
                  }
                  if (relationClasses.length > 1) {
                    matchRelations(
                      observation,
                      key,
                      relationClasses.slice(1),
                      o
                    );
                  }
                }
              }
            }
            if (!found && observation?._flat) {
              // observation._flat[k] = 'test';
              // observation._flat[`${key}:type`] = 'test';
            }
          }
        }
      };

      if (data) {
        for (const obs of data) {
          if (!obs._flat) {
            obs._flat = {};
          }

          for (const key in this.observationConfig) {
            if (
              Object.prototype.hasOwnProperty.call(this.observationConfig, key)
            ) {
              const element = this.observationConfig[key];
              matchRelations(obs, key, element, obs);
            }
          }

          const loc = obs._outgoing?.find(
            (r) => r.classId === "AT_LOCATION" && r.to
          );
          if (loc && obs.properties) {
            if (loc.to?.properties?.lat && loc.to?.properties.lon) {
              obs._flat.lat = loc.to.properties.lat;
              obs._flat.lon = loc.to.properties.lon;
              obs._flat.location = loc.to.properties.name;
              obs._flat.locationId = loc.to.properties.id;
              // addRelation(obs, loc.to);
              // console.log(loc.to.properties.lat);
            }
          }

          //     const report = obs._incomm

          if (obs.properties?.time && !obs.properties.point_in_time) {
            obs.properties.point_in_time = Number.parseInt(obs.properties.time);
          }
          if (obs.properties?.point_in_time) {
            const t = new Date(obs.properties?.point_in_time);
            obs._flat.dayofweek = t.getDay();
            obs._flat.dayofmonth = t.getDate();
            // console.log(o['Gewicht_Gallagher.wstable.count']);
            // debugger;
            // this.checkMeta(datasummary, 'dayofmonth', project, o);
            // obs.properties.dayofyear = this.getDOY(t);
            obs._flat.month = t.getMonth();
            // obs.properties.week = ProjectState.getWeek(t);
            obs._flat.year = t.getFullYear();
            obs._flat.hour = t.getHours();
            obs._flat.time = t.getTime();
            obs._flat.hourStart = new Date(
              obs._flat.year,
              obs._flat.month,
              obs._flat.dayofmonth,
              obs._flat.hour
            );
            obs._flat.dayStart = new Date(
              obs._flat.year,
              obs._flat.month,
              obs._flat.dayofmonth
            );
            obs._flat.weekStart = this.getMonday(t);
            obs._flat.monthStart = new Date(obs._flat.year, obs._flat.month, 1);
            obs._flat.quarterStart = new Date(
              obs._flat.year,
              Math.floor(obs._flat.month / 3) * 3,
              1
            );
            obs._flat.yearStart = new Date(obs._flat.year, 0, 1);
          }
        }
      }

      if (data) {
        this.filter.updateCrossfilter(data);
      }
    }
  }

  public get crossDashboardOptions() {
    return this.dashboard.data as CrossGraphOptions;
  }

  private getTitle(key: string): string | undefined {
    if (this.source) {
      let prop = this.source.getPropertType(key);
      if (prop) {
        return prop.title;
      }
    }
    return "";
  }

  public createWidget(chartOptions: ChartOptions): IWidget {
    if (this.source) {
      if (!chartOptions.title && chartOptions.key) {
        chartOptions.title = this.getTitle(chartOptions.key);
      }
      if (!chartOptions.titleX && chartOptions.keyX) {
        chartOptions.titleX = this.getTitle(chartOptions.keyX);
      }
      if (!chartOptions.titleY && chartOptions.keyY) {
        chartOptions.titleY = this.getTitle(chartOptions.keyY);
      }

      if (!chartOptions.titleX && chartOptions.title) {
        chartOptions.titleX = chartOptions.title;
      }
    }

    let widget = {
      options: {
        width: chartOptions.width ?? 6,
        height: chartOptions.height ?? 2,
        showToolbar: true,
        title: chartOptions.title,
        menus: [
          {
            type: "icon",
            icon: "clear",
            toolTip: "clear",
            method: "clear",
          },
        ],
        toolbarOptions: {
          dense: true,
          flat: true,
          prominent: false,
          backgroundColor: "lightgray",
        },
      },
      component: CrossChart,
      data: {
        options: chartOptions,
        filter: this.filter,
      },
    } as IWidget;
    widget.options?.menus?.push({
      type: "icon",
      icon: "build",
      toolTip: "edit chart",
      action: (s) => {
        $cs.openRightSidebarWidget(
          {
            component: ChartEditor,
            datasource: this.source?.id,
            data: {
              chartOptions,
              manager: this,
              chart: widget,
            },
          },
          {
            open: true,
          },
          "editor"
        );
      },
    });
    widget.options?.menus?.push({
      type: "icon",
      icon: "map",
      toolTip: "use as legend",
      action: (s) => {
        // if (this.source?.mainLayer) {
        //     if (chartOptions.key) {
        //         this.source.mainLayer.setLegend(chartOptions.key);
        //     } else if (chartOptions.keyX) {
        //         this.source.mainLayer.setLegend(chartOptions.keyX);
        //     }
        // }
      },
    });
    return widget;
  }

  public updateWidget(widget: IWidget) {
    if (!this.chartDashboard?.widgets) {
      return;
    }
    if (
      this.chartDashboard.widgets.findIndex((r) => r.id === widget.id) !== -1
    ) {
      this.chartDashboard.widgets = this.chartDashboard.widgets.filter(
        (r) => r.id === widget.id
      );
    }
    this.chartDashboard.widgets.push(widget);
  }

  public initChartTypes() {
    this.chartTypes = {};
    this.chartTypes[Histogram.type] = new Histogram();
    this.chartTypes[RowChart.type] = new RowChart();
    this.chartTypes[ScatterPlot.type] = new ScatterPlot();
    this.chartTypes["heatmap"] = new HeatMap();
    this.chartTypes[Stat.type] = new Stat();
    this.chartTypes[TimeChart.type] = new TimeChart();
  }

  public initFilter() {
    if (this.source && this.dashboard?.data?.filter) {
      let filter = this.source.getGraphPreset(
        this.dashboard.data.filter
      ) as GraphCrossFilter;
      if (filter === undefined) {
        filter = new GraphCrossFilter(this.source);
        filter.id = this.dashboard.data.filter;
        filter.properties!.layers = this.dashboard.data.layers;
        this.source.addGraphPreset(filter, false);
      }
      this.filter = filter;
    }
  }
  public contentLoaded(source: DocDatasource) {
    this.source = source;
    this.initFilter();
    this.initData();
    this.initChartWidgets();

    this.source.events.subscribe(
      CrossFilterDatasource.FILTER_CHANGED,
      (a: string, e: any) => {
        if (this.filter) {
          this.filter._visibleNodes = this.filter?.ndx?.allFiltered() as GraphElement[];
          console.log(this.filter._visibleNodes.length);
          this.source?.events.publish(
            IGraphFilter.GRAPH_FILTER,
            IGraphFilter.VISIBLE_NODES_CHANGED,
            this.filter
          );
        }
      }
    );
    //     let mapdata = this.source?.mainLayer?._source?._data;
    //     if (mapdata) {
    //         // console.log(this.source?.mainLayer);

    //         // let ft = this.source?.mainLayer?._source?._featureType;
    //         // if (ft && !ft?.propertyMap?.hasOwnProperty(CrossDashboardManager.filterProp)) {
    //         //     ft?.properties?.push({key: CrossDashboardManager.filterProp, type: PropertyValueType.number, min: -1, max: Number.MAX_VALUE});
    //         //     this.source?.mainLayer?._source?.updateFeatureTypePropertyMap(ft);
    //         //     this.source?.mainLayer?.setFilter([">=",CrossDashboardManager.filterProp, 0])
    //         // }
    //         // ?.properties[this.filterProp]
    //         // for (const feature of mapdata.features) {
    //         //     if (!feature.properties) feature.properties = {};
    //         //     let include =  filtered?.findIndex((f:GeoJsonFeature) => f.id === feature.id);
    //         //     feature.properties[CrossDashboardManager.filterProp] = include;
    //         // }
    //         // this.source?.mainLayer?.updateGeojson(mapdata);

    //     }

    // })
  }

  public stop() {
    this._contentHasBeenLoaded = false;
  }

  public dashboardLoaded() {}
}
