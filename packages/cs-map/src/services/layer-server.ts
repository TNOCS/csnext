import {
    ILayerService,
    IStartStopService,
    GeojsonPlusLayer,
    MapDatasource,
    LayerSource,
    IMapLayer,
    LayerServerOptions

} from '..';
import axios from 'axios';
import { LinePaint } from 'mapbox-gl';

export class LayerServer implements ILayerService, IStartStopService {
    id!: string;
    title?: string | undefined;

    public options?: LayerServerOptions;
    public type = 'layer-server';
    public layers: IMapLayer[] = [];

    public getInstance(init?: Partial<ILayerService>): IStartStopService {
        let result = new LayerServer(init);
        return result;
    }

    constructor(init?: Partial<LayerServer>) {
        Object.assign(this, init);
    }

    async Start(manager: MapDatasource) {
        this.removeExistingLayers(manager);
        if (this.options && this.options.url) {
            axios
                .get(this.options.url)
                .then(async response => {
                    if (
                        response &&
                        response.data &&
                        this.options &&
                        manager.layers
                    ) {
                        for (const layer of response.data) {
                            let s = new LayerSource();                     
                            if (layer.sourceUrl) {
                                s.url = s.id = layer.sourceUrl;
                                
                            } else {
                                s.url = s.id = this.options.url + layer.id;
                            }
                            s.type = 'geojson';
                            let gl = new GeojsonPlusLayer();
                            gl.source = s;
                            gl.color = layer.color ? layer.color : 'blue';
                            gl.title = layer.title;
                            if (layer.sourceType) {
                                gl.type = layer.sourceType;
                            } else {
                                gl.type = layer.type;
                            }
                            gl.tags = this.options.tags || [];
                            gl.paint = {
                                'line-color': ['get', 'stroke'],
                                'line-opacity': ['get', 'stroke-opacity'],
                                'line-width': ['get', 'stroke-width']
                            } as LinePaint;
                            await gl.initLayer(manager);
                            manager.layers.push(gl);
                            this.layers.push(gl);
                        }
                    }
                })
                .catch(() => {});
        }
    }

    /** remove previously added layers */
    private removeExistingLayers(manager: MapDatasource) {
        if (
            this.layers &&
            this.layers.length > 0 &&
            manager.MapWidget &&
            manager.layers
        ) {
            for (const layer of this.layers) {
                manager.hideLayer(layer);
                manager.layers = manager.layers.filter(l => l.id !== layer.id);
            }
        }
        this.layers = [];
    }

    Stop(manager: MapDatasource) {
        this.removeExistingLayers(manager);
        console.log('Stop service');
    }
}
