import { FeatureTypes, PropertyCollection, FeatureType, PropertyType } from './feature-type';
import Axios from 'axios';
import { PropertyDetails } from '../components/feature-details/feature-details';
import uniq from 'lodash.uniq';
import {
    min,
    max,
    mean,
    median,
    standardDeviation,
    ckmeans,
    uniqueCountSorted
} from 'simple-statistics';
import { LayerSource } from '..';
import { IMapLayer } from './imap-layer';

export class MetaFile {
    public featureTypes?: FeatureTypes;
    public propertyTypeData?: PropertyCollection;

    // if property data was specified seperately, link them to the feature types
    public linkPropertyTypeData() {        
        if (this.featureTypes && this.propertyTypeData) {
            for (const ft in this.featureTypes) {
                if (this.featureTypes.hasOwnProperty(ft)) {
                    const featureType = this.featureTypes[ft];
                    if (!featureType.properties) {
                        featureType.properties = [];
                    }
                    if (featureType.propertyTypeKeys) {
                        const keys = featureType.propertyTypeKeys.split(';');
                        for (const key of keys) {
                            if (this.propertyTypeData.hasOwnProperty(key)) {
                                featureType.properties.push(this.propertyTypeData[key]);
                            }
                        }
                    } else {
                        featureType.properties = Object.values(this.propertyTypeData);
                    }

                }
            }
        }
    }

    /** Fetches meta file describing feature types and property types  */
    public static loadFeatureTypesFromUrl(url: string): Promise<FeatureTypes> {
        return new Promise(async (resolve, reject) => {            
            this.loadMetaUrl(url).then(mf => {
                if (mf.featureTypes) {                    
                    resolve(mf.featureTypes);
                } else {
                    reject();
                }
            }).catch(e => {
                reject();
            })
        });
    }



    public static updateMeta(layer: IMapLayer, ft?: FeatureType): Promise<any> {
        return new Promise((resolve, reject) => {
            let result = {};
            if (!ft || !ft.properties || !ft.propertyMap || !layer._source || !layer._source._geojson) { reject(); return; }
            let source = layer._source!._geojson;

            for (const prop of ft.properties) {
                if (!prop._values) {
                    prop._values = [];
                }
                console.log(prop.type);
            }

            // for (const feature of source.features) {
            if (source.features && source.features.length > 0) {
                //   let feature = source.features[0];
                for (const feature of source.features) {
                    if (feature.properties) {
                        for (const prop of ft.properties) {
                            if (prop.label && feature.properties.hasOwnProperty(prop.label)) {
                                if (prop.type !== undefined) {
                                    let value = feature.properties[prop.label];
                                    if (
                                        prop.type === 'number' &&
                                        typeof value === 'string'
                                    ) {
                                        value = parseFloat(value);
                                        feature.properties[prop.label] = value;
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
                    let unique: any[] = uniq(proptype._values);
                    proptype.unique = unique.length;
                    if (proptype.unique < 7) {
                        // proptype.options =  unique.reduce(i => ) new Map(unique, (i) => [i,i] as [string, string]);
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
                            if (proptype.count > 10) {
                                proptype.median = median(proptype._values);
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

    public static loadMetaUrl(url: string): Promise<MetaFile> {
        return new Promise(async (resolve, reject) => {
            let res: MetaFile = new MetaFile();

            Axios.get(url).then(response => {
                if (response.data) {
                    // load feature types from file
                    if (response.data.hasOwnProperty('featureTypes')) {
                        res.featureTypes = response.data.featureTypes;
                    }

                    // check if property type data was specified
                    if (response.data.hasOwnProperty('propertyTypeData')) {
                        res.propertyTypeData = response.data.propertyTypeData;
                        res.linkPropertyTypeData();
                    }
                    resolve(res);
                } else {
                    reject();
                }
            }).catch(e => {
                reject();
            })

        })
    }

}