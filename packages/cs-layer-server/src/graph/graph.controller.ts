import { Req, Request, Get, Controller, Query, Inject, Render, Param, Post, Body, Logger } from '@nestjs/common';
import { LayerDefinition } from '../classes';
import { Link } from './databases/link';
import { LayerService } from '../layers/layers.service'
import { GraphService } from './graph.service';
const simplify = require('simplify-geojson');
import { Injectable, Module } from '@nestjs/common';
import { parse } from 'wellknown';
import { etl } from './etl';



import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiParam,
    ApiResponse
} from '@nestjs/swagger';
import { Feature } from 'geojson';
import { FeatureType, FeatureTypes, GraphElement, SearchResult } from '@csnext/cs-data';
import { FilesService, OfflineService } from '../export';
import * as turf from '@turf/turf';

@ApiTags()
@Controller('graph')
export class GraphController {

    private variables: { [key: string]: string } = {};

    constructor(@Inject('DB') public readonly graph: GraphService, 
        @Inject('LayerService') private layerService: LayerService,
        @Inject('FilesService') private filesService: FilesService,
        @Inject('OfflineService') private offlineService: OfflineService                
        ) {                                
    }
    
    public loadData(): Promise<any> {
        return new Promise((resolve, reject) => {            
            if (!this.graph.source || !this.graph.db?.loadAll) { return; }
            this.graph.source.featureTypes = this.layerService.config.featureTypes;            
            this.graph.db.loadAll().then(r => {                
                this.graph.source?.updateSearchIndex();                                                
                resolve(r);
            }).catch(e => {
                reject();
            });


        })
    }

