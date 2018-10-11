import { IDatasource, MessageBusService } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { MapLayer, LayerSources, Map } from '../.';
import { guidGenerator } from '@csnext/cs-core';
import { plainToClass } from 'class-transformer';
import { FeatureCollection, Feature } from 'geojson';
import { LayerServiceBase } from './layer-service';
import { GeoJSONSource } from 'mapbox-gl';

export class MapLayers implements IDatasource {
    public _sources?: LayerSources;
    public id = 'maplayers';

    public events = new MessageBusService();
    private map?: Map;
    public get MapWidget(): Map | undefined {
        return this.map;
    }

    public set MapWidget(map: Map | undefined) {
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
        public layers?: MapLayer[],
        public sources?: string | LayerSources,
        public services?: LayerServiceBase[]
    ) {
        this.layers = layers;
    }

    public clearLayers() {
        if (this.layers) {
            this.layers.map(l => {
                this.hideLayer(l);
            });
        }
    }

    public fromGeoJSON(geojson: FeatureCollection, title?: string): MapLayer {
        let result = new MapLayer();
        result.title = title ? title : 'new layer';
        result.source = new LayerSource();
        result.source.id = guidGenerator();
        result.source.type = 'geojson';
        result.source._geojson = geojson;
        result.source._loaded = true;
        this.initLayer(result);
        return result;
    }

    public showLayer(ml: MapLayer): Promise<MapLayer> {
        return new Promise((resolve, reject) => {
            ml.Visible = true;
            if (this.map) {
                this.map
                    .showLayer(ml)
                    .then(maplayer => {
                        resolve(maplayer);
                    })
                    .catch(() => {
                        reject();
                    });
            }
            this.events.publish('layer', 'enabled', ml);
        });
    }

    public loadLayer(ml: MapLayer): Promise<MapLayer> {
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

    public hideLayer(ml: string | MapLayer) {
        if (!this.layers) return;
        if (typeof ml === 'string') {
            let layer = this.layers.find(l => l.id === ml);
            if (layer) this.hideLayer(layer);
        } else {
            if (this.map) {
                this.map.removeLayer(ml);
                // this.events.publish('layer', 'disabled', ml);
            }
        }
    }

    public updateLayerFeature(
        ml: MapLayer | string,
        feature: Feature,
        updateSource = true
    ) {
        let layer : MapLayer | undefined = undefined;
        if (typeof ml === 'string') {
            if (this.layers) { layer = this.layers.find(l=>l.id === ml); }
        } else {
            layer = ml;
        }        
        if (layer && layer._source && layer._source._geojson && feature.id !== undefined) {
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

    public updateLayerSource(
        ml: MapLayer,
        geojson?: FeatureCollection | string
    ) {
        if (!geojson && ml._source && ml._source._geojson) {
            geojson = ml._source._geojson;
        }
        let g =
            typeof geojson === 'string'
                ? (JSON.parse(geojson) as FeatureCollection)
                : geojson;

        if (g && ml._source && ml._source.id && this.MapControl) {
            let sourceId = ml._source.id;
            (this.MapControl.getSource(sourceId) as GeoJSONSource).setData(g);
        }
        console.log(ml);
        // if (ml._source) {
        //     this.MapControl.getSource(ml.source)
        // }
    }

    public addLayer(ml: MapLayer): Promise<MapLayer> {
        return new Promise((resolve, reject) => {
            let layer = this.initLayer(ml);
            if (this.layers) {
                this.layers.push(layer);
                this.showLayer(layer)
                    .then(m => resolve(m))
                    .catch(e => reject(e));
            }
        });
    }

    public initLayer(ml: MapLayer): MapLayer {
        // check if we need to create an instance first of maplayer (needed if imported from json)
        let l = (typeof ml.getBounds === "function") ? ml : plainToClass(MapLayer, ml);

        // add reference to this maplayers manager
        l._manager = this;

        if (l.id === undefined) {
            l.id = guidGenerator();
        }
        if (typeof l.source === 'string') {
            if (
                this._sources &&
                this._sources.layers.hasOwnProperty(l.source)
            ) {
                l._source = this._sources.layers[l.source];
            }
        } else {
            l._source = l.source = plainToClass(LayerSource, l.source);
        }
        if (l.title === undefined && l._source && l._source.id) {
            l.title = l._source.id;
        }
        l._initialized = true;
        return l;
    }

    public execute(datasources: { [id: string]: IDatasource }): Promise<any> {
        return new Promise(resolve => {
            let result: MapLayer[] = [];
            if (typeof this.sources === 'string') {
                if (datasources.hasOwnProperty(this.sources)) {
                    this._sources = datasources[this.sources] as LayerSources;
                }
            } else {
                this._sources = this.sources;
            }

            if (this.layers) {
                this.layers.map(l => {
                    result.push(this.initLayer(l));
                });
                this.layers = result;
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }
}
