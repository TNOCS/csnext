import {
    ILayerService,
    IStartStopService,
    GeojsonPlusLayer,
    LayerStyle,
    CsMap,
    ILayerAction,
    LayerServerServiceOptions,
    IFeatureAction,
    MapDatasource,
    LayerSource,
    IMapLayer,
    LayerEditor
} from '..';
import axios from 'axios';

export class LayerServerService implements ILayerService, IStartStopService {

    public get socket(): SocketIOClient.Socket | undefined {
        if (this.manager && this.manager.MapWidget) {
            return this.manager.MapWidget.$cs.socket;
        }
    }

    public get mapDraw(): any {
        if (
            this.manager &&
            this.manager.MapWidget &&
            this.manager.MapWidget.mapDraw
        ) {
            return this.manager.MapWidget.mapDraw;
        }
        return;
    }
    public id!: string;
    public title?: string | undefined;
    // public socket!: SocketIOClient.Socket;

    public options?: LayerServerServiceOptions;
    public type = 'layer-server-service';
    public layers: IMapLayer[] = [];
    public manager?: MapDatasource;

    constructor(init?: Partial<LayerServerService>) {
        Object.assign(this, init);
    }

    public getInstance(init?: Partial<ILayerService>): IStartStopService {
        const result = new LayerServerService(init);
        return result;
    }

    public async Start(manager: MapDatasource) {
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
                        for (const layer of response.data as IMapLayer[]) {
                            const style = layer.style as LayerStyle;
                            // style.mapbox = new MapboxStyles({

                            // });

                            const s = new LayerSource();
                            if (!layer.color) {
                                layer.color = 'blue';
                            }
                            s.url = this.options.url + 'sources/' + layer.id;
                            s.id = layer.id;
                            s.type = 'geojson';
                            const gl = new GeojsonPlusLayer();
                            gl._service = this;
                            gl.source = s;
                            gl.openFeatureDetails = true;
                            gl.isEditable = layer.isEditable;
                            gl.isLive = layer.isLive;
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
                            } else {
                                if (gl.isLive) {
                                    this.initLiveLayer(gl, layer);
                                }
                            }

                            // gl.paint = {
                            //     'line-color': ['get', 'stroke'],
                            //     'line-opacity': ['get', 'stroke-opacity'],
                            //     'line-width': ['get', 'stroke-width']
                            // } as LinePaint;
                            gl.initLayer(manager);
                            manager.layers.push(gl);
                            gl._events.subscribe('feature', (a: string) => {
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
                            });
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
                .catch((e) => { console.log(e); });
        }
    }

    public disableLayerSocket(gl: GeojsonPlusLayer) {
        if (this.socket && this.socket !== undefined) {
            this.socket.off('layer/' + gl.id);
            this.socket.off('layer/' + gl.id + '/features');
        }
    }

    public initLayerSocket(gl: GeojsonPlusLayer) {

        if (this.socket && this.socket !== undefined) {

            if (gl.Visible) {
                // listen to complete layer updates

                this.socket.on('layer/' + gl.id, (data: any) => {
                    this.updateLiveLayer(data, gl);
                });

                this.socket.on('layer/' + gl.id + '/features', (data: { [fid: string]: IFeatureAction }) => {
                    console.log('Got features');
                    this.updateLiveLayerFeatures(data, gl, true);
                });

            }
        }
    }

    // save layer in backend
    public updateLayer(layer: IMapLayer) {
        if (this.options && this.options.url) {
            const def = JSON.parse(
                JSON.stringify(layer, (key, value) => {
                    if (key.startsWith('_')) {
                        return undefined;
                    }
                    return value;
                })
            );
            delete def.source;

            console.log(def);
            const url = this.options.url + 'layers/' + layer.id;
            console.log(this.options);
            axios
                .put(url, def, {
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

    public getLayerActions(layer: IMapLayer): ILayerAction[] {
        const res: ILayerAction[] = [];
        res.push({
            title: 'Edit',
            action: () => {
                this.manager!.editLayer(layer);
                // AppState.Instance.OpenRightSidebarWidget({
                //     component: LayerEditor,
                //     data: { layer, service: this }
                // }, undefined, 'layers');
                // this.manager!.MapWidget!.$cs.OpenRightSidebarWidget({
                //     component: LayerServiceEditor,
                //     data: { layer: layer, service: this }
                // });
            }
        });
        return res;
    }

    public Stop(manager: MapDatasource) {
        this.removeExistingLayers(manager);
        console.log('Stop service');
    }

    private initLiveLayer(gl: GeojsonPlusLayer, layer: any) {
        this.initLayerSocket(gl);

        gl._events.subscribe('layer', (a: string, d: any) => {
            switch (a) {
                case CsMap.LAYER_ACTIVATED:
                    this.initLayerSocket(gl);
                    break;
                case CsMap.LAYER_DISABLED:
                    this.disableLayerSocket(gl);
                    break;
            }
        });
    }

    /** update live layer, after complete update */
    private updateLiveLayer(data: any, gl: GeojsonPlusLayer) {
        if (
            this.socket &&
            data.hasOwnProperty('lastUpdatedBy') &&
            data.lastUpdatedBy === this.socket.id
        ) {
            // updated by myself
        } else {
            gl._manager!.updateLayerSource(gl, data, false);
        }
        if (this.mapDraw) {
            this.mapDraw.deleteAll();
        }
    }

    /** update live layer, after feature update */
    private updateLiveLayerFeature(data: IFeatureAction, gl: GeojsonPlusLayer, forceUpdate = true) {
        if (this.manager && this.socket && data.action) {
            switch (data.action) {
                case 'update':
                    this.manager.updateLayerFeature(gl, data.feature, forceUpdate);
                    break;
                case 'delete':
                    if (data.feature && data.feature.hasOwnProperty('id')) {
                        this.manager.deleteLayerFeature(gl, data.feature.id as string, forceUpdate);
                    }
                    break;
            }
        }
    }

    /** update live layer, after feature update */
    private updateLiveLayerFeatures(data: { [fid: string]: IFeatureAction }, gl: GeojsonPlusLayer, forceUpdate = true) {
        for (const id in data) {
            if (data.hasOwnProperty(id)) {
                const featureAction = data[id];
                this.updateLiveLayerFeature(featureAction, gl, false);

            }
        }
        if (forceUpdate && this.manager) {
            // update source
            this.manager.updateLayerSource(gl);
        }
    }

    private initEditableLayer(gl: GeojsonPlusLayer, layer: any) {
        // listen to server
        this.initLiveLayer(gl, layer);

        gl._events.subscribe('feature', (a: string, f: any) => {
            const md = this.mapDraw;

            if (md && f.features && a === CsMap.FEATURE_SELECT) {
                const feature = f.features[0];
                if (feature.properties) {
                    feature.id = feature.properties._fId;
                }
                const all = md.getAll();
                console.log(all);
                const featureIds = md.add(feature);
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
                const body = gl._source!._geojson;
                if (body && this.socket) {
                    // tslint:disable-next-line:no-string-literal
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
}
