import { FeatureTypeHelpers, FeatureTypes, GraphElement } from '@csnext/cs-data';
import { DocDatasource, GraphDocument, IGraphStorage, StorageTypes } from '../..';
import debounce from 'lodash/debounce';
import { get, set } from 'idb-keyval';
import Vue from 'vue';

export class RecentEntry {
  public name?: string;
  public handle?: any;
}

export class KGStorage {
  public kg?: GraphElement[];
  public featureTypes?: FeatureTypes;
}

export class DeviceStorage implements IGraphStorage {
  public static DATA_MODEL_FILE = 'server.config.json';
  public static DATA_GRAPH_FILE = 'database2.json';  
  public source!: DocDatasource;

  public storageType: StorageTypes = 'device';
  public directoryHandle?: any;
  public files: { [name: string]: any } = {};
  public dbPermission: boolean = false;
  private storage?: KGStorage;
  

  public databaseHandle?: any | null = null;

  public static get recentId() : string {
    return `recents-kg-${$cs.project.id}`;
  }
  
  public static async recentDatabases() : Promise<RecentEntry[]> {
    const recent = await get(DeviceStorage.recentId) as RecentEntry[];
    return recent;
  }

  constructor() {}

  

  public static async saveRecentDatabases(db: RecentEntry[]) {
    await set(this.recentId, db);    
  }

