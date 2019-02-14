import {
    ISourcePlugin,
    ISourcePluginType,
    LayerSource,
    ILoadResult,
    LayerMeta
} from '../../classes';
import fs from 'fs';
import { Logger } from '@nestjs/common';
import { Feature } from 'geojson';
import uuidv1 from 'uuid/v1';
// import { createTileIndex } from '../../tiles/geojson-tiles';
import { FeatureType } from '../../shared';

export class GeojsonSource implements ISourcePlugin, ISourcePluginType {
    id = 'json';
    fileExtensions = ['.json', '.geojson'];
    source = 'geojson';

    getInstance() {
        return new GeojsonSource();
    }

    load(file: string, meta?: string): Promise<ILoadResult> {
        return new Promise(async (resolve, reject) => {
            if (fs.existsSync(file)) {
                try {
                    // Logger.log(`Loading: ${file}`);
                    const sourceContent = fs.readFileSync(file, 'utf8');
                    const source = JSON.parse(sourceContent);
                    const updated = this.initSource(source);

                    source._localFile = file;
                    // source._tiles = await createTileIndex(source, { extent: 4096 });
                    // source was updated, save again
                    if (updated) {
                        this.save(file, source);
                    }

                    if (meta) {
                        const metaContent = fs.readFileSync(meta, 'utf8');
                        resolve({
                            source: source,
                            updated: updated,
                            meta: JSON.parse(metaContent)
                        });
                        return;
                    } else {
                        // create meta
                        const meta = await this.createMeta(source);
                        // console.log(JSON.stringify(meta));
                        resolve({ source: source, updated: updated });
                        return;
                    }
                } catch (e) {
                    Logger.error(`Error loading: ${file}`);
                }
            }
            reject();
        });
    }

    createMeta(source: LayerSource): Promise<LayerMeta> {
        return new Promise((resolve, reject) => {
            let result = new LayerMeta();
            let ft = new FeatureType();

            // for (const feature of source.features) {
            if (source.features && source.features.length > 0) {
                let feature = source.features[0];
                if (feature.properties) {
                    for (const prop in feature.properties) {                        
                        if (feature.properties.hasOwnProperty(prop)) {
                            const element = feature.properties[prop];
                            // if (!ft.properties.hasOwnProperty(prop)) {
                            //   ft.properties[prop] = {
                            //     title: prop,
                            //     description: prop
                            //   };
                            // }
                            // console.log(prop);
                        }
                    }
                }
            }
            result.featureTypes = { main: ft };
            resolve(result);
        });
    }

    /** make sure geojson has been prepared, e.g. add ids to all features */
    initSource(source: LayerSource): boolean {
        let types = [];
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

    initFeature(feature: Feature): boolean {
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

    import(file: string): Promise<LayerSource | undefined> {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(file)) {
                let source = fs.readFileSync(file, 'utf8');
                if (source) {
                    Logger.log(`Importing: ${file}`);
                    resolve(JSON.parse(source) as any);
                }
            }
            reject();
        });
    }

    save(file: string, source: LayerSource) {
        Logger.log(`Saving: ${file}`);
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
