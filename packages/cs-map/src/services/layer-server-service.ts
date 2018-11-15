import {
    ILayerServiceOptions,
    ILayerService,
    IStartStopService,
    GeojsonPlusLayer,
    LayerStyle,
    CsMap
} from '..';
import axios from 'axios';
import { MapLayers } from '../classes/map-layers';
import { GeojsonLayer } from '../layers/geojson-layer';
import { LayerSource } from '../classes/layer-source';
import { LinePaint, MapLayerMouseEvent } from 'mapbox-gl';
import { IMapLayer } from '../classes/imap-layer';
import SocketIOClient from 'socket.io-client';
import io from 'socket.io-client';

export class LayerServerServiceOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
    public activeLayers?: string[];
}

export class LayerServerService implements ILayerService, IStartStopService {
    id!: string;
    title?: string | undefined;
    public socket!: SocketIOClient.Socket;

    public options?: LayerServerServiceOptions;
    public type = 'layer-server-service';
    public layers: IMapLayer[] = [];
    public manager?: MapLayers;

    public getInstance(init?: Partial<ILayerService>): IStartStopService {
        let result = new LayerServerService(init);
        return result;
    }

    constructor(init?: Partial<LayerServerService>) {
        Object.assign(this, init);
    }

    initSocket() {
        if (this.options && this.options.url) {
            this.socket = io(this.options.url);
            this.socket.on('connect', () => {
                console.log('Connected');
                // this.socket.emit('events', { test: 'test' });
                //   AppState.Instance.TriggerNotification({ title: 'Connected' });
            });
            this.socket.on('connect_error', error => {
                console.log('Connection error: ' + error);
            });
        }
    }

    async Start(manager: MapLayers) {
        this.manager = manager;
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
                            s.url = this.options.url + 'sources/' + layer.id;
                            s.id = layer.id;
                            s.type = 'geojson';
                            let gl = new GeojsonPlusLayer();
                            gl.source = s;
                            gl.isEditable = layer.isEditable;
                            gl.iconZoomLevel = style.iconZoomLevel;
                            gl.color = layer.color ? layer.color : 'lightgrey';
                            gl.title = layer.title;
                            gl.id = layer.id;
                            gl.extensions = layer.extensions;

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
                            if (this.options.tags) {
                                gl.tags = this.options.tags;
                            }
                            if (layer.tags) {
                                gl.tags = [...gl.tags, ...layer.tags];
                            }
                            if (gl.isEditable) {
                                this.initEditableLayer(gl, layer);
                            }

                            // gl.paint = {
                            //     'line-color': ['get', 'stroke'],
                            //     'line-opacity': ['get', 'stroke-opacity'],
                            //     'line-width': ['get', 'stroke-width']
                            // } as LinePaint;
                            gl.initLayer(manager);
                            manager.layers.push(gl);
                            this.layers.push(gl);
                            console.log('Add ' + gl.id);
                        }

                        if (this.options.activeLayers) {
                            for (const ad of this.options.activeLayers) {
                                const layer = this.layers.find(
                                    l => l.id === ad
                                );
                                if (layer && this.manager) {
                                    console.log('Active layer ' + layer.id);
                                    this.manager.showLayer(layer);
                                }
                            }
                        }
                    }
                })
                .catch(() => {});
        }
        this.initSocket();
    }

    private initEditableLayer(gl: GeojsonPlusLayer, layer: any) {
        // listen to server
        if (this.socket) {
            this.socket.on('layer/' + gl.id, (data: any) => {
                console.log(data);
                gl._manager!.updateLayerSource(gl, data, false);
            });
        }

        gl.events.subscribe('feature', (a: string, f: MapLayerMouseEvent) => {
            if (
                this.manager &&
                this.manager.MapWidget &&
                this.manager.MapWidget.mapDraw
            ) {
                let md = this.manager.MapWidget.mapDraw;
                if (f.features && a === CsMap.FEATURE_SELECT) {
                    let feature = f.features[0];
                    if (feature.properties) {
                        feature.id = feature.properties['_fId'];
                    }
                    var featureIds = md.add(feature);
                    console.log(featureIds);
                }
            }
        });

        // listen to source change events
        gl.events.subscribe('source', (a: string, s: LayerSource) => {
            if (a === 'updated' && this.options) {
                const url = this.options.url + 'sources/' + layer.id;
                console.log(gl._source!._geojson);
                axios
                    .put(url, gl._source!._geojson, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(r => {
                        console.log(r);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        });
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
