import { IDatasource, MessageBusService, MessageBusHandle, MessageBusManager } from '@csnext/cs-core';
import {
    LayerSources,
    CsMap,
    IMapLayer,
    GeojsonLayer,
    PropertyDetails,
    IStartStopService,
    LayerSource,
    ILayerService,
    LayerStyle,
    LayerEditor,
    FeatureDetails
} from '../.';

import { guidGenerator } from '@csnext/cs-core';
import { plainToClass } from 'class-transformer';
import {
    FeatureCollection,
    Feature,
    Point,
    LineString,
    Polygon
} from 'geojson';

import { GeoJSONSource, RasterSource, LngLat } from 'mapbox-gl';
import { AppState } from '@csnext/cs-client';
import { GeojsonPlusLayer } from '../layers/geojson-plus-layer';
import { FeatureTypes } from '../classes/feature-type';
import Vue from 'vue';
import { LayerDetails } from '../components/layer-details/layer-details';

const DEFAULT_LAYER_STYLE = {
    mapbox: {
        circlePaint: {
            'circle-radius': 10,
            'circle-color': 'red'
        },
        linePaint: {
            'line-width': 2,
            'line-color': 'red'
        },
        fillPaint: {
            'fill-color': 'blue',
            'fill-opacity': 0.2
        }
    }
} as LayerStyle;

export class MapDatasource implements IDatasource {

    // #endregion Constructors (1)

    // #region Public Accessors (3)

    public get MapControl(): mapboxgl.Map | undefined {
        if (this.MapWidget && this.MapWidget.map) {
            return this.MapWidget.map;
        } else {
            return undefined;
        }
    }

    public get MapWidget(): CsMap | undefined {
        return this.map;
    }

    public set MapWidget(map: CsMap | undefined) {
        this.map = map;
    }

    public _sources?: LayerSources;
    public activeDrawLayer?: IMapLayer;
    public events = new MessageBusService();
    public id = 'map-datasource';
    // #region Properties (8)

    private readonly FEATURE_SIDEBAR_ID = 'feature';
    private readonly LAYER_DETAILS_SIDEBAR_ID = 'layerdetails';

    private map?: CsMap;
    private pointPickerHandler?: MessageBusHandle;

    // #endregion Properties (8)

    // #region Constructors (1)

    constructor(
        public layers?: IMapLayer[],
        public sources?: string | LayerSources,
        public services?: IStartStopService[]
    ) {
        this.layers = layers;
    }

    // #endregion Public Accessors (3)

    // #region Public Methods (28)

    public addGeojsonLayer(title: string, geojson?: string | FeatureCollection, style?: LayerStyle, tags?: string[], featureTypes?: string | FeatureTypes, defaultFeatureType?: string): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            const source = new LayerSource();
            if (typeof geojson === 'string') {
                source.url = geojson;
            } else {
                source._geojson = geojson;
                source._loaded = true;
            }

