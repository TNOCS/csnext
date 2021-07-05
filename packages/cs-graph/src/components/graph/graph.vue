<template>
  <div>
    <div id="kg-vis" style="height: 100%; width: 100%"></div>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      :close-on-content-click="false"
      open-on-hover
      offset-y
    >
      <v-list>
        <v-list-group
          v-for="(item, i) in contextMenuitems"
          :key="i"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          @click="item.action"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-if="item.items"
            v-for="(subItem, si) in item.items"
            :key="si"
            @click="subItem.action"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-tile-action v-if="subItem.icon">
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-tile-action>
              </v-list-tile> -->
        </v-list-group>
      </v-list>
    </v-menu>

    <!-- <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in contextMenuitems"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <div v-if="settings && settings.filterTimeline" class="graph-focus-date">
      {{ getShortDate(settings.focusDate) }}
    </div>
  </div>
</template>

<style scoped>
.graph-focus-date {
  position: absolute;
  top: 50px;
  left: 10px;
  font-size: 24px;
}

.vis-network {
  outline: none !important;
}

.g6-component-contextmenu {
  position: absolute;
  z-index: 2;
  list-style-type: none;
  background-color: #363b40;
  border-radius: 6px;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.85);
  width: fit-content;
  transition: opacity 0.2s;
  text-align: center;
  padding: 0px 20px 0px 20px;
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
  border: 0px;
}
.g6-component-contextmenu ul {
  padding-left: 0px;
  margin: 0;
}
.g6-component-contextmenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0;
  line-height: 38px;
}
.g6-component-contextmenu li:hover {
  color: #aaaaaa;
}
</style>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphDatasource, GraphSettings, GraphObject, GraphElement, PropertyValueType } from "@csnext/cs-data";
import dateFormat from "dateformat";
import { IMenu } from "@csnext/cs-core";
import G6, { Graph, GraphData, Menu } from "@antv/g6";
import { guidGenerator } from "@csnext/cs-core";
import { DocDatasource } from "../../datasources/doc-datasource";
const debounce = require('lodash.debounce');

@Component({
  components: {},
})
export default class NetworkGraph extends WidgetBase {
  // public network?: Network;
  // public nodes = new DataSet([] as any);
  // public edges = new DataSet([] as any);
  public data?: GraphData;
  public visibleNodes: string[] = [];
  private forceLayout?: any;
  private showMenu = false;
  private x = 0;
  private y = 0;

  private graph?: Graph;
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  private settingsUpdatedDebounce = debounce(this.settingsUpdated, 200);

  public contextMenuitems: any[] = [];

  public getShortDate(date: Date) {
    if (date) {
      return dateFormat(date, "mmmm dS, yyyy");
      // return date.toDateString() + " " + date.toTimeString();
    }
  }

  public get settings(): GraphSettings {
    if (this.source) {
      return this.source.graphSettings;
    }
    return new GraphSettings();
  }

  @Watch("widget.content.graphSettings.showDataModel")
  @Watch("widget.content.graphSettings.autoFocus")
  @Watch("widget.content.graphSettings.showExternal")
  @Watch("widget.content.graphSettings.showReliability")
  @Watch("widget.content.graphSettings.filterStep")
  @Watch("widget.content.graphSettings.filterTimeline")
  @Watch("widget.content.graphSettings.showInstance")
  @Watch("widget.content.graphSettings.nodeStrength")
  @Watch("widget.content.graphSettings.nodeSize")
  settingsChanged() {
    this.settingsUpdatedDebounce();    
  }

  public settingsUpdated() {
    if (this.source && this.graph) {
      console.log("update settings");
      // this.graph.set()
      // this.graph.cfg!.defaultNode = this.getNodeStyle();
      // const cfg = this.graph.getDefaultCfg();
      // cfg.defaultNode = this.getNodeStyle();
      // this.graph.updateLayout(cfg);
      

    }
  }

  constructor() {
    super();
  }

  public updateMenu(menu: IMenu) {
    if (this.widget.options) {
      if (!this.widget.options.menus) {
        this.widget.options.menus = [];
      }
      if (this.widget.options.menus.findIndex((m) => m.id === menu.id) === -1) {
        this.widget.options.menus.push(menu);
      }
    }
  }

