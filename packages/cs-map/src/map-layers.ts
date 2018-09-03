import { IDatasource, IProject, MessageBusService } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { MapLayer } from '.';
import { guidGenerator } from '@csnext/cs-core';
import { LayerSources } from './';
import { plainToClass } from 'class-transformer';
import { FeatureCollection } from 'geojson';
import axios from 'axios';

export class MapLayers implements IDatasource {
    public _sources?: LayerSources;
    public id = 'maplayers';
    public events = new MessageBusService();

    constructor(
        public layers?: (string | MapLayer)[],
        public sources?: string | LayerSources
    ) {
        this.layers = layers;
    }

    public enableLayer(ml: MapLayer) {
        if (ml._source) {
            ml._source.LoadSource().then(gj => {
                this.events.publish('layer', 'enabled', ml);
            });
        }
        console.log('Enable');
    }

    public disableLayer(ml: MapLayer) {
        console.log('Disable');
        this.events.publish('layer', 'disabled', ml);
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
                    if (typeof l === 'string') {
                        if (
                            this._sources &&
                            this._sources.layers.hasOwnProperty(l)
                        ) {
                            result.push(
                                this.initLayer({
                                    id: l,
                                    source: this._sources.layers[l]
                                } as MapLayer)
                            );
                        }
                    } else {
                        result.push(this.initLayer(l));
                    }
                });
                this.layers = result;
                resolve(this);
            } else {
                resolve(this);
            }
        });
    }
}
