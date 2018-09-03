import { IDatasource, guidGenerator } from '@csnext/cs-core';
import { LayerSource } from './layer-source';
import { plainToClass } from 'class-transformer';

export class LayerSources implements IDatasource {
    public id = 'layersources';

    public layers: { [name: string]: LayerSource } = {};

    constructor(layers: { [name: string]: LayerSource }) {
        this.layers = {};
        for (var l in layers) {
            this.layers[l] = this.initSource(l, layers[l]);
        }
    }

    public initSource(id: string, source: LayerSource) : LayerSource {        
        source.id = id;        
        return plainToClass(LayerSource, source);
    }

    public execute(): Promise<any> {
        return new Promise(resolve => {
            resolve(this);
        });
    }
}
