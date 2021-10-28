import { Injectable, Module, Logger, Inject } from '@nestjs/common';
import { GraphDatasource } from '@csnext/cs-data';
import { IDatabase } from './databases/database';
import { guidGenerator } from "@csnext/cs-core";
import { LocalStorage } from "./databases/local";

@Injectable()
export class GraphService {
    
    public db?: IDatabase;
    public database = process.env.DATABASE || 'local';
    public source?: GraphDatasource;
    public filesPath? : string;

    constructor() {        
        Logger.log('Initializing Graph Service', 'GraphService');
    }

    // public init(databaseName: string, folder?: string) : Promise<IDatabase> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.initDatabase(database, folder);
    //             resolve(this.db);
    //         }catch(e) {
    //             reject();
    //         }           
    //     })
    // }

   public async init(databaseName?: string, folder?: string) {        
        Logger.log('Initalizing Graph Data Source', 'GraphService');        
        this.source = new GraphDatasource();        
        
        // load data model
        switch (this.database) {            
            case 'local':
                this.source.title = 'local';
                Logger.log('Initializing LocalStorage');
                this.db = new LocalStorage(databaseName, folder);                
                break;                
        }

        if (this.db) {
            try {
                await this.db.init(this.source);
            } catch (e) {
                Logger.error(e);
            }
        }
    }

    public async loadDatabase() {
        
    }

    store(body: any, type: string, id?: string, source?: string) {
        return new Promise(async (resolve, reject) => {
            // make sure we use entity, instead of wiki path
            
            let r = body;
            if (this.db && this.source) {
                let result = { result: 'error' };
                
                if (!r.hasOwnProperty('id')) { r.id = id; }
                if (!r.id) { r.id = guidGenerator(); }

                await this.source.addNode({
                    id,
                    classId: type,
                    properties: r
                });


                result = await this.db.store({
                    type: 'n',
                    document: r,
                    id: r.id,
                    class: type
                }, source ?? 'unknown', new Date().getTime());
                
                resolve(result);
            }
        })
    }

    public storeMultiple(body: any[], source?: string) {
        return new Promise(async (resolve, reject) => {            
            if (this.db && this.source && body && Array.isArray(body) && body.length > 0) {
                for (const el of body) {
                    switch(el.type.toLowerCase()) {
                        case 'n':
                            await this.source.addNode({
                                id: el.id,
                                classId: el.class,
                                properties: el.document
                            });
                            break;
                        case 'e':
                            await this.source.addEdge({
                                id: el.id,
                                toId: el.to,
                                fromId: el.from,
                                classId: el.class,
                                properties: el.document
                            });
                            break;
                    }                    
                }                
                // fs.writeFileSync('log-' + new Date().getTime() + '.json', JSON.stringify(body));
                await this.db.storeMultiple(body, source ?? 'unknown', new Date().getTime()); // storemultiple(body);                
                resolve({ result: "ok" });
            }
            reject();
        });
    }

    public static setupDB(databaseName?: string, folder?: string): Promise<GraphService> {
        return new Promise(async (resolve, reject) => {
            let db = new GraphService();
            db.init(databaseName, folder).then(e => {
                resolve(db);
            }).catch(e => {
                reject();
            })
        });
    }

    public async persist(): Promise<void> {
        if (!this.db) return;
        return this.db.persist();
    }
   
}
