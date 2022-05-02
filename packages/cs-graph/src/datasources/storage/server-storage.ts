import { AppState } from '@csnext/cs-client';
import {
  FeatureTypeHelpers,
  FeatureTypes,
  GraphDatasource,
  GraphElement,
  IGraphElementAction,
} from '@csnext/cs-data';
import Axios from 'axios';
import { DocDatasource, GraphDocument } from '../..';
import { IGraphStorage, StorageTypes } from './graph-storage';

export class ServerStorage implements IGraphStorage {
  public source!: DocDatasource;

  public storageType : StorageTypes = 'server';

  constructor(public base_url: string) {}

  public init(source: DocDatasource) : Promise<boolean> {
    this.source = source;
    return Promise.resolve(true);
  }

  // public async saveMultiple(elements: GraphElement[]) : Promise<GraphElement[]> {
    
  //   try {
  //     const r = await Axios.post(`${this.base_url}/graph/storemultiple`, elements);
  //     if (r.data && Array.isArray(r.data) && r.data.length === 1) {
  //       return Promise.resolve(r.data[0]);
  //     } else {
  //       return Promise.reject();
  //     }      
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  //   return Promise.reject();
  // }

  public async loadGraph(): Promise<boolean> {
    const url = `${this.base_url}/graph/all`;
    const clearCache = true;

    // parse graph
    let jsonGraph: any;
    const local = undefined; // localStorage.getItem(url);
    if (local && !clearCache) {
      jsonGraph = JSON.parse(local);
    } else {
      $cs.loader.addLoader('loadinggraph', 'loading graph', { color: 'green' });
      const query = await Axios.get(url);
      if (query.data) {
        jsonGraph = query.data; // ? query.data.split('\n').map((r: any) => JSON.parse(r)) : jsonGraph.data;
        try {
          // localStorage.setItem(url, JSON.stringify(jsonGraph));
        } catch (e) {}
      }
      $cs.loader.removeLoader('loadinggraph');
    }

    if (jsonGraph) {
      // get all document types
      let inputTypes: string[] | undefined;
      if (this.source._meta) {
        inputTypes = Object.values(this.source._meta)
          .filter(
            (ft) =>
              ft._inheritedTypes &&
              ft.type &&
              ft._inheritedTypes.includes('input')
          )
          .map((ft) => ft.type!);
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
                timeseries: item.timeseries,
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
                timeseries: item.timeseries,
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
    }

    if (AppState.Instance.socket) {      
      this.useSocket()      
      AppState.Instance.socket.on('connect', ()=> {
        this.useSocket();
      });
    }

    console.log('socket');
    console.log(AppState.Instance.socket);

    return Promise.resolve(true);
  }

  public async restoreGraph(kg: {[id:string]: GraphElement}): Promise<boolean> {    
    const r = await Axios.post(`${this.base_url}/graph/restore`, kg);
    return Promise.resolve(true);
  }

  public useSocket() {
    if (AppState.Instance.socket?.connected) {
      AppState.Instance.socket.on('graphelement', (data: IGraphElementAction) => {
        console.log(data);
        switch (data.action) {
          case 'update':      
            if (data.elements && this.source) {
              for (const el of data.elements) {
                if (el.id) {
                  const existing = this.source.getElement(el.id);
                  if (!existing) {
                    if (el.type === 'edge') {
                      this.source.addEdge(el);
                    } else {
                      this.source.addNode(el);
                    }
                    this.source.triggerUpdateGraph(el);                  
                  }
                  else if ((!el.properties?.hash_ || existing.properties?.hash_ !== el.properties?.hash_)) {
                    if (existing.properties) {                    
                      existing.properties = el.properties;
                      this.source.updateElementProperties(existing);
                      this.source.triggerUpdateGraph(existing);
                    }
                  } 
                }                
              }
            }            
        }
      })      
    }

  }

  public async loadTypes(): Promise<boolean> {
    if (!this.source) {
      return Promise.reject();
    }
    const url = `${this.base_url}/types`;
    try {
      const r = await Axios.get(url);
      if (r.data) {
        this.source!.featureTypes = r.data as FeatureTypes;
        $cs.loader.removeLoader('types');
        return Promise.resolve(true);
      } else {
        $cs.loader.removeLoader('types');
        return Promise.reject();
      }
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  public async saveTypes(): Promise<boolean> {
    try {
      if (this.source?.featureTypes) {
        const updateJSON = FeatureTypeHelpers.SlimTypes(
          this.source!.featureTypes
        );
        const r = await Axios.post(`${this.base_url}/types`, updateJSON);
      }
      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }

  public async saveEdge(edge: GraphElement): Promise<GraphElement | undefined> {
    try {
      return this.saveElement(edge);
      // const res = await Axios.post(
      //   `${this.base_url}/graph/link`,
      //   edge.properties,
      //   {
      //     params: {
      //       fromId: edge.fromId,
      //       toId: edge.toId,
      //       classId: edge.classId,
      //     },
      //   }
      // );
      // return Promise.resolve(res.data as GraphElement);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async saveElement(element: GraphElement): Promise<GraphElement> {
    const res = await this.saveMultiple([element]);    
    return Promise.resolve(res[0]);    
  }

  public async saveMultiple(elements: GraphElement[]): Promise<GraphElement[]> {
    let body: any[] = [];
    for (const element of elements) {
      if (!element.properties) { element.properties = {}}
      element.properties.hash_ = GraphElement.getHash(element);      
      this.source.updateElementProperties(element);  
      const b = GraphElement.getFlat(element);
      body.push(b);
    }
    
    try {
      const r = await Axios.post(`${this.base_url}/graph/save`, body);
      if (r.data && Array.isArray(r.data)) {
        return Promise.resolve(r.data);
      } else {
        return Promise.reject();
      }      
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.reject();
  }

  public async removeMultiple(ids: string[]): Promise<boolean> {

    return Promise.resolve(true);

  }

  public async removeElement(id: string): Promise<boolean> {
    try {
      await Axios.post(`${this.base_url}/graph/remove`, undefined, {
        params: { id: id },
      });
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject();
    }
  }

  public async removeEdge(id: string): Promise<boolean> {
    try {
      const res = await Axios.post(
        `${this.base_url}/graph/unlinkId`,
        undefined,
        {
          params: {
            id: id,
          },
        }
      );
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async loadGraphElement(id: string): Promise<GraphElement | undefined> {
    if (!this.source) {
      return Promise.reject();
    }
    Axios.get<GraphElement[]>(`${this.base_url}/graph/id/${id}`)
      .then((r) => {
        if (r.data && r.data.length === 1) {
          const item = r.data[0];
          if (r.data && item.id && item.properties && item.type === 'node') {
            // find existing
            if (this.source.graph.hasOwnProperty(item.id)) {
              let el = this.source.graph[item.id];
              el.properties = item.properties;
              this.source.initElement(el);
              this.source.events.publish(
                GraphDatasource.GRAPH_EVENTS,
                GraphDatasource.ELEMENT_UPDATED,
                el
              );
            } else {
              // add new
              let el = {
                ...new GraphElement(),
                ...{
                  id: item.id,
                  classId: item.classId,
                  title: item.properties.name,
                  properties: item.properties,
                  alternatives: item.alternatives,
                  timeseries: item.timeseries,
                },
              } as GraphElement;
              this.source.initElement(el);
              this.source.addNode(el);
              this.source.events.publish(
                GraphDatasource.GRAPH_EVENTS,
                GraphDatasource.ELEMENT_UPDATED,
                el
              );
              return Promise.resolve(el);
            }
          }
        } else {
          return Promise.reject(undefined);
        }

        // update node (e.g. set title)
      })
      .catch((e) => {
        return Promise.reject(e);
      })
      .finally(() => {
        // $cs.loader.removeLoader(`store-${id}`);
      });

    // this.updateNode(element, true);

    // this.refresh();
  }
}
