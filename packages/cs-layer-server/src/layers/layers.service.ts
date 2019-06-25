import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Logger } from '@nestjs/common';
import {
    ISourcePluginType,
    ISourcePlugin,
    ServerConfig,
    LayerDefinition,
    LayerSource,
    Helpers
} from '../classes';
import { KmlFileSource } from '../plugins/sources/kml-file';
import { GeojsonSource } from '../plugins/sources/geojson-file';
import { Feature } from 'geojson';
import { debounce } from 'lodash';
import { Debounce, Throttle } from 'lodash-decorators';

import { Client } from 'socket.io';
import { PostGisSource } from '../plugins/sources/postgis';
import { ArangoDBSource } from '../plugins/sources/arangodb';
import { Inject } from '@nestjs/common/decorators';
import uuidv1 from 'uuid/v1';
import { DefaultWebSocketGateway } from '../websocket-gateway';
import Axios from 'axios';
var AsyncLock = require('async-lock');
import { Server } from 'tls';

@Injectable()
export class LayerService {
    private config: ServerConfig;
    private absoluteConfigPath!: string;
    private lock = new AsyncLock();

    handleConnection(d: Client) {
        // this.server.emit('buttonCount',AppService.buttonCount);
        Logger.log(`Connection received from ${d.id}`);
    }

    public static sourcePlugins: ISourcePluginType[] = [];

    /** register new source plugin  */
    public static AddSourcePlugin(type: ISourcePluginType) {
        if (
            LayerService.sourcePlugins.findIndex(et => et.id === type.id) === -1
        ) {
            LayerService.sourcePlugins.push(type);
        }
    }

    constructor(
        @Inject('DefaultWebSocketGateway')
        private readonly socket: DefaultWebSocketGateway
    ) {
        this.config = {
            layers: [],
            sourcePath: './sources/',
            importPath: './import'
        };
        this.initPlugins();
    }

    /** loads available source plugins, can be automated later */
    private initPlugins() {
        LayerService.AddSourcePlugin(new KmlFileSource());
        LayerService.AddSourcePlugin(new GeojsonSource());
        LayerService.AddSourcePlugin(new PostGisSource());
        LayerService.AddSourcePlugin(new ArangoDBSource());
    }

    async init(configFile?: string, serverPath?: string) {
        // Logger.log('Init Layer Server');
        if (configFile) {
            this.absoluteConfigPath = path.join(
                serverPath ? serverPath : '',
                configFile
            );
            // check if config file exists
            if (fs.existsSync(this.absoluteConfigPath)) {
                Logger.log(`Loading config file: ${this.absoluteConfigPath}`);
                // read config file
                let file = path.join(serverPath ? serverPath : '', configFile);
                let configString = fs.readFileSync(file, 'utf8');
                if (configString) {
                    // config avaialable
                    this.config = {
                        ...this.config,
                        ...JSON.parse(configString)
                    };
                    // if no serverpath has been specified in config use this one
                    if (!this.config.serverPath) {
                        this.config.serverPath = serverPath || '';
                    }
                    Logger.log(
                        `Config file loaded: ${this.absoluteConfigPath}`
                    );
                } else {
                    Logger.log(
                        `Error opening config file: ${this.absoluteConfigPath}`
                    );
                    // no config found, start fresh
                }
                await this.importLayers();
                await this.initLayers();
            } else {
                Logger.log(`Config file not found: ${this.absoluteConfigPath}`);
            }
        } else {
            Logger.log('No config file specified');
        }
    }

