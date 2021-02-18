import { MetaFile, DataSource } from './..';
import Axios from 'axios';
import {
    min,
    max,
    mean,
    median,
    standardDeviation,
    uniqueCountSorted,
    equalIntervalBreaks
} from 'simple-statistics';
import { PropertyCollection, PropertyType, FeatureTypes, FeatureType } from './..';

export class MetaUtils {

    /** Fetches meta file describing feature types and property types  */
    public static loadFeatureTypesFromUrl(url: string): Promise<FeatureTypes> {
        return new Promise(async (resolve, reject) => {
            this.loadMetaUrl(url).then(mf => {
                if (mf.featureTypes) {
                    resolve(mf.featureTypes);
                } else {
                    reject();
                }
            }).catch(() => {
                reject();
            });
        });
    }

    public static loadMetaUrl(url: string): Promise<MetaFile> {
        return new Promise(async (resolve, reject) => {
            const res: MetaFile = new MetaFile();

            Axios.get(url).then(response => {
                if (response.data) {
                    // load feature types from file
                    if (response.data.hasOwnProperty('featureTypes')) {
                        res.featureTypes = response.data.featureTypes;
                    }

                    // check if property type data was specified
                    if (response.data.hasOwnProperty('propertyTypeData')) {
                        res.propertyTypeData = response.data.propertyTypeData;
                        if (res.featureTypes && res.propertyTypeData) {
                            this.linkPropertyTypeData(res.featureTypes, res.propertyTypeData);
                        }
                    }
                    resolve(res);
                } else {
                    reject();
                }
            }).catch(() => {
                reject();
            });

        });
    }

    public static updateMeta(source: any, ft?: FeatureType): Promise<any> {
        return new Promise((resolve, reject) => {
            const result = {};
            if (!ft || !ft.properties || !ft.propertyMap) { reject(); return; }
            // const source = layer._source!._geojson;

            for (const prop of ft.properties) {
                if (!prop._values) {
                    prop._values = [];
                }
            }

            // for (const feature of source.features) {
            if (source.features && source.features.length > 0) {
                //   let feature = source.features[0];
                for (const feature of source.features) {
                    if (feature.properties) {
                        for (const prop of ft.properties) {
                            if (prop.key && feature.properties.hasOwnProperty(prop.key)) {
                                if (prop.type !== undefined) {
                                    let value = feature.properties[prop.key];
                                    if (
                                        prop.type === 'number' &&
                                        typeof value === 'string'
                                    ) {
                                        value = parseFloat(value);
                                        feature.properties[prop.key] = value;
                                    }
                                    prop._values!.push(value);
                                }
                            }
                        }
                    }
                }
            }

            for (const proptype of ft.properties) {
                if (proptype._values) {
                    proptype.count = proptype._values.length;
                    proptype.unique = uniqueCountSorted(proptype._values);
                    if (proptype.unique < 7) {
                        // proptype.options =  unique.reduce(i => ) new Map(unique, (i) => [i,i] as [string, string]);
                    }

                    if (proptype.type === 'number' && proptype._values) {
                        if (proptype.unique > 1) {
                            proptype.min = parseFloat(
                                min(proptype._values).toString()
                            );
                            proptype.max = parseFloat(
                                max(proptype._values).toString()
                            );
                            proptype.mean = mean(proptype._values);
                            if (proptype.count > 10) {                                
                                proptype.median = median(proptype._values);
                                if (!proptype.bins) {
                                    proptype.bins = equalIntervalBreaks(proptype._values, 4);
                                }
                                proptype.sd = standardDeviation(
                                    proptype._values
                                );
                            }
                        }

                        // let steps = ckmeans(proptype._values, 5);
                        // proptype.legend = {};
                    }
                    delete proptype._values;
                }
            }

            resolve(result);
        });
    }

    public static updateMetaProperty(source: DataSource, ft: FeatureType, prop: PropertyType) {
        if (prop._initialized) { return; }
        prop._values = [];
        if (!ft || !ft.properties || !ft.propertyMap || !source._data || !source._data.features) { return; }
        if (source._data.features && source._data.features.length > 0) {
            //   let feature = source.features[0];
            for (const feature of source._data.features) {
                if (feature.properties) {
                    if (prop.key && feature.properties.hasOwnProperty(prop.key)) {
                        if (prop.type !== undefined) {
                            let value = feature.properties[prop.key];
                            if (
                                prop.type === 'number' &&
                                typeof value === 'string'
                            ) {
                                value = parseFloat(value);
                                feature.properties[prop.key] = value;
                            }
                            if (value !== undefined && value !== null) {
                                prop._values!.push(value);
                            }
                        }
                    }
                }
            }
        }

        prop.count = prop._values.length;
        prop.unique = uniqueCountSorted(prop._values);
        if (prop.unique < 7) {
            // prop.options =  unique.reduce(i => ) new Map(unique, (i) => [i,i] as [string, string]);
        }

        if (prop.type === 'number' && prop._values) {
            if (prop.unique > 1) {
                try {
                    prop.min = parseFloat(
                        min(prop._values).toString()
                    );
                } catch (e) {

                }
                prop.max = parseFloat(
                    max(prop._values).toString()
                );
                prop.mean = mean(prop._values);
                prop.bins = equalIntervalBreaks(prop._values, 5);
                // if (prop.count > 10) {
                //     prop.median = median(prop._values);
                //     prop.sd = standardDeviation(
                //         prop._values
                //     );
                // }
            }

            // let steps = ckmeans(prop._values, 5);
            // prop.legend = {};
        }
        delete prop._values;
        prop._initialized = true;
    }
    // if property data was specified seperately, link them to the feature types
    public static linkPropertyTypeData(featureTypes: FeatureTypes, propertyTypeData: PropertyCollection) {
        if (featureTypes && propertyTypeData) {
            this.checkPropertyLabels(propertyTypeData as any);
            for (const ft in featureTypes) {
                if (featureTypes.hasOwnProperty(ft)) {
                    const featureType = featureTypes[ft];
                    if (!featureType.properties) {
                        featureType.properties = [];
                    }
                    if (featureType.propertyTypeKeys) {
                        const keys = featureType.propertyTypeKeys.split(';');
                        for (const key of keys) {
                            if (propertyTypeData.hasOwnProperty(key)) {
                                featureType.properties.push(propertyTypeData[key]);
                            }
                        }
                    } else {
                        featureType.properties = Object.values(propertyTypeData);
                    }
                }
            }
        }
    }

    private static checkPropertyLabels(properties: { [key: string]: PropertyType }) {
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                const value = properties[key];
                if (!value.key) {
                    value.key = key;
                }
                if (!value.label) {
                    value.label = key;
                }
                if (!value.title) {
                    value.title = key;
                }
            }
        }

    }
}
