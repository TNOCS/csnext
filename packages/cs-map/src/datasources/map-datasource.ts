import { IDatasource, MessageBusService, MessageBusHandle } from '@csnext/cs-core';
import {
    CsMap,
    IMapLayer,
    GeojsonLayer,
    PropertyDetails,
    IStartStopService,
    LayerSource,
    ILayerService,
    LayerStyle,
    LayerEditor,
    FeatureDetails,
    FeatureEventDetails,
    LayerSources
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
import Vue from 'vue';
import { LayerDetails } from '../components/layer-details/layer-details';
import { FeatureTypes, DataSources, DataCollection, DataSource, DataSet, DataResource, Insight, InsightView } from '@csnext/cs-data';
import { FeatureComponent } from '../components/feature-details/feature-component';

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
            'fill-color': 'gray',
            'fill-opacity': 0.2
        }
    }
} as LayerStyle;

export const SidebarKeys = {
    FEATURE_DETAILS: 'feature_details',
    SOURCE_DETAILS: 'source_details',
    FEATURE_LIST: 'feature_list',
    LAYERS_SELECTION: 'layers_selection'
};
export class MapDatasource extends DataSources {
    public _sources?: LayerSources;
    public id = 'map-datasource';
    private pointPickerHandler?: MessageBusHandle;
    private featurePickerHandler?: MessageBusHandle;
    public events = new MessageBusService();
    public activeDrawLayer?: IMapLayer;
    private map?: CsMap;
    private readonly FEATURE_SIDEBAR_ID = 'feature';
    private readonly LAYER_DETAILS_SIDEBAR_ID = 'layerdetails';

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

    // #endregion Constructors (1)

    // #region Properties (8)


    // #endregion Properties (8)

    // #region Constructors (1)

    constructor(
        public layers?: IMapLayer[],
        sources?: {
            [name: string]: DataSource;
        },
        public services?: IStartStopService[]
    ) {
        super(sources);
        this.layers = layers;
    }

    // #endregion Public Accessors (3)

    // #region Public Methods (28)

    public addGeojsonLayerFromSource(
        title: string,
        source: DataSource,
        style?: LayerStyle,
        args?: IMapLayer
    ): Promise<GeojsonPlusLayer | undefined> {

        return new Promise((resolve, reject) => {
            // load data
            source.loadSource().then(() => {
                const rl = new GeojsonPlusLayer(args);
                if (!rl.id) {
                    rl.id = source.id ? source.id : title;
                }
                rl.title = title;
                rl.openFeatureDetails = true;
                rl.style = style ? style : DEFAULT_LAYER_STYLE;
                rl.source = rl._source = source;
                rl.enabled = true;

                rl.initLayer(this).then(() => {
                    // rl.popupContent = undefined;
                    if (this.layers) {
                        this.layers.push(rl);
                        this.showLayer(rl).then(() => {
                            this.events.publish(CsMap.LAYER, CsMap.LAYER_CREATED, rl);
                            resolve(rl);
                        }).catch(() => {
                            reject();
                        });
                    }
                }).catch(() => {
                    console.log('error loading');
                });
            }).catch(e => {
                console.log(e);
                reject();
            });
        });
    }

    public addGeojsonLayer(
        title: string,
        geojson?: string | DataSet,
        style?: LayerStyle,
        meta?: string | FeatureTypes,
        args?: IMapLayer,
        id?: string
    ): Promise<GeojsonPlusLayer> {
        return new Promise(async (resolve, reject) => {
            const source = new DataSource(geojson);
            source.title = title;
            source.id = (id) ? id : this.sources.hasOwnProperty(title) ? guidGenerator() : title;

            // if meta is provided as a string, it is considered an URL
            if (typeof meta === 'string') {
                source.metaUrl = meta;
            } else {
                source._meta = meta;
            }
            // this.updateSource(source);            
            const layer = await this.addGeojsonLayerFromSource(title, source, style, args);
            resolve(layer);
        });
    }

