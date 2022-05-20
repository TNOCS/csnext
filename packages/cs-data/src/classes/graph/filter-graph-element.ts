import { FeatureType, GraphDatasource, GraphFilter } from '../..';
import { TimeRange } from '../types/time-range';
import { BaseElementProperties, GraphElement } from './graph-element';


export interface IGraphNodeDefinition {
  x?: number;
  y?: number;
  preset?: boolean;
  _element?: GraphElement;
}

export class GraphLayout {
  showInstance? = true;
  showReliability? = false;
  filterTimeline? = false;
  filterStep? = false;
  showExternal? = false;
  focusDate?: Date;
  fitAll?: boolean = false;
  autoFocus? = true;
  showImage? = false;
  showAllOnMap? = true;
  nodeSize?: number;
  radius?: number;
  hiddenTags?: string[];
  hideNodeLabel?: boolean = false;
  hideEdgeLabel?: boolean = false;
  disableCustomNodes?: boolean = false;
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
  /** node seperation for dagre layout in px */
  nodesep?: number;
  /** level seperation for dagre layout in px */
  ranksep?: number;
  defaultEdgeType?: string;
  collideStrength?: number;
  alpha?: number;
  nodeRules?: NodeRule[] = [];
  rulesEnabled?: boolean;
  elementsEnabled?: boolean;
  pinnedFeatureTypes?: string[];
  visibleTags?: string[];  

  mapStyle?: string;
  locationInfo?: string;

  nodes?: { [id: string] : IGraphNodeDefinition};
}

export class SemanticSearch {
  nearText?: string;
  nearEntities?: string[];
}

export class GraphFilterProperties extends BaseElementProperties {
    title?: string;
    showDataModel? = false;
    editor_mode?: 'VIEW' | 'EDIT';
    graphLayout?: GraphLayout;    
    layers?: string[];
    geoFilter?: Number[][];    
    languageFilter?: string[];
    sourcesFilter?: string[];
    timeFilter?: { start: number, end: number};
    semanticSearch?: SemanticSearch;

  }

  
  export class FilterGraphElement extends GraphElement<GraphFilterProperties>
  {
    public static GRAPH_FILTER = 'graph-filter';
    public static VISIBLE_NODES_CHANGED = 'visible-nodes-changed';
    public static RULES_CHANGED = 'rules-changed';
    public _visibleNodes: GraphElement[] = [];
    public _selectedElements: string[] = [];
    public _timeRange?: TimeRange;
    
    public _stats?: {[key: string]: GraphFeatureTypeStat};
    public _tags?: {[key: string]: TagStat}

    constructor(graphSource?: GraphDatasource) {
      super();    
      this._graphSource = graphSource;
    }

    public static addElementRule(preset: FilterGraphElement, element?: GraphElement) {
      if (!preset?.properties?.graphLayout) {
        return;
      }
  
      if (!preset.properties.graphLayout.nodeRules) {
        preset.properties.graphLayout.nodeRules = [];
      }
      preset.properties.graphLayout.nodeRules.unshift({
        type: "ELEMENT",
        _editMode: true,
        elementId: element?.id
      });
  
    }
  
  }

  export class TagStat {
    public count?: number;
    public hide?: boolean;
  }

  export class GraphFeatureTypeStat {
  public _featureType;
  public count?: number;
  public locations?: number;
  public hide?: boolean;
  public color?: string;
  public pinned?: boolean;
}

  
  export class GraphPreset extends FilterGraphElement {


}

  
  export class NodeRule {
    public title?: string;
    public type?: 'TYPE' | 'INCOMMING_TYPE' | 'ELEMENT' | 'DOCUMENT' | 'RELATION' | 'INDICATOR' | 'WORKSPACE' | 'INCOMMING_RELATION' | 'PROPERTY_ELEMENT' | 'CURRENT_ELEMENT';
    public featureType?: string;
    public relationType?: string;
    public elementType?: string;
    public hideSelf?: boolean;
    public id?: string;    
    public elementId?: string;
    public elementIds?: string[];
    public disabled?: boolean;
    public _featureType?: FeatureType;
    public traversal?: boolean;
    public filter?: GraphFilter;
    public outgoingRules?: NodeRule[];
    public _count?: number;
    public _editMode?: boolean;  
    public _element?: GraphElement;    
  }