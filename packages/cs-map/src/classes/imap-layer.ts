import { LayerSource, MapDatasource, CsMap, ILayerAction, ILayerService, PropertyType, PropertyDetails, FeatureEventDetails, FeatureTypes, ILayerExtensionType, LayerStyle, LayerFilter } from '..';
import { MessageBusService, MessageBusHandle, MessageBusManager } from '@csnext/cs-core';
import { LayerLegend } from './layer-legend';
import { FeatureType } from './feature-type';

export interface IMapLayerType {
    // #region Properties (3)

    getInstance?: (init?: Partial<any>) => IMapLayer;
    typeId?: string;
    types?: string[];

    // #endregion Properties (3)
}

export interface IMapLayer {

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
    /* link to external source url */
    externalUrl?: string;
    isEditable?: boolean;
    isLive?: boolean;
    /** toggle visibility of layer */
    Visible?: boolean;
    layout?: mapboxgl.SymbolLayout | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout;
    paint?: mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint;
    openFeatureDetails?: boolean;

    // #region Properties (10)

    _busManager: MessageBusManager;

    _events?: MessageBusService;
    _legends?: LayerLegend[];
    _filters?: { [key: string]: LayerFilter };
    _manager?: MapDatasource;
    /** associated service */
    _service?: ILayerService;
    _showMenu?: boolean;
    _showMore?: boolean;
    _source?: LayerSource;
    featureTypes?: FeatureTypes;
    hideInLayerList?: boolean;

    // #endregion Properties (10)

    // #region Methods (12)

    addLayer(map: CsMap);
    getBounds(): any;
    getLayerActions?(): ILayerAction[];
    initLayer(manager: MapDatasource);
    moveLayer(beforeId?: string);
    removeLayer(map: CsMap);
    setFilter(filter: any[]);
    initFilter(property: string);
    applyFilter(filter: LayerFilter);
    setLegend(property: PropertyDetails | PropertyType | string, refreshLayer: boolean);
    setOpacity(value: number);
    setPopupContent(value: string | ((f: FeatureEventDetails) => {}));
    updateLayer();
    updateLegends();
    updateFilters();
    getFeatureType(): FeatureType | undefined;
    getPropertType(prop: string): PropertyType | undefined;


    // #endregion Methods (12)
}
