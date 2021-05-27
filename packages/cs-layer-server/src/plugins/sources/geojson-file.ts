import {
    ISourcePlugin,
    ISourcePluginType,
    LayerSource,
    ILoadResult,
    LayerMeta,
    LayerDefinition,
    ServerConfig
} from '../../classes';
import fs from 'fs';
import { Logger } from '@nestjs/common';
import { Feature } from 'geojson';
import path from 'path';
import { v1 as uuidv1} from 'uuid';
import moment from 'moment';
import {
    min,
    max,
    mean,
    median,
    standardDeviation,
    ckmeans,
    uniqueCountSorted
} from 'simple-statistics';
// import { createTileIndex } from '../../tiles/geojson-tiles';
import { FeatureType, PropertyType } from '@csnext/cs-data';
import _ from 'lodash';

export class GeojsonSource implements ISourcePlugin, ISourcePluginType {
    public id = 'json';
    public fileExtensions = ['.json', '.geojson'];
    public source = 'geojson';

    public getInstance() {
        return new GeojsonSource();
    }

    public load(file: string, meta?: string): Promise<ILoadResult> {
        return new Promise(async (resolve, reject) => {
            if (fs.existsSync(file)) {
                // console.log(file);
                try {
                    // Logger.log(`Loading: ${file}`);
                    const sourceContent = fs.readFileSync(file, 'utf8');
                    const source = JSON.parse(sourceContent);
                    const updated = this.initSource(source);

                    // source._tiles = await createTileIndex(source, { extent: 4096 });
                    // source was updated, save again
                    if (updated) {
                        this.saveSource(file, source);
                    }

                    if (meta && fs.existsSync(meta)) {
                        const metaContent = fs.readFileSync(meta, 'utf8');
                        resolve({
                            source,
                            updated,
                            meta: JSON.parse(metaContent)
                        });
                        return;
                    } else {
                        // create meta
                        const newMeta = await this.createMeta(source);
                        // console.log(JSON.stringify(meta));
                        resolve({
                            source,
                            updated,
                            meta: newMeta
                        });
                        return;
                    }
                } catch (e) {
                    Logger.error(`Error loading: ${file}`);
                }
            }
            reject();
        });
    }

    public loadSource(def: LayerDefinition, config: ServerConfig): Promise<ILoadResult> {

        const sourcePath = path.join(config.serverPath || '', config.sourcePath || '');

        if (!fs.existsSync(sourcePath)) {
            fs.mkdirSync(sourcePath);
        };

        def.source = def.id + '.json';
        const fileName = path.join(sourcePath, def.id, def.source);
        if (!fs.existsSync(fileName)) {
            this.createEmpty(sourcePath, def).then(r => {
                return this.load(fileName);
            }).catch((e) => {
                return Promise.reject(`Error creating ${fileName}`);
            })
        } else {
            return this.load(fileName);
        }        
    }

