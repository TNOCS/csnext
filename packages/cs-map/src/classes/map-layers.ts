import { IDatasource, MessageBusService } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { LayerSources, CsMap, IMapLayer, GeojsonLayer } from '../.';
import { guidGenerator } from '@csnext/cs-core';
import { plainToClass } from 'class-transformer';
import {
    FeatureCollection,
    Feature,
    Point,
    LineString,
    Polygon
} from 'geojson';
import {
    LayerServiceBase,
    ILayerService,
    IStartStopService
} from './layer-service';
import { GeoJSONSource, RasterSource, LngLat, LngLatBounds } from 'mapbox-gl';

export class MapLayers implements IDatasource {
    public _sources?: LayerSources;
    public id = 'maplayers';

    public events = new MessageBusService();
    public activeDrawLayer?: IMapLayer;
    private map?: CsMap;
    public get MapWidget(): CsMap | undefined {
        return this.map;
    }

    public set MapWidget(map: CsMap | undefined) {
        this.map = map;
    }

    public get MapControl(): mapboxgl.Map | undefined {
        if (this.MapWidget && this.MapWidget.map) {
            return this.MapWidget.map;
        } else {
            return undefined;
        }
    }

    constructor(
        public layers?: IMapLayer[],
        public sources?: string | LayerSources,
        public services?: IStartStopService[]
    ) {
        this.layers = layers;
    }

    public clearLayers() {
        if (this.layers) {
            this.layers.map(l => {
                this.hideLayer(l);
            });
        }
        this.events.publish('layer', 'cleared');
    }

    public fromGeoJSON(
        geojson: FeatureCollection,
        title?: string
    ): GeojsonLayer {
        let result = new GeojsonLayer();
        result.title = title ? title : 'new layer';
        result.source = new LayerSource();
        result.source.id = guidGenerator();
        result.source.type = 'geojson';
        result.source._geojson = geojson;
        result.source._loaded = true;
        result.initLayer(this);
        return result;
    }

