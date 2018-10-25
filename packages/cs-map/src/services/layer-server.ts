import {
    LayerServiceBase,
    LayerServiceOptions,
    ILayerServiceOptions,
    ILayerService,
    IStartStopService
} from '..';
import axios from 'axios';
import { MapLayers } from '../classes/map-layers';
import { GeojsonLayer } from '../layers/geojson-layer';
import { guidGenerator } from '@csnext/cs-core';
import { LayerSource } from '../classes/layer-source';
import { LinePaint } from 'mapbox-gl';

export class LayerServerOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
}

export class LayerServer implements ILayerService, IStartStopService {
    id!: string;
    title?: string | undefined;

    public options?: LayerServerOptions;
    public type = 'layer-server';

    public getInstance(init?: Partial<ILayerService>): IStartStopService {
        let result = new LayerServer(init);
        return result;
    }

    constructor(init?: Partial<LayerServer>) {
        Object.assign(this, init);
    }

    async Start(manager: MapLayers) {
        if (this.options && this.options.url) {
            axios
                .get(this.options.url)
                .then(response => {
                    if (
                        response &&
                        response.data &&
                        this.options &&
                        manager.layers
                    ) {
                        for (const layer of response.data) {
                            let s = new LayerSource();
                            s.url = s.id = this.options.url + layer.id;
                            s.type = 'geojson';
                            let gl = new GeojsonLayer();
                            gl.source = s;
                            gl.title = layer.title;
                            gl.type = 'line';
                            gl.tags = this.options.tags;
                            gl.paint = {
                                'line-color': ['get', 'stroke'],
                                'line-opacity': ['get', 'stroke-opacity'],
                                'line-width': ['get', 'stroke-width']
                            } as LinePaint;
                            gl.initLayer(manager);
                            manager.layers.push(gl);
                        }
                    }
                })
                .catch(e => {
                    // reject(e);
                });
        }
    }

    Stop() {
        console.log('Stop service');
    }
}