    /** look in the import folder if there are any layers to be imported */
    importLayers() {
        if (this.config.importPath) {
            let absoluteImportPath = path.join(
                this.config.serverPath || '',
                this.config.importPath
            );
            // make sure it exists
            if (!fs.existsSync(absoluteImportPath)) {
                try {
                    fs.mkdirSync(absoluteImportPath);
                } catch (e) {
                    Logger.error('Error creating import path');
                }
            }

            // construct import completed folder
            let absoluteImportCompletedPath = path.join(
                this.config.serverPath || '',
                this.config.importPath,
                'completed'
            );

            // make sure it exists
            if (!fs.existsSync(absoluteImportCompletedPath)) {
                fs.mkdirSync(absoluteImportCompletedPath);
            }
            Logger.log(
                `Import path specified, loading sources from: ${absoluteImportPath}`
            );
            fs.readdirSync(absoluteImportPath).forEach(async file => {
                const absoluteImportFile = path.join(absoluteImportPath, file);
                const absoluteCompletedFile = path.join(
                    absoluteImportCompletedPath,
                    file
                );
                const extension = path.extname(file);
                const title = path.basename(file).replace(extension, '');
                const id = title
                    .split(' ')
                    .join('_')
                    .toLowerCase();

                // find plugin
                const sourcePlugin = this.getExtensionSourcePlugin(extension);
                if (sourcePlugin && typeof sourcePlugin.import === 'function') {
                    sourcePlugin
                        .import(absoluteImportFile)
                        .then(sourceImport => {
                            const file = id + '.json';

                            const absoluteFilePath = path.join(
                                this.config.serverPath || '',
                                this.config.sourcePath || '',
                                id
                            );
                            // make sure it exists
                            if (!fs.existsSync(absoluteFilePath)) {
                                fs.mkdirSync(absoluteFilePath);
                            }

                            const absoluteSourcePath = path.join(
                                absoluteFilePath,
                                file
                            );
                            fs.writeFileSync(
                                absoluteSourcePath,
                                JSON.stringify(sourceImport)
                            );
                            Logger.log(
                                `Import succeeded, saved to: ${absoluteSourcePath}`
                            );

                            // move original file
                            fs.renameSync(
                                absoluteImportFile,
                                absoluteCompletedFile
                            );

                            const layer = {
                                id: id,
                                source: file,
                                sourceType: 'geojson',
                                title: title
                            } as LayerDefinition;

                            this.addLayer(layer);

                            // this.initLayer(layer)
                            //   .then(l => {})
                            //   .catch(r => {});
                        }).catch(e => {
                            Logger.log(`Import failed for ${id}`);
                        })
                }
            });
        }
    }

    saveServerConfigDelay = () => {
        debounce(() => {
            this.saveServerConfig();
        }, 5000);
    };

    public addLayer(def: LayerDefinition): Promise<LayerDefinition> {
        return new Promise((resolve, reject) => {
            let newDef = Object.assign(
                {
                    id: Helpers.guidGenerator(),
                    sourceType: 'geojson',
                    version: '0.0.1',
                    color: 'blue',
                    isLive: false,
                    tags: [],
                    isEditable: false,
                    tileSupport: false
                },
                def
            );
            this.config.layers.push(newDef);
            this.saveServerConfigDelay();
            resolve(newDef);
        });
    }

    /** save active server config */
    public saveServerConfig() {
        Logger.log(`Saving server config: ${this.absoluteConfigPath}`);

        // create a duplicate without underscores;
        let duplicate = JSON.parse(
            JSON.stringify(this.config)
        ) as ServerConfig;

        // if layer has meta file defined, store them seperatly and remove features types from main config
        duplicate.layers.map(l => {
            if (l.meta !== undefined) {
                this.saveMetaConfig(l);
                delete l.featureTypes;
            }
        });

        // save to file
        fs.writeFileSync(
            this.absoluteConfigPath,
            JSON.stringify(duplicate, (key, value) => {
                if (key.startsWith('_')) {
                    return undefined;
                }
                return value;
            }, 2)
        );
        // unlockSync(lockFile);
    }

    /** save meta for layer definition */
    public saveMetaConfig(def: LayerDefinition) {
        if (def.meta === undefined || def.featureTypes === undefined) {
            return;
        }
        const plugin = this.getSourcePlugin(def.sourceType);
        if (plugin && typeof plugin.saveMeta === 'function') {
            plugin.saveMeta(def);
        }
    }

    /** initialize all layers */
    public initLayers(): Promise<boolean> {
        return new Promise(async resolve => {
            Logger.log(`Initialize all layers`);
            for (let layer of this.config.layers) {
                try {
                    layer = await this.initLayer(layer);
                } catch (e) {
                    Logger.warn(`Error initializing ${layer.id}: ${e}`);
                }
            }
            this.saveServerConfig();
            resolve(true);
        });
    }