  private updateNode(e: GraphElement) {
    if (e.id && this.graph && this.data && this.source) {
      let existing = this.data.nodes!.find((n) => n.id === e.id); // get(e.id);

      if (!existing && e._included) {
        // e._title = GraphElement.getTitle(e);

        // let active = e._firstStep === this.graphSource!.activeId;

        let node = {
          id: e.id,
          label: e._title, // this.labelFormatter(e._title!, this.settings.labelMaxLength),
          // hidden: this.graphSource.getHidden(
          //   e,
          //   this.settings
          // ),
          style: {
            fill: GraphElement.getBackgroundColor(e),
            fontFamily: "Roboto, sans-serif",
          },
          labelCfg: {
            style: {
              fontFamily: "Roboto, sans-serif",
            },
          },

          // color: GraphElement.getBackgroundColor(e, active),
          // shadow: active,
        } as any;

        e._group = GraphElement.getGroup(e);

        // if (!e._group && e.isType) {
        //   e._group = "type";
        // }
        // if (e._group) {
        //   node.group = e._group;
        // }

        this.data?.nodes?.push(node);
        if (e._outgoing) {
          for (const outgoing of e._outgoing) {
            if (!outgoing._included && outgoing?.to?._included) {
              this.updateEdge(outgoing);
            }
          }
        }

        if (e._incomming) {
          for (const incomming of e._incomming) {
            if (!incomming._included && incomming?.from?._included) {
              this.updateEdge(incomming);
            }
          }
        }
      }
      if (existing && !e._included) {
        this.graph.remove(e.id);
      }
    }
  }

  private updateEdge(e: GraphElement) {
    if (
      !this.data ||
      !this.graph ||
      !this.source ||
      !e.id ||
      (e.fromId && !this.visibleNodes.includes(e.fromId))
    ) {
      return;
    }

    let active = e._firstStep === this.source!.activeId;

    let existing = this.data.edges!.find((n) => n.id === e.id);

    console.log("Adding edge");

    let edge = {
      id: e.id,
      source: e.fromId,
      target: e.toId,
      width: 3,
      labelCfg: {
        autoRotate: true,
        refY: 10,
      },
      hidden: this.source.getHidden(e, this.settings),
      label: this.labelFormatter(e.classId!, 30),
      arrows: "to",
    } as any;
    if (!existing) {
      if (this.settings.showDataModel === true || edge.label !== "is") {
        // if (GraphElement.getVisibility(e, this.settings)) {
        this.data?.edges?.push(edge);
        // }
      }
    } else {
      // if (!GraphElement.getVisibility(e, this.settings)) {
      this.graph.remove(edge.id);
      // } else {
      // this.edges.update([edge]);
      // }
    }
  }

  // public updateDiagram(graph: GraphObject) {
  //   if (!this.graphSource) {
  //     return;
  //   }

  //   for (const e of Object.values(graph)) {
  //     if (e.type === "node" && e.classId !== "instance")
  //       if (e.id) {
  //         if (e.classId && !e.class) {
  //           e.class = this.graphSource.getElement(e.classId); // graph.find(el => el.id === e.classId);
  //         }
  //         this.updateNode(e);
  //         if (e.class) {
  //           this.updateEdge({
  //             from: e.id,
  //             to: e.class.id,
  //             label: "is",
  //           } as any);
  //         }
  //       }
  //   }

  //   for (const id of this.nodes.getIds()) {
  //     const el = this.graphSource.getElement(id.toString());
  //     if (!el || !GraphElement.getVisibility(el)) {
  //       this.nodes.remove(id);
  //     }
  //   }

  //   this.visibleNodes = this.nodes.getIds();

  //   for (const e of Object.values(graph)) {
  //     if (e.type === "edge") {
  //       if (e.fromId && e.toId) {
  //         this.updateEdge(e);
  //       }
  //     }
  //   }

  //   for (const id of this.edges.getIds()) {
  //     const el = this.graphSource.getElement(id.toString());
  //     if (!el) {
  //       this.edges.remove(id);
  //     }
  //   }

  // }

