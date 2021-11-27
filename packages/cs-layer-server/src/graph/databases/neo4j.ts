import * as fs from 'fs';
import neo4j, { Driver, Record  } from "neo4j-driver";
import { IDatabase, IData, IQuery, IAllOptions } from "./database";
import { Link } from "./link";
import { GraphEntity, GraphRelation, GraphSchema, ObservationType } from './schema';
import { generateHash} from "@csnext/cs-core";

import { GraphElement, FeatureType, FeatureCollection, GraphDatasource } from "@csnext/cs-data";
// import { reject } from 'lodash';

// import Cypher from 'cypher-tagged-templates';


const { inferSchema, makeAugmentedSchema } = require("neo4j-graphql-js");

export class Neo4J implements IDatabase {
    private schemaInferenceOptions = {
        alwaysIncludeRelationships: true    
    };

    private url = process.env.NEO4J_URL || 'bolt://localhost:7687';
    private token = neo4j.auth.basic(process.env.NEO4J_NAME || '', process.env.NEO4J_PASSWORD || '');
        
    public source?: GraphDatasource;
    public isRunning?: boolean;
    public driver?: Driver;

    public async init(source: GraphDatasource): Promise<boolean> {
        this.source = source;
        this.driver = neo4j.driver(this.url, this.token);

        // inferSchema(this.driver).then((result: any) => {
        //       return makeAugmentedSchema({
        //         typeDefs: result.typeDefs
        //       });
        //     });
        //   };
                

        // inferSchema(this.driver).then((result: any) => {
        //     fs.writeFile("test.graphql", result.typeDefs, err => {
        //             if (err) throw err;
        //             console.log("Updated schema.graphql");
        //         });
        //     const schema = makeAugmentedSchema({ typeDefs: result.typeDefs });
        //     console.log(schema);
        //     // console.log(result);
        //     // return 
        // });

        // fs.writeFile("test.graphql", inferAugmentedSchema, err => {
        //     // if (err) throw err;
        //     console.log("Updated schema.graphql");
        // });

        // console.log(inferAugmentedSchema);
          

        // inferSchema(this.driver, this.schemaInferenceOptions).then((result: any) => {
        //     return makeAugmentedSchema({
        //         typeDefs: result.typeDefs
        //     })
        //     // console.log(result);
        //     fs.writeFile("schema.graphql", result.typeDefs, err => {
        //         if (err) throw err;
        //         console.log("Updated schema.graphql");
        //     });
        // });

        await this.checkConnection();

        this.isRunning = true;
        return Promise.resolve(true);
    }

    private async checkConnection(): Promise<boolean> {
        if (!this.source) { return false; }
        if (!this.driver) {
            return this.init(this.source);
        } else {
            const info = await this.driver.verifyConnectivity();
            if (!info) {
                return this.init(this.source);
            } else {
                Promise.resolve(true);
                return true;
            }
        }
    }

    private cache: number[] = [];