    /** init layer */
    public initLayer(layer: LayerDefinition): Promise<LayerDefinition> {
        return new Promise<LayerDefinition>(async resolve => {
            // Logger.log(`Init Layer ${layer.id}`);
            // Object.assign(this, { version: "0.0.1", sourceType: "geojson", style: {} });
            // set sourceUrl
            if (layer.source) {
                layer.sourceUrl =
                    this.config.serverUrl + '/sources/' + layer.id;
            }
            if (!layer.version) {
                layer.version = '0.0.1';
            }
            if (!layer.style) {
                layer.style = {};
            }

            // if no default style has been selected, inspect source
            if (layer.sourceType === 'geojson') {
                // get source

                try {
                    const s = await this.getLayerSourceById(layer.id);
                    if (s !== undefined) {
                        layer.style.types = this.findType(s);
                        if (layer.style.types.includes('point')) {
                            layer.style.pointCircle = true;
                        }
                        layer.color = this.findColor(s);
                    }
                } catch (e) { }
            }
            resolve(layer);
        });
    }

    private findColor(content: GeoJSON.FeatureCollection): string {
        if (content.features) {
            for (const f of content.features) {
                if (f.properties) {
                    for (const p in f.properties) {
                        if (f.properties[p].match(/\#(.*)/)) {
                            return f.properties[p];
                        }
                    }
                }
            }
        }
        return 'lightgray';
    }

    private findType(content: GeoJSON.FeatureCollection): string[] {
        let types: string[] = [];
        for (const f of content.features) {
            if (f.geometry && f.geometry.type) {
                let type = this.getFeatureType(f);
                if (type && types.indexOf(type) === -1) {
                    types.push(type);
                }
            }
        }
        return types;
    }

    private getFeatureType(f: Feature): string | undefined {
        let type: string | undefined = undefined;
        switch (f.geometry.type) {
            case 'Point':
                type = 'point';
                break;
            case 'LineString':
                type = 'line';
                break;
            case 'Polygon':
                type = 'fill';
                break;
        }
        return type;
    }

    /** return all layers */
    getLayers(): LayerDefinition[] {
        return this.config.layers;
    }

    /** find one specific layer */
    getLayerById(id: string): Promise<LayerDefinition | undefined> {
        return new Promise(async (resolve, reject) => {
            let def = this.config.layers.find((l: any) => l.id === id);
            if (def) {
                resolve(def);
            } else {
                reject();
            }
        });
    }

    queueSocketUpdate(source: LayerSource, feature: Feature) {
        if (source) {
            if (!source._socketQueue) { source._socketQueue = {}; }

            this.lock.acquire(source.id, () => {
                source._socketQueue[feature.id] = {
                    action: 'update',
                    feature: feature
                };
            });

        }
    }

    @Throttle(5000)
    flushSocketQueue(source: LayerSource) {
        if (source) {
            if (source._socketQueue) {
                this.lock.acquire(source.id, () => {
                    if (this.socket && this.socket.server) {
                        this.socket.server.emit(
                            'layer/' + source.id + '/features',
                            source._socketQueue
                        );
                    }
                    console.log(`Sending queue ${Object.keys(source._socketQueue).length}`);
                    source._socketQueue = {};
                });
            }
        }
    }

    /** add or update feature */
    public updateFeature(
        sourceid: string,
        feature: Feature,
        featureId?: string
    ): Promise<Feature | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(`Update feature ${feature.id}`);
                // find source
                let source = await this.getLayerSourceById(sourceid);
                if (source && source.features) {
                    // if featureid was given, update feature
                    if (featureId !== undefined) {
                        feature.id = featureId;
                    }

                    // generate id, if no feature id was
                    if (feature.id === undefined) {
                        feature.id = uuidv1();
                    }

                    // find existing feature
                    let existingFeatureIndex = source.features.findIndex(
                        f => f.id === feature.id
                    );
                    // not found, add
                    if (existingFeatureIndex === -1) {
                        source.features.push(feature);
                    } else {
                        // update existing feature
                        source.features[existingFeatureIndex] = feature;
                    }
                    new GeojsonSource().initFeature(feature);

                    this.queueSocketUpdate(source, feature);
                    this.flushSocketQueue(source)

                    // // send update over socket
                    // if (this.socket && this.socket.server) {
                    //     this.socket.server.emit(
                    //         'layer/' + sourceid + '/features',
                    //         JSON.stringify({
                    //             action: 'update',
                    //             feature: feature
                    //         })
                    //     );
                    // }
                    this.saveSource(source);
                }
                resolve(feature);
            } catch (e) {
                reject('Source not found');
            }
        });
    }

    /** add or update feature */
    deleteFeature(sourceid: string, featureId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                // find source
                let source = await this.getLayerSourceById(sourceid);
                if (source && source.features) {
                    // actually remove feature
                    source.features = source.features.filter(
                        f => !f.id || f.id !== featureId
                    );

                    // send update over socket
                    if (this.socket && this.socket.server) {
                        this.socket.server.emit(
                            'layer/' + sourceid + '/features',
                            JSON.stringify({
                                action: 'delete',
                                feature: { id: featureId }
                            })
                        );
                    }

                    this.saveSource(source);
                    resolve(true);
                }
            } catch (e) {
                reject('Source not found');
            }
        });
    }

    /** update defintion for layer */
    putLayerDefinitionById(
        id: string,
        body: LayerDefinition
    ): Promise<LayerDefinition> {
        return new Promise(async (resolve, reject) => {
            Logger.log(`Updating layer definition for layer ${id}`);
            let defIndex = this.config.layers.findIndex(l => l.id === id);
            if (defIndex >= 0) {
                // update layer definition in config
                this.config.layers[defIndex] = {
                    ...this.config.layers[defIndex],
                    ...body
                };

                this.saveServerConfig();
                resolve(body);
            } else {
                // create new layer
                try {
                    let newLayerDef = await this.addLayer(body);
                    const plugin = this.getSourcePlugin(newLayerDef.sourceType);
                    if (plugin && typeof plugin.createEmpty === 'function') {
                        try {
                            const newSource = await plugin.createEmpty(
                                path.join(
                                    this.config.serverPath,
                                    this.config.sourcePath
                                ),
                                newLayerDef
                            );
                            newLayerDef = newSource.def;
                        } catch (e) { }
                    }
                    this.saveServerConfig();
                    resolve(newLayerDef);
                } catch (e) {
                    reject();
                }
            }
        });
    }

    /** find one specific layer */
    getLayerAndSourceById(id: string): Promise<LayerDefinition | undefined> {
        return new Promise(async (resolve, reject) => {
            let def = await this.getLayerById(id);
            if (def) {
                def._layerSource = await this.getLayerSourceById(id);
                resolve(def);
            } else {
                reject(def);
            }
        });
    }

    triggerLayerRefresh(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Logger.log(`Triggering layer refresh for ${id}`);
            resolve(true);
        });
    }

    getLayerSourceById(id: string): Promise<LayerSource | undefined> {
        return new Promise(async (resolve, reject) => {
            this.getLayerById(id)
                .then(def => {
                    // check if layer source was already loaded
                    if (def) {
                        // check if it has an external url, get it and proxy it
                        if (def.externalUrl !== undefined) {
                            Logger.log(`Loading external source for ${id}`);
                            // check if cache is valid and available
                            if (
                                def.externalCacheDuration > 0 &&
                                def._layerSource
                            ) {
                                resolve(def._layerSource);
                            } else {
                                Axios.get(def.externalUrl)
                                    .then(async response => {
                                        if (response.data) {
                                            if (def.externalCacheDuration > 0) {
                                                def._layerSource =
                                                    response.data;
                                                try {
                                                    // create layer meta data
                                                    const meta = await new GeojsonSource().createMeta(
                                                        def._layerSource
                                                    );
                                                    if (
                                                        meta &&
                                                        meta.featureTypes
                                                    ) {
                                                        def.featureTypes =
                                                            meta.featureTypes;
                                                    }
                                                } catch (e) { }
                                            }
                                            resolve(response.data);
                                            return;
                                        }
                                    })
                                    .catch(e => {
                                        Logger.warn(
                                            `Error loading ${def.externalUrl}`
                                        );
                                        resolve(undefined);
                                        return;
                                    });
                            }
                        } else if (def._layerSource !== undefined) {
                            resolve(def._layerSource);
                            return;
                        } else {
                            // load layer source

                            this.loadLayerSource(def)
                                .then(d => {
                                    def._layerSource = d;
                                    resolve(def._layerSource);
                                    return;
                                })
                                .catch(() => {
                                    reject();
                                    return;
                                });
                        }
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /** get a source plugin for a given extension (e.g. kml) */
    private getExtensionSourcePlugin(ext: string): ISourcePlugin | undefined {
        const plugin = LayerService.sourcePlugins.find(
            p =>
                p.fileExtensions !== undefined &&
                p.fileExtensions.indexOf(ext.toLowerCase()) !== -1
        );
        if (plugin && typeof plugin.getInstance === 'function') {
            return plugin.getInstance();
        }
    }

    /** get a source plugin for a given source type */
    private getSourcePlugin(type: string): ISourcePlugin | undefined {
        // console.log('Looking for type: ' + type);
        let plugin = LayerService.sourcePlugins.find(
            p => p.source !== undefined && p.source === type
        );
        if (plugin && typeof plugin.getInstance === 'function') {
            return plugin.getInstance();
        }
    }

    /** load & return layer source */
    loadLayerSource(def: LayerDefinition): Promise<LayerSource | undefined> {
        return new Promise(async (resolve, reject) => {
            // no source defined
            if (!def.source) {
                reject();
                return;
            }

            // layer source already loaded, return existing
            if (def._layerSource) {
                resolve(def._layerSource);
                return;
            }

            // if not specified use geojson as default source type
            if (!def.sourceType) {
                def.sourceType = 'geojson';
            }

            // find sourceplugin
            const plugin = this.getSourcePlugin(def.sourceType);
            if (plugin && typeof plugin.query === 'function') {
                if (
                    this.config.connections &&
                    def.connectionId &&
                    this.config.connections.hasOwnProperty(def.connectionId)
                ) {
                    if (def && def.query) {
                        plugin
                            .query(
                                this.config.connections[def.connectionId],
                                def.query
                            )
                            .then(r => {
                                resolve(r.source);
                                return;
                            })
                            .catch(() => {
                                reject();
                                return;
                            });
                    }
                }
            } else if (plugin && typeof plugin.load === 'function') {
                try {
                    let fileName = path.join(
                        this.config.serverPath || '',
                        this.config.sourcePath || '',
                        def.id,
                        def.source
                    );

                    if (def.meta) {
                        this.updateMetaFilePath(def);
                    }
                    const loadResult = await plugin.load(
                        fileName,
                        def._localMeta
                    );

                    // update feature types from meta data
                    if (loadResult.meta) {
                        def.featureTypes = loadResult.meta.featureTypes;
                        // if meta data was returned, but no meta file, create a meta file
                        if (
                            def.meta === undefined &&
                            loadResult.meta.featureTypes
                        ) {
                            def.meta = def.id + '.meta.json';
                            this.updateMetaFilePath(def);
                        }
                    }

                    if (loadResult.source) {
                        resolve(loadResult.source);
                        return;
                    }
                } catch (e) {
                    Logger.log(`Error loading: ${def.source}`);
                    console.log(e);
                    reject();
                }
            }
            // reject();
        });
    }

    private updateMetaFilePath(def: LayerDefinition) {
        def._localMeta = path.join(this.config.serverPath || '', this.config.sourcePath || '', def.id, def.meta);
    }


    @Debounce(5000, { leading: true })
    public saveSource(source: LayerSource) {
        if (source._localFile) {
            let content = JSON.stringify(
                source,
                (key, value) => {
                    if (key.startsWith('_')) {
                        return undefined;
                    }
                    return value;
                },
                2
            );
            // Logger.log(`Saving source ${source.id} - ${source._localFile}`);
            fs.writeFileSync(source._localFile, content, 'utf8');
        }
    }

    putLayerSourceById(id: string, body: LayerSource): Promise<boolean> {
        return new Promise(resolve => {
            this.getLayerSourceById(id)
                .then(s => {
                    if (s) {
                        s.features = body.features;
                        if (this.socket && this.socket.server) {
                            this.socket.server.emit(
                                'layer/' + id,
                                JSON.stringify(body)
                            );
                        }
                        this.saveSource(s);
                    }
                })
                .catch(e => {
                    Logger.error(`Error saving source ${id} - ${e}`);
                });
            resolve(true);
        });
    }
}