  public updateGraph(graph: GraphObject, redraw = true) {
    if (!this.source || !this.graph) {
      return;
    }
    console.log("update graph");
    if (!this.data) {
      this.data = { nodes: [], edges: [] };
      this.graph.data(this.data);
    }
    for (const e of Object.values(graph).filter(n => n.type === "node" && n._included && n.id)) {
      this.updateNode(e);
    };
          // if (e.classId && !e.class) {
          //   e.class = this.source.getElement(e.classId); // graph.find(el => el.id === e.classId);
          // }
          
          // if (e.class) {
          //   this.updateEdge({
          //     source: e.id,
          //     target: e.class.id,
          //     label: "is",
          //   } as any);
          // }
    //     }
    // }

    for (const node of this.data.nodes!) {
      const el = this.source.getElement(node.id.toString());
      if (!el || !GraphElement.getVisibility(el)) {
        // this.graph.remove(node.id);
        this.data.nodes = this.data.nodes?.filter((n) => n.id !== node.id);
        // this.nodes.remove(id);
      }
    }

    this.visibleNodes = this.data.nodes!.map((r) => r.id);

    for (const e of Object.values(graph)) {
      if (e.type === "edge") {
        if (e.fromId && e.toId) {
          this.updateEdge(e);
        }
      }
    }

    for (const edge of this.data.edges!) {
      if (edge?.id) {
        const el = this.source.getElement(edge.id!.toString());
        if (!el) {
          this.graph.remove(edge.id!);
        }
      }
    }

    if (this.graph) {
      this.graph.data(this.data);
      if (redraw) {
        this.graph.render();
      }

      // this.network.setOptions({
      //   physics: { stabilization: { iterations: 200 } },
      // });
      // this.network.stabilize(0.1);
      // this.network.fit();
    }
  }

  public contentLoaded() {
    if (this.source) {
      // this.tutorialSource.goToId(this.tutorialSource.activeId);
      this.updateGraph(this.source.graph);
      // this.busManager.subscribe(
      //   this.graphSource.bus,
      //   "step",
      //   (a: string, e: any) => {
      //     this.updateGraph(this.graphSource!.graph);
      //   }
      // );

      // this.busManager.subscribe(this.graphSource.bus, "filter", (a, d) => {
      //   this.updateGraph(this.graphSource!.graph);
      // });

      // this.busManager.subscribe(this.graphSource.bus, "focus", (a, d) => {
      //   this.network!.focus(d.id);
      // });

      this.busManager.subscribe(
        this.source!.bus,
        GraphDatasource.GRAPH_EVENTS,
        (a: string, d: GraphElement) => {
          if (a === GraphDatasource.ELEMENT_UPDATED && this.graph && d) {
            if (d._included) {
              //  this.graph.render();
              this.updateGraph(this.source!.graph, false);
            }
          }
          if (a === GraphDatasource.GRAPH_UPDATED && this.graph) {
            if (d) {
              this.updateNode(d);
              if (d._outgoing && this.source?.availableEdgeTypes) {
                for (const outgoing of d._outgoing) {
                  if (
                    outgoing.classId &&
                    this.source.availableEdgeTypes.hasOwnProperty(
                      outgoing.classId
                    ) &&
                    this.source.availableEdgeTypes[outgoing.classId]._visible
                  ) {
                    if (outgoing.to) {
                      this.updateNode(outgoing.to);
                      this.updateEdge(outgoing);
                    }
                  }
                }
              }
              if (d._incomming && this.source?.availableEdgeTypes) {
                for (const incomming of d._incomming) {
                  if (
                    incomming.classId &&
                    this.source.availableEdgeTypes.hasOwnProperty(
                      incomming.classId
                    ) &&
                    this.source.availableEdgeTypes[incomming.classId]._visible
                  ) {
                    if (incomming.from) {
                      this.updateNode(incomming.from);
                      this.updateEdge(incomming);
                    }
                  }
                }
              }
            } else {
              this.updateGraph(this.source!.graph);
            }
            this.graph.data(this.data);
            this.graph.render();

            // this.network?.redraw();
          }
        }
      );
    }
  }

