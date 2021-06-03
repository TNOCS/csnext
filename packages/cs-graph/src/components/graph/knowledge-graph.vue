<template>
  <div class="full-height">
    <div id="kg-vis" style="width: 100%; height: 100%"></div>
    <div
      v-if="settings && settings.filterTimeline"
      class="graph-focus-date"
    >{{ getShortDate(settings.focusDate) }}</div>
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
  border: transparent !important;
}


</style>

<script lang="ts">
import { Component,  Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DataSet } from "vis-data";
import {  Network, Options } from "vis-network";
import { GraphObject, GraphSettings, GraphElement } from '@csnext/cs-data';
import dateFormat from "dateformat";
import { Id } from "vis-network/declarations/network/gephiParser";
import { IMenu } from "@csnext/cs-core";
import { DocDatasource } from "../../datasources/doc-datasource";

@Component({
  components: {}
})
export default class KnowledgeGraph extends WidgetBase {
  public network?: Network;
  public nodes = new DataSet([] as any);
  public edges = new DataSet([] as any);
  public visibleNodes: Id[] = [];
  

  public get graphSource(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public getShortDate(date: Date) {
    if (date) {
      return dateFormat(date, "mmmm dS, yyyy");
      // return date.toDateString() + " " + date.toTimeString();
    }
  }

  public get settings(): GraphSettings {
    if (this.graphSource) {
      return this.graphSource.graphSettings;
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
  settingsChanged() {
    if (this.graphSource) {
      // this.graphSource.graph = [];
      this.nodes.clear();
      this.edges.clear();

      // this.graphSource.updateEntities();
      this.updateGraph(this.graphSource.graph);
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
      if (this.widget.options.menus.findIndex(m => m.id === menu.id) === -1) {
        this.widget.options.menus.push(menu);
      }
    }
  }

  private updateNode(e: GraphElement) {    
    if (e.id && this.graphSource) {
      let existing = this.nodes.get(e.id);

      

      // e._title = GraphElement.getTitle(e);

      // let active = e._firstStep === this.graphSource!.activeId;

      let node = {
        id: e.id,
        label: e._title,
        hidden: this.graphSource.getHidden(
          e,          
          this.settings
        ),
        font: {
          color: "#aaaaaa",
          background: "#ffffff"
        },
        cid: e.classId,
        color: GraphElement.getBackgroundColor(e, false),
        shadow: false
      } as any;

      e._group = GraphElement.getGroup(e);

      if (!e._group && e.isType) {
        e._group = "type";
      }

      // if (e.class && e.class.id === 'instance') {
      //   e._group = 'event';
      // }
      

      if (e._group) {
        node.group = e._group;
      }

      if (!existing) {
        // check if it is part of data model
        if (this.settings.showDataModel || !e.isType) {
          // check visibility
          if (GraphElement.getVisibility(e, this.settings)) {
            this.nodes.add([node]);
            // console.log("Add " + node.id);
          }
        }
      } else {
        if (!GraphElement.getVisibility(e, this.settings)) {
          this.nodes.remove([node.id]);
          // console.log("Remove " + node.id);
        } else {
          this.nodes.update([node]);
        }
      }
    }
  }

  private updateEdge(e: GraphElement) {
    if (!e.id || !this.graphSource || (e.fromId && !this.visibleNodes.includes(e.fromId))) {
      return;
    }

    
    let existing = this.edges.get(e.id);

    let edge = {
      id: e.id,
      from: e.fromId,
      to: e.toId,
      width: 3,
      hidden: this.graphSource.getHidden(
        e,        
        this.settings
      ),
      label: (e._title && e._title.length < 20) ? e._title : '',
      arrows: "to"
    } as any;
    if (!existing) {
      if (this.settings.showDataModel === true || edge.label !== "is") {
        // if (GraphElement.getVisibility(e, this.settings)) {
          this.edges.add([edge]);
        // }
      }
    } else {
      // if (!GraphElement.getVisibility(e, this.settings)) {
      //   this.edges.remove([edge.id]);
      // } else {
      //   this.edges.update([edge]);
      // }
    }
  }

  public updateGraph(graph: GraphObject) {
    if (!this.graphSource) { return; }
    
    for (const e of Object.values(graph)) {
      if (e.type === "node" && e.classId !== "instance")
        if (e.id) {
          if (e.classId && !e.class ) {
            e.class = this.graphSource.getElement(e.classId); // graph.find(el => el.id === e.classId);
          }
          this.updateNode(e);
          if (e.class) {
            this.updateEdge({
              from: e.id,
              to: e.class.id,
              label: "is"
            } as any);
          }
        }
    }

    for (const id of this.nodes.getIds()) {
      const el = this.graphSource.getElement(id.toString());
      if (!el || !GraphElement.getVisibility(el)) {
        this.nodes.remove(id);
      }      
    }

    this.visibleNodes = this.nodes.getIds();

    for (const e of Object.values(graph)) {
      if (e.type === "edge") {
        if (e.fromId && e.toId) {
          this.updateEdge(e);
        }
      }
    }

    for (const id of this.edges.getIds()) {      
      const el = this.graphSource.getElement(id.toString());
      if (!el) {
        this.edges.remove(id);
      }
    }


    if (this.network) {

      // var clusterOptions : ClusterOptions = {
      // joinCondition:(nodeOptions) => {
      //   return nodeOptions.cid === 'country';
      // }
      // }


      // this.network.cluster(clusterOptions);
      this.network.setOptions({ physics: { stabilization: { iterations: 200 } } });
      this.network.stabilize(0.1);
      this.network.fit();
    }
  }

  public contentLoaded() {
    if (this.graphSource) {
      // this.tutorialSource.goToId(this.tutorialSource.activeId);
      this.updateGraph(this.graphSource.graph);
      this.busManager.subscribe(this.graphSource.bus, "step", (a: string, e: any) => {
        this.updateGraph(this.graphSource!.graph);
      });

      this.busManager.subscribe(this.graphSource.bus, "filter", (a, d) => {
        this.updateGraph(this.graphSource!.graph);
      });

      this.busManager.subscribe(this.graphSource.bus, "focus", (a, d) => {
        this.network!.focus(d.id);
      });

      this.busManager.subscribe(this.graphSource!.bus, IsrdDatasource.GRAPH_EVENTS, (a: string, d: any) => {
      if (a === IsrdDatasource.GRAPH_UPDATED) {
        this.updateGraph(this.graphSource!.graph);
        // this.network?.redraw();
      }
    })
    }
  }

  public initGraph() {
    var container = document.getElementById("kg-vis");
    var data = {
      nodes: this.nodes,
      edges: this.edges
    };
    var options = {
      autoResize: true,
      nodes: {
        shape: "dot",
        size: 20,
        font: {
          size: 16
        },
        borderWidth: 2,
        shadow: true
      },

      edges: {
        smooth: {
          forceDirection: "none",
          roundness: 0.8
        },
        width: 2,
        shadow: true
      },
      groups: {
        node: {
          shape: "circle"
        },
        event: {
          shape: "triangle"
        },
        source: {
          shape: "box"
        },
        type: {
          color: { background: "red", border: "white" },
          shape: "diamond"
        }
      },

      physics: {
        forceAtlas2Based: {
          springLength: 100
        },
        minVelocity: 0.175,
        solver: "forceAtlas2Based",
        timestep: 1
      }
    } as Options;

    this.network = new Network(container!, data as any, options);
    this.network.on("click", e => {
      if (!this.graphSource) {
        return;
      }
      if (e.nodes && e.nodes.length > 0) {
        this.graphSource.selectElementId(e.nodes[0]);
      } else if (e.edges && e.edges.length > 0) {
        this.graphSource.selectElementId(e.edges[0]);
      }
    });
  }

  mounted() {
    this.initGraph();

    this.updateMenu({
      id: "clears",
      type: "icon",
      icon: "delete",
      toolTip: "Clear Graph",
      action: m => {        
        if (this.graphSource) {
          this.graphSource.emptyGraph();          
          this.network?.redraw();
        }
        
      }
    });

    this.updateMenu({
      id: "save",
      type: "icon",
      icon: "book",
      toolTip: "Save as notebook",
      action: m => {
        if (this.graphSource) {
          this.graphSource.emptyGraph();          
        }
      }
    });

    

    this.busManager.subscribe(this.widget!.events, "size", (a, d) => {
      if (this.network) {
        this.network.redraw();
        // this.network.fit();
      }
    });
  }
}
</script>