  public async init(source: DocDatasource) {
    this.source = source;
    
    this.dbPermission = false;
    // if (this.databaseHandle === null) {
    //   this.databaseHandle = await get(DeviceStorage.DATA_GRAPH_FILE);
    // }
     
    if (this.databaseHandle !== null) {
      if (await this.verifyPermission(this.databaseHandle, true)) {
        // await set(DeviceStorage.DATA_GRAPH_FILE, this.databaseHandle);
        this.storage = await this.getJsonFromHandle(this.databaseHandle);
        const recent = await DeviceStorage.recentDatabases();
        if (recent.findIndex(rd => rd.handle && rd.handle.isSameEntry(this.databaseHandle) && rd.name === this.databaseHandle.name) === -1) {
          recent.push({ handle: this.databaseHandle, name: this.databaseHandle.name})        
          await DeviceStorage.saveRecentDatabases(recent);
        }
        console.log(this.storage);        
        this.dbPermission = true;
        this.source.events.publish(DocDatasource.STORAGE, DocDatasource.STORAGE_CHANGED);
      } else {
        this.databaseHandle = null;
      }
      
      // for await (let [name, handle] of this.directoryHandle.entries()) {
      //   if (this.files !== null) {
      //     this.files[name.toLowerCase()] = handle;
      //   }
      // }
    }
    return Promise.resolve(true);
  }

  
  private async verifyPermission(fileHandle, readWrite) {
    const options : any = {};
    if (readWrite) {
      options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
      return true;
    }
    try {
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === 'granted') {
      return true;
    }
  } catch (e) {

  }
    // The user didn't grant permission, so return false.
    return false;
  }

  public async loadGraph(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      
          if (!this.storage?.kg) {
            reject();
            return;
          }
          const jsonGraph = Object.values(this.storage.kg) as GraphElement[];
          // get all document types
          let inputTypes: string[] | undefined;
          if (this.source._meta) {
            // inputTypes = Object.values(this.source._meta)
            //   .filter((ft) => ft._inheritedTypes && ft.type && ft._inheritedTypes.includes('input'))
            //   .map((ft) => ft.type!);
          }
          for (const item of jsonGraph.filter((i) => i.type === 'node')) {
            if (item.properties && !item.properties.id && item.id) {
              item.properties.id = item.id;
            }
            if (item.id && item.classId) {
              const classId = item.classId; // item.labels[0];
              // get all inputs

              if (inputTypes && inputTypes.includes(classId)) {
                let el = {
                  ...new GraphDocument(),
                  ...{
                    id: item.id,
                    classId: item.classId,
                    properties: item.properties,
                    alternatives: item.alternatives,
                  },
                } as GraphElement;
                this.source.initElement(el);
                this.source.addNode(el);
                // this.source.initDocument(el);
              } else {
                let el = {
                  ...new GraphElement(),
                  ...{
                    id: item.id,
                    classId: item.classId,
                    properties: item.properties,
                    alternatives: item.alternatives,
                  },
                } as GraphElement;
                this.source.initElement(el);
                this.source.addNode(el);
              }
            }
          }
          for (const item of jsonGraph.filter((i) => i.type === 'edge')) {
            // if (item.properties && item.hasOwnProperty('fromId') && item.hasOwnProperty('toId')) {
            //     await this.addEdge({
            //         id: item.id,
            //         toId: item.toId,
            //         fromId: item.fromId,
            //         classId: item.classId,
            //         properties: item.properties
            //     })
            // }
            if (
              item.properties
              // item.hasOwnProperty('fromId') &&
              // item.hasOwnProperty('toId')
            ) {
              await this.source.addEdge({
                id: item.id,
                toId: item.toId,
                fromId: item.fromId,
                classId: item.classId,
                properties: item.properties,
              });
            }
          }
          // this.source.importCase();
          this.source.updateEdges();
          this.source.updateFeatureTypeStats();
          await this.source.initUser();
          await this.source.parseDocuments();
          resolve(true);
        })
 
    

  }

  private async getJsonFromHandle(fileHandle: any): Promise<any | undefined> {
    try {
      if (await this.verifyPermission(fileHandle, false)) {
      // if (this.files && this.files.hasOwnProperty(file)) {
        const dataFile = await fileHandle.getFile();
        if (dataFile) {
          const dataText = await dataFile.text();
          if (dataText) {
            const json = JSON.parse(dataText);
            if (json) {
              return Promise.resolve(json);
            }
          }
        }
      } else {
        return Promise.reject();
        // alert('no permission');
      }
      // } else {
      //   return Promise.reject();
      // }
    } catch (e) {
      console.log(e);
      $cs.triggerNotification({ text: 'ERROR LOADING: '});
      return Promise.reject();
    }
  }

  private async getJsonContent(file: string): Promise<any | undefined> {
    try {
      if (this.files && this.files.hasOwnProperty(file)) {
        const dataFile = await (this.files[file] as any).getFile();
        if (dataFile) {
          const dataText = await dataFile.text();
          if (dataText) {
            const json = JSON.parse(dataText);
            if (json) {
              return Promise.resolve(json);
            }
          }
        }
      } else {
        return Promise.reject();
      }
    } catch (e) {
      console.log(e);
      $cs.triggerNotification({ text: 'ERROR LOADING: ' + file });
      return Promise.reject();
    }
  }

  public async loadTypes(): Promise<boolean> {
    if (!this.source) {
      return Promise.reject();
    }

    if (this.storage?.featureTypes) {
      this.source!.featureTypes = this.storage.featureTypes as FeatureTypes;
      return Promise.resolve(true);
    }      
    return Promise.reject();
      
  }

  private saveDatabaseDebounce = debounce(this.saveDatabase, 10000);

  public static getStorage(source: DocDatasource) : KGStorage | undefined {
    if (!source?.graph || !source.featureTypes ) return;
    let storage: KGStorage = {
      kg: JSON.parse(JSON.stringify(source.graph, (k, v) => {
        if (k.startsWith('_')) return undefined;
        if (['to', 'from'].includes(k)) return undefined;
        return v;
      })),
      featureTypes: FeatureTypeHelpers.SlimTypes(source.featureTypes)
    }
    return storage;
  }
  
  private async saveDatabase()  {
    console.log('save Database');
    if (!this.source?.graph || !this.storage || !this.databaseHandle) { return; }

    
    // Create a FileSystemWritableFileStream to write to.
    const writable = await this.databaseHandle.createWritable();

    const res = JSON.parse(JSON.stringify(this.source.graph, (k, v) => {
      if (k.startsWith('_')) return undefined;
      if (['to', 'from'].includes(k)) return undefined;
      return v;
    }));
    this.storage.kg = res;
      
      // Write the contents of the file to the stream.
    await writable.write(JSON.stringify(this.storage, undefined, 2));
      
      // Close the file and write the contents to disk.
    await writable.close();
    
  }

  public async saveTypes(): Promise<boolean> {
    try {      
      if (this.source?.featureTypes && this.dbPermission) {                        
          this.storage.featureTypes = FeatureTypeHelpers.SlimTypes(this.source.featureTypes);
          this.saveDatabaseDebounce();        
        // const r = await Axios.post(`${this.base_url}/types`, updateJSON);
      }
      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }

  public async saveEdge(edge: GraphElement): Promise<GraphElement | undefined> {
    try {
      if (this.dbPermission) {
        this.saveDatabaseDebounce();
      }
      return this.saveElement(edge);     
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async saveElement(element: GraphElement): Promise<GraphElement> {
    if (!element.properties) {
      element.properties = {};
    }
    element.properties.hash_ = GraphElement.getHash(element);

    // let body = GraphElement.getFlat(element);
    if (this.dbPermission) {
      this.saveDatabaseDebounce();
    }

    // delete body.class;
    this.source.updateElementProperties(element);

    return Promise.resolve(element);    
  }

  public async removeElement(id: string): Promise<boolean> {
    // try {
    //   await Axios.post(`${this.base_url}/graph/remove`, undefined, {
    //     params: { id: id },
    //   });
    //   return Promise.resolve(true);
    // } catch (e) {
    //   return Promise.reject();
    // }
    if (this.dbPermission) {
      this.saveDatabaseDebounce();
    }
    return Promise.resolve(true);
  }

  public async removeEdge(id: string): Promise<boolean> {
    if (this.dbPermission) {
      this.saveDatabaseDebounce();
    }
      return Promise.resolve(true);
    
  }

 
}