    public determinePropertyType(val: any): string {
        try {
            if (val === undefined || val === null) { return 'text'; }
            if (val.toString().match(/^€\d*(.|,)\d*$/g)) {
                return 'currency';
            } else if (moment(val.toString(), 'DD-MM-YYYY', true).isValid()) {
                return 'date';
            } else if (val.toString().match(/^\d*(.|,)\d*$/g)) {
                return 'number';
            } else if (
                val
                    .toString()
                    .match(
                        /(\b((https?|ftp|file)+:\/\/){1}|www)[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/g
                    )
            ) {
                return 'url';
            } else if (val.toString().length > 30) {
                return 'longtext';
            } else {
                return 'text';
            }
        } catch (e) {
            Logger.log(e);
            return 'text';
        }
    }

    public createEmpty(
        folder: string,
        def?: LayerDefinition
    ): Promise<{ def: LayerDefinition; source: LayerSource }> {
        return new Promise((resolve, reject) => {
            console.log('Creating new file');
            if (def.id) {
                const sourceFolder = path.join(folder, def.id);
                
                const sourceFile = path.join(sourceFolder, def.source);
                if (!fs.existsSync(sourceFolder)) {
                    console.log('Creating new folder');
                    console.log(sourceFolder);
                    fs.mkdirSync(sourceFolder);
                }
                const source = new LayerSource();
                source.id = def.id;
                source.type = 'FeatureCollection';
                source.features = [];
                // console.log('Saving source');
                this.saveSource(sourceFile, source);
                resolve({ def, source });
                return;
            }
            reject();
        });
    }

    public createMeta(source: LayerSource): Promise<LayerMeta> {
        return new Promise((resolve, reject) => {
            const result = new LayerMeta();
            const ft = new FeatureType();
            ft.properties = [];

            // for (const feature of source.features) {
            if (source.features && source.features.length > 0) {
                //   let feature = source.features[0];
                for (const feature of source.features) {
                    if (feature.properties) {
                        for (const prop in feature.properties) {
                            if (feature.properties.hasOwnProperty(prop)) {
                                let element = feature.properties[prop];
                                // make sure element has value
                                if (element !== null && element !== undefined) {
                                    // create property type if it doesn't exists
                                    if (!ft.properties.hasOwnProperty(prop)) {
                                        const proptype = {
                                            title: prop,
                                            description: prop,
                                            type: this.determinePropertyType(
                                                element
                                            ),
                                            _values: []
                                        } as PropertyType;
                                        ft.properties[prop] = proptype;
                                    }

                                    const pt = ft.properties[prop];
                                    if (pt && pt.type !== undefined) {
                                        if (
                                            pt.type === 'number' &&
                                            typeof element === 'string'
                                        ) {
                                            element = parseFloat(element);
                                            feature.properties[prop] = element;
                                        }
                                        pt._values.push(element);

                                        // // determine min/max
                                        //
                                        if (pt.type === 'number') {
                                            //     const value =
                                            //         typeof element === 'number'
                                            //             ? element
                                            //             : parseFloat(element);
                                            //     if (
                                            //         pt.min === undefined ||
                                            //         value < pt.min
                                            //     ) {
                                            //         pt.min = value;
                                            //     }
                                            //     if (
                                            //         pt.max === undefined ||
                                            //         value > pt.max
                                            //     ) {
                                            //         pt.max = value;
                                            //     }
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                for (const pt in ft.properties) {
                    if (ft.properties.hasOwnProperty(pt)) {
                        const proptype = ft.properties[pt];
                        proptype.count = proptype._values.length;
                        const unique: any[] = _.uniq(proptype._values);
                        proptype.unique = unique.length;
                        if (proptype.unique < 7) {
                            proptype.options = unique;
                        }

                        if (proptype.type === 'number' && proptype._values) {
                            if (unique.length > 1) {
                                proptype.min = parseFloat(
                                    min(proptype._values).toString()
                                );
                                proptype.max = parseFloat(
                                    max(proptype._values).toString()
                                );
                                proptype.mean = mean(proptype._values);
                                // if (proptype.count > 10) {
                                //     proptype.median = median(proptype._values);
                                //     proptype.sd = standardDeviation(
                                //         proptype._values
                                //     );
                                // }
                            }

                            // let steps = ckmeans(proptype._values, 5);
                            // proptype.legend = {};
                        }
                        delete proptype._values;
                    }
                }
                result.featureTypes = { main: ft };
            }
            resolve(result);
        });
    }

    public saveMeta(def: LayerDefinition) {
        // console.log(`Saving ${def._localMeta}`);
        if (def._localMeta) {
            fs.writeFileSync(
                def._localMeta,
                JSON.stringify(
                    { featureTypes: def.featureTypes },
                    (key, value) => {
                        if (key.startsWith('_')) {
                            return undefined;
                        }
                        return value;
                    },
                    2
                )
            );
        }
    }

    /** make sure geojson has been prepared, e.g. add ids to all features */
    public initSource(source: LayerSource): boolean {
        const types = [];
        let updated = false;
        if (source.features) {
            for (const feature of source.features) {
                if (this.initFeature(feature)) {
                    updated = true;
                }
            }
        }
        return updated;
    }

    public initFeature(feature: Feature): boolean {
        let updated = false;
        // make sure feature has properties
        if (!feature.properties) {
            feature.properties = {};
            updated = true;
        }

        // make sure feature has id
        if (!feature.id) {
            feature.id = uuidv1();
            updated = true;
        }

        return updated;
    }

    public import(file: string): Promise<LayerSource | undefined> {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(file)) {
                const source = fs.readFileSync(file, 'utf8');
                if (source) {
                    Logger.log(`Importing: ${file}`);
                    resolve(JSON.parse(source) as any);
                }
            }
            reject();
        });
    }

    public saveSource(file: string, source: LayerSource) {
        // Logger.log(`Saving: ${file}`);
        fs.writeFileSync(
            file,
            JSON.stringify(
                source,
                (key, value) => {
                    if (key.startsWith('_')) {
                        return undefined;
                    }
                    return value;
                },
                2
            )
        );
    }
}
