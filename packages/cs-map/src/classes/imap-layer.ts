import {LayerSource, MapLayers, CsMap, ILayerAction, ILayerService, ILayer, PropertyType, PropertyDetails} from '..';
import {MessageBusService, MessageBusHandle} from '@csnext/cs-core';
import { LayerLegend } from './layer-legend';

export interface IMapLayerType {
    typeId?: string;
    types?: string[];
    getInstance?: (init?: Partial<any>) => IMapLayer;
}

export interface IMapLayer extends ILayer {
    getBounds(): any;    
    _source?: LayerSource;
    _manager?: MapLayers;    
    addLayer(map: CsMap);
    initLayer(manager: MapLayers);
    setOpacity(value: number);
    getLayerActions?(): ILayerAction[];
    removeLayer(map: CsMap);
    moveLayer(beforeId?: string);    
    updateLayer();
    updateLegends();
    setLegend(property: PropertyDetails | PropertyType | string, refreshLayer: boolean);
    _events?: MessageBusService;
    _legends?: LayerLegend[];
    
    /** associated service */
    _service?: ILayerService;
    _showMenu?: boolean;
    _showMore?: boolean;
    _featureEventHandle?: MessageBusHandle;
}