            source.title = title;
            source.id = guidGenerator();
            source.LoadSource().then(s => {
                const rl = new GeojsonPlusLayer();
                rl.id = title;
                rl.tags = tags ? tags : ['general'];
                rl.type = 'poi';
                rl.title = title;
                rl.defaultFeatureType = defaultFeatureType;
                rl.openFeatureDetails = true;
                rl.style = style ? style : DEFAULT_LAYER_STYLE;
                rl.source = rl._source = source;
                if (typeof featureTypes === 'string') {
                    rl.featureTypesUrl = featureTypes;
                } else {
                    rl.featureTypes = featureTypes;
                }

                rl.initLayer(this).then(r => {
                    // rl.popupContent = undefined;
                    if (this.layers) {
                        this.layers.push(rl);
                        this.showLayer(rl).then(l => {
                            resolve(rl);
                        });
                    }
                }).catch(e => {
                    console.log('error loading');
                });

            }).catch(e => {
                console.log(e);
                reject();
            });
        });
    }

    public addLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            if (!ml.type || !this.layers) {
                reject();
                return;
            }
            const layer = this.getLayerInstance(ml.type, ml);
            if (layer) {
                if (!layer._events) {
                    layer._events = new MessageBusService();
                }
                layer.initLayer(this);
                this.layers.push(layer);
                if (layer.style) {
                    // if specified, set default legend
                    if (layer.style.defaultLegendProperty) {
                        layer.setLegend(layer.style.defaultLegendProperty, false);
                    }
                }
                this.showLayer(layer)
                    .then(m => resolve(m))
                    .catch(e => reject(e));
            }
            this.events.publish('layer', 'added', layer);
        });
    }

    public clearLayers() {
        if (this.layers) {
            this.layers.map(l => {
                this.hideLayer(l);
            });
        }
        this.events.publish('layer', 'cleared');
    }

    /** delete feature from a feature  */
    public deleteLayerFeature(
        ml: IMapLayer | string,
        id: string,
        updateSource = true
    ) {
        let layer: IMapLayer | undefined;
        if (typeof ml === 'string') {
            if (this.layers) {
                layer = this.layers.find(l => l.id === ml);
            }
        } else {
            layer = ml;
        }
        if (layer && layer._source && layer._source._geojson) {
            const index = layer._source._geojson.features.findIndex(
                f => f.id === id
            );

            if (index >= 0) {
                layer._source._geojson.features.splice(index, 1);
                if (updateSource) {
                    this.updateLayerSource(layer, layer._source._geojson);
                }
            }
        }
    }

    public editLayer(layer: IMapLayer | string) {
        if (typeof layer === 'string') {
            if (this.layers) {
                const l = this.layers.find(la => la.id === layer);
                if (l) { this.editLayer(l); }
            }
        } else {
            AppState.Instance.OpenRightSidebarWidget(
                {
                    component: LayerEditor,
                    data: { layer }
                },
                undefined,
                'edit'
            );
        }
    }

    public execute(datasources: { [id: string]: IDatasource }): Promise<any> {
        return new Promise(resolve => {
            // if datasource is a string, find actual datasource;
            if (typeof this.sources === 'string') {
                if (datasources.hasOwnProperty(this.sources)) {
                    this._sources = datasources[this.sources] as LayerSources;
                }
            } else {
                this._sources = this.sources;
            }

            // initialize services and layers
            this.initServices();
            this.initLayers();
            resolve(this);
        });
    }

    public fromGeoJSON(
        geojson: FeatureCollection,
        title?: string
    ): GeojsonLayer {
        const result = new GeojsonLayer();
        result.title = title ? title : 'new layer';
        result.source = new LayerSource();
        result.source.id = guidGenerator();
        result.source.type = 'geojson';
        result.source._geojson = geojson;
        result.source._loaded = true;
        result.initLayer(this);
        return result;
    }

    public hideLayer(ml: string | IMapLayer) {
        if (!this.layers) { return; }
        if (typeof ml === 'string') {
            const layer = this.layers.find(l => l.id === ml);
            if (layer) { this.hideLayer(layer); }
        } else {
            Vue.set(ml, 'Visible', false);
            ml.Visible = false;

            // unsubscribe all subscriptions
            ml._busManager.stop();

            if (this.map) {
                if (this.activeDrawLayer === ml) {
                    this.activeDrawLayer = undefined;
                    this.events.publish(
                        CsMap.DRAWLAYER,
                        CsMap.DRAWLAYER_DEACTIVATED,
                        ml
                    );
                }
                this.map.removeLayer(ml);
                this.events.publish('layer', 'disabled', ml);
            }
            this.events.publish('layer', 'removed', ml);
        }
    }

    public loadLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise(async (resolve, reject) => {
            if (this.layers) {
                if (this.layers.findIndex(l => l.id === ml.id) === -1) {
                    this.layers.push(ml);
                }

                if (ml.source) {
                    ml._source = plainToClass(LayerSource, ml.source);
                    ml._source
                        .LoadSource()
                        .then(() => {
                            resolve(ml);
                        })
                        .catch(() => {
                            reject();
                        });
                }
            }
        });
    }

    public moveLayer(layer: IMapLayer, beforeId?: string) {
        layer.moveLayer(beforeId);
    }

    public openFeature(feature: Feature, layer: IMapLayer) {
        if (!feature || !layer) { return; }
        AppState.Instance.AddSidebar('feature', { icon: 'folder_open' });
        AppState.Instance.OpenRightSidebarWidget(
            {
                id: 'feature-details-component',
                component: FeatureDetails,
                options: {
                    showToolbar: false,
                    searchProperty: 'filter',
                    toolbarOptions: {
                        backgroundColor: 'primary',
                        dense: true
                    },
                    hideSidebarButton: true
                },
                data: {
                    feature,
                    layer,
                    manager: this
                }
            },
            { open: true },
            this.FEATURE_SIDEBAR_ID,
            true
        );
    }

    public openLayer(layer: IMapLayer | string) {
        if (typeof layer === 'string') {
            if (this.layers) {
                const l = this.layers.find(la => la.id === layer);
                if (l) { this.openLayer(l); }
            }
        } else {
            AppState.Instance.AddSidebar(this.LAYER_DETAILS_SIDEBAR_ID, { icon: 'list' });
            AppState.Instance.OpenRightSidebarWidget({
                component: LayerDetails,
                options: {
                    showToolbar: false,
                    closeSidebarButton: true,
                    searchProperty: 'listFilter'
                },

                data: { layer, manager: this }
            }, { open: true }, this.LAYER_DETAILS_SIDEBAR_ID, true);
        }
    }

    public refreshLayer(layer: IMapLayer) {
        if (layer.Visible) {
            this.hideLayer(layer);
            this.showLayer(layer);
        }
    }

    public refreshLayerSource(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            if (ml._source) {
                ml._source._loaded = false;
                ml._source
                    .LoadSource()
                    .then(() => {
                        this.updateLayerSource(ml, undefined, false);
                        resolve(ml);
                    })
                    .catch(e => {
                        reject(e);
                    });
            } else {
                reject();
            }
        });
    }

    public refreshLayers() {
        if (this.layers) {
            for (const layer of this.layers) {
                this.refreshLayer(layer);
            }
        }
    }

    public removeLayer(layerId: string) {
        if (!this.layers) { return; }
        this.hideLayer(layerId);
        this.layers = this.layers.filter(l => l.id !== layerId);
    }

    public removeLegend(layer: IMapLayer, pd: PropertyDetails) { }

    public showLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            ml.Visible = true;
            if (this.map) {
                this.map
                    .showLayer(ml)
                    .then(maplayer => {
                        if (ml.isEditable) {
                            this.activeDrawLayer = ml;
                            this.events.publish(
                                CsMap.DRAWLAYER,
                                CsMap.DRAWLAYER_ACTIVATED,
                                ml
                            );
                        }
                        resolve(maplayer);
                    })
                    .catch(() => {
                        reject();
                    });

                this.events.publish('layer', 'enabled', ml);
                // check if not already subscribed to features events
                if (ml._events) {
                    ml._busManager.subscribe(ml._events, 'feature', (a: string, f: Feature) => {
                        // also publish this event to manager
                        this.events.publish('feature', a, f);
                    }
                    );
                }
            }
        });
    }

    public startPointPicker(title?: string): Promise<LngLat | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.map) { return; }
            if (this.map.pointPickerActivated) {
                reject();
                return;
            }
            AppState.Instance.TriggerNotification({
                title: title ? title : 'SELECT_POINT', timeout: 0, clickCallback: () => {
                    reject();
                    this.map!.pointPickerActivated = false;
                    if (this.pointPickerHandler) {
                        this.events.unsubscribe(this.pointPickerHandler);
                    }
                    return {};
                }
            });

            this.map.pointPickerActivated = true;
            this.pointPickerHandler = this.events.subscribe('map', (a: string, e: any) => {
                if (a === CsMap.MAP_CLICK) {
                    this.map!.pointPickerActivated = false;
                    if (this.pointPickerHandler) {
                        this.events.unsubscribe(this.pointPickerHandler);
                    }
                    if (e.lngLat) {
                        resolve(e.lngLat);
                    }
                    AppState.Instance.ClearNotifications();
                    return;
                }
            });
        });
    }

    public toggleLayer(layer: IMapLayer) {
        if (!layer.Visible) {
            this.showLayer(layer);
        } else {
            this.hideLayer(layer);
        }
        console.log(layer.title, layer.Visible);
    }

    public updateFeatureProperty(
        source: string,
        featureId: number,
        props: any
    ) {
        if (this.MapControl) {
            this.MapControl.setFeatureState(
                { source, id: featureId as any },
                props
            );
        }
    }

    /** Replace/update a feature for a given layer */
    public updateLayerFeature(
        ml: IMapLayer | string,
        feature: Feature,
        updateSource = true
    ) {
        let layer: IMapLayer | undefined;
        if (typeof ml === 'string') {
            if (this.layers) {
                layer = this.layers.find(l => l.id === ml);
            }
        } else {
            layer = ml;
        }
        if (
            layer &&
            layer._source &&
            layer._source._geojson &&
            feature.id !== undefined
        ) {
            // find existing feature
            const index = layer._source._geojson.features.findIndex(
                f => f.id === feature.id
            );
            // if found, replace it
            if (index >= 0) {
                layer._source._geojson.features[index] = feature;
                if (updateSource) {
                    this.updateLayerSource(layer);
                }
            } else {
                // add new feature
                layer._source._geojson.features.push(feature);
                if (updateSource) {
                    this.updateLayerSource(layer);
                }
            }
        }
    }

    /** Replace/update a collection of features for a given layer */
    public updateLayerFeatures(
        ml: IMapLayer | string,
        features: { [key: string]: Feature },
        updateSource = true
    ) {
        let layer: IMapLayer | undefined;
        if (typeof ml === 'string') {
            if (this.layers) {
                layer = this.layers.find(l => l.id === ml);
            }
        } else {
            layer = ml;
        }
        if (
            layer &&
            layer._source &&
            layer._source._geojson
        ) {
            for (const key in features) {
                if (features.hasOwnProperty(key)) {
                    const feature = features[key];
                    // find existing feature
                    const index = layer._source._geojson.features.findIndex(
                        f => f.id === key
                    );

                    // if found, replace it
                    if (index >= 0) {
                        layer._source._geojson.features[index] = feature;
                    } else {
                        // add new feature
                        layer._source._geojson.features.push(feature);
                    }
                }
            }

            if (updateSource) {
                this.updateLayerSource(layer);
            }
        }
    }

    public updateLayerSource(
        ml: IMapLayer,
        geojson?: FeatureCollection | string,
        triggerEvent = true
    ) {
        if (!geojson && ml._source && ml._source._geojson) {
            geojson = ml._source._geojson;
        }
        const g =
            typeof geojson === 'string'
                ? (JSON.parse(geojson) as FeatureCollection)
                : geojson;
        if (!ml._source && ml.source) {
            ml._source = ml.source as LayerSource;
        }

        if (g && ml._source && ml._source.id && this.MapControl) {
            ml._source._geojson = g;
            const sourceId = ml._source.id;
            const source = this.MapControl.getSource(sourceId) as GeoJSONSource;
            if (source && ml._events) {
                source.setData(g);
                if (triggerEvent) {
                    ml._events.publish('source', 'updated', source);
                }
                ml._events.publish('layer', CsMap.LAYER_UPDATED, ml);
            }
        }
        if (
            ml._source &&
            ml._source.id &&
            ml._source.url &&
            ml._source.type === 'raster' &&
            this.MapControl
        ) {
            const wasVisible = ml.Visible;
            if (wasVisible && ml.id && ml._manager!.map!.map!.getLayer(ml.id)) {
                ml._manager!.map!.map!.removeLayer(ml.id!);
            }
            const newSource = {
                type: ml._source.type,
                tiles: [ml._source.url],
                tileSize: ml._source.tileSize
            };
            if (this.MapControl.getSource(ml._source.id)) {
                this.MapControl.removeSource(ml._source.id);
            }
            this.MapControl.addSource(ml._source.id, newSource as RasterSource);
            if (wasVisible) {
                ml._manager!.map!.map!.addLayer({
                    id: ml.id!,
                    type: 'raster',
                    source: ml._source.id!
                });
            }
        }
        // if (ml._source) {
        //     this.MapControl.getSource(ml.source)
        // }
    }

    public updateSource(source: LayerSource) {
        if (source && source.id && source._geojson && this.MapControl) {
            const mapsource = this.MapControl.getSource(
                source.id
            ) as GeoJSONSource;
            if (mapsource) {
                mapsource.setData(source._geojson);
            } else if (this.map) {
                this.map.addSource(source);
                // this.map.initLayerSource(source);
            }
        }
    }

    public zoomFeature(feature: Feature, zoomLevel?: number) {
        if (!this.map) {
            return;
        }
        let coords: [number, number] | undefined;
        if (feature.geometry.type === 'Point') {
            coords = (feature.geometry as Point).coordinates as [
                number,
                number
            ];
        } else if (feature.geometry.type === 'LineString') {
            coords = (feature.geometry as LineString).coordinates[0] as [
                number,
                number
            ];
        } else if (feature.geometry.type === 'Polygon') {
            coords = (feature.geometry as Polygon).coordinates[0][0] as [
                number,
                number
            ];
        }
        if (coords) {
            this.map.map.flyTo({
                center: LngLat.convert(coords),
                zoom: zoomLevel ? zoomLevel : this.map.map.getZoom()
            });
        }
    }

    public zoomFeatureId(layer: IMapLayer, featureId: string) {
        if (!layer._source || !layer._source._geojson || !this.map) { return; }
        const feature = layer._source._geojson.features.find(
            f => f.id === featureId || f.properties!._fId === featureId
        );
        if (!feature) { return; }
        let coords: [number, number] | undefined;
        if (feature.geometry.type === 'Point') {
            coords = (feature.geometry as Point).coordinates as [
                number,
                number
            ];
        } else if (feature.geometry.type === 'LineString') {
            coords = (feature.geometry as LineString).coordinates[0] as [
                number,
                number
            ];
        } else if (feature.geometry.type === 'Polygon') {
            coords = (feature.geometry as Polygon).coordinates[0][0] as [
                number,
                number
            ];
        }
        if (coords) { this.map.map.easeTo({ center: LngLat.convert(coords) }); }
    }

    public zoomLayer(layer: IMapLayer, padding?: number) {
        if (this.map) {
            this.map.zoomLayer(layer, padding);
        }
    }

    // #endregion Public Methods (28)

    // #region Private Methods (4)

    /** Create a IMapLayer instance based on layer type, optionally provide maplayer config */
    private getLayerInstance(
        type: string,
        init?: IMapLayer
    ): IMapLayer | undefined {
        const layerType = CsMap.layerTypes.find(
            lt => lt.types !== undefined && lt.types.includes(type)
        );
        if (!layerType || !layerType.getInstance) {
            return;
        }
        const res = layerType.getInstance(init);
        res._manager = this;
        return res;
    }

    private getServiceInstance(
        type: string,
        init?: ILayerService
    ): IStartStopService | undefined {
        const serviceType = CsMap.serviceTypes.find(st => st.type === type);
        if (serviceType && serviceType.getInstance) {
            const res = serviceType.getInstance(init);
            return res;
        }
        return;
    }

    /** create an instance and initialize all layers */
    private initLayers() {
        const layers: IMapLayer[] = [];
        if (this.layers) {
            for (const l of this.layers) {
                if (l.type) {
                    // create layer instance based on type
                    const li = this.getLayerInstance(l.type, l);
                    if (li) {
                        li.initLayer(this);
                        layers.push(li);
                    }
                }
            }
        } else {
        }
        this.layers = layers;
    }

    /** create an instance and initialize all services */
    private initServices() {
        const services: IStartStopService[] = [];
        if (this.services) {
            for (const service of this.services) {
                const si = this.getServiceInstance(service.type, service);
                if (si) {
                    services.push(si);
                }
            }
        }
        this.services = services;
    }

    // #endregion Private Methods (4)
}

// tslint:disable-next-line: max-classes-per-file
export class MapLayers extends MapDatasource {
}