    public addLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise(async (resolve, reject) => {
            if (!ml.type || !this.layers) {
                reject();
                return;
            }
            const layer = this.getLayerInstance(ml.type, ml);
            if (layer) {
                if (!layer._events) {
                    layer._events = new MessageBusService();
                }
                await layer.initLayer(this);
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
        if (layer && layer._source && layer._source._data) {
            const index = layer._source._data.features.findIndex(
                f => f.id === id
            );

            if (index >= 0) {
                layer._source._data.features.splice(index, 1);
                if (updateSource && layer._source._data.type === 'FeatureCollection') {
                    this.updateLayerSource(layer, layer._source._data);
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
            AppState.Instance.openRightSidebarWidget(
                {
                    component: LayerEditor,
                    data: { layer }
                },
                undefined,
                'edit'
            );
        }
    }

    public async execute(datasources: { [id: string]: IDatasource }): Promise<any> {
        await super.execute(datasources);
        return new Promise(resolve => {
            // if datasource is a string, find actual datasource;
            // if (typeof this.sources === 'string') {
            //     if (datasources.hasOwnProperty(this.sources)) {
            //         this._sources = datasources[this.sources] as DataSources;
            //     }
            // } else {
            //     if (this.sources) {
            //         this._sources = this.sources;
            //     } else {
            //         this._sources = this.sources = new DataSources();
            //     }
            // }
            // initialize services and layers
            this.initServices();
            this.initLayers();
            resolve(this);
        });
    }

    public async fromGeoJSON(
        geojson: FeatureCollection,
        title?: string
    ): Promise<GeojsonLayer> {
        const result = new GeojsonLayer();
        result.title = title ? title : 'new layer';
        result.source = new LayerSource();
        result.source.id = guidGenerator();
        result.source.type = 'geojson';
        result.source._data = geojson;
        result.source._loaded = true;
        await result.initLayer(this);
        return result;
    }

    public hideLayer(ml: string | IMapLayer) {
        if (!this.layers) { return; }
        if (typeof ml === 'string') {
            const layer = this.layers.find(l => l.id === ml);
            if (layer) { this.hideLayer(layer); }
        } else {
            Vue.set(ml, 'visible', false);
            ml.enabled = false;

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
                        .loadSource(ml.featureTypes)
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

    //TODO: implement
    public selectFeature(feature: number | mapboxgl.MapboxGeoJSONFeature | undefined, layer: IMapLayer, open: boolean) {
        if (!feature) { return; }
        if (typeof (feature) === 'number') {
            // if (layer.source && typeof(layer.source) === 'string') {
            //     const source = this.MapControl.getSource(layer.source);

            // }

            if (layer._source && layer._source._loaded && layer._source._data) {
                feature = layer._source._data.features.find(f => f.id === feature) as mapboxgl.MapboxGeoJSONFeature;
                if (open) {
                    this.openFeature(feature, layer);
                }
            }
            // this.MapControl.getBounds()
        } else {
            layer.selectedFeature = feature;
            if (open) {
                this.openFeature(feature, layer);
            }
        }

    }

    public openFeature(feature?: Feature, layer?: IMapLayer) {
        // if (!feature || !layer) { return; }
        AppState.Instance.addSidebar(SidebarKeys.FEATURE_DETAILS, { icon: 'folder_open' });
        AppState.Instance.openRightSidebarWidget(
            {
                id: 'feature-details-component',
                component: FeatureComponent,
                options: {
                    showToolbar: false,
                    toolbarOptions: {
                        backgroundColor: 'primary',
                        dense: true
                    },
                    hideSidebarButton: false
                },
                data: {
                    feature,
                    layer,
                    manager: this
                }
            },
            { open: true },
            SidebarKeys.FEATURE_DETAILS,
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
            AppState.Instance.addSidebar(SidebarKeys.FEATURE_LIST, { icon: 'list' });
            AppState.Instance.openRightSidebarWidget({
                component: LayerDetails,
                options: {
                    showToolbar: false,
                    closeSidebarButton: true,
                    searchProperty: 'listFilter'
                },

                data: { layer, manager: this }
            }, { open: true }, SidebarKeys.FEATURE_LIST, true);
        }
    }

    public refreshLayer(layer: IMapLayer) {
        if (layer.enabled) {
            this.hideLayer(layer);
            this.showLayer(layer);
        }

    }

    public startFeaturePicker(title?: string): Promise<FeatureEventDetails | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.map) { return; }
            if (this.map.featurePickerActivated) {
                reject();
                return;
            }
            AppState.Instance.triggerNotification({
                title: title ? title : 'SELECT_FEATURE', timeout: 0, clickCallback: () => {
                    reject();
                    setTimeout(() => {
                        this.map!.featurePickerActivated = false;
                    }, 100);
                    if (this.featurePickerHandler) {
                        this.events.unsubscribe(this.featurePickerHandler);
                    }
                    return {};
                }
            });
            this.map.featurePickerActivated = true;
            this.featurePickerHandler = this.events.subscribe(CsMap.FEATURE, (a: string, e: any) => {
                if (a === CsMap.FEATURE_SELECT) {
                    if (this.featurePickerHandler) {
                        this.events.unsubscribe(this.featurePickerHandler);
                    }
                    if (e && (e as FeatureEventDetails).features) {
                        resolve(e);
                    }
                    AppState.Instance.clearNotifications();
                    // Wait a moment in order to prevent right menu from opening because of the feature click.
                    setTimeout(() => {
                        this.map!.featurePickerActivated = false;
                    }, 100);
                    return;
                }
            });
        });
    }

    public refreshLayerSource(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            if (ml._source) {
                ml._source._loaded = false;
                ml._source
                    .loadSource(ml.featureTypes)
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

    public removeLegend(layer: IMapLayer, legend: PropertyDetails) { }

    public showLayerById(id: string): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            if (!this.layers) return reject();
            const layer: IMapLayer | undefined = this.layers!.find((l: IMapLayer) => l);
            if (!layer) return reject();
            return this.showLayer(layer);
        });
    }

    public showLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            ml.enabled = true;
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

                this.events.publish(CsMap.LAYER, CsMap.LAYER_ACTIVATED, ml);
                if (ml._events) {
                    ml._events.publish(CsMap.LAYER, CsMap.LAYER_ACTIVATED, ml);
                }
                // check if not already subscribed to features events
                if (ml._events) {
                    ml._busManager.subscribe(ml._events, CsMap.FEATURE, (a: string, f: Feature) => {
                        // also publish this event to manager
                        this.events.publish(CsMap.FEATURE, a, f);
                    })
                    if (ml._events && !ml._featureEventHandle) {
                        // if not, subscribe
                        ml._featureEventHandle = ml._events.subscribe(
                            CsMap.FEATURE,
                            (a: string, f: Feature) => {
                                // also publish this event to manager
                                this.events.publish(CsMap.FEATURE, a, f);
                            }
                        )
                    }

                } else {
                    reject();
                }
            }
        })
    }

    public startPointPicker(title?: string): Promise<LngLat | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.map) { return; }
            if (this.map.pointPickerActivated) {
                reject();
                return;
            }
            AppState.Instance.triggerNotification({
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
            this.pointPickerHandler = this.events.subscribe(CsMap.MAP, (a: string, e: any) => {
                if (a === CsMap.MAP_CLICK) {
                    this.map!.pointPickerActivated = false;
                    if (this.pointPickerHandler) {
                        this.events.unsubscribe(this.pointPickerHandler);
                    }
                    if (e.lngLat) {
                        resolve(e.lngLat);
                    }
                    AppState.Instance.clearNotifications();
                    return;
                }
            });
        });
    }

    public toggleLayer(layer: IMapLayer) {
        if (!layer.enabled) {
            this.showLayer(layer);
        } else {
            this.hideLayer(layer);
        }
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
    public updateLayerFeature(ml: IMapLayer | string, feature: Feature, updateSource = true) {
        let layer: IMapLayer | undefined;
        if (typeof ml === 'string') {
            if (this.layers) {
                layer = this.layers.find(l => l.id === ml);
            }
        } else {
            layer = ml;
        }
        if (layer && layer._source && layer._source._data && feature.id !== undefined) {
            // find existing feature
            const index = layer._source._data.features.findIndex(
                f => f.id === feature.id
            );
            // if found, replace it
            if (index >= 0) {
                layer._source._data.features[index] = feature;
                if (updateSource) {
                    this.updateLayerSource(layer);
                }
            } else {
                // add new feature
                layer._source._data.features.push(feature);
                if (updateSource) {
                    this.updateLayerSource(layer);
                }
            }
        }
    }

    /** Replace/update a collection of features for a given layer */
    public updateLayerFeatures(ml: IMapLayer | string, features: { [key: string]: Feature }, updateSource = true) {
        let layer: IMapLayer | undefined;
        if (typeof ml === 'string') {
            if (this.layers) {
                layer = this.layers.find(l => l.id === ml);
            }
        } else {
            layer = ml;
        }
        if (layer && layer._source && layer._source._data) {
            for (const key in features) {
                if (features.hasOwnProperty(key)) {
                    const feature = features[key];
                    // find existing feature
                    const index = layer._source._data.features.findIndex(
                        f => f.id === key
                    );

                    // if found, replace it
                    if (index >= 0) {
                        layer._source._data.features[index] = feature;
                    } else {
                        // add new feature
                        layer._source._data.features.push(feature);
                    }
                }
            }
            if (updateSource) {
                this.updateLayerSource(layer);
            }
        }
    }

    public updateLayerSource(ml: IMapLayer, geojson?: DataCollection | string, triggerEvent = true) {
        if (!geojson && ml._source && ml._source._data) {
            geojson = ml._source._data;
        }
        const g =
            typeof geojson === 'string'
                ? (JSON.parse(geojson) as FeatureCollection)
                : geojson;
        if (!ml._source && ml.source) {
            ml._source = ml.source as LayerSource;
        }

        if (g && g.type === 'FeatureCollection' && ml._source && ml._source.id && this.MapControl) {
            ml._source._data = g;
            const sourceId = ml._source.id;
            const source = this.MapControl.getSource(sourceId) as GeoJSONSource;
            if (source && ml._events) {
                source.setData(g as FeatureCollection);
                if (triggerEvent) {
                    ml._events.publish(CsMap.SOURCE, CsMap.SOURCE_UPDATED, source);
                }
                ml._events.publish(CsMap.LAYER, CsMap.LAYER_UPDATED, ml);
            }
        }
        if (ml._source && ml._source.id && ml._source.url && ml._source.type === 'raster' && this.MapControl) {
            const wasEnabled = ml.enabled;
            if (wasEnabled && ml.id && ml._manager!.map!.map!.getLayer(ml.id)) {
                ml._manager!.map!.map!.removeLayer(ml.id!);
            }
            const newSource = {
                type: ml._source.type,
                tiles: [ml._source.url],
                tileSize: 256
            };
            if (this.MapControl.getSource(ml._source.id)) {
                this.MapControl.removeSource(ml._source.id);
            }
            this.MapControl.addSource(ml._source.id, newSource as RasterSource);
            if (wasEnabled) {
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

    public updateDataSet(sourceId: string, data: DataSet): DataSource {
        const s = super.updateDataSet(sourceId, data);
        if (this.MapControl) {
            // update mapbox source
            const source = this.MapControl.getSource(sourceId) as GeoJSONSource;
            if (source && data.type === 'FeatureCollection') {
                source.setData(data as FeatureCollection);
            }
        }
        return s;
    }

    public updateSource(source: LayerSource): DataSource {
        const s = super.updateSource(source);
        if (source && source.id && source._data && this.MapControl) {
            const mapsource = this.MapControl.getSource(
                source.id
            ) as GeoJSONSource;
            if (mapsource) {
                this.updateDataSet(source.id, source._data);
            } else if (this.map) {
                this.map.addSource(source);
                // this.map.initLayerSource(source);
            }
        }
        return s;
    }

    public zoomFeature(feature: Feature | mapboxgl.MapboxGeoJSONFeature, zoomLevel?: number) {
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
        if (!layer._source || !layer._source._data || !this.map) { return; }
        const feature = layer._source._data.features.find(
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
    }


    /** create an instance and initialize all layers */
    private async initLayers() {
        const layers: IMapLayer[] = [];
        if (this.layers) {
            for (const l of this.layers) {
                if (l.type) {
                    // create layer instance based on type
                    const li = this.getLayerInstance(l.type, l);
                    if (li) {
                        await li.initLayer(this);
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
