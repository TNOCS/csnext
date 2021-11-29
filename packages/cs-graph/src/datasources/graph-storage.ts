import {
  FeatureTypeHelpers,
  FeatureTypes,
  GraphDatasource,
  GraphElement,
} from '@csnext/cs-data';
import Axios from 'axios';
import { DocDatasource, GraphDocument } from '..';

export interface IGraphStorage {
  source?: DocDatasource;
  init(source: DocDatasource);
  loadTypes(): Promise<boolean>;
  saveTypes(): Promise<boolean>;
  loadGraph(): Promise<boolean>;
  saveEdge?(element: GraphElement): Promise<GraphElement | undefined>;
  saveElement(element: GraphElement): Promise<boolean>;
  removeEdge?(id: string): Promise<boolean>;
  loadGraphElement?(id: string): Promise<GraphElement | undefined>;
  removeElement(id: string): Promise<boolean>;
}

export class GraphServer implements IGraphStorage {
  public source!: DocDatasource;

  constructor(public base_url: string) {}

  public init(source: DocDatasource) {
    this.source = source;
  }

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
                title: item.properties.name,
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
                title: item.properties.name,
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
          item.properties &&
          item.hasOwnProperty('fromId') &&
          item.hasOwnProperty('toId')
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

    return Promise.resolve(true);
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
      const res = await Axios.post(
        `${this.base_url}/graph/link`,
        edge.properties,
        {
          params: {
            fromId: edge.fromId,
            toId: edge.toId,
            classId: edge.classId,
          },
        }
      );
      return Promise.resolve(res.data as GraphElement);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async saveElement(element: GraphElement): Promise<boolean> {
    let body = Object.assign({}, element);
    // (body as any)['@type'] = element.classId;
    body.alternatives = body._alternatives?.join(',');
    if (body.properties) {
      body = Object.assign(body, body.properties);
      delete body.properties;
    }
    for (const prop of Object.keys(body)) {
      if (prop.startsWith('_')) {
        delete (body as any)[prop];
      }
    }
    delete body.class;
    this.source.updateElementProperties(element);

    try {
      Axios.post(`${this.base_url}/graph/store`, body);
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
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
      return true;
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
