import { IDatasource } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { DataSet } from '@csnext/cs-data';
import { plainToClass } from 'class-transformer';

export class LayerSources implements IDatasource {

    public images: { [id: string]: string } = {};

    public layers: { [name: string]: LayerSource } = {};

    constructor(layers: { [name: string]: LayerSource }, images?: { [id: string]: string }) {
        this.layers = {};
        for (const l in layers) {
            if (layers.hasOwnProperty(l)) {
                const layer = layers[l];
                this.layers[l] = this.initSource(l, layer);
            }
        }
        if (images) {
            this.images = images;
        }
    }

    public updateLayerSource(id: string, geojson: DataSet) {
        const s = new LayerSource();
        s._data = geojson;
        s.id = id;
        s._loaded = true;
        this.layers[id] = s;
    }

    public initSource(id: string, source: LayerSource): LayerSource {
        source.id = id;
        return plainToClass(LayerSource, source);
    }

    public execute(): Promise<any> {
        return new Promise(resolve => {
            resolve(this);
        });
    }
}
