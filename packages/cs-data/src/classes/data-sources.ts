import Papa from 'papaparse';
import { IDatasource, guidGenerator, MessageBusService, Loader } from '@csnext/cs-core';
import { DataSet, DataSource } from '..';
import { plainToClass } from 'class-transformer';
import Axios from 'axios';
import { FeatureType, FeatureTypes } from './feature-type';
import { DataPackage, DataResource } from '../interfaces/datapackage';
import { PropertyType } from './property-type';

export const DataSourceEvents = {
    DATASOURCE: 'data-source',
    UPDATED: 'data-updated',
    INSIGHT: 'source-insight',
    INSIGHT_VIEW: 'source-insight-view',
    ACTIVATED: 'activated'
} as const;

export class DataSources implements IDatasource {
    public images: { [id: string]: string } = {};
    public sources: { [name: string]: DataSource } = {};
    public activeResource?: DataResource;
    public events = new MessageBusService();
    public id?: string;
    public dataPackage?: DataPackage;
    public resources: { [name: string]: DataResource } = {};
    public loader: Loader;

    constructor(data?: { [name: string]: DataSource }, images?: { [id: string]: string }) {
        this.sources = {};
        for (const l in data) {
            if (data.hasOwnProperty(l)) {
                const layer = data[l];
                this.sources[l] = this.initSource(l, layer);
            }
        }
        if (images) {
            this.images = images;
        }
        this.loader = new Loader(this.events);
    }

    public getDataSource(id: string): DataSource | undefined {
        if (this.sources && this.sources.hasOwnProperty(id)) {
            return this.sources[id];
        }
    }

    public updateDataSet(id: string, dataset: DataSet): DataSource {
        const s = new DataSource();
        s._data = dataset;
        s.id = id;
        s._loaded = true;
        this.updateSource(s);
        return s;
    }

    public updateSource(source: DataSource): DataSource {
        if (!source.id) { source.id = guidGenerator(); }
        this.sources[source.id] = source;
        this.events.publish(DataSourceEvents.UPDATED, source.id, source);
        return source;
    }

    public initSource(id: string, source: DataSource): DataSource {
        source.id = id;
        return plainToClass(DataSource, source);
    }

    public initPackage(p: DataPackage) {
        if (p.resources) {
            for (const resource of p.resources) {

                // init references based on foreign keys
                if (resource.schema && resource.schema.foreignKeys) {
                    for (const fk of resource.schema.foreignKeys) {
                        // if (fk.reference && fk.reference.resource) {
                        // }
                    }
                }
            }
        }
        // init insight
        if (p.insights) {
            for (const insight of p.insights) {
                if (insight.views) {
                    let count = 1;
                    for (const view of insight.views) {
                        view.pos = count;
                        count += 1;

                        if (!view.dashboards && insight.dashboards) {
                            view.dashboards = insight.dashboards;
                        }
                    }
                }
            }
        }
        // if (second.schema && second.schema.foreignKeys) {

    }

    public loadPackage(uri: string): Promise<DataPackage> {
        // const t = new Table();
        return new Promise((resolve, reject) => {
            Axios.get(uri).then(async r => {
                if (r.data) {
                    this.dataPackage = r.data as DataPackage;
                    this.initPackage(this.dataPackage);
                    resolve(this.dataPackage);
                } else {
                    reject('Error loading datapackage');
                }
            }).catch((e) => {
                reject(e);
            });
        });
        // const resource = await datapackage.Resource.load({path: 'https://raw.githubusercontent.com/frictionlessdata/datapackage-js/master/data/data.csv'});
    }

