import { LayerSource, LayerStyle, FeatureType } from './';

export interface ILayer {
    /** layer id */
    id: string;
    /** layer as shown in interface */
    title: string;
    /** list of tags, used for clustering in layer selection */
    tags?: string[];
    sourceType?: string;
    color?: string;
    description?: string;
    // tslint:disable-next-line:ban-types
    popupContent?: string | Function | undefined;
    opacity?: number;
    source?: string | LayerSource;
    type?: string;
    parentId?: string;
    style?: LayerStyle;
    extensions?: any[];
    filter?: any;
    isEditable?: boolean;
    isLive?: boolean;
    /** toggle visibility of layer */
    Visible?: boolean;
    layout?:
        | mapboxgl.SymbolLayout
        | mapboxgl.FillLayout
        | mapboxgl.LineLayout
        | mapboxgl.CircleLayout;
    paint?:
        | mapboxgl.SymbolPaint
        | mapboxgl.LinePaint
        | mapboxgl.FillPaint
        | mapboxgl.CirclePaint;
    featureTypes?: { [key: string]: FeatureType };
    openFeatureDetails?: boolean;
}
