import { IMenu } from "@csnext/cs-core";
// import NetworkGraph  from "./../../graph.vue";
// import GraphRouting from "./graph-routing.vue";
import { DocDatasource, GraphMap, GraphRouting, NetworkGraph } from "./../../../..";
import { GraphElement } from "@csnext/cs-data";

import { Graph } from '@antv/g6';
import { IGraphPlugin } from "./../graph-plugin";

export class GraphRoutingPlugin implements IGraphPlugin {
  public name = "routing";
  public graphComponent!: NetworkGraph;
  public source!: DocDatasource;

  
  public followedSources: string[] = [];
  public followedTargets: string[] = [];
  public followNode: GraphElement | null = null;
  public targetNode: GraphElement | null = null;

  public get graph() : Graph {
    return (this.graphComponent as any).graph as Graph;
  }

  public init(source: DocDatasource, graphComponent?: NetworkGraph, mapComponent?: GraphMap) {
    this.source = source;
    this.graphComponent = graphComponent!;
  }

  public calculateRoutes() {
      
    if (!this.graph) { return; }
    this.followedSources = [];
    this.followedTargets = [];
    const clearItem = (id: string) => {      
      this.graph!.setItemState(id, 'notsourcetarget', false);
      this.graph!.setItemState(id, 'sourcetarget', false);
      this.graph!.setItemState(id, 'source', false);
      this.graph!.setItemState(id, 'target', false);
    };
    this.graph.getNodes().forEach((node) => {
      clearItem(node.getID());
    });
    this.graph.getEdges().forEach((edge) => {
      clearItem(edge.getID());
    });

    if (this.followNode?.id) {
      const fn = this.graph.findById(this.followNode.id);
      if (fn) {
        this.followSource(fn.getID(), 0);
      }
    }

    if (this.targetNode?.id) {
      const tn = this.graph.findById(this.targetNode.id);
      if (tn) {
        this.followTarget(tn.getID(), 0);
      }
    }

    const updateState = (node: any) => {
      let states = node.getStates();
      if (this.followNode && this.targetNode && this.graph) {
        const nid = node.getID();
        if (states.includes('source') && states.includes('target')) {
          this.graph.setItemState(nid, 'sourcetarget', true);
        } else {
          this.graph.setItemState(nid, 'notsourcetarget', true);
        }
        this.graph.setItemState(nid, 'source', false);
        this.graph.setItemState(nid, 'target', false);
        //
      }
      let s = node.getStates();
      console.log(s);
    };

    this.graph.getNodes().forEach((node) => {
      updateState(node);
    });

    this.graph.getEdges().forEach((edge) => {
      updateState(edge);
    });

    // this.graph.getEdges().forEach((edge) => {
    //   this.graph.clearItemStates(edge);
    // });
  }


  public followTarget(nodeId: string, level: number) {
    if (!this.graph || !(this.graphComponent as any).data.edges) { return; }
    if (this.followedTargets.includes(nodeId)) {
      return;
    }

    this.graph.setItemState(nodeId, 'target', true);
    this.followedTargets.push(nodeId);

    for (const edge of (this.graphComponent as any).data.edges.filter((s: any) => s.target && s.target === nodeId)) {
      this.followedTargets.push(edge.id!);
      this.graph.setItemState(edge.id!, 'target', true);

      if (edge.source) {
        this.followTarget(edge.source, level + 1);
      }
    }
  }

  public followSource(nodeId: string, level: number) {
    if (!this.graph || !this.source || !(this.graphComponent as any).data?.edges) { return; }
    this.graph.setItemState(nodeId, 'source', true);
    this.followedSources.push(nodeId);

    for (const edge of (this.graphComponent as any).data.edges.filter((s: any) => s.id && s.source && s.source === nodeId)) {
      this.followedSources.push(edge.id!);
      this.graph.setItemState(edge.id!, 'source', true);

      if (edge.target && !this.followedSources.includes(edge.target)) {
        this.followSource(edge.target, level + 1);
      }
    }
  }

  public getComponentMenuItems(): IMenu[] {
    return [
      {
        id: "routing",
        location: "footer",
        icon: "mdi-chart-timeline-variant",
        title: "Routing",
        plugin: this,
        component: GraphRouting,
      },
    ];
  }

  public getContextMenuItems(element: GraphElement): IMenu[] {
    const graphMenu = {
        title: 'routing',
        active: false,
        icon: 'mdi-chart-timeline-variant',
        action: () => {},
        items: [] as any[],
      };

      if (element === this.followNode) {
        graphMenu.items.push({
          title: 'remove source',
          action: () => {
            this.followNode = null;
            (this.graphComponent as any).updateGraph(this.source!.graph);
          },
        });
      } else {
        graphMenu.items.push({
          title: 'set source',
          action: () => {
            this.followNode = element;
            this.calculateRoutes();
          },
        });
      }

      if (element === this.targetNode) {
        graphMenu.items.push({
          title: 'remove target',
          action: () => {
            this.targetNode = null;
            (this.graphComponent as any).updateGraph();
          },
        });
      } else {
        graphMenu.items.push({
          title: 'set target',
          action: () => {
            this.targetNode = element;
            this.calculateRoutes();
          },
        });
      }
    return [graphMenu];
  }
}
