import { ShapeOptions } from '@antv/g6-core';
import { IMenu } from '@csnext/cs-core';
import { GraphElement } from '@csnext/cs-data';
import { DocDatasource } from '../..';

export class GraphShape {
    public name!: string;
    public shape!: ShapeOptions;
    public extendType?: string;
    public menu?: IMenu;
    public hideLabel?: boolean;
    public actions?: {[action: string]: (edge: GraphElement, source: DocDatasource) => Promise<boolean>}
}


export class GraphNodeShape extends GraphShape {}
export class GraphEdgeShape extends GraphShape {}

export class GraphShapeDefinitions {
    public nodes : GraphNodeShape[] = [];
    public edges : GraphEdgeShape[] = [];

}