    private searchIndex(str: string, searchValue: string, isCaseSensitive: boolean) {
        var modifiers = isCaseSensitive ? 'g' : 'gi';
        var regExpValue = new RegExp(searchValue, modifiers);
        var matches : any[] = [];
        var startIndex = 0;
        var arr = str.match(regExpValue);
        let result;
        while ((result = regExpValue.exec(str)) !== null) {
            let matchIndex = result.index;
            let t = result[0].length;
            matches.push({ index: matchIndex, text: result[0], length: t});
        }

        return matches;
      }

   
      @Get('/check-offline-images')
      checkOfflineImages(): Promise<any> {
          return new Promise(async (resolve, reject) => {
              // resolve('done'); return;
              if (!this.graph?.source || !this.offlineService) { reject(); return; }
              Logger.log('Checking offline images');
              if (this.graph.source?.featureTypes){
                  for (const ft of Object.values(this.graph.source.featureTypes).filter(f => f.properties)) {
                      const props = ft.properties?.filter(p => p.key && p._originalType === ft.type && p.attributes && p.attributes.hasOwnProperty('image:offline'));
                      if (props && props.length>0 && ft.type) {
                          
                          // get all elemens
                          const elements = this.graph.source.getClassElements(ft.type, true);
                          for (const element of elements) {
                              // for all props
                              for (const prop of props.filter(e => element.properties!.hasOwnProperty(e.key!))) {
                                  // create url
                                  if (element.properties && prop.key) {
                                  let url = element.properties[prop.key]
                                  if (url)        
                                      if (url.indexOf(',') !== -1) {
                                          url = url.split(',')[0];
                                      }
                                      try {                           
                                          console.log(url);                                        
                                          const file = await this.filesService.loadImage(url);
                                          if (file && file.id && file.id !== '') {
                                              element.properties[prop.key] = `http://localhost:9000/files/images?url=${file.id}`;
                                              console.log(file);
                                              console.log('saved')
                                          }
                                      } catch (e) {
                                          Logger.error(e);
                                      }
                                  }
                                  
                          }
      
                      }            
                  } 
              }
              //     for (const ft of Object.values(this.graph.source.featureTypes).filter(f => f.properties)) {
              //         const props = ft.properties?.filter(p => p.key && p._originalType === ft.type && p.type === PropertyValueType.image);
              //         if (props && props.length>0 && ft.type) {
                          
              //             // get all elemens
              //             const elements = this.graph.source.getClassElements(ft.type, true);
              //             for (const element of elements) {
              //                 // for all props
              //                 for (const prop of props.filter(e => element.properties!.hasOwnProperty(e.key!))) {
              //                     // create url
              //                     let url = element.properties![prop.key!]
              //                     if (url)
              //                     {         
              //                         try {                           
              //                             console.log(url);
              //                             await this.filesService.loadImage(url);                                       
              //                         } catch (e) {
              //                             Logger.error(e);
              //                         }
              //                     }
              //                     //     try {
              //                     //         const res = await this.offlineService.store(url);
              //                     //         Logger.log(`Stored: ${url}`);
              //                     //         const originalId = `original-${element.id}-${prop.key}`;
              //                     //         let graphUpdate : {[key:string]: GraphElement} = {};
              //                     //         graphUpdate[originalId] = {
              //                     //             classId: 'original',
              //                     //             id: originalId,
              //                     //             type: 'node',
              //                     //             properties: {
              //                     //                 storage: 'offline',
              //                     //                 name: `${prop.label} - ${element.properties!.name}`,
              //                     //                 uri: url,
              //                     //                 type: 'node',
              //                     //                 classId: 'original',
              //                     //                 format: 'url'
              //                     //             }                                        
              //                     //         }
              //                     //         graphUpdate[`${element.id}-${originalId}`] = {
              //                     //             type: 'edge',
              //                     //             classId: 'HAS_ORIGINAL',
              //                     //             fromId: element.id,
              //                     //             toId: originalId,
              //                     //             id: `${element.id}-${originalId}`,
              //                     //             properties: {
              //                     //                 classId: 'HAS_ORIGINAL',
              //                     //                 id: `${element.id}-${originalId}`,
              //                     //                 name: `${prop.label}`                                            
              //                     //             }
              //                     //         };                                                                                                   
              //                     //         await this.loadGraph(graphUpdate);
              //                     //         etl.sleep(2000);
              //                     //     } catch(e) {
              //                     //         Logger.error(`Error storing: ${url}`);
              //                     //         console.log(e);
              //                     //     }
                                                                      
              //                     // }
                                  
              //             }
  
              //             }
              //         }           
              } 
              resolve(true);           
          })
      }

   
    @Get('/search')
    public search(@Query('query') query: string) : Promise<SearchResult | undefined> {
        return new Promise((resolve, reject) => {  
            if (!this.graph.source?.fuse) { resolve(undefined); return; }
            const res = this.graph.source.fuse.search(query).filter(s => s.score && s.score < 0.2).slice(0, 10) as SearchResult;
            let f = JSON.parse(JSON.stringify(res, (key, value : GraphElement) => {
                // if (value.properties)                        
                // {
                //     value.properties = value.properties.filter((t: any) => !t._originalType || t._originalType === value.type);                            
                // } else { 
                //     // value.properties = []; 
                // }
                if (key.startsWith('_')) {
                    return undefined;
                }
                return value;
            }));
            resolve(f);
        });
    }

