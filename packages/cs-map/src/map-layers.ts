import { IDatasource, IProject, MessageBusService } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { MapLayer } from '.';
import { guidGenerator } from '@csnext/cs-core';
import { LayerSources } from './';
import { plainToClass } from 'class-transformer';
import { FeatureCollection } from 'geojson';

export class MapLayers implements IDatasource {
    public _sources?: LayerSources;
    public id = 'maplayers';
    public events = new MessageBusService();

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
            this.layers.push(ml);
            ml._source.LoadSource().then(gj => {
                this.events.publish('layer', 'enabled', ml);
            });
        }
        console.log('Enable');
    }

    public disableLayer(ml: string | MapLayer) {
        console.log('Disable');
        if (!this.layers) return;
        if (typeof ml === 'string') {
            let layer = this.layers.find(l => l.id === ml);
            if (layer) this.disableLayer(layer);
        } else {
            this.layers = this.layers.filter(l => l.id !== ml.id);
            this.events.publish('layer', 'disabled', ml);
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

            if (
                this.layers === undefined &&
                this._sources &&
                this._sources.layers
            ) {
                this.layers = [];
                for (var s in this._sources.layers) {
                    this.layers.push(s);
                }
            }

            if (this.layers) {
                this.layers.map(l => {
                    // if (typeof l === 'string') {
                    //     if (
                    //         this._sources &&
                    //         this._sources.layers.hasOwnProperty(l)
                    //     ) {
                    //         result.push(
                    //             this.initLayer({
                    //                 id: l,
                    //                 source: this._sources.layers[l]
                    //             } as MapLayer)
                    //         );
                    //     }
                    // } else {
                    result.push(this.initLayer(l));
                    // }
                });
                this.layers = result;
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }
}
