import {
    ILayerServiceOptions,
    ILayerService,
    IStartStopService,
    GeojsonPlusLayer,
    LayerStyle
} from '..';
import axios from 'axios';
import { MapLayers } from '../classes/map-layers';
import { GeojsonLayer } from '../layers/geojson-layer';
import { LayerSource } from '../classes/layer-source';
import { LinePaint } from 'mapbox-gl';
import { IMapLayer } from '../classes/imap-layer';

export class LayerServerServiceOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
}

export class LayerServerService implements ILayerService, IStartStopService {
    id!: string;
    title?: string | undefined;

    public options?: LayerServerServiceOptions;
    public type = 'layer-server-service';
    public layers: IMapLayer[] = [];

    public getInstance(init?: Partial<ILayerService>): IStartStopService {
        let result = new LayerServerService(init);
        return result;
    }

    constructor(init?: Partial<LayerServerService>) {
        Object.assign(this, init);
        
    }

    async Start(manager: MapLayers) {
        this.removeExistingLayers(manager);
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
                            let style = layer.style as LayerStyle;                         
                            let s = new LayerSource();                     
                            if (layer.sourceUrl) {
                                s.url = s.id = layer.sourceUrl;
                                
                            } else {
                                s.url = s.id = this.options.url + layer.id;
                            }
                            s.type = 'geojson';
                            let gl = new GeojsonPlusLayer();
                            gl.source = s;
                            gl.iconZoomLevel = style.iconZoomLevel;
                            gl.color = layer.color ? layer.color : 'lightgrey';
                            gl.title = layer.title;
                            gl.style = style;
                            if (layer.sourceType) {
                                gl.type = layer.sourceType;
                            } else {
                                gl.type = layer.type;
                            }
                            gl.tags = this.options.tags;
                            // gl.paint = {
                            //     'line-color': ['get', 'stroke'],
                            //     'line-opacity': ['get', 'stroke-opacity'],
                            //     'line-width': ['get', 'stroke-width']
                            // } as LinePaint;
                            gl.initLayer(manager);
                            manager.layers.push(gl);
                            this.layers.push(gl);
                        }
                    }
                })
                .catch(() => {});
        }
    }

    /** remove previously added layers */
    private removeExistingLayers(manager: MapLayers) {
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

    Stop(manager: MapLayers) {
        this.removeExistingLayers(manager);
        console.log('Stop service');
    }
}
