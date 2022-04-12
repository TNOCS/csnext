import { IMenu } from "@csnext/cs-core";
import NetworkGraph  from "./../../graph.vue";
import GraphMap from "./../../graph-map.vue";
import GraphTags from "./graph-tags.vue";
import { DocDatasource } from "../../../../";
import { GraphElement } from "@csnext/cs-data";

import { Graph } from '@antv/g6';
import { IGraphPlugin } from "./../graph-plugin";

export class GraphTagsPlugin implements IGraphPlugin {
  public name = "tags";
  public graphComponent!: NetworkGraph;
  public source!: DocDatasource;
  
  
  public get graph() : Graph {
    return (this.graphComponent as any).graph as Graph;
  }

  public init(source: DocDatasource, graphComponent?: NetworkGraph, mapComponent?: GraphMap) {
    this.source = source;
    this.graphComponent = graphComponent!;
  }

  public getComponentMenuItems(): IMenu[] {
    return [
      {
        id: 'tags',
      icon: 'mdi-tag',
      location: 'footer',
      plugin: this,
      title: 'Tags',
      component: GraphTags,
      },
    ];
  }

  public getContextMenuItems(element: GraphElement): IMenu[] {
    return [];
  }
}
