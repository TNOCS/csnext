import {
    ILayerServiceOptions,
    ILayerService,
    IStartStopService,
    GeojsonPlusLayer,
    LayerStyle,
    CsMap,
    LayerServiceOptions,
    ILayerAction,
    ILayer
} from '..';
import axios from 'axios';
import { MapLayers } from '../classes/map-layers';
import { LayerSource } from '../classes/layer-source';
import { IMapLayer } from '../classes/imap-layer';
import io from 'socket.io-client';
import { Feature } from 'geojson';
import { LayerServiceEditor } from '../components/layer-service-editor/layer-service-editor';
import { LinePaint, LineLayout } from 'mapbox-gl';
import { MapboxStyles } from '../classes/layer-style';

export class LayerServerServiceOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
    public activeLayers?: string[];
    public openFeatureDetails?: boolean;
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
            this.socket.on('reconnect', () => {
                console.log('Reconnected');
                for (const layer of this.layers) {
                    if (layer.isEditable === true) {
                        this.manager!.refreshLayerSource(layer).then(() => {
                            console.log('Layer refreshed');
                        });

                        // });
                        // this.manager!
                        // .loadLayer(layer).then( l => {
                    }
                }
            });
            this.socket.on('disconnected', () => {
                for (const layer of this.layers) {
                    if (layer.isEditable === true && layer._source) {
                        layer._source._loaded = false;
                    }
                }
                console.log('Connection lost');
            });
            this.socket.on('time', data => {
                console.log(data);
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
                        for (const layer of response.data as ILayer[]) {
                            let style = layer.style as LayerStyle;
                            // style.mapbox = new MapboxStyles({
                                                 
                            // });

                            let s = new LayerSource();
                            if (!layer.color) { layer.color = 'blue'; }
                            s.url = this.options.url + 'sources/' + layer.id;
                            s.id = layer.id;
                            s.type = 'geojson';                            
                            let gl = new GeojsonPlusLayer();
                            gl._service = this;
                            gl.source = s;
                            gl.openFeatureDetails = true;
                            gl.isEditable = layer.isEditable;
                            gl.iconZoomLevel = style.iconZoomLevel;
                            gl.color = layer.color ? layer.color : 'blue';
                            gl.title = layer.title;
                            gl.id = layer.id;
                            gl.extensions = layer.extensions;

                            gl.style = style;
                            if (gl.style && gl.style.popup) {
                                console.log(gl.style.popup);
                            }
                            if (layer.sourceType) {
                                // gl.type = layer.sourceType;
                            } else {
                                // gl.type = layer.type;
                            }
                            // if (layer.style && layer.style.mapbox) {
                            //     gl._symbolLayout =
                            //         layer.style.mapbox.symbolLayout;
                            //     gl._symbolPaint = layer.style.mapbox.symbolPaint;
                            //     gl._circlePaint = layer.style.mapbox.circlePaint;
                            //     gl._fillPaint = layer.style.mapbox.fillPaint;
                            //     gl._linePaint = layer.style.mapbox.linePaint;
                            // }
                            gl.tags = [];
                            if (this.options.tags) {
                                gl.tags = this.options.tags;
                            }
                            if (layer.tags) {
                                gl.tags = [...gl.tags, ...layer.tags];
                            }
                            if (layer.featureTypes) {
                                gl.featureTypes = layer.featureTypes;
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
                            gl._events.subscribe(
                                'feature',
                                (a: string, f: Feature) => {
                                    if (
                                        a === CsMap.FEATURE_SELECT &&
                                        this.options!.openFeatureDetails
                                    ) {
                                        // MainBus.events.publish(
                                        //     'rightsidebar',
                                        //     'open-widget',
                                        //     {
                                        //         component: FeatureDetails,
                                        //         data: {
                                        //             feature: f,
                                        //             layer: layer,
                                        //             manager: this
                                        //         }
                                        //     }
                                        // );
                                        // console.log(AppStateBase.Instance.bus);
                                    }
                                }
                            );
                            this.layers.push(gl);
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

    public updateLayer(layer: IMapLayer) {
        if (this.options) {            
            const url = this.options.url + 'layers/' + layer.id;
            const def = JSON.parse(JSON.stringify(layer, (key, value) => {
                if (key.startsWith('_')) {
                    return undefined;
                }
                return value;
            }));
            console.log(def);            
            // axios
            //     .put(url, def, {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //     .then(r => {
            //         console.log(r);
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     });
        }
    }

    public getLayerActions(layer: IMapLayer): ILayerAction[] {
        let res: ILayerAction[] = [];
        res.push({
            title: 'Edit',
            action: () => {
                this.manager!.MapWidget!.$cs.OpenRightSidebarWidget({
                    component: LayerServiceEditor,
                    data: { layer: layer, service: this }
                });
            }
        });
        return res;
    }

    private get mapDraw(): any {
        if (
            this.manager &&
            this.manager.MapWidget &&
            this.manager.MapWidget.mapDraw
        ) {
            return this.manager.MapWidget.mapDraw;
        }
    }

    private initEditableLayer(gl: GeojsonPlusLayer, layer: any) {
        // listen to server
        if (this.socket) {
            this.socket.on('layer/' + gl.id, (data: any) => {
                console.log('got data from socket');
                if (
                    data.hasOwnProperty('lastUpdatedBy') &&
                    data['lastUpdatedBy'] === this.socket.id
                ) {
                    console.log('Was updated by me');
                } else {
                    gl._manager!.updateLayerSource(gl, data, false);
                }

                if (this.mapDraw) {
                    this.mapDraw.deleteAll();
                }
            });
        }

        gl._events.subscribe('feature', (a: string, f: any) => {
            let md = this.mapDraw;

            if (md && f.features && a === CsMap.FEATURE_SELECT) {
                let feature = f.features[0];
                if (feature.properties) {
                    feature.id = feature.properties['_fId'];
                }
                let all = md.getAll();
                console.log(all);
                var featureIds = md.add(feature);
                //
                md.changeMode('simple_select', {
                    featureIds: [featureIds[0]]
                });

                if (feature.geometry.type !== 'Point') {
                    md.changeMode('direct_select', {
                        featureId: featureIds[0]
                    });
                }

                // if (f.context.type !== 'touchend') {

                // }

                console.log(featureIds);
            }
        });

        // listen to source change events
        gl._events.subscribe('source', (a: string) => {
            if (a === 'updated' && this.options) {
                const url = this.options.url + 'sources/' + layer.id;
                let body = gl._source!._geojson;
                if (body) {
                    body['lastUpdatedBy'] = this.socket.id;
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
