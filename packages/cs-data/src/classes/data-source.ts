import { guidGenerator } from '@csnext/cs-core';
import axios from 'axios';
import { FeatureTypes, MetaUtils, FeatureType, PropertyType } from '..';
import { DataSet } from './data-set';
import { plainToClass } from 'class-transformer';
import { Feature } from 'geojson';

export enum DataSourceState {
    unloaded,
    loading,
    loaded
}

export class DataSource {
    public id?: string;
    public title?: string;
    public url?: string;
    public metaUrl?: string;
    public featureType?: FeatureType;
    // public featureTypes?: FeatureTypes;
    public defaultFeatureType?: string;
    public state: DataSourceState;

    public _meta?: FeatureTypes;
    public _data?: DataSet;
    public _loaded = false;
    public _bookmarks?: any[] = [];

    public get _geojson() : DataSet | undefined {
        return this._data;
    }

    public type?:
        | 'vector'
        | 'raster'
        | 'raster-dem'
        | 'geojson'
        | 'image'
        | 'video'
        | 'table'
        ;

    public _featureType?: FeatureType;
    private _flat?: any[];

    constructor(data?: string | DataSet) {
        this.state = DataSourceState.unloaded;
        if (data) {
            // if geojson is provided as a string, it is considered an URL
            if (typeof data === 'string') {
                this.url = data;
            } else {
                if (data.type === 'FeatureCollection') {
                    this._data = this.InitFeatures(data, this.id);
                } else {
                    this._data = data;
                }
                this.state = DataSourceState.loaded;
                this._loaded = true;
                if (!data.type) {
                    data.type = 'Table';
                }
            }
        }
        if (!this.id) {
            this.id = guidGenerator();
        }
    }

    public loadSource(featureTypes?: FeatureTypes): Promise<DataSet> {
        return new Promise(async (resolve, reject) => {
            if (this.state === DataSourceState.loaded) {
                resolve(this._data);
                return;
            }
            if (!this.url) {
                // no url given, create empty feature collection
                this._loaded = true;
                this.state = DataSourceState.loaded;
                this._data = new DataSet();
                await this.initFeatureTypes(featureTypes);
                resolve(this._data);
                return;
            }
            this.type = 'geojson';
            switch (this.type) {
                case 'geojson':
                    this.state = DataSourceState.loading;
                    axios
                        .get(this.url)
                        .then(async response => {
                            if (response) {
                                this._data = this.InitFeatures(response.data, this.id);
                                this._loaded = true;
                                await this.initFeatureTypes(featureTypes);
                                this.state = DataSourceState.loaded;
                                resolve(this._data);
                            }
                        })
                        .catch(e => {
                            reject(e);
                        });
                    break;
            }
        });
    }

    public getFlatProperties(): any[] {
        if (this._flat) { return this._flat; }
        const res: any[] = [];
        if (this._data && this._data.features) {
            for (const feature of this._data.features) {
                if (feature.properties) {
                    const f = { ...{ '_id': feature.id }, ...feature.properties };
                    res.push(f);
                }
            }
        }
        this._flat = res;
        return this._flat;
    }

    public exportToCsv(): Promise<any> {
        return new Promise((resolve, reject) => {
            let res = '';
            if (this._data && this.state === DataSourceState.loaded) {
                const flat = this.getFlatProperties();
                resolve(JSON.stringify(flat));

                // for (const feature of this._data.features) {
                //     res += feature.id;
                //     this.getFlatProperties
                //     for (const prop in Object.keys(feature.properties))
                //     {
                //         res+=feature.properties[prop]
                //     }
                //      + '\n';
                // }
            }
            resolve(res);
        });
    }

    public getFeatureType(): FeatureType | undefined {
        if (!this._featureType) {
            /** find feature type */
            if (
                this._meta) {
                if (this.defaultFeatureType &&
                    this._meta.hasOwnProperty(this.defaultFeatureType)
                ) {
                    this._featureType = this._meta[this.defaultFeatureType];
                } else {
                    this._featureType = this._meta[Object.keys(this._meta)[0]];
                }
            }
            return this._featureType;
        } else {
            return this._featureType;
        }
    }

