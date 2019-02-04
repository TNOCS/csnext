import { LayerSource, LayerStyle, ILayerExtensionType, FeatureType } from "../";

export interface ILayer {
    /** layer id */
    id: string;
    /** layer as shown in interface */
    title: string;
    /** list of tags, used for clustering in layer selection */
    tags: string[];
    sourceType?: string;
    color: string;
    description: string;
    popupContent?: string | Function | undefined;
    opacity?: number;
    source?: string | LayerSource;
    type?: string;
    parentId?: string;
    style?: LayerStyle;
    extensions?: ILayerExtensionType[];
    filter?: any;
    isEditable?: boolean;
    /** toggle visibility of layer */
    Visible?: boolean;
    layout?: mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout;
    paint?: mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint;
    featureTypes?: {[key:string]: FeatureType};
    openFeatureDetails?: boolean;
}