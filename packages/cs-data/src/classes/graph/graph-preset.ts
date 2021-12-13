import { BaseElementProperties, BaseGraphFilterProperties, FilterGraphElement, GraphDatasource, GraphElement } from '../../';
import { FeatureType } from '../types/feature-type';

export interface IGraphNodeDefinition {
  x?: number;
  y?: number;
  _element?: GraphElement;
}


// export class FilterGraphElement extends GraphElement {

// }


// export class NodeRule {
//   public title?: string;
//   public type?: 'TYPE' | 'ELEMENT' | 'RELATION' | 'PROPERTY_ELEMENT';
//   public featureType?: string;
//   public relationType?: string;
//   public elementType?: string;
//   public id?: string;    
//   public elementId?: string;
//   public disabled?: boolean;
//   public _featureType?: FeatureType;
//   public traversal?: boolean;
//   public filter?: any = {};
//   public outgoingRules?: NodeRule[];
//   public _count?: number;
//   public _editMode?: boolean;  
//   public _element?: GraphElement;
// }

// export class GraphFeatureTypeStat {
//   public _featureType;
//   public count?: number;
//   public hide?: boolean;
//   public color?: string;
//   public pinned?: boolean;
// }



export class IGraphFilter  {
  public static GRAPH_FILTER = 'graph-filter';
  public static VISIBLE_NODES_CHANGED = 'visible-nodes-changed';
  public static RULES_CHANGED = 'rules-changed';

  // public properties?: { ...super.properties, ...{}}
  //   [key: string]: any;
  //   name?: string;
  //   description?: string;
  //   tags?: string[];
  //   created_time?: number;    
  //   updated_time?: number;
  //   approved_time?: number;
  //   suggested_time?: number;
  //   type?: 'crossfilter' | 'listfilter';
  //   layers?: string[];
  //   title?: string;
  //   syncMode?: 'normal' | 'follow';
  //   nodes?: { [id: string] : IGraphNodeDefinition};
  //   geoFilter?: Number[][];
  //   // is_placeholder?: boolean;
  // } = {};
 
  

    
  // constructor(element?: GraphElement) {
  //   super()
  // }
}



// export class GraphPreset2  {
  
//   public _stats?: {[key: string]: GraphFeatureTypeStat};

//   public static export(preset: GraphPreset): string {
//     return JSON.stringify(
//       { ...preset, ...{ nodes: preset._visibleNodes.map((n) => n.id) } },
//       (k, v) => {
//         if (k.startsWith('_')) return undefined;
//         if (k === 'source') return undefined;
//         return v;
//       }
//     );
//   }


//   public static import(config: string, source: GraphDatasource): GraphPreset {
//     let res = JSON.parse(config) as GraphPreset;
//     // if (res.properties.nodes) {
//     //   res._visibleNodes = [];
//     //   for (const nid of Object.keys(res.nodes)) {
//     //     const element = source.getElement(nid);
//     //     if (element) {
//     //       res._visibleNodes.push(element);
//     //     }
//     //   }
//     // }

//     return res;
//   }
// }