    public showLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            ml.Visible = true;            
            if (this.map) {
                this.map
                    .showLayer(ml)
                    .then(maplayer => {
                        if (ml.isEditable) {
                            this.activeDrawLayer = ml;
                            if (this.MapWidget &&
                                this.MapWidget.mapDraw
                            ) {                                
                                let md = this.MapWidget.mapDraw;
                                // md.set(this.activeDrawLayer._source!._geojson);
                    
                            }
                        }
                        resolve(maplayer);
                    })
                    .catch(() => {
                        reject();
                    });
                this.events.publish('layer', 'enabled', ml);
                // check if not already subscribed to features events
                if (ml.events && !ml._featureEventHandle) {
                    // if not subscribe
                    ml._featureEventHandle = ml.events.subscribe(
                        'feature',
                        (a: string, f: Feature) => {
                            // also publish this event to manager
                            this.events.publish('feature', a, f);
                        }
                    );
                }
            }
        });
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

    public zoomLayer(layer: IMapLayer) {
        if (this.map) {
            this.map.zoomLayer(layer);
        }
    }

    public zoomFeature(layer: IMapLayer, featureId: string) {
        if (!layer._source || !layer._source._geojson || !this.map) return;
        const feature = layer._source._geojson.features.find(
            f => f.id === featureId
        );
        if (!feature) return;
        var coords: [number, number] | undefined = undefined;
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
        if (coords) this.map.map.easeTo({ center: LngLat.convert(coords) });
    }

    public hideLayer(ml: string | IMapLayer) {
        if (!this.layers) return;
        this.events.publish('layer', 'removed', ml);
        if (typeof ml === 'string') {
            let layer = this.layers.find(l => l.id === ml);
            if (layer) this.hideLayer(layer);
        } else {
            // unsubscribe from feature events
            if (ml.events && ml._featureEventHandle !== undefined) {
                ml.events.unsubscribe(ml._featureEventHandle);
                ml._featureEventHandle = undefined;
            }
            if (this.map) {
                this.map.removeLayer(ml);
                this.events.publish('layer', 'disabled', ml);
            }
        }
    }

    public updateLayerFeature(
        ml: IMapLayer | string,
        feature: Feature,
        updateSource = true
    ) {
        let layer: IMapLayer | undefined = undefined;
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
            let index = layer._source._geojson.features.findIndex(
                f => f.id === feature.id
            );
            if (index >= 0) {
                layer._source._geojson.features[index] = feature;
                if (updateSource) {
                    this.updateLayerSource(layer);
                }
            }
        }
    }


    public updateFeatureProperty(
        source: string,
        featureId: number,
        props: any
    ) {
        if (this.MapControl) {
            this.MapControl.setFeatureState(
                { source: source, id: featureId as any },
                props
            );
        }
    }

    public updateSource(source: LayerSource) {
        if (source && source.id && source._geojson && this.MapControl) {
            let mapsource = this.MapControl.getSource(
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

    //    public updateLayerSource(ml: IMapLayer, geojson?: FeatureCollection | string) {
    //        if (!geojson && ml._source && ml._source._geojson) {
    //            geojson = ml._source._geojson;
    //        }
    //        let g = typeof geojson === 'string' ? (JSON.parse(geojson) as FeatureCollection) : geojson;
    //        if (g && ml._source && ml._source.id && this.MapControl) {
    //            let sourceId = ml._source.id;
    //            (this.MapControl.getSource(sourceId) as GeoJSONSource).setData(g);
    //        }
    //        if (ml._source && ml._source.id && ml._source.url && ml._source.type === 'raster' && this.MapControl) {
    //            const wasVisible = ml.Visible;
    //            if (wasVisible && ml._manager!.map!.map!.getLayer(ml.id!)) ml._manager!.map!.map!.removeLayer(ml.id!);
    //            const newSource = {
    //                type: ml._source.type,
    //                tiles: [ml._source.url],
    //                tileSize: ml._source.tileSize
    //            }
    //            if (this.MapControl.getSource(ml._source.id)) this.MapControl.removeSource(ml._source.id);
    //            this.MapControl.addSource(ml._source.id, newSource as RasterSource);
    //            if (wasVisible) ml._manager!.map!.map!.addLayer({id: ml.id!,type: 'raster', source: ml._source.id!});
    //        }
    //        console.log(ml);
    //        // if (ml._source) {
    //        //     this.MapControl.getSource(ml.source)
    //        // }
    //    }

    public updateLayerSource(
        ml: IMapLayer,
        geojson?: FeatureCollection | string,
        triggerEvent = true
    ) {
        if (!geojson && ml._source && ml._source._geojson) {
            geojson = ml._source._geojson;
        }
        let g =
            typeof geojson === 'string'
                ? (JSON.parse(geojson) as FeatureCollection)
                : geojson;
        if (!ml._source && ml.source) {
            ml._source = ml.source as LayerSource;
        }
        if (g && ml._source && ml._source.id && this.MapControl) {
            let sourceId = ml._source.id;
            let source = this.MapControl.getSource(sourceId) as GeoJSONSource;
            if (source && ml.events) {
                source.setData(g);
                if (triggerEvent) {
                    ml.events.publish('source', 'updated', source);
                }
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
            if (wasVisible && ml.id && ml._manager!.map!.map!.getLayer(ml.id))
                ml._manager!.map!.map!.removeLayer(ml.id!);
            const newSource = {
                type: ml._source.type,
                tiles: [ml._source.url],
                tileSize: ml._source.tileSize
            };
            if (this.MapControl.getSource(ml._source.id))
                this.MapControl.removeSource(ml._source.id);
            this.MapControl.addSource(ml._source.id, newSource as RasterSource);
            if (wasVisible)
                ml._manager!.map!.map!.addLayer({
                    id: ml.id!,
                    type: 'raster',
                    source: ml._source.id!
                });
        }
        console.log(ml);
        // if (ml._source) {
        //     this.MapControl.getSource(ml.source)
        // }
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

    public addLayer(ml: IMapLayer): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            if (!ml.type || !this.layers) {
                reject();
                return;
            }
            let layer = this.getLayerInstance(ml.type, ml);
            if (layer) {
                if (!ml.events) {
                    ml.events = new MessageBusService();
                }
                layer.initLayer(this);
                this.layers.push(layer);
                this.showLayer(layer)
                    .then(m => resolve(m))
                    .catch(e => reject(e));
            }
            this.events.publish('layer', 'added', ml);
        });
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

    /** create an instance and initialize all layers */
    private initLayers() {
        let layers: IMapLayer[] = [];
        if (this.layers) {
            for (const l of this.layers) {
                if (l.type) {
                    // create layer instance based on type
                    let li = this.getLayerInstance(l.type, l);
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
        let services: IStartStopService[] = [];
        if (this.services) {
            for (const service of this.services) {
                let si = this.getServiceInstance(service.type, service);
                if (si) {
                    services.push(si);
                }
            }
        }
        this.services = services;
    }
}
