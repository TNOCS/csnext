import { IMenu } from "@csnext/cs-core";
import { NetworkGraph, DocDatasource, GraphMap } from "../../..";
import { GraphElement } from "@csnext/cs-data";


export interface IGraphPlugin {
  name?: string;
  init(source: DocDatasource, graphComponent?: NetworkGraph, mapComponent?: GraphMap): void;
  getComponentMenuItems?(): IMenu[];
  getContextMenuItems?(element: GraphElement): IMenu[];
}

