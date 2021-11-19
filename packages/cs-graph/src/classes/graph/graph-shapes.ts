import { ShapeOptions } from '@antv/g6-core';
import { IMenu } from '@csnext/cs-core';

export class GraphShape {
    public name!: string;
    public shape!: ShapeOptions;
    public extendType?: string;
    public menu?: IMenu;
}

export class GraphNodeShape extends GraphShape {}
export class GraphEdgeShape extends GraphShape {}

export class GraphShapeDefinitions {
    public nodes : GraphNodeShape[] = [];
    public edges : GraphEdgeShape[] = [];

}