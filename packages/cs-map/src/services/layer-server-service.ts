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
                .get(this.options.url + 'layers/')
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
                            // if (layer.sourceUrl) {
                            //     s.url = s.id = layer.sourceUrl;
                                
                            // } else {
                                s.url = s.id = this.options.url + 'sources/' + layer.id;
                            // }
                            s.type = 'geojson';
                            let gl = new GeojsonPlusLayer();
                            gl.source = s;
                            gl.isEditable = layer.isEditable;
                            gl.iconZoomLevel = style.iconZoomLevel;
                            gl.color = layer.color ? layer.color : 'lightgrey';
                            gl.title = layer.title;
                            gl.id = layer.id;
                            
                            gl.style = style;
                            if (layer.sourceType) {
                                gl.type = layer.sourceType;
                            } else {
                                gl.type = layer.type;
                            }
                            if (layer.style && layer.style.mapbox) {
                                gl.circlePaint = layer.style.mapbox.circlePaint;
                            }
                            gl.tags = [];
                            if (this.options.tags) { gl.tags = this.options.tags; }
                            if (layer.tags) { gl.tags = [...gl.tags, ...layer.tags]; }
                            if (gl.isEditable) {                               
                                gl.events.subscribe('source',(a: string, s: LayerSource) => {
                                    if (a === 'updated' && this.options) {
                                        const url = this.options.url + 'sources/' + layer.id;
                                        console.log(gl._source!._geojson);
                                        axios.put(url, gl._source!._geojson, { headers: { 'Content-Type' : 'application/json'}}).then(
                                            r => {
                                                console.log(r);
                                            }).catch( e => {
                                                console.log(e);
                                            })
                                        }                    
                                })
                            }
                            
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
