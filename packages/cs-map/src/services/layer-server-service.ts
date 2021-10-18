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
import { DataSource } from '@csnext/cs-data';

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

    public async updateLayerList() {
        if (!this.options) { return; }
        axios
            .get(this.options.url + 'layers/')
            .then(async response => {
                if (
                    response &&
                    response.data &&
                    this.options &&
                    this.manager && 
                    this.manager.layers
                ) {
                    for (const layer of response.data as IMapLayer[]) {
                        const style = layer.style as LayerStyle;                        

                        const s = new LayerSource();
                        if (!layer.color) {
                            layer.color = 'blue';
                        }
                        
                        if (this.options && this.options.setSourceUrl) {
                            s.url = this.options.url + 'sources/' + layer.id;
                        }
                        s.id = layer.id;
                        s.type = 'geojson';
                        const gl = new GeojsonPlusLayer();
                        gl._service = this;
                        gl.source = s;
                        if (!gl.source._featureType && this.manager?.featureTypes?.hasOwnProperty(layer.id)) {
                            gl.source._featureType = this.manager.featureTypes[layer.id];
                        }
                        gl.openFeatureDetails = true;
                        gl.isEditable = layer.isEditable;
                        gl.isDraggable = layer.isDraggable;
                        gl.activeFeatureTypes = layer.activeFeatureTypes;
                        gl.isLive = layer.isLive;                                
                        gl.featureTypes = layer.featureTypes;
                        if (style) {
                            if (style.iconZoomLevel) {
                                gl.iconZoomLevel = style.iconZoomLevel;
                            }
                            gl.style = style;
                            if (gl.style && gl.style.popup) {
                                console.log(gl.style.popup);
                            }
                        }                        
                        gl.color = layer.color ? layer.color : 'blue';
                        gl.title = layer.title;
                        gl.description = layer.description;
                        gl.id = layer.id;
                        gl.extensions = layer.extensions;

                        gl.tags = [];
                        if (this.options.tags) {
                            gl.tags = this.options.tags;
                        }
                        if (layer.tags) {
                            gl.tags = [...gl.tags, ...layer.tags];
                        }

                        if (gl.isEditable) {
                            this.initEditableLayer(gl);
                        } else {
                            if (gl.isLive) {
                                this.initLiveLayer(gl);
                            }
                        }
                        await gl.initLayer(this.manager);
                        this.manager.layers.push(gl);
                        this.layers.push(gl);
                    }

                    if (this.options.activeLayers) {
                        for (const ad of this.options.activeLayers) {
                            const layer = this.layers.find(
                                l => l.id === ad
                            );
                            if (layer && this.manager) {
                                console.log('Active layer ' + layer.id);
                                await this.manager.showLayer(layer);                       
                            }
                        }
                    }
                    this.manager?.events?.publish('layer', 'list-updated', this.manager.layers);
                }
            })
            .catch((e) => { console.log(e); });
    }

    public async loadFeatureTypes() {
        if (this.options?.url && this.options.loadFeatureTypes) {
            axios
                .get(`${this.options.url}types`)
                .then(r => {                           
                    this.manager!.featureTypes = r.data;                                                            
                })
                .catch(e => {
                    console.log(e);
                });            
        }
    }

    public async Start(manager: MapDatasource) {
        this.manager = manager;
        this.removeExistingLayers(manager);
        this.loadFeatureTypes();        
        if (this.options && this.options.url) {
            await this.updateLayerList();
        }

        this.manager.events.subscribe(CsMap.LAYER, (a: string, l: GeojsonPlusLayer) => {
            if (a === CsMap.LAYER_CREATED) {
                this.createLiveLayer(l);
            }
        });

    }

    public disableLayerSocket(gl: GeojsonPlusLayer) {
        if (this.socket && this.socket !== undefined) {
            this.socket.off('layer/' + gl.id);
            this.socket.off('layer/' + gl.id + '/features');
        }
    }

    public initLayerSocket(gl: GeojsonPlusLayer) {
        if (this.socket && this.socket !== undefined) {
            if (gl.enabled) {
                // listen to complete layer updates
                this.socket.on('layer/' + gl.id, (data: any) => {
                    this.updateLiveLayer(data, gl);
                });
                this.socket.on('layer/' + gl.id + '/features', (data: { [fid: string]: IFeatureAction }) => {
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
            const url = this.options.url + 'layers/' + layer.id;
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
            layer: layer,
            action: () => {
                this.manager!.editLayer(layer);
                // AppState.Instance.openRightSidebarWidget({
                //     component: LayerEditor,
                //     data: { layer, service: this }
                // }, undefined, 'layers');
                // this.manager!.MapWidget!.$cs.openRightSidebarWidget({
                //     component: LayerServiceEditor,
                //     data: { layer: layer, service: this }
                // });
            }
        });
        return res;
    }

    public Stop(manager: MapDatasource) {
        this.removeExistingLayers(manager);
    }

    private createLiveLayer(gl: GeojsonPlusLayer) {
        if (!this.options) { return; }
        const url = this.options.url + 'layers/' + gl.id;
        const body = {
            id: gl.id,
            title: gl.title,
            source: 'people.json',
            sourceType: 'geojson',
            types: ['point'],
            version: '0.0.1',
            description: gl.description,
            tags: gl.tags,
            isEditable: gl.isEditable,
            isLive: gl.isLive
        };
        // {
        //     "id": "string",
        //     "title": "string",
        //     "description": "string",
        //     "tags": [
        //       "string"
        //     ],
        //     "sourceType": "string",
        //     "version": "string",
        //     "source": "string",
        //     "sourceUrl": "string",
        //     "isEditable": true,
        //     "isLive": true,
        //     "connectionId": "string",
        //     "query": "string",
        //     "tileSupport": "string",
        //     "color": "string",
        //     "externalUrl": "string",
        //     "externalCacheDuration": 0,
        //     "disableFeatureList": true,
        //     "meta": "string"
        //   }
        // const body = gl;
        axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => {
                console.log(r);
                this.initLiveLayer(gl);
            })
            .catch(e => {
                console.log(e);
            });

    }

    private initLiveLayer(gl: GeojsonPlusLayer) {
        this.initLayerSocket(gl);
        gl._events.subscribe(CsMap.LAYER, (a: string, d: any) => {
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

    private initEditableLayer(gl: GeojsonPlusLayer) {
        // listen to server
        this.initLiveLayer(gl);

        gl._events.subscribe(CsMap.FEATURE, (a: string, f: any) => {
            const md = this.mapDraw;

            if (md && f.features && a === CsMap.FEATURE_SELECT) {
                const feature = f.features[0];
                if (feature.properties) {
                    feature.id = feature.properties._fId;
                }
                const all = md.getAll();
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
            }
        });

        // listen to source change events
        gl._events.subscribe('source', (a: string) => {
            if (a === 'updated' && this.options) {
                const url = this.options.url + 'sources/' + gl.id;
                const body = gl._source!._data;
                if (body && this.socket) {
                    // tslint:disable-next-line:no-string-literal
                    body['lastUpdatedBy'] = this.socket.id;                    
                    axios
                        .put(url, gl._source!._data, {
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
