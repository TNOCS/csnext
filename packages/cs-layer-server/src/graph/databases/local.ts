import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { IDatabase, IData, IQuery, IAllOptions } from "./database";
import { Link } from "./link";
import { GraphEntity, GraphRelation, GraphSchema, ObservationType } from './schema';
import { join } from 'path';

import { GraphElement, FeatureType, FeatureCollection, GraphDatasource } from "@csnext/cs-data";
import { reject, throttle } from 'lodash';

export class LocalStorage implements IDatabase {

    public source?: GraphDatasource;
    public isRunning?: boolean;
    public file: string;

    public constructor(public databaseName: string, public folder: string) {                
        this.file = join(folder, databaseName);
        console.log(this.file);
    }


    public async init(source: GraphDatasource): Promise<boolean> {
        this.source = source;
        this.isRunning = true;
        return Promise.resolve(true);
    }

    private cache: number[] = [];

    public runMultipleWriteQueries(queries: IQuery[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            resolve(true);
        });
    }

    public runQuery(query: string, params: any, cache = true): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const result: any = [];
            resolve(result);
        });
    }

    public async reset(): Promise<boolean> {
        try {
            Logger.log('Reset local storage db');
            // remove all entities
            this.debounceSave();

            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async persist(): Promise<void> {
        this.debounceSave();
    }

    public async link(link: Link): Promise<any> {
        if (!link.type) { link.type = 'n'; }
        try {
            Logger.log(`Creating ${link.type} relationship between ${link.from} => ${link.to}`);
            let props = { from: link.from, to: link.to, props: { from: link.from, to: link.to, ...link.properties } };
            // console.log(props);                    
            this.debounceSave();
            const r: any = [];
            return Promise.resolve({ result: 'ok', data: r });
        } catch (e) {
            return Promise.resolve({ result: 'already exists' });
        }
    }

    public async unlinkId(id: string): Promise<any> {
        try {
            console.log(`Removing relationship with id ${id}`);
            this.debounceSave();

            return Promise.resolve({ result: 'ok', data: undefined });
        } catch (e) {
            return Promise.resolve({ result: 'error' });
        }

        return Promise.resolve({ result: 'ok' });
    }

    public async storeArray(documents: any[], idProp: string, type?: string): Promise<any> {
        for (const document of documents) {
            this.debounceSave();
            if (document.hasOwnProperty(idProp)) {
                // await this.store(document, document[idProp], type);
            }
        }
        return Promise.resolve({ result: 'ok' });
    }

    public remove(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.debounceSave();
            resolve(true);
        })
    }

    public async query(query: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            resolve(true);
        })
    }


    public async storeMultiple(data: IData[], agentId?: string, updatedTime?: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const res: any[] = [];
            // console.log(this);
            // console.log(data);
            this.debounceSave();
            resolve(res);
        });
    }


    public loadGraph(graph: { [key: string]: GraphElement }, agentId?: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            
            if (!this.source) { reject(); return;  }
                                  
            for (const key in graph) {
                if (Object.prototype.hasOwnProperty.call(graph, key)) {
                    const element = graph[key] as GraphElement;                    
                    if (element.type === 'node') {
                        if (!element.id) { element.id = key; }
                        this.source!.initElement(element, agentId);
                        this.source!.addNode(element);
                    } 
                }
            }
            for (const key in graph) {
                if (Object.prototype.hasOwnProperty.call(graph, key)) {
                    const element = graph[key] as GraphElement;                    
                    if (element.type === 'edge') {
                        if (!element.id) { element.id = key; }
                        try {
                            await this.source!.addEdge({
                                id: key,
                                toId: element.toId,
                                fromId: element.fromId,
                                classId: element.classId,
                                properties: element.properties
                            });
                        }
                        catch (e) {
                            Logger.error(e);
                        }
                    }
                }
            }
            this.source!.updateNodes();
            this.source!.updateEdges();
            this.source!.updateFeatureTypeStats();
            // this.debounceSave();
            resolve(true);
        })

    }

    public loadAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {            
            this.loadFile().then(async r => {
                if (this.source) {
                    this.source.mergeFeatureTypes();  
                }
                resolve(this.loadGraph(r));
            });
        });
    }

    public async all(options?: IAllOptions): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            if (!this.source) {
                reject();
                return;
            }            

            const res: any[] = [];
            let list = [];
            if (options?.id) {     
                if (this.source.graph.hasOwnProperty(options.id)) {
                    list = [this.source.graph[options.id]];
                }
            } else if (options?.type) {
                list = this.source.getClassElements(options.type);
            } else {
                list = Object.values(this.source.graph);
            }            
            for (const element of list) {
                switch (element.type) {
                    case "node":
                        res.push({ type: "node", id: element.id, classId: element.classId, properties: element.properties });
                        break;
                    case "edge":
                        res.push({ type: "edge", id: element.id, classId: element.classId, toId: element.toId, fromId: element.fromId, properties: element.properties });
                        break;
                }
            }
            resolve(res);
        })
    }

    private removeUnderscores(object: any) {
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (key.startsWith('_')) {
                    delete object[key];
                }
                const element = object[key];
                this.removeUnderscores(element);
            }
        }
        return object;
    }


    private debounceSave = throttle(() => {
        this.save();
    }, 5000, { leading: false, trailing: true });

    public save(): Promise<boolean> {
        return new Promise((resolve, reject) => {            
            Logger.log(`Saving local storage to file : ${this.file}`);
            if (!this.source ?.graph) {
                reject();
                return;
            }
            const res = JSON.stringify(this.source.graph, (k, v) => {
                if (k.startsWith('_')) return undefined;
                if (['to', 'from'].includes(k)) return undefined;
                return v;
            }, 2);
            try {                
                console.log(this.file);
                fs.writeFileSync(this.file, res, { encoding: 'utf8' });
            } catch (e) {
                Logger.error(e);
                reject();
            }
            resolve(true);
        })
    }

    public loadFile(): Promise<{ [key: string]: GraphElement }> {
        return new Promise((resolve, reject) => {
            Logger.log(`Loading local storage from file : ${this.file}`);            
            // const absfile = join(__dirname, this.file);            
            if (!fs.existsSync(this.file)) {
                const data = {};
                Logger.error('Database does not exist');
                resolve(data);                
            } else {
                const json = fs.readFileSync(this.file, { encoding: 'utf-8' });
                if (json) {
                    const data = JSON.parse(json);
                    resolve(data);
                } else {
                    reject('No data loaded')
                }
            }
        });
    }



    
    public async store(data: IData, agentId?: string, updatedTime?: number): Promise<any> {
        if (!data.document.id) { reject('document contains no id'); }
        console.log('storing ' + data.document.id);
        // if (updatedTime) {
        //     this.checkDates(data, updatedTime);
        // }
        try {
            this.debounceSave();
            return Promise.resolve({ result: 'ok' });
        } catch (e) {
            return Promise.reject(e);
        }
    }

}