    @Get('/reset')
    reset(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.graph.db && this.graph.source) {
                try {
                    await this.graph.source.reset();
                }
                catch (e) {
                    Logger.error(e);
                }
                
                    // remove everything
                    this.graph.db.reset().then(() => {
                        // init connection again
                        this.graph.db!.init(this.graph.source!).then(() => {
                            resolve({ result: 'ok' });
                        }).catch(e => {
                            throw (e);
                        });
                    }).catch((e) => {
                        resolve({ result: 'error', exception: e });
                    })
                }
            
        });
    }

    @Get('/contains')
    createContains(@Query('point') point: string, @Query('shape') shape: string, @Query('relation') relation: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // const t = new turf.turf
            this.allData().then(async all => {
                let edges: any[] = [];
                for (const s of all) {
                    if (s.properties ?.id && s.properties ?.classId && s.classId === shape && s.properties.hasOwnProperty('shape')) {
                        
                        
                        const fc = JSON.parse(s.properties.shape) as any;

                        // if (node.properties.)
                        if (fc && fc.features.length > 0) {

                            for (const p of all) {
                                if (p.properties.id && p.properties ?.classId && p.classId === point) {
                                    if (!p.properties.lat && !p.properties.lon && p.location) {                                        
                                        const pos = parse(p.properties.location);
                                        if (pos ?.type === 'Point') {
                                            p.properties.lat = pos.coordinates[0];
                                            p.properties.lon = pos.coordinates[1];
                                        }                                     
                                    }



                                    // }
                                    if (p.properties.lat && p.properties.lon) {

                                        let within = false;
                                        for (const feature of fc.features) {
                                            // console.log(feature.geometry.type);
                                            
                                            if (turf.inside(turf.point([p.properties.lat, p.properties.lon]), feature.geometry as any)) {
                                                within = true;
                                                console.log(p.properties.id + ' - ' + p.properties.lat + ' - ' + p.properties.lon + ' - ' + s.properties.id);
                                                console.log(p.properties.name + ' - ' + s.properties.name);


                                            }
                                        }
                                        if (within) {
                                            const id = p.properties.id + '-' + s.properties.id + '-' + relation;
                                            edges.push(id);
                                            this.graph!.db!.link(Link.fromParam(p.properties.id, s.properties.id, relation, { id })).then(r => {
                                                resolve(r);
                                            }).catch(e => {
                                                reject(e);
                                            })
                                            // create edge
                                        }
                                    }
                                }


                            }
                        }
                    }
                }
                resolve(edges);
            })


        })
    }

    @Get('/check-offline-articles')
    checkOfflineArtilces(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!this.graph?.source || !this.offlineService) { return; }
            Logger.log('Checking offline articles');
            if (this.graph.source?.featureTypes)
            for (const ft of Object.values(this.graph.source.featureTypes).filter((f: FeatureType) => f.properties)) {
                const props = (ft as FeatureType).properties?.filter(p => p.key && p._originalType === ft.type && p.attributes && p.attributes.hasOwnProperty('article:offline'));
                if (props && props.length>0 && ft.type) {
                    
                    // get all elemens
                    const elements = this.graph.source.getClassElements(ft.type, true);
                    for (const element of elements) {
                        // for all props
                        for (const prop of props.filter(e => element.properties!.hasOwnProperty(e.key!))) {
                            // create url
                            let url = element.properties![prop.key!]
                            if (url)
                                if (prop.urlTemplate) {
                                    url = prop.urlTemplate.replace('$1', url);
                                }
                                console.log(url);     
                                try {
                                    const res = await this.offlineService.store(url);
                                    Logger.log(`Stored: ${url}`);
                                    const originalId = `original-${element.id}-${prop.key}`;
                                    let graphUpdate : {[key:string]: GraphElement} = {};
                                    graphUpdate[originalId] = {
                                        classId: 'original',
                                        id: originalId,
                                        type: 'node',
                                        properties: {
                                            storage: 'offline',
                                            name: `${prop.label} - ${element.properties!.name}`,
                                            uri: url,
                                            type: 'node',
                                            classId: 'original',
                                            format: 'url'
                                        }                                        
                                    }
                                    graphUpdate[`${element.id}-${originalId}`] = {
                                        type: 'edge',
                                        classId: 'HAS_ORIGINAL',
                                        fromId: element.id,
                                        toId: originalId,
                                        id: `${element.id}-${originalId}`,
                                        properties: {
                                            classId: 'HAS_ORIGINAL',
                                            id: `${element.id}-${originalId}`,
                                            name: `${prop.label}`                                            
                                        }
                                    };                                                                                                   
                                    await this.loadGraph(graphUpdate);
                                    etl.sleep(2000);
                                } catch(e) {
                                    Logger.error(`Error storing: ${url}`);
                                    console.log(e);
                                }
                                                                
                            }
                            
                    }

                }            
            } 
            resolve(true);           
        })
    }

    @Get('/check-geoshapes')
    checkGeoshapes(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.allData().then(async all => {
                let res: { [id: string]: string } = {};
                for (const node of all) {
                    if (node.properties && (node.classId === 'country' || node.classId === 'province') && node.properties.hasOwnProperty('geoshape')) {
                        if (node.properties.geoshape.length > 0 && !node.properties.shape) {
                            res[node.id] = node.properties.geoshape;
                            try {
                                let url = node.properties.geoshape.split('+').join('_');
                                // this.graph.init
                                

                                // console.log(`url: ${url}`);
                                let file = await this.filesService.getUrl(url); //await etl.downloadFileCache(url, undefined, 5000);
                                if (file) {
                                    let shape = JSON.parse(file.toString('utf-8'));

                                    if (shape ?.data ?.features) {
                                        let mgjs = new simplify(shape.data, 0.1);
                                        for (const f of mgjs.features) {
                                            f.properties = {};
                                        }

                                        console.log(node.classId);

                                        node.properties.shape = JSON.stringify(mgjs);
                                        // console.log(JSON.stringify(shape.data).length + ' - ' + JSON.stringify(mgjs).length);                                        
                                        await this.graph.db ?.store({
                                            type: 'n',
                                            document: node.properties,
                                            id: node.id,
                                            class: node.classId
                                        });

                                    }

                                    // await sleep(5000);
                                }
                            } catch (e) {
                                console.log('here')
                                Logger.error(`Error downloading ${node.properties.geoshape}`);
                            }
                        }
                    }
                }
                resolve(res);
            })


        })
    }

    @Get('/all/:type')
    public allFromType(@Param('type') type: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            if (this.graph && this.graph.db ?.all && typeof this.graph.db ?.all === 'function') {
                resolve(this.graph.db.all({ type: type, flat: true, object: true }));
            }
        });
    }

    @Get('/all')
    allData(): Promise<any> {
        return new Promise((resolve, reject) => {            
            if (this.graph && this.graph.db ?.all && typeof this.graph.db ?.all === 'function') {
                resolve(this.graph.db.all());
            }
        });
    }

    @Get('/typedbschema')
    typedbschema() : Promise<any> {
        return new Promise(async (resolve, reject) => {
            
            let attributes = `\n\n### Attributes ###\n\n`;
            let relations = `\n\n### Relations ###\n\n`;
            let concepts = `\n\n### Entities ###\n\n`;

            const types = await this.layerService.getTypes() as FeatureTypes;
            const rels : {[key: string]: any} = {};

            const props : string[] = [];

            for (const key in types) {
                if (Object.prototype.hasOwnProperty.call(types, key)) {
                    const type = types[key] as FeatureType;

                    let parent = 'entity';
                    if (type.baseType && type.baseType.length>0) {
                        parent = type.baseType[type.baseType.length-1];
                    }

                    let definition = `${key} sub ${parent},`;
                    if (type.abstract) {
                        definition += ' abstract,'
                    }

                    definition += '\n';

                    if (type.properties) {
                        for (const prop of type.properties) {
                            if (prop.key && prop.key !== key) {
                                let key = prop.key;
                                while (key.indexOf(' ') >= 0) {
                                    key = key.replace(' ', '_');
                                }

                                while (key.indexOf(':') >= 0) {
                                    key = key.replace(':', '_');
                                }

                                prop.key = key;
                            
                                if (!prop.relation) {                                                                        
                                    if (!props.includes(key)) {
                                        attributes+=`${key} sub attribute, value string;\n`;                                 
                                        props.push(key);
                                    }                                    
                                    definition += `   owns ${key},\n`
                                } else {
                                    
                                    relations += `${key} sub relation;\n`;
                                    definition += `   owns ${key},\n`
                                }  
                        }
                    }
                    concepts+=definition.slice(0, -2) + ';\n\n';                                        
                }
            }
        }

            const result = 
            `define
            ${attributes}
            ${relations}
            ${concepts}
            `;
            resolve(result);
        })
    }

    @Get('/schema')
    allClasses(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.graph && this.graph.db ?.schema && typeof this.graph.db ?.schema === 'function') {
                resolve(this.graph.db.schema());
            }
        });
    }

    
    @Post('/importcsv')    
    importCsv(@Body() body: any, @Req() request: Request): Promise<any> {        
        return new Promise((resolve, reject) => {            
            if (this.graph?.db) {

            }
            console.log(body);            
            resolve('done');
        })
    }

    @Post('/link')
    link(@Body() body: any, @Req() request: Request, @Query('fromId') fromId: string, @Query('toId') toId: string, @Query('classId') classId: string) {
        return new Promise(async (resolve, reject) => {
            if (!this.graph.db || !this.graph.source) { return { result: 'error' } };
            let l = new Link();            
            try {
                await this.graph.source.addEdge({ fromId: fromId, toId: toId, classId: classId, properties: body});
            } catch (e) {
                Logger.error(e);
            }
            this.graph.db.link(Link.fromParam(fromId, toId, classId, body)).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            })
        });
    }



    @Post('/unlinkId')
    unlink(@Query('id') id: string) {
        return new Promise(async (resolve, reject) => {
            if (!this.graph.db ?.unlinkId || !this.graph.source) { return { result: 'error' } };
            try {
                await this.graph.source.removeEdgeById(id);
            } catch (e) {
                console.log(id);
                Logger.log(e);
            }
            this.graph.db.unlinkId(id).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            })
        });
    }

    @Post('/remove')
    async remove(@Req() request: Request, @Query('id') id: string) {
        Logger.log(`Removing node with id: ${id}`);        
        if (this.graph.source) {
            await this.graph.source.removeNodeById(id);
        }
        if (this.graph.db) {
            this.graph.db.remove(id).then(r => {
                return { result: r ? 'ok' : 'error' }
            }).catch(e => {
                return { result: 'error' }
            });
        }
    }

    @Post('/loadgraph')
    loadGraph(@Body() body: {[key: string]: GraphElement}, @Query('source') source?: string) {
        if (body && this.graph.source && this.graph.db?.loadGraph) {            
            this.graph.db.loadGraph(body);            
        }
    }

    @Post('/storemultiple')
    storemultiple(@Body() body: any[], @Query('source') source?: string) {
        return new Promise(async (resolve, reject) => {
            resolve(this.graph.storeMultiple(body));            
        });
    }

    // @Post('/appendmultiple')
    // appendmultiple(@Body() body: any[], @Query('source') source?: string) {
    //     return new Promise(async (resolve, reject) => {
    //         if (this.graph.db!.appendMultiple && body && Array.isArray(body) && body.length > 0) {
    //             // fs.writeFileSync('log-' + new Date().getTime() + '.json', JSON.stringify(body));
    //             await this.graph.db!.appendMultiple(body, source ?? 'unknown', new Date().getTime()); // storemultiple(body);                
    //             resolve({ result: "ok" });
    //         }
    //     });
    // }

    @Post('/store')
    store(@Body() body: any, @Req() request: Request, @Query('id') id?: string, @Query('idProp') idProp?: string, @Query('source') source?: string) {
        return new Promise(async (resolve, reject) => {
            // make sure we use entity, instead of wiki path
            console.log(JSON.stringify(body));
            if (body.hasOwnProperty('id')) {
                body.id = body.id.replace('wikidata.org/wiki/', 'wikidata.org/entity/');
                id = body.id;
            }
            if (idProp && body.hasOwnProperty(idProp)) {
                id = body[idProp as string];
            }
            if (!id) {
                resolve({ result: 'error', exception: 'No id was defined' });
                return;
            }
            const type = body['@type'] || body['classId'] ||  undefined;
            const context = body['@context'] || undefined;
            const link = Link.fromRequest(request, id);
            try {
                resolve(this.graph.store(body, type, id, source));                
                

                //     if (link && link.isValid()) {
                //         result = await this.graph.db.link(link);
                //     }
                //     resolve(result);
                // }

            } catch (e) {
                Logger.error(`Error storing ${id}`, 'NEO4J');
                console.log(e);
            }
        })
    }


    
}
