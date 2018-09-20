import { IDatasource, MessageBusService } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { MapLayer, LayerSources, Map } from '../.';
import { guidGenerator } from '@csnext/cs-core';
import { plainToClass } from 'class-transformer';
import { FeatureCollection } from 'geojson';

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
        public sources?: string | LayerSources
    ) {
        this.layers = layers;
    }

    public clearLayers() {
        if (this.layers) {
            this.layers.map(l => {
                this.disableLayer(l);
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

    public enableLayer(ml: MapLayer) {
        if (ml._source && this.layers) {
            if (this.layers.findIndex(l => l.id === ml.id) === -1) {
                this.layers.push(ml);
            }
            if (this.map) {
                this.map.enableLayer(ml);
            }
            // this.events.publish('layer', 'enabled', ml);
        }
    }

    public disableLayer(ml: string | MapLayer) {
        if (!this.layers) return;
        if (typeof ml === 'string') {
            let layer = this.layers.find(l => l.id === ml);
            if (layer) this.disableLayer(layer);
        } else {
            if (this.map) {
                this.map.disableLayer(ml);
                // this.events.publish('layer', 'disabled', ml);
            }
        }
    }

    public initLayer(ml: MapLayer): MapLayer {
        let l = plainToClass(MapLayer, ml);
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
            l._source = l.source;
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
