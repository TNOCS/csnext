import {LayerSource, MapLayers, CsMap, ILayerAction} from '..';
import {MessageBusService} from '@csnext/cs-core';
import { ILayerExtensionType} from './ilayer-extension';

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
    setOpacity(value: number);
    getLayerActions(): ILayerAction[];
    removeLayer(map: CsMap);
    events?: MessageBusService;
    extensions?: ILayerExtensionType[];
    filter?: any;
    layout?: mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout;
    paint?: mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint;

    /** toggle visibility of layer */
    Visible?: boolean;
    _showMenu?: boolean;
    _showMore?: boolean;
}