    public async mergeResources(first: DataResource, second: DataResource): Promise<boolean> {
        return new Promise((resolve) => {
            if (!first.data || !first.data._data || !second.data || !second.data._data || !second.data._data.data) { return; }
            const loaderId = this.loader.addLoader();
            // const merge = (a: FeatureCollection, b: any, p1: string, p2: string) => a.features.filter( aa => {
            //     return !b.find(bb => aa.properties && aa.properties[p1] === bb[p2])} )[0].concat(b);
            if (second.schema && second.schema.foreignKeys) {
                for (const fk of second.schema.foreignKeys) {
                    if (fk.reference && fk.reference.resource === first.name) {
                        if (first.format === 'geojson' && first.data && first.data._loaded && first.data._data.features) {
                            for (const feature of first.data._data.features) {
                                const data = second.data._data.data.filter(r => r.hasOwnProperty(fk.fields) && r[fk.fields] === feature.properties![fk.reference.fields]);
                                if (data) {
                                    const properties = {};
                                    const values = {};
                                    for (const d of data) {
                                        for (const field of second.schema.fields) {

                                            // check if the selector exists and references this field
                                            if (field._selector && d.hasOwnProperty(field._selector) && d[field._selector] === field.name) {
                                                if (field._value) {
                                                    if (field._when) {
                                                        if (!values.hasOwnProperty(field.name)) {
                                                            values[field.name] = {}
                                                        }
                                                        values[field.name][d[field._when]] = d[field._value];
                                                        properties[field.name] = d[field._value];
                                                    } else {
                                                        properties[field.name] = d[field._value];
                                                    }
                                                }

                                            } else {
                                                properties[field.name] = d[field.name];
                                            }
                                        }
                                    }
                                    feature.properties = { ...feature.properties, ...properties };
                                    // feature.values = values;
                                    console.log(values);

                                }
                            }
                            // let merge_result = merge(first._source._data, second._data, fk.reference.fields[0], fk.fields[0]);
                            // console.log('merge result');
                            // console.log(merge_result);
                            // for (const feature of first._source._data.features) {
                            //     console.log(`Merge ${feature.properties[fk.reference.fields]}`);
                            // }
                            // }

                        }
                    }
                }
                if (first.data._meta && first.data._meta.default && first.data._meta.default.properties && second.data._meta && second.data._meta.default.properties) {
                    first.data._meta.default.properties = first.data._meta.default.properties.concat(second.data._meta.default.properties);
                    first.data.updateFeatureTypePropertyMap(first.data._meta.default);
                }
            }
            this.loader.removeLoader(loaderId);
            resolve(true);
        });
    }

    public parseCSv(data: any): Promise<Papa.ParseResult> {
        return new Promise((resolve, reject) => {
            Papa.parse(data, { complete: (r) => { resolve(r); }, error: reject, header: true, dynamicTyping: true, worker: true });
        });
    }

    public createDataSourceFromResource(data: any, resource: DataResource): Promise<DataSource | undefined> {
        return new Promise(async (resolve, reject) => {
            let d: DataSource | undefined;
            switch (resource.format) {
                case 'csv':
                    // const csv = data;
                    const csv = await this.parseCSv(data);
                    const ds = new DataSet();
                    ds.data = csv.data;
                    if (csv) { d = new DataSource(ds); }
                    break;
                case 'geojson':
                    d = new DataSource(data);
                    d.type = 'geojson';
                    break;
                default:
                    reject('Resource format not recognized');
                    break;
            }
            if (d !== undefined) {
                d._meta = new FeatureTypes();
                d._meta.default = new FeatureType();
                d._meta.default.properties = [];
                if (resource.schema && resource.schema.fields) {
                    for (const field of resource.schema.fields) {
                        d._meta.default.properties!.push(
                            {
                                title: field.title,
                                description: field.description,
                                type: field.type,
                                _key: field.name,
                                section: field.group,
                                unit: field.unit,
                                decimals: field.decimals,
                                resource: resource.name,
                                bins: field.bins,
                                colorScheme: field.colorScheme
                            } as PropertyType);
                    }
                    // const table = await Table.load(d.data, schema, false);
                }
                resource.data = d;
                resolve(d);
            }
        });
    }

    public async unloadResource(source: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.dataPackage && this.dataPackage.resources) {
                const resource = this.dataPackage.resources.find(r => r.name === source);
                if (resource) {
                    resource.data = undefined;
                    if (this.sources.hasOwnProperty(source)) {
                        delete this.sources[source];
                    }
                    if (this.resources.hasOwnProperty(source)) {
                        delete this.resources[source];
                    }
                    resolve(true);
                }
            }
            resolve(false);
        });
    }

    public activateResource(source: string): Promise<DataResource> {
        return new Promise(async (resolve) => {
            const r = await this.loadResource(source);
            this.activeResource = r;
            resolve(r);
        });
    }

    public async loadResource(resourceName: string): Promise<DataResource> {
        return new Promise((resolve, reject) => {
            // if (this.loader.loading) { reject(); }
            if (this.dataPackage && this.dataPackage.resources) {
                const resource = this.dataPackage.resources.find(r => r.name === resourceName);
                if (resource && resource.path) {
                    this.loader.addLoader(resourceName);
                    Axios.get(resource.path.toString()).then(async d => {
                        if (d.data) {
                            this.createDataSourceFromResource(d.data, resource).then(() => {
                                this.resources[resource.name] = resource;
                                this.loader.removeLoader(resourceName);
                                resolve(resource);
                                return;
                            });
                        }
                    }).catch(() => {
                        reject();
                        return;
                    });
                }
            } else {
                reject();
            }
        });
    }

    public execute(datasources: { [id: string]: IDatasource }): Promise<any> {
        return new Promise(resolve => {
            resolve(this);
        });
    }
}