    public getPropertType(prop: string): PropertyType | undefined {
        const ft = this.getFeatureType();
        if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(prop)) {
            const propType = ft.propertyMap[prop];
            if (!propType._initialized) {
                MetaUtils.updateMetaProperty(this, ft, propType);
            }
            return propType;
        }
    }

    public async initFeatureTypes(featureTypes?: FeatureTypes): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (featureTypes) {
                this._meta = featureTypes;
            }
            if (this.metaUrl && !this._meta) {
                try {
                    this._meta = await MetaUtils.loadFeatureTypesFromUrl(this.metaUrl);
                } catch (e) { }
            }
            if (this._meta && Object.keys(this._meta).length > 0) {
                const keys = Object.keys(this._meta);
                Object.keys(this._meta).forEach(k => {
                    if (this._meta && this._meta.hasOwnProperty(k)) {
                        // not array, check for map
                        const ft = this._meta[k];
                        if (ft.properties && !Array.isArray(ft.properties)) {
                            const props: any[] = [];
                            const obj = ft.properties as any;
                            for (const key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                    const element = obj[key];
                                    if (typeof element !== 'string') {
                                        if (!element._key) {
                                            element._key = key;
                                        }
                                    }
                                    props.push(element);
                                }
                            }
                            if (props.length > 0) {
                                ft.properties = props;
                            }
                        }

                        this._meta[k] = plainToClass(
                            FeatureType,
                            this._meta[k]
                        );

                        this.updateFeatureTypePropertyMap(this._meta[k]);
                    }
                });
                this._meta = plainToClass(
                    FeatureTypes,
                    this._meta
                ) as FeatureTypes;
                // this.updateMeta();
            } else {
                this._meta = new FeatureTypes();
                const ft = new FeatureType();
                ft.title = this.defaultFeatureType = 'default';
                ft.properties = [];
                // check first feature for missing properties
                if (this._data && this._data.features && this._data.features.length > 0) {
                    const f = this._data.features[0];
                    if (f.properties) {
                        for (const prop in f.properties) {
                            if (f.properties.hasOwnProperty(prop)) {
                                const value = f.properties[prop];
                                ft.properties.push({
                                    label: prop,
                                    title: prop,
                                    description: prop,
                                    type: Number.isFinite(value) ? 'number' : 'string'
                                });
                            }
                        }
                    }
                    this.updateFeatureTypePropertyMap(ft);
                    this._meta[ft.title] = ft;
                }
            }
            if (!this.featureType) {
                this.featureType = this.getFeatureType();
            }
            resolve(true);
        });
    }

    public updateFeatureTypePropertyMap(type: FeatureType) {
        if (type.properties) {
            type.propertyMap = {};
            if ( Object.keys(type.properties).length > 0) {
                for (const prop of type.properties) {
                    if (prop._key) {
                        type.propertyMap[prop._key] = prop;
                    }
                }
            }
        }
    }

    /** make sure all features have an id and properties object */
    private InitFeatures(data: DataSet, layerId?: string) {
        let count = 0;
        if (data && data.features) {
            for (const f of data.features) {
                if (f.id === undefined) {
                    f.id = count;
                    count += 1;
                }
                if (!f.properties) { f.properties = {}; }
                f.properties._fId = f.id; // Workaround because of mapbox bug in MapMouseEvent
                f.properties._lId = layerId;

                if (f.geometry && f.geometry.type === 'Polygon') {
                    let correct = true;
                    for (const line of f.geometry.coordinates) {
                        if (line.length === 1 && line[0] === null) {
                            correct = false;
                        }
                    }
                    if (!correct) { f.geometry.coordinates = [[]]; }
                }

            }
        }
        return data;
    }

}
