import { IDatasource, guidGenerator } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { plainToClass } from 'class-transformer';
import { FeatureCollection } from 'geojson';

export class LayerSources implements IDatasource {
    public id = 'layersources';

    public updateLayerSource(id: string, geojson: FeatureCollection) {
        let s = new LayerSource();
        s._geojson = geojson;
        s.id = id;
        s._loaded = true;
        this.layers[id] = s;        
    }

    public images: { [id: string]: string} = {};

    public layers: { [name: string]: LayerSource } = {};

    constructor(layers: { [name: string]: LayerSource }, images?: { [id: string]: string}) {
        this.layers = {};
        for (var l in layers) {
            this.layers[l] = this.initSource(l, layers[l]);
        }
        if (images) {
            this.images = images;
        }
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