  refreshDragedNodePosition(e: any) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }

  private labelFormatter(text: string, minLength = 10) {
    if (text && text.split("").length > minLength)
      return `${text.substr(0, minLength)}...`;
    return text;
  }

  public updateContextMenu(a: any) {
    if (this.source && a.item?._cfg?.id) {
      const element = this.source.getElement(a.item._cfg.id);
      if (!element?._featureType?.properties) {
        return;
      }
      switch (element?.type) {
        case "node":
          const outgoingMenu = {
            title: "outgoing",
            active: true,
            icon: "visibility",
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToGraph(element);
              //   }
              // }
            ] as any[],
          };
          const incommingMenu = {
            title: "incoming",
            active: true,
            icon: "visibility",
            action: () => {},
            items: [
              //   {
              //   title: 'all',
              //   action: ()=> {
              //     this.source?.addRelationsToGraph(element);
              //   }
              // }
            ] as any[],
          };
          const createMenu = {
            title: "create",
            active: false,
            icon: "add",
            action: () => {},
            items: [] as any[],
          };
          for (const props of element._featureType?.properties) {
            if (
              props.type === PropertyValueType.relation &&
              props.relation?.type &&
              props.relation?.objectType
            ) {
              createMenu.items.push({
                title: props.label || props.relation.type,
                action: async () => {
                  const type = this.source?.findObservation(
                    props.relation?.objectType!
                  );
                  if (!type || !this.source) {
                    return;
                  }
                  let name = `new ${type.type}`;

                  name = await $cs.triggerInputDialog(
                    "Name",
                    "enter new name",
                    name
                  );

                  this.source
                    .addNewNode({
                      id: `${type.type}-${guidGenerator()}`,
                      properties: { name },
                      classId: type.type,
                    })
                    .then((e) => {
                      this.source?.addElementToGraph(e);
                      this.source?.selectElement(e);
                    })
                    .catch((e) => {
                      alert("error creating entity");
                    });
                },
              });
            }
          }

          if (element._incomming) {
            for (const relation of element._incomming.filter(
              (i) => !i.from?._included
            )) {
              if (
                incommingMenu.items.findIndex(
                  (r) => r.title === relation.classId
                ) === -1
              ) {
                // find prop
                let relationtitle = relation.classId;
                incommingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (relation?.classId) {
                      this.source?.addRelationsToGraph(
                        element,
                        relation.classId
                      );
                    }
                  },
                });
              }
            }
          }

          if (element._outgoing) {
            for (const relation of element._outgoing.filter(
              (i) => !i.to?._included
            )) {
              if (
                outgoingMenu.items.findIndex(
                  (r) => r.title === relation.classId
                ) === -1
              ) {
                // find prop
                let relationtitle = relation.classId;
                outgoingMenu.items.push({
                  title: relationtitle!,
                  action: () => {
                    if (relation?.classId) {
                      this.source?.addRelationsToGraph(
                        element,
                        relation.classId
                      );
                    }
                  },
                });
              }
            }
          }
          this.contextMenuitems = [];
          if (outgoingMenu.items.length > 0) {
            this.contextMenuitems.push(outgoingMenu);
          }
          if (incommingMenu.items.length > 0) {
            this.contextMenuitems.push(incommingMenu);
          }
          if (createMenu.items.length > 0) {
            this.contextMenuitems.push(createMenu);
          }
          this.contextMenuitems.push({
            title: "hide",
            icon: "visibility_off",
            action: () => {
              this.source?.removeElementFromGraph(element);
            },
          });
          this.contextMenuitems.push({
            title: "focus",
            icon: "adjust",
            action: () => {
              this.source?.createKGView([element]);
            },
          });
          break;
        case "edge":
          break;
      }

      this.x = a.clientX;
      this.y = a.clientY;

      this.showMenu = true;
      console.log(a);
    }
  }

  public getNodeStyle() {
    console.log('get node style');
    return {
        shape: "circle",
        size: [75], //this.settings.nodeSize ?? 100],
        color: "#5B8FF9",
        style: {
          fill: "#9EC9FF",
          keepVisualSize: true,
          lineWidth: 3,
        },
        labelCfg: {
          position: "bottom",
          autoRotate: true,
          style: {
            fill: "#000",
            fontSize: 20,
          },
        },
      };
  }

  public initGraph() {
    // var container = document.getElementById("kg-vis");
    if (this.graph) {
      return;
    }

    const contextMenu = new Menu({
      shouldBegin(evt: any) {
        if (evt.target && evt.target.isCanvas && evt.target.isCanvas())
          return true;
      },
    });    

    this.graph = new G6.Graph({
      container: "kg-vis",
      width: 1200, //(this as any).widget._size.width,
      linkCenter: true,
      plugins: [contextMenu],
      height: 1200, // (this as any).widget._size.height,
      layout: {
        // type: 'compactBox',
        // direction: 'LR',
        // getId: function getId(d: any) {
        //   return d.id;
        // },
        // getHeight: function getHeight() {
        //   return 16;
        // },
        // getWidth: function getWidth() {
        //   return 16;
        // },
        // getVGap: function getVGap() {
        //   return 10;
        // },
        // getHGap: function getHGap() {
        //   return 100;
        // },
        type: "gForce",
        center: [400, 600], // The center of the graph by default
        minMovement: 0.5,
        
        maxIteration: 50,
        preventOverlap: true,
        damping: 0.5,
        // gpuEnabled: true,
        // workerEnabled: true,
        linkDistance: (d: any) => {
          let dist = 500; //this.settings.linkDistance;
          return dist;
        },
        edgeStrength: (d: any) => {
          return 20; // this.settings.edgeStrength;
        },
        nodeStrength: 10,
        nodeSize: 100,
        // nodeStrength: (d: any) => {
        //   return this.settings.nodeStrength;
        // },
        // nodeSize: (d: any) => {
        //   if (d.size) return d.size;
        //   return this.settings.nodeSize ?? 100;
        // },
        nodeSpacing: (d: any) => {
          if (d.degree === 0) return this.settings.nodeSpacing;
          if (d.level) return this.settings.nodeSpacing;
          return this.settings.nodeSpacing;
        },
        onLayoutEnd: () => {
          this.graph?.getEdges().forEach((edge: any) => {
            if (!edge.oriLabel) return;
            edge.update({
              label: this.labelFormatter(
                edge.oriLabel,
                this.settings.labelMaxLength
              ),
            });
          });
        },
      },
      modes: {
        default: [
          "drag-node",
          // "drag-combo",
          // "collapse-expand-combo",
          // "click-add-node",
          "drag-canvas",
          "zoom-canvas",
          "click-select",
          "shortcuts-call",
          // {
          //   type: "edge-tooltip",
          //   formatText: (model) => {
          //     if (model.node) {
          //     }
          //     return "Geen informatie nog beschikbaar";
          //   },
          //   offset: 30,
          // },
        ],
        // addEdge: ["click-add-edge", "click-select"],
      },
      defaultNode: this.getNodeStyle(),
      defaultEdge: {
        autoRotate: true,
        background: {
          fill: "#fff",
          stroke: "#9EC9FF",
          padding: [2, 2, 2, 2],
          radius: 2,
        },
        style: {
          stroke: "#e2e2e2",
          lineWidth: 3,
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e2e2e2",
          },
        },
        // curveOffset: 200
      },
      defaultCombo: {
        type: "rect",
        size: [50, 50], // Combo 的最小大小
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 10,
          position: "top",
          style: {
            fontSize: 18,
          },
        },
      },
    });

    this.forceLayout = this.graph.get("layoutController").layoutMethod;
    this.graph.on("node:dragstart", (e: any) => {
      this.graph!.layout();
      // this.forceLayout.execute();
      this.refreshDragedNodePosition(e);
    });
    this.graph.on("node:drag", (e: any) => {
      if (this.forceLayout) {
        this.forceLayout.execute();
      }
      this.refreshDragedNodePosition(e);
      console.log("drag");
    });
    this.graph.on("node:dragend", (e: any) => {
      e.item.get("model").fx = null;
      e.item.get("model").fy = null;
      // this.refreshDragedNodePosition(e);
    });
    this.graph.on("node:contextmenu", (a: any) => {
      this.updateContextMenu(a);
    });
    this.graph.on("node:click", (e: any) => {
      if (e.item?._cfg?.id) {
        // find node
        const node = this.source?.getElement(e.item._cfg.id);
        if (node) {
          this.source!.selectElement(node);
        }
      }
    });
  }

  mounted() {
    this.initGraph();
    this.contentLoaded();

    this.updateMenu({
      id: "clear",
      type: "icon",
      icon: "delete",
      action: (m) => {
        console.log("empty graph");
        if (this.source && this.graph) {
          for (const el of Object.values(this.source.graph).filter(
            (e) => e._included
          )) {
            el._included = false;
          }
          this.data = { nodes: [], edges: [], combos: [] };
          this.graph.data(this.data);
          this.updateGraph(this.source.graph, true);
          // this.updateGraph(this.source!.graph);
          // this.graph?.render();
        }
      },
    });

    this.updateMenu({
      id: "refresh",
      type: "icon",
      icon: "refresh",
      action: (m) => {
        this.updateGraph(this.source!.graph);
      },
    });

    this.busManager.subscribe(this.widget!.events, "size", (a, d) => {
      // if (this.network) {
      // this.network.redraw();
      // this.network.fit();
      // }
    });
  }
}
</script>
