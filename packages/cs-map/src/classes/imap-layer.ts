import { MapDatasource, CsMap, ILayerAction, ILayerService, PropertyDetails, FeatureEventDetails, ILayerExtensionType, LayerFilter, LayerStyle, ILayerExtension } from '..';
import { MessageBusService, MessageBusManager, MessageBusHandle } from '@csnext/cs-core';
import { LayerLegend } from './layer-legend';
import { PropertyType, DataSource, FeatureTypes, FeatureType } from '@csnext/cs-data';

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
    state?: 'hidden' | 'loading' | 'visible';
    enabled?: boolean;
    sourceType?: string;
    color: string;
    description: string;
    logo?: string;
    popupContent?: string | Function | undefined;
    opacity?: number;
    source?: string | DataSource;
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
    // visible?: boolean;
    // layout?: mapboxgl.Layout; // | mapboxgl.FillLayout | mapboxgl.LineLayout | mapboxgl.CircleLayout;
    // paint?: mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.FillPaint | mapboxgl.CirclePaint;
    openFeatureDetails?: boolean;
    hideInLayerList?: boolean;
    featureTypes?: FeatureTypes;
    selectedFeature?: mapboxgl.MapboxGeoJSONFeature;

    // #region Properties (10)
    _busManager: MessageBusManager;
    _events?: MessageBusService;
    _legends?: LayerLegend[];
    _filters?: { [key: string]: LayerFilter };
    _manager?: MapDatasource;
    _extensions: ILayerExtension[];
    /** associated service */
    _service?: ILayerService;
    _showMenu?: boolean;
    _showMore?: boolean;
    _source?: DataSource;
    _featureEventHandle?: MessageBusHandle;

    // #endregion Properties (10)

    // #region Methods (12)

    addLayer(widget: CsMap);
    getBounds(): any;
    getLayerActions?(): ILayerAction[];
    initLayer(manager: MapDatasource): Promise<IMapLayer>;
    moveLayer(beforeId?: string);
    removeLayer(widget: CsMap);
    setFilter(filter: any[]);
    initFilter(property: string);
    applyFilter(filter: LayerFilter);
    removeFilter(filter: LayerFilter);
    setLegend(property: PropertyDetails | PropertyType | string, refreshLayer: boolean);
    setOpacity(value: number);
    setPopupContent(value: string | ((f: FeatureEventDetails) => {}));
    updateLayer();
    updateLegends();
    updateFilters();
    getFeatureType(): FeatureType | undefined;
    // #endregion Methods (12)
}
