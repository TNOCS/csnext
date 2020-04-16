import { IMapLayer, CsMap } from '..';
import { GeojsonLayer } from './geojson-layer';

export class GridLayer extends GeojsonLayer {
    public typeId = 'line';
    public types = ['grid'];

    constructor(init?: Partial<IMapLayer>) {
        super();
        Object.assign(this, init);
        // this.events = new MessageBusService();
    }

    public getInstance(init?: Partial<IMapLayer>) {
        const result = new GridLayer(init);
        return result;
    }

    public addLayer(map: CsMap) {
        super.addLayer(map);
        this.enabled = true;
    }

}