    public runMultipleWriteQueries(queries: IQuery[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!this.driver) { reject({ description: 'NEO4J not available' }); return; };
            let session = this.driver.session();
            if (!session) { return reject('No session available'); }
            console.log(`Starting transaction with ${queries.length} queries`);

            const ts = session.beginTransaction();            
            for (const query of queries) {
                query.result = ts.run(query.query, query.params);
                console.log(query.query);
                // console.log(query.params);
                
            }
            await ts.commit();
            this.allBackup = undefined;
            console.log('done');
            resolve(true);

        });

    }

    public runQuery(query: string, params: any, cache = true): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (cache) {
                const hash = generateHash(query + JSON.stringify(params));
                if (this.cache.includes(hash)) {
                    resolve(true);
                    return;
                }
            }

            if (!this.driver) { reject({ description: 'NEO4J not available' }); return; };
            let session = this.driver.session();
            if (!session) { return reject('No session available'); }
            const result: any = [];

            session
                .run(query, params)
                .subscribe({
                    onNext: (record) => {
                        result.push(record);
                        // console.log(record.get('id'));
                    },
                    onCompleted: () => {
                        if (session) { session.close(); }
                        // console.log(result);
                        resolve(result);
                    },
                    onError: (error) => {
                        session.close();
                        // console.log(params);
                        console.log(error);
                        reject(error);
                    }
                });

        });

    }

    public async reset(): Promise<boolean> {
        try {
            console.log('Reset NEO4J db');
            // remove all entities
            this.source?.reset();
            await this.runQuery('MATCH (n) DETACH DELETE n', undefined);
            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async link(link: Link): Promise<any> {
        if (!link.type) { link.type = 'n'; }        
        try {
            console.log(`Creating ${link.type} relationship between ${link.from} => ${link.to}`);
            let props = { from: link.from, to: link.to, props: {from: link.from, to: link.to, ...link.properties}};
            // console.log(props);                    
            const query = `MATCH (a), (b)
            WHERE a.id = $from AND b.id = $to
            MERGE (a)-[r: ${this.parseType(link.type)}]->(b)
            ON CREATE SET r=$props`;                        
            const r = await this.runQuery(query, props);
            return Promise.resolve({ result: 'ok', data: r });
        } catch (e) {
            return Promise.resolve({ result: 'already exists' });            
        }
    }

    public async unlinkId(id: string): Promise<any> {        
        try {
            console.log(`Removing relationship with id ${id}`);            
            const query = `MATCH ()-[r {id: $id}]-() DELETE r`;
            console.log(query);
            const r = await this.runQuery(query, {id});
            return Promise.resolve({ result: 'ok', data: r });
        } catch (e) {
            return Promise.resolve({ result: 'error' });            
        }
        
        return Promise.resolve({ result: 'ok'});
    }

    public async storeArray(documents: any[], idProp: string, type?: string): Promise<any> {
        for (const document of documents) {
            if (document.hasOwnProperty(idProp)) {
                // await this.store(document, document[idProp], type);
            }
        }
        return Promise.resolve({ result: 'ok' });
    }

    public remove(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.runQuery('MATCH (n { id:$id}) DETACH DELETE n', { id: id}).then(r => {
                resolve(true);
            }).catch(e => {
                reject();
            })            
        })
    }

    public async query(query: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.runQuery(query, undefined);
                resolve(result);
            } catch (e) {
                console.log(e);
                reject();
            }
        })
    }

    private getType(data: any) : string {
        if (data.properties?.classId) {
            return data.properties?.classId;
        }        
        if (data.hasOwnProperty('class')) {
            return this.parseType(data.class);
        }
        if (data.hasOwnProperty('labels') && Array.isArray(data.labels) && data.labels.length > 0) {
            return data.labels[0];
        }
        return '';
    }

    private parseType(type: string): string {
        return type.split(' ').join('_');
    }


    public async appendMultiple(data: IData[], source?: string, updatedTime?: number) : Promise<any> {
        return new Promise(async (resolve, reject) => {
            const queries: IQuery[] = [];
            const hashes: string[] = [];
            
            for (const d of data) {
                if (!d.class) { d.class = 'n'; }
                if (source && !d.document.hasOwnProperty('kg_source')) {
                    d.document['kg_source'] = source;
                }
                if (updatedTime) {
                    this.checkDates(d, updatedTime);
                }
                
                switch (d.type) {
                    case 'e': 
                        const lhash = `${d.from}-${d.to}`;
                        if (d.from && d.to && !hashes.includes(lhash)) {
                            const linkquery = `MATCH (a), (b) WHERE a.id = $from AND b.id = $to MERGE (a)-[r:` + this.parseType(d.class) + `{from: '${d.from}', to: '${d.to}'}]->(b)`;            
                            // const linkquery = `MERGE (a:${this.parseType(d.class)}) {}, (b) WHERE a.id = $from AND b.id = $to MERGE (a)-[r:` + this.parseType(d.class) + `{from: '${d.from}', to: '${d.to}'}]->(b)`;            
                            queries.push({query: linkquery, params: { from: d.from, to: d.to }});                
                            hashes.push(lhash);
                        }
                        break;                
                    case 'n':
                        if (d.id) {
                            const hash = d.id; // crypto.createHash('md5').update(JSON.stringify(d.document)).digest("hex");                            
                            if (!hashes.includes(hash)) {
                            d.document = { ...d.document, ...{ id: d.id } };
                            const query = {query: `MERGE (a:` + this.parseType(d.class) + ` {id:$id}) ON CREATE set a=$document ON MATCH SET a+=$document`, params: { id: d.id, document: d.document }};
                            queries.push(query); 
                            hashes.push(hash);
                            }
                        }
                        break;
                }
            }
            
            try {
                const res = await this.runMultipleWriteQueries(queries);
                resolve(res);
            } catch (e) {
                console.log(e);
                reject('Error executing multiple queries');
            }
        });
    }

    public async storeMultiple(data: IData[], source?: string, updatedTime?: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const queries: IQuery[] = [];
            const hashes: string[] = [];
            
            for (const d of data) {
                if (!d.class) { d.class = 'n'; }
                if (source && !d.document.hasOwnProperty('kg_source')) {
                    d.document['kg_source'] = source;
                }
                if (updatedTime) {
                    this.checkDates(d, updatedTime);
                }
                
                switch (d.type) {
                    case 'e': 
                        const lhash = `${d.from}-${d.to}`;
                        if (d.from && d.to && !hashes.includes(lhash)) {
                            const linkquery = `MATCH (a), (b) WHERE a.id = $from AND b.id = $to MERGE (a)-[r:` + this.parseType(d.class) + `{from: '${d.from}', to: '${d.to}'}]->(b)`;            
                            // const linkquery = `MATCH (a), (b) WHERE a.id = $from AND b.id = $to MERGE (a)-[r:` + this.parseType(d.class) + `{from: '${d.from}', to: '${d.to}'}]->(b)`;            
                            // const linkquery = `MERGE (a:${this.parseType(d.class)}) {}, (b) WHERE a.id = $from AND b.id = $to MERGE (a)-[r:` + this.parseType(d.class) + `{from: '${d.from}', to: '${d.to}'}]->(b)`;            
                            queries.push({query: linkquery, params: { from: d.from, to: d.to }});                
                            hashes.push(lhash);
                        }
                        break;                
                    case 'n':
                        if (d.id) {
                            const hash = d.id; // crypto.createHash('md5').update(JSON.stringify(d.document)).digest("hex");                            
                            if (!hashes.includes(hash)) {
                            d.document = { ...d.document, ...{ id: d.id } };
                            const query = {query: `MERGE (a:` + this.parseType(d.class) + ` {id:$id}) ON CREATE set a=$document ON MATCH SET a+=$document`, params: { id: d.id, document: d.document }};
                            queries.push(query); 
                            hashes.push(hash);
                            }
                        }
                        break;
                }
            }
            
            try {
                const res = await this.runMultipleWriteQueries(queries);
                resolve(res);
            } catch (e) {
                console.log(e);
                reject('Error executing multiple queries');
            }
        });
    }

    private allBackup: any;
    private allClasses: any;

    public types(): Promise<ObservationType[]> {
        return new Promise(async (resolve, reject) => {
            let res : ObservationType[] = [];
            let schema = await this.schema();
            for (const entity of schema.entities) {
                let ft = {
                    title: entity.id,
                    type: entity.type,
                    baseType: 'node',
                    properties: [                               
                    ]                    
                } as ObservationType;
                if (entity.properties) {
                    for (const prop of entity.properties) {
                        ft.properties!.push({                            
                            // type: prop.id,
                            title: prop.type                             
                        })                        
                    }               
                }
                res.push(ft);
            }

            // for (const ot of this.observationTypes) {

                
            // }
            
            
            
            resolve(res); //this.observationTypes)
        });

    }

    public async schema(): Promise<GraphSchema> {
        return new Promise(async (resolve, reject) => {
            if (this.allClasses) {
                resolve(this.allClasses);
            }
            if (!this.driver) {
                reject();
                return;
            }
            // const driver = neo4j.driver(this.url, this.token);
            this.runQuery('CALL apoc.meta.schema', {}).then(res => {
                let schema: GraphSchema = { entities: []};
                let fields = res[0]._fields[0];                
                // console.log(JSON.stringify(fields, undefined, 2));
                for (const entid of Object.keys(fields)) {
                    let entity = fields[entid];
                    let e: GraphEntity = {
                        id: entid,
                        type: (entity.type === 'node') ? 'node' : 'edge',
                        count: entity.count?.low,
                        labels: entity.labels,
                        properties: [],
                        relations: []                        
                    };
                    if (entity.properties) {
                        for (const prop of Object.keys(entity.properties)) {
                            let property = entity.properties[prop];
                            e.properties?.push({ id: prop, type: property.type});
                        }
                    }

                    if (entity.relationships) {

                        for (const rel of Object.keys(entity.relationships)) {
                            let r = entity.relationships[rel];
                            let relation : GraphRelation = {
                                entityId: rel,
                                countIn: r.count.low,
                                direction: r.direction.toUpperCase()
                            }
                            e.relations?.push(relation);
                        }

                    }
                    schema.entities.push(e);
                    
                }
                
                // const data = res[0]._fields; // [11].split('\n').map((r:any) => JSON.parse(r) );
                // this.allClasses = data;            
                resolve(schema);
            }).catch(e => {
                console.log(e);
                reject(e);
            })            
        })
    }

    public createReturnSet(data: any[], options?: IAllOptions) : any[] {        
        if (options?.flat) {
            let res : any[] = [];
            for (const r of data) {
                res.push(r.properties);
            }
            return res;
        } else {
            return data;
        }

    }

    public loadAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.all().then(async r => {                
                for (const item of r) {
                    if (item.type === 'node' && item.properties?.id) {
                        let el = { id: item.properties.id, classId: item.labels[0], title: item.properties.name, properties: item.properties, alternatives: item.alternatives } as GraphElement;                            
                        this.source!.initElement(el);
                        this.source!.addNode(el);
                    }
                    if (item.type === 'edge') {
                        if (item.properties && item.properties.hasOwnProperty('from') && item.properties.hasOwnProperty('to')) {                                
                            await this.source!.addEdge({
                                toId: item.properties.to,
                                fromId: item.properties.from,
                                classId: item.label
                            })
                        }
                    }         
                }           
                this.source!.updateEdges();  
                this.source!.updateFeatureTypeStats(); 
                resolve(true);
            }).catch(e => {
                reject();
            })


            
        });
    }

    public async all(options?: IAllOptions): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // if (this.allBackup) {
            //     resolve(this.allBackup);
            // }
            if (!this.driver || !this.source) {
                reject(); 
                return;
            }            
            // const driver = neo4j.driver(this.url, this.token);
            this.runQuery('CALL apoc.export.json.all(null,{stream:true, useTypes:true})', {}).then(res => {                
                try {
                    // console.log('writing export');
                    // fs.writeFileSync('export-neo.json', JSON.stringify(res));
                    // console.log('export saved');

                if (res && Array.isArray(res)) {
                    const data = res[0]._fields[11].split('\n').map((r:any) => JSON.parse(r) );                                        
                    if (options?.type) {                        
                        resolve(this.createReturnSet(data.filter((r: any) => r.labels && r.labels.includes(options.type)), options));
                    } else {
                        this.allBackup = data;          
                        resolve(this.createReturnSet(data, options));
                    }
                }  else {
                    resolve([])
                }
                
            }
            catch(e) {
                console.log(e);
                resolve([]);
                // reject();
            }
            }).catch(e => {
                console.log(e);
                reject(e);
            })
        })
    }

    public checkDates(d: IData, updatedTime: number) {
        if (updatedTime && !d.document.hasOwnProperty('updated_time')) {
            d.document['updated_time'] = updatedTime;
        }
        if (updatedTime && !d.document.hasOwnProperty('created_time')) {
            d.document['created_time'] = updatedTime;
        }
    }

    public async store(data: IData, source?: string, updatedTime?: number): Promise<any> {        
        if (!data.document.id) { Promise.reject('document contains no id'); }
        console.log('storing ' + data.document.id);
        if (updatedTime) {
            this.checkDates(data, updatedTime);
        }
        try {
            const query = `MERGE (a:` + this.getType(data) + ` {id:$id}) ON CREATE set a=$document ON MATCH set a+=$document`;
            // console.log(query);
            // console.log(data.document);
            // console.log(query);
            // console.log(data.id);
            // console.log(data.document);
            await this.runQuery(query, { id: data.document.id, document: data.document }, false);
            // console.log(data.document);
            return Promise.resolve({ result: 'ok' });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async persist(): Promise<void> {
        return;
    }
    
}
