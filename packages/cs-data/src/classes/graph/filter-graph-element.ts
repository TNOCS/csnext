import { FeatureType, GraphDatasource } from '../..';
import { BaseElementProperties, GraphElement } from './graph-element';


export interface IGraphNodeDefinition {
  x?: number;
  y?: number;
  _element?: GraphElement;
}

export class GraphFilterProperties extends BaseElementProperties {
    title?: string;
    showDataModel? = false;
    editor_mode?: 'VIEW' | 'EDIT';
    showInstance? = true;
    showReliability? = false;
    filterTimeline? = false;
    filterStep? = false;
    showExternal? = false;
    focusDate?: Date;
    autoFocus? = true;
    showAllOnMap? = true;
    nodeSize?: number;
    radius?: number;
    hideNodeLabel?: boolean = false;
    hideEdgeLabel?: boolean = false;
    layout?: string = 'circular';
    showAllOnTimeline? = false;
    nodeStrenth?: number;
    linkDistance?: number;
    nodeSpacing?: number;
    labelMaxLength?: number;
    animate?: boolean;
    gravity?: number;
    speed?: number;
    edgeStrength?: number;
    nodeStrength?: number;
    maxIteration?: number = 500;
    rankdir?: string;
    align?: string;
    clustering?: boolean;
    globalFontSize?: number = 12;
    clusterGravity?: number;
    unitRadius?: number;
    kr?: number;
    kg?: number;
    collideStrength?: number;
    alpha?: number;
    nodeRules?: NodeRule[] = [];
    rulesEnabled?: boolean;
    elementsEnabled?: boolean;
    pinnedFeatureTypes?: string[];
    layers?: string[];
    geoFilter?: Number[][];
    nodes?: { [id: string] : IGraphNodeDefinition};
  
  }

  
  export class FilterGraphElement extends GraphElement<GraphFilterProperties>
  {
    public static GRAPH_FILTER = 'graph-filter';
    public static VISIBLE_NODES_CHANGED = 'visible-nodes-changed';
    public static RULES_CHANGED = 'rules-changed';
    public _visibleNodes: GraphElement[] = [];
    public _selectedElements: string[] = [];
    

    public _stats?: {[key: string]: GraphFeatureTypeStat};

    constructor(graphSource?: GraphDatasource) {
      super();    
      this._graphSource = graphSource;
    }
  
  }

  export class GraphFeatureTypeStat {
  public _featureType;
  public count?: number;
  public hide?: boolean;
  public color?: string;
  public pinned?: boolean;
}

  
  export class GraphPreset extends FilterGraphElement {

}

  
  export class NodeRule {
    public title?: string;
    public type?: 'TYPE' | 'ELEMENT' | 'RELATION' | 'PROPERTY_ELEMENT';
    public featureType?: string;
    public relationType?: string;
    public elementType?: string;
    public id?: string;    
    public elementId?: string;
    public disabled?: boolean;
    public _featureType?: FeatureType;
    public traversal?: boolean;
    public filter?: any = {};
    public outgoingRules?: NodeRule[];
    public _count?: number;
    public _editMode?: boolean;  
    public _element?: GraphElement;
  }