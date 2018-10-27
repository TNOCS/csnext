import { LayerSource, MapLayers, CsMap,ILayerAction } from '..';
import { MessageBusService } from '@csnext/cs-core';

export interface IMapLayerType {
    typeId?: string;
    types?: string[];
    getInstance?: (init?: Partial<any>) => IMapLayer;
}

export interface IMapLayer {
    getBounds(): any;
    /** layer id */
    id?: string;
    /** layer as shown in interface */
    title?: string;
    /** list of tags, used for clustering in layer selection */
    tags?: string[];
    color?: string;
    description?: string;
    popupContent?: string | Function | undefined;
    opacity?: number;
    source?: string | LayerSource;
    _source?: LayerSource;
    _manager?: MapLayers;
    type?: string;
    parentId?: string;
    addLayer(map: CsMap);
    initLayer(manager: MapLayers);
    getLayerActions() : ILayerAction[];
    events?: MessageBusService;
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
    removeLayer(map: CsMap);

    /** toggle visibility of layer */
    Visible?: boolean;
    _showMenu?: boolean;
    _showMore?: boolean;
}