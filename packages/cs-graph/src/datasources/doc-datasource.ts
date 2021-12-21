import { GraphDocument, Observation } from './../classes/';
import {
  GraphElement,
  TextEntity,
  GraphDatasource,
  IGraphFilter,
  FilterGraphElement,
  DataSet,
  FeatureType,
  PropertyValueType,
  GraphFilterProperties,
  GraphPreset,
  IGraphNodeDefinition,
} from '@csnext/cs-data';
import { SearchEntity } from '../classes/document/search-entity';
import EntityEditor from '../components/entity-management/entity-editor.vue';
import { IDocumentPlugin } from '../plugins/document-plugin';
import { EntityParser } from '../plugins/EntityParser';
import { EntityList } from '../components/document/node-entities';
import { TimeDataSource, guidGenerator, IFormOptions, IWidget } from '@csnext/cs-core';

import { CsMap, GeojsonPlusLayer, IMapLayer, MapLayers } from '@csnext/cs-map';
import { FeatureCollection } from 'geojson';
import RelationEditor from './../components/document-management/relation-editor.vue';
import { Editor } from '@tiptap/vue-2';
import { AppState } from '@csnext/cs-client';
import FeatureTypeEditor from './../components/datamodel/feature-type-editor.vue';
import { IImportPlugin } from '../plugins/import-plugin';
import { EmptyDocumentImport } from '../plugins/empty-document-import';
import { IDocumentViewerPlugin } from '../plugins/viewer-plugin';
import { GraphCrossFilter } from '../filters/graph-cross-filter';
import { GraphServer, IGraphStorage } from './graph-storage';
import { Component } from 'vue';
import { GraphShapeDefinitions } from '../classes/graph/graph-shapes';
import { DocUtils } from '../utils/doc-utils';

export interface ITool {
  title: string;
  subtitle?: string;
  id: string;
  image?: string;
  component?: Component;
  disbled?: boolean;

  busy?: boolean;
  widget?: IWidget;
  action?: () => Promise<boolean>;
}

export class DocDatasource extends GraphDatasource {
  public id = 'doc';

  public static DOCUMENT = 'document';
  public static DOCUMENT_UPDATED = 'document_updated';
  public static DOCUMENT_ENTITIES = 'document-entities';
  public static ENTITIES_UPDATED = 'entities-updated';
  public static FEATURE_TYPES = 'feature-types';
  public static FEATURE_TYPE_SELECTED = 'feature-type-selected';

  //** graph backend, server or device */
  public storage?: IGraphStorage;

  public activeDocument?: GraphDocument;
  public searchEntities?: SearchEntity[] = [];

  public documentPlugins: IDocumentPlugin[] = [];

  public importPlugins: IImportPlugin[] = [];
  public viewerPlugins: IDocumentViewerPlugin[] = [];

  public editor?: Editor | null = null;
  public elementHistory?: string[];
  public crossFilter?: GraphCrossFilter;
  public activeUser?: GraphElement;
  public bookmarks: string[] = [];
  public filters: FilterGraphElement[] = [];
  public graphShapeDefinitions: GraphShapeDefinitions = new GraphShapeDefinitions();

  public entityParser = new EntityParser();
  public layers: { [type: string]: GeojsonPlusLayer } = {};
  public tools: ITool[] = [];

  constructor(public base_url: string, public timesourceId: string) {
    super();
  }

  public async initStorage() {
    this.storage = new GraphServer(this.base_url);
    this.storage.init(this);
  }

  public async reset(): Promise<boolean> {
    await super.reset();
    this.activeDocument = undefined;
    this.activeElement = undefined;
    return Promise.resolve(true);
  }

  public initCrossFilter() {
    this.crossFilter = new GraphCrossFilter(this);
  }

  //#region tools

  public addTool(tool: ITool) {
    const existing = this.tools.findIndex((t) => t.id === tool.id);
    if (existing !== -1) {
      this.tools.splice(existing, 1);
    }
    this.tools.push(tool);
  }

  public removeTool(id: string) {
    const existing = this.tools.findIndex((t) => t.id === id);
    if (existing !== -1) {
      this.tools.splice(existing, 1);
    }
  }

  public removeWidgetTools(widgetId: string) {
    for (const tool of this.tools.filter((t) => t.widget?.id === widgetId)) {
      this.removeTool(tool.id);
    }
  }

  //#endregion

  //#region bookmarks

  public toggleBookmark(bookmark: GraphElement): boolean {
    if (bookmark.id && this.bookmarks.includes(bookmark.id)) {
      return this.removeBookmark(bookmark);
    } else {
      return this.addBookmark(bookmark);
    }
  }

  public addBookmark(bookmark: GraphElement): boolean {
    this.bookmarks.push(bookmark.id!);
    return true;
  }

  public removeBookmark(bookmark: GraphElement): boolean {
    const index = this.bookmarks.indexOf(bookmark.id!);
    if (index >= 0) {
      this.bookmarks.splice(index, 1);
    }
    return true;
  }

  //#endregion

  //#region layers
  public async initLayer(ml: MapLayers, key: string, obs: FeatureType): Promise<IMapLayer> {
    let l = await ml.addGeojsonLayer(obs.title!, undefined, {
      popup: '{{properties.title}}',
      type: ['country', 'province'].includes(key) ? 'fill' : 'circle',

      mapbox: {
        fillPaint: {
          'fill-color': 'blue',
          'fill-opacity': 0.3,
          'fill-outline-color': 'black',
        },

        circlePaint: {
          'circle-radius': 13,
          'circle-color': 'blue',
          'circle-stroke-color': 'gray',
          'circle-stroke-width': 1,
        },
      },
      pointCircle: true,
    });
    this.layers[key] = l;
    l._source!._featureType = obs;
    l._source?.updateFeatureTypePropertyMap(l._source!._featureType);
    // this.layer = l;
    l.style!.popup = '${title}';
    l.openFeatureDetails = false;
    ml.hideLayer(l);
    this.busManager.subscribe(l._events, 'feature', (a: string, f: any) => {
      if (a === CsMap.FEATURE_SELECT) {
        try {
          let elementid = f.feature.properties.element;
          let el = this.getElement(elementid);
          if (el) {
            this.openElement(el);
          }
        } catch (e) {}
      }
    });
    return l;
  }

  public async initLayers(defaultLayer?: string) {
    // if (this.featureTypes && this.map && this.map.MapControl ?.loaded) {
    //     for (const key in this.featureTypes) {
    //         if (Object.prototype.hasOwnProperty.call(this.featureTypes, key)) {
    //             const obs = this.featureTypes[key];
    //             if (obs._inheritedTypes ?.includes('location')) {
    //                 let layer = await this.initLayer(this.map, key, obs);
    //                 if (key === defaultLayer) {
    //                     layer._events ?.subscribe(CsMap.LAYER, (a: string) => {
    //                         if (a === CsMap.LAYER_ACTIVATED) {
    //                             this.map!.mainLayer = layer as GeojsonPlusLayer;
    //                             // this.map!.updateCrossfilter(layer._source?._data);
    //                         }
    //                     })
    //                 }
    //                 //
    //             } else {
    //             }
    //         };
    //     }
    //     this.updateLayers();
    // }
  }

  public addElementToLayer(layer: DataSet, element: GraphElement) {
    if (layer && element.properties) {
      if (element.properties.hasOwnProperty('shape')) {
        let fc = JSON.parse(element.properties['shape']) as FeatureCollection;
        if (fc?.features && fc.features.length > 0) {
          let p = fc.features[0];
          p.id = element.id;
          p.properties = {
            ...element.properties,
            ...{
              title: element.properties?.name,
              element: element.id,
              color: GraphElement.getBackgroundColor(element),
            },
          };
          layer.features.push(p);
        }
      } else if (element.properties.hasOwnProperty('lat') && element.properties.hasOwnProperty('lon')) {
        // if (this.graphSettings.showAllOnMap || GraphElement.getVisibility(element, this.graphSettings)) {
        let lat = parseFloat(element.properties['lat']);
        element.properties['lat'] = lat;
        let lon = parseFloat(element.properties['lon']);
        element.properties['lon'] = lon;
        layer.features.push({
          type: 'Feature',
          id: element.id,
          properties: {
            ...element.properties,
            ...{
              title: element.properties?.name,
              element: element.id,
              color: GraphElement.getBackgroundColor(element),
            },
          },
          geometry: {
            type: 'Point',
            coordinates: [lon, lat],
          },
        });
        // }
      } else {
        layer.features.push({
          type: 'Feature',
          id: element.id,
          properties: {
            ...element.properties,
            ...{
              title: element.properties?.name,
              element: element.id,
              color: GraphElement.getBackgroundColor(element),
            },
          },
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        });
      }
    }
  }

  public updateLayer(type: FeatureType, traversal = false) {
    if (this.graph && type.type && this.layers.hasOwnProperty(type.type)) {
      const elements = this.getClassElements(type.type, traversal);
      const layer = this.layers[type.type];
      if (elements && layer._source?._data && elements.length > 0 && layer) {
        for (const el of elements) {
          this.addElementToLayer(layer._source._data, el);
        }
        layer.updateLayer();
      }
    }
  }

  public updateLayers() {
    if (this.graph) {
      // let layer = { type: 'FeatureCollection', features: [] } as FeatureCollection;
      for (const key in this.graph) {
        if (this.graph.hasOwnProperty(key)) {
          const element = this.graph[key];
          if (element.classId && this.layers.hasOwnProperty(element.classId)) {
            let layer = this.layers[element.classId]._source?._data;
            if (layer) {
              this.addElementToLayer(layer, element);
            }
          }
        }
        for (const key in this.layers) {
          if (Object.prototype.hasOwnProperty.call(this.layers, key)) {
            const layer = this.layers[key];
            layer.updateLayer();
          }
        }
      }
    }
  }

  public async updateLayerElements(elements: GraphElement[]) {
    // if (this.map) {
    //     for (const element of elements) {
    //         if (element.classId && element._featureType) {
    //             if (!this.layers.hasOwnProperty(element.classId)) {
    //                 await this.initLayer(this.map, element.classId, element._featureType)
    //             }
    //             let layer = this.layers[element.classId]._source ?._data;
    //             if (layer && element.properties) {
    //                 if (element.properties.hasOwnProperty('shape')) {
    //                     let fc = JSON.parse(element.properties['shape']) as FeatureCollection;
    //                     if (fc ?.features && fc.features.length > 0) {
    //                         let p = fc.features[0];
    //                         p.properties = {
    //                             ...element.properties, ...{
    //                                 title: GraphElement.getTitle(element),
    //                                 element: element.id,
    //                                 color: GraphElement.getBackgroundColor(element)
    //                             }
    //                         };
    //                         layer.features.push(p)
    //                     }
    //                 }
    //                 else if (element.properties.hasOwnProperty('lat') && element.properties.hasOwnProperty('lon')) {
    //                     // if (this.graphSettings.showAllOnMap || GraphElement.getVisibility(element, this.graphSettings)) {
    //                         let lat = parseFloat(element.properties['lat']);
    //                         let lon = parseFloat(element.properties['lon']);
    //                         layer.features.push({
    //                             "type": "Feature",
    //                             "id": element.id,
    //                             "properties": {
    //                                 ...element.properties, ...{
    //                                     title: GraphElement.getTitle(element),
    //                                     element: element.id,
    //                                     color: GraphElement.getBackgroundColor(element)
    //                                 }
    //                             },
    //                             "geometry": {
    //                                 "type": "Point",
    //                                 "coordinates": [lon, lat]
    //                             }
    //                         })
    //                     // }
    //                 }
    //             }
    //         }
    //     }
    //     for (const key in this.layers) {
    //         if (Object.prototype.hasOwnProperty.call(this.layers, key)) {
    //             const layer = this.layers[key];
    //             layer.updateLayer();
    //         }
    //     }
    // };
  }

  //#endregion

  public openFeatureTypeEditor(featureType: FeatureType) {
    $cs.openRightSidebarWidget(
      {
        component: FeatureTypeEditor,
        options: { showToolbar: false, title: featureType.title },
        datasource: this.id,
        data: { type: featureType },
      },
      { open: true },
      'featuretype'
    );
  }

  public openOriginal(original: GraphElement) {
    if (original.properties?.format) {
      alert('open original');
    }
  }

  //#region presets

  public getGraphPreset(id: string): FilterGraphElement | undefined {
    return this.getElement<GraphFilterProperties>(id) as FilterGraphElement;
  }

  public emptyGraph(trigger = true, preset?: string) {
    let p = this.activeGraphPreset;
    if (preset) {
      let p = this.getGraphPreset(preset);
    }

    if (p?._visibleNodes) {
      p._visibleNodes.splice(0, p._visibleNodes.length);
    }
    if (trigger) {
      this.triggerUpdateGraph();
    }
  }  

  public addGraphPreset(preset?: FilterGraphElement, activate = true): FilterGraphElement {
    if (!preset) {
      preset = {
        ...new FilterGraphElement(this),
        ...{ id: 'default' },
      };
    } else {
      preset = { ...new FilterGraphElement(this), ...preset };
    }
    if (!preset._visibleNodes) {
      preset._visibleNodes = [];
    }
    this.saveNode(preset);    
    if (activate) {
      this.applyGraphPreset(preset);
    }
    return preset;
  }

  public applyGraphPreset(preset: FilterGraphElement) {
    this.activeGraphPreset = preset;
    this.events.publish(GraphDatasource.PRESET_EVENTS, GraphDatasource.PRESET_ACTIVATED, preset);
  }

  //#endregion

  //#region documents

  public linkObservationToDocument(observation: FeatureType, doc: GraphDocument): Promise<FeatureType> {
    return new Promise((resolve, reject) => {
      if (!observation._node || !doc) {
        reject();
        return;
      }
      this.addNewEdge({
        fromId: doc.id,
        toId: observation._node.id,
        classId: 'CONTAINS_OBSERVATION',
      } as GraphElement)
        .then(async (e) => {
          observation._edge = e;
          e.to = observation._node;
          e.from = doc;
          await this.addEdge(e);
          await this.saveDocument(doc);
          resolve(observation);
        })
        .catch(() => {
          reject();
        });
    });
  }

  public parseDocument(doc: GraphDocument): Promise<GraphDocument> {
    return new Promise(async (resolve) => {
      if (this.documentPlugins) {
        // doc.entities = [];
        for (const plugin of this.documentPlugins.filter((p) => typeof p.callDocument === 'function')) {
          try {
            console.log(`Plugin: ${plugin.title}, Output: `);

            if (doc.properties?.text && doc.properties?.text.length > 0) {
              let res = await plugin.callDocument(doc, this);
              if (!res.error && res.document?.properties?.doc) {
                doc.properties.doc = res.document.properties.doc;
                // doc = res.document;
                console.log(doc.entities?.filter((e) => e._node));
              } else {
                console.log(`Error: ${res.error}`);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        this.linkDocumentEntities(doc);
        try {
          await this.entityParser.callDocument(doc, this);
        } catch (e) {
          console.log('Error parsing entities');
          console.log(e);
          resolve(doc);
        }
        // this.relationParser.callDocument(doc, this);
        // save document node
        // this.saveDocument(doc);
      }
      resolve(doc);
    });
  }

  public initDocumentPlugins() {
    this.documentPlugins = [];
  }

  public openViewer(element: GraphElement, document: GraphElement) {
    if (element.properties?.format && this.viewerPlugins) {
      const viewer = this.viewerPlugins.find((v) => v.formats && v.formats.includes(element.properties?.format));
      if (viewer) {
        viewer.call(element, document, this);
      }
    }
  }

  public linkDocumentObservations(doc: GraphDocument) {
    if (!doc.observations || !doc.entities || !this._meta) {
      return;
    }
    for (const obs of doc.observations) {
      if (obs.type && this._meta && this._meta.hasOwnProperty(obs.type)) {
        obs._featureType = this._meta[obs.type];
      }
      if (!obs._featureType) {
        obs._featureType = Object.values(this._meta).find((f) => f.title === obs.type);
      }
      if (obs._featureType) {
        if (obs.relations) {
          for (const r of obs.relations) {
            if (r.hasOwnProperty('id') && doc.entities) {
              r._entity = doc.entities.find((e) => e.id === r.id.toString());
            }
          }
        }
        if (obs.properties) {
          for (const r of obs.properties) {
            if (r.hasOwnProperty('id') && doc.entities) {
              r._entity = doc.entities.find((e) => e.id === r.id.toString());
            }
          }
        }
      }
    }
  }

  public linkDocumentEntities(doc: GraphDocument) {
    if (doc.entities && typeof Array.isArray(doc.entities)) {
      for (const e of doc.entities) {
        if (e.id && !e._node && e.kg_id) {
          e._node = this.getElement(e.kg_id);
          if (!e._node) {
            delete e.kg_id;
          }
        }
      }
    }
  }

  public initDocument(doc: GraphDocument): GraphDocument {
    if (!doc.properties) {
      doc.properties = {};
    }

    if (!doc.properties.text) {
      doc.properties.text = '';
    }

    doc._source = doc._outgoing?.find((e) => e.classId === 'FROM_SOURCE');

    if (doc.properties.entities) {
      doc.entities = JSON.parse(doc.properties.entities);
    }
    this.linkDocumentEntities(doc);
    if (doc.properties.observations) {
      doc.observations = JSON.parse(doc.properties.observations);
      this.linkDocumentObservations(doc);
    }
    return doc;
  }

  public parseDocuments() {
    if (!this.graph) {
      return;
    }
    const docs = this.getClassElements('input', true) as GraphDocument[];
    if (docs) {
      for (const doc of docs) {
        this.initDocument(doc);
        this.updateDocumentOriginals(doc);
        // doc.updateOriginals();
      }
    }
  }

  public deleteDocument(doc: GraphDocument) {
    this.removeNode(doc, true).finally(() => {
      this.events.publish(DocDatasource.DOCUMENT, DocDatasource.DOCUMENT_UPDATED);
      if (this.activeDocument?.id === doc.id) {
        this.activateDocument(undefined);
      }
    });
  }

  public linkEntityToDocument(entity: TextEntity, doc: GraphDocument): Promise<TextEntity> {
    return new Promise((resolve, reject) => {
      if (!entity._node || !doc) {
        reject();
        return;
      }
      this.addNewEdge(
        {
          fromId: doc.id,
          toId: entity._node.id,
          classId: 'CONTAINS',
        } as GraphElement,
        false
      )
        .then(async (e) => {
          entity._edge = e;
          e.to = entity._node;
          e.from = doc;
          await this.addEdge(e);
          await this.parseEntities();
          // await this.updateEdges();
          await this.saveDocument(doc);
          resolve(entity);
        })
        .catch(() => {
          reject();
        });
    });
  }

  public linkEntityListToDocument(entity: EntityList, doc: GraphDocument): Promise<EntityList> {
    return new Promise((resolve, reject) => {
      if (!entity.node || !doc) {
        reject();
        return;
      }
      let suggested_by: string | undefined = undefined;
      let suggested_time: number | undefined = undefined;
      // find agent
      if (entity.instances && entity.instances.length > 0) {
        const e = entity.instances[0];
        suggested_by = e.suggested_by;
        suggested_time = e.suggested_time;
      }

      this.addNewEdge(
        {
          fromId: doc.id,
          suggested_by,
          suggested_time,
          toId: entity.node.id,
          classId: 'CONTAINS',
        } as GraphElement,
        false
      )
        .then(async (e) => {
          entity.edge = e;
          e.to = entity.node;
          e.from = doc;

          await this.addEdge(e);
          await this.saveDocument(doc);
          await this.parseEntities();
          resolve(entity);
        })
        .catch(() => {
          reject();
        });
    });
  }

  public triggerDocumentEntities() {
    this.bus.publish(DocDatasource.DOCUMENT_ENTITIES, DocDatasource.ENTITIES_UPDATED);
  }

  public updateHighlights() {
    this.bus.publish(DocDatasource.DOCUMENT_ENTITIES, 'updateHighlights');
  }

  public removeEntityNodeFromDocument(node: any, doc: GraphDocument) {
    if (!this.editor) {
      return;
    }
  }

  public removeEntityListFromDocument(list: EntityList, doc: GraphDocument, removeInstances = false): Promise<EntityList> {
    return new Promise(async (resolve) => {
      // remove all entities

      for (const ent of list.instances) {
        ent._approved = false;
        if (ent._edge) {
          delete ent._edge;
        }
        // if (ent._docEntity) {
        //   this.removeEntityNodeFromDocument(ent._docEntity, doc);
        // }
      }
      if (removeInstances && list.instances?.length > 0) {
        doc.entities = doc.entities?.filter((t) => !list.instances.includes(t));
      }

      // remove edge is exists
      if (list.edge && doc) {
        try {
          await this.removeEdge(list.edge);
        } catch (e) {
          console.log(e);
        }
      }

      doc._outgoing = doc._outgoing?.filter((r) => r.toId !== list.node?.id);

      list._approved = false;
      list.edge = undefined;

      await this.parseEntities();
      this.updateEdges();
      await this.saveDocument(doc);

      resolve(list);
    });
  }

  public removeEntityFromDocument(entity: TextEntity, doc: GraphDocument): Promise<TextEntity> {
    return new Promise((resolve, reject) => {
      if (!entity._edge) {
        resolve(entity);
        return;
      }
      this.removeEdge(entity._edge)
        .then(async () => {
          await this.parseEntities();
          resolve(entity);
        })
        .catch((e) => {
          console.log(e);
          reject();
        });
    });
  }

  //#endregion

  //#region users
  public setActiveUser(user: GraphElement) {
    if (!user?.id) {
      return;
    }
    this.activeUser = user;
    localStorage.setItem('active-user-id', user.id);
  }

  public async initUser() {
    // get all users of type person
    const users = this.getClassElements('user', true, {
      hasObjectProperties: [{ property: 'agent_type', operator: '==', value: 'person' }],
    });

    // if no users find, create default
    if (users.length === 0) {
      try {
        const newUser = await this.addNewNode({
          classId: 'user',
          properties: {
            name: 'default',
            agent_type: 'person',
          },
        });
        this.setActiveUser(newUser);
      } catch (e) {
        console.log('Error adding default user');
      }
    } else {
      // get active user from local storage
      const activeUserId = localStorage.getItem('active-user-id');
      if (activeUserId && this.graph.hasOwnProperty(activeUserId)) {
        this.setActiveUser(this.graph[activeUserId]);
      } else {
        this.setActiveUser(users[0]);
      }
    }
  }

  //#endregion

  public async loadTypes(): Promise<boolean> {
    console.log('loading types');
    $cs.loader.addLoader('types', 'loading types');
    try {
      const res = await this.storage!.loadTypes();
      return Promise.resolve(res);
    } catch (e) {
      return Promise.reject();
    } finally {
      $cs.loader.removeLoader('types');
    }
  }

  public elementEditorForm(node: GraphElement): IFormOptions {
    let form: IFormOptions = {
      showToolbar: false,
      hideTitle: true,
      optionalSupport: true,
      isPanel: false,
      fields: [],
    };
    // this.formDef = this.formDef2;
    if (node?._featureType) {
      const ft = node?._featureType;

      if (ft?.properties) {
        for (const pt of ft.properties) {
          let required = pt.required;
          let group = pt.group;
          let section = pt.section;

          switch (pt.type) {
            case PropertyValueType.datetime:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'datetimepicker',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.string:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'string',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.image:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'string',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.element:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'selection',
                keyText: 'title',
                keyValue: 'id',
                options: () => {
                  if (pt.elementType) {
                    return this.getClassElements(pt.elementType);
                  }
                  return [];
                },
                readonly: pt.readonly,
                clearable: !required,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.options:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'selection',
                options: pt.options,
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.wkt:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'string',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.boolean:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'checkbox',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.number:
              let inputType = pt.attributes?.hasOwnProperty('form:type') ? pt.attributes['form:type'] : 'number';
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: inputType as any,
                min: pt.min,
                max: pt.max,
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.tags:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'chips',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.epoch:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                type: 'epochdatetimepicker',
                readonly: pt.readonly,
                required,
                group,
                section,
              });
              break;
            case PropertyValueType.relation:
              form.fields?.push({
                title: pt.label!,
                _key: pt.key,
                component: RelationEditor,
                type: 'component',
                data: {
                  relation: pt.relation,
                  node: node,
                  graph: this,
                },
                readonly: pt.readonly,
                keyText: 'properties.name',
                keyValue: 'id',
                required: required || (node._outgoing && node._outgoing.findIndex((r) => r.classId === pt.relation?.type) !== -1),
                group,
                section,
              });
              break;
          }
        }
      }
    }
    return form;
  }

  public openEntityEditor(entity: SearchEntity) {
    $cs.openRightSidebarWidget(
      {
        component: EntityEditor,
        data: {
          source: this,
          entity: entity,
        },
      },
      { open: true },
      'details'
    );
  }

  public async loadGraphElement<T>(id: string) {
    if (!this.storage?.loadGraphElement) {
      return Promise.reject();
    }
    const res = await this.storage.loadGraphElement(id);
  }

  /** initial loading of graph */
  public async loadGraph(clearCache = false) {
    // find or select the graph

    if (!this.storage) {
      return Promise.resolve();
    }

    await this.storage.loadGraph();
  }

  public checkQueryParams() {
    if (!$cs.router?.currentRoute?.query) {
      return;
    }
    const q = $cs.router?.currentRoute?.query;
    if (q.hasOwnProperty('nodedetails')) {
      const node = this.getElement(q['nodedetails'] as string);
      if (node) {
        this.openElement(node);
      }
    }
  }

  public refresh(loadGraph = false): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!loadGraph) {
        this.updateEdges(true);
        // await this.parseDocuments();
        // this.checkQueryParams();
        resolve(true);
      } else {
        try {
          await this.reset();
          this.initDocumentPlugins();
          await this.loadTypes();
          this.mergeFeatureTypes();
          try {
            await this.loadGraph(loadGraph);
            this.updateEdges(true);
            await this.parseDocuments();            
            this.checkQueryParams();
            console.log('publish graph loaded event');
            this.bus.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.GRAPH_LOADED);
          } catch (e) {
            alert('error loading data');
          }

          // this.updateSearchEntities();
          resolve(true);
        } catch (e) {
          reject();
        }
      }
    });
  }

  public saveFeatureType(type: FeatureType): Promise<FeatureType> {
    return new Promise(async (resolve, reject) => {
      if (this.featureTypes) {
        $cs.loader.addLoader(`updatetypes`);
        try {
          await this.storage!.saveTypes();
        } catch (e) {
        } finally {
          $cs.loader.removeLoader(`updatetypes`);
        }

        this.mergeFeatureTypes();
      }
      resolve(type);
    });
  }

  public async createEntity(type: FeatureType, askForName?: boolean, newItem?: GraphElement): Promise<GraphElement> {
    let placeholder = `new ${type.title}`;
    let name = placeholder;
    if (askForName) {
      name = await $cs.triggerInputDialog(placeholder, 'enter new name', '', placeholder);
    }
    const node = await this.addNewNode({
      id: `${type.type}-${guidGenerator()}`,
      properties: { ...newItem, name },
      classId: type.type,
    });
    return node;
  }

  public saveDocument(d: GraphDocument): Promise<GraphDocument> {
    return new Promise((resolve, reject) => {
      let doc = { ...d } as GraphDocument;
      // if (!doc) { reject(); return; }
      if (!doc.properties) {
        doc.properties = {};
      }
      if (doc.id) {
        doc.properties.id = doc.id;
      }

      // update document entities, store in graph
      if (doc.entities) {
        doc.properties.entities = JSON.stringify(DocUtils.getSimplifiedEntities(doc));
      }

      // delete doc.doc;
      if (doc.observations) {
        doc.properties.observations = JSON.stringify(DocUtils.getSimplifiedEntities(doc));
      }
      this.saveNode(doc)
        .then(async () => {
          await this.updateEdges(true);
          this.events.publish(DocDatasource.DOCUMENT, DocDatasource.DOCUMENT_UPDATED, d);
          resolve(d);
        })
        .catch((e) => {
          console.log(e);
          reject();
        });
    });
  }

  public removeObservation(observation: FeatureType): Promise<boolean> {
    return new Promise(async () => {
      let element = observation._node;

      if (element?._outgoing) {
        for (const rel of element._outgoing) {
          await this.removeEdge(rel);
        }
      }
      if (element?._incomming) {
        for (const rel of element._incomming) {
          await this.removeEdge(rel);
        }
      }
      this.parseEntities();
    });
  }

  public updateDocumentOriginals(doc: GraphDocument) {
    if (!doc._outgoing) {
      return;
    }
    GraphElement.updateOriginals(doc);
  }

  public removeNode(element: GraphElement, relations = false, notify = false): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (element && element.id && this.storage) {
        // remove relations
        if (relations) {
          // remove incomming relations
          if (element._incomming) {
            for (const incomming of element._incomming) {
              await this.removeEdge(incomming);
            }
          }

          if (element._outgoing) {
            for (const outgoing of element._outgoing) {
              await this.removeEdge(outgoing);
            }
          }
        }
        $cs.loader.addLoader(`remove-${element.id}`);
        try {
          await this.storage.removeElement(element.id);

          await this.removeNodeById(element.id!, relations);
          this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.ELEMENT_REMOVED, element);
          resolve(true);
        } catch (e) {
          reject(e);
        } finally {
          $cs.loader.removeLoader(`remove-${element.id}`);
          if (notify) {
            $cs.triggerNotification({
              title: 'Node removed',
              text: element.properties?.name,
            });
          }
        }
      }
    });
  }

  public toggleAproveElement(element: GraphElement, agent?: GraphElement): Promise<GraphElement> {
    return new Promise((resolve, reject) => {
      if (element.properties!.approved_by) {
        delete element.properties!.approved_by;
        delete element.properties!.approved_time;
        delete element._elements!.approved_by;
      } else {
        element.properties!.approved_by = agent?.id || this.activeUser?.id;
        element.properties!.approved_time = new Date().getTime();
      }
      this.saveNode(element)
        .then((e) => {
          resolve(element);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public updateProvanance(element: GraphElement, user?: GraphElement) {
    const u = this.activeUser ?? user;
    if (element.properties && u?.id) {
      element.properties['updated_by'] = u.id;
      element.properties['updated_time'] = new Date().getTime();

      if (!element.properties.hasOwnProperty('created_by')) {
        element.properties['created_by'] = u.id;
      }

      if (!element.properties.hasOwnProperty('created_time')) {
        element.properties['created_by'] = element.properties['updated_time'];
      }
    }
  }

  public async saveNode(element: GraphElement, user?: GraphElement): Promise<GraphElement> {
    if (!this.storage?.saveElement) { return Promise.reject(); }
    $cs.loader.addLoader(`store-${element.id}`);
    this.updateProvanance(element, user);

    try {
      await this.storage.saveElement(element);
      this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.ELEMENT_UPDATED, element);
      $cs.triggerNotification({
        title: $cs.Translate('NODE_SAVED'),
        text: element.properties?.name,
        timeout: 500,
        group: true,
      });
    } catch (err) {
    } finally {
      $cs.loader.removeLoader(`store-${element.id}`);
      return Promise.resolve(element);
    }
  }

  public async parseEntities() {
    if (this.activeDocument && this.entityParser) {
      try {
        await this.entityParser.callDocument(this.activeDocument, this);
        // await this.relationParser.callDocument(this.activeDocument, this);
      } catch (e) {
        // console.log(e);
      }
    }
  }

  public activateDocument(doc?: GraphDocument): Promise<GraphDocument> {
    return new Promise(async (resolve, reject) => {
      this.activeDocument = doc;
      if (!doc) {
        reject();
      } else {
        $cs.data.activeDocument = doc?.id;
        DocUtils.syncEntities(doc, doc.properties?.content, true, this);
        await this.entityParser.callDocument(doc, this);
        this.bus.publish('document', 'activated', doc);
        resolve(doc);
      }
    });
  }

  public async removeEdge(edge: GraphElement): Promise<boolean> {
    $cs.loader.addLoader(`unlink-${edge.id}`);
    if (this.storage?.removeEdge) {
      try {
        const r = await this.storage.removeEdge(edge.id!);
      } catch (e) {
        return Promise.reject();
      }
    }

    if (edge.from?._outgoing) {
      edge.from._outgoing = edge.from._outgoing?.filter((e) => e.id !== edge.id);
    }
    if (edge.to?._incomming) {
      edge.to._incomming = edge.to._incomming?.filter((e) => e.id !== edge.id);
    }
    if (edge.id && this.graph.hasOwnProperty(edge.id)) {
      delete this.graph[edge.id];
    }
    // this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.ELEMENT_UPDATED, edge)
    this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.EDGE_REMOVED, edge);
    $cs.loader.removeLoader(`unlink-${edge.id}`);

    return Promise.resolve(true);
  }

  public async saveEdge(edge: GraphElement, updateEdges = true) : Promise<GraphElement> {
    $cs.loader.addLoader(`store-${edge.id}`);
    if (this.storage?.saveElement) {
      try {
        const r = await this.storage.saveElement(edge);
        await this.addEdge(edge);
        if (updateEdges) {
          await this.updateEdges();
          await this.parseEntities();
        }
        this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.ELEMENT_ADDED, edge);        
        return Promise.resolve(edge);
      } catch (err) {
        return Promise.reject(err);
      }
      finally {
        $cs.loader.removeLoader(`store-${edge.id}`);
      }
    }
    return Promise.reject();
  }

  /**
   * adds a new edge to the graph, based on a edge GraphElement and call graph api to store it
   */
  public async addNewEdge(edge: GraphElement, updateEdges = true): Promise<GraphElement> {
    edge = this.createEdge(edge);
    return this.saveEdge(edge);    
  }

  public async addNewNode(element: GraphElement): Promise<GraphElement> {
    let res = this;
    if (!element.id) {
      element.id = element.classId + '-' + guidGenerator();
    }
    if (!element.properties) {
      element.properties = {};
    }
    if (!element.properties.name && element.id) {
      element.properties.name = element.id;
    }
    if (!element.properties.updated_time) {
      element.properties.updated_time = new Date().getTime();
    }
    if (!element.properties.created_time) {
      element.properties.created_time = new Date().getTime();
    }
    if (!element.properties.created_by && this.activeUser) {
      element.properties.created_by = this.activeUser.id;
    }
    if (!element.properties.updated_by && this.activeUser) {
      element.properties.updated_by = this.activeUser.id;
    }
    element.type = 'node';
    $cs.loader.addLoader(`store-${element.id}`);
    try {
      await this.saveNode(element);
      this.initElement(element);
      res = res.addElement(element);
      await this.refresh();
      this.events.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.ELEMENT_ADDED, element);
      return Promise.resolve(element);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      $cs.loader.removeLoader(`store-${element.id}`);
    }
  }

  public selectElementId(id: string, open = false) {
    const e = this.getElement(id);
    if (e) {
      this.selectElement(e, open);      
    }
  }

  // public includeElement(element: GraphElement) {
  //     element._included = true;
  //     this.bus.publish("filter", "_included", element);
  // }

  // public toggleElement(element: GraphElement) {
  //     // entity._node._collapsed = true;
  //     element._included = !element._included;
  //     this.bus.publish("filter", "_included", element);
  // }

  public selectElement(element: GraphElement | undefined, open = false) {
    if (!element) {
      return;
    }
    this.activeElement = element;
    element._collapsed = !element._collapsed;
    if (open) {
      this.openElement(element);
    }
    this.bus.publish('focus', 'element', element);
  }

  public startEditElement(element: GraphElement) {
    element._isEditting = true;
    this.bus.publish('element', 'start-editing', element);
  }

  public stopEditElement(element: GraphElement) {
    element._isEditting = false;
    this.bus.publish('element', 'stop-editing', element);
  }

  public createKGView(elements?: GraphElement[], preset: string = 'default', empty = false) {
    if (empty) {
      this.emptyGraph(true, preset);
    }
    if (elements) {
      for (const el of elements) {
        // el._included = true;
        this.addElementToPreset(el, preset, empty);
      }
      this.triggerUpdateGraph();
    }
  }

  public addElementToPreset(el: GraphElement, preset: string, trigger = true, pos?: IGraphNodeDefinition) {
    let p = this.getGraphPreset(preset);
    if (!p) {
      p = this.addGraphPreset({ id: preset, properties: { name: preset } } as FilterGraphElement);
    }
    if (!p.properties) {
      p.properties = {};
    }

    if (!p.properties.nodes) {
      p.properties.nodes = {};
    }

    if (p?.properties.nodes && el.id && !p.properties.nodes.hasOwnProperty(el.id)) {
      p.properties.nodes[el.id] = { ...{ x: 100, y: 100 }, ...pos };
      if (trigger) {
        this.triggerUpdateGraph(el);
        this.bus.publish(DocDatasource.PRESET_EVENTS, DocDatasource.PRESET_ELEMENT_ADDED, el);
      }
    }
  }

  public removeElementFromPreset(el: GraphElement, preset: string) {
    let p = this.getGraphPreset(preset);
    if (p?.properties?.nodes && el.id && p.properties.nodes.hasOwnProperty(el.id)) {
      delete p.properties.nodes[el.id];
    }
    if (p?._visibleNodes) {
      const i = p._visibleNodes.indexOf(el);
      p._visibleNodes.splice(i, 1);
    }
    this.triggerUpdateGraph();
  }

  public addRelationsToPreset(element: GraphElement, preset: string, classId?: string) {
    if (element?._outgoing) {
      for (const out of element?._outgoing) {
        if (out.to && (!classId || out.classId === classId)) {
          this.addElementToPreset(out.to, preset, false);
        }
      }
    }

    if (element?._incomming) {
      for (const incomming of element?._incomming) {
        if (incomming.from && (!classId || incomming.classId === classId)) {
          this.addElementToPreset(incomming.from, preset, false);
        }
      }
    }
    this.triggerUpdateGraph();
  }

  public openElement(node: GraphElement | string) {
    if (typeof node === 'string') {
      const n = this.getElement(node);
      if (!n) {
        return;
      } else {
        node = n;
      }
    }
    if (!node?.id) {
      return;
    }
    this.activeElement = node;
    $cs.updateRouteQuery({ nodedetails: node.id });
    this.bus.publish('element', 'select-element', node);
    $cs.openRightSidebarKey('details');
    this.addElementToHistory(node.id);
  }

  public updateSearchEntities() {
    let entities: GraphElement[] = [];
    for (const node of Object.values(this.graph)) {
      let excludeClasses = ['instance', 'airport', 'document'];

      if (
        node.class &&
        node.type === 'node' &&
        !node.properties?.nlp_ignore &&
        node.properties?.name &&
        !node.properties.name?.startsWith('Q') &&
        !excludeClasses.includes(node.classId!)
      ) {
        entities.push(node);
        // let aka = (node.properties?.aliases) ? node.properties.aliases.split(',') : [node.title];

        this.searchEntities?.push({
          id: node.id,
          entity: node.properties.name!,
          ent_class: node.classId,
          aka: node._alternatives,
        });
      }
    }
    this.searchEntities = [...this.searchEntities!, ...[]];
  }

  public async removeReports() {
    let rec = this.getClassElements('aerial_reconnaissance');
    if (rec) {
      for (const r of rec) {
        await this.removeNode(r, true);
      }
    }
    let reports = this.getClassElements('airint_report');
    if (reports) {
      for (const report of reports) {
        await this.removeNode(report);
        // this.graph.rem
      }
    }
  }

  public setQueryParams() {
    if (!$cs.project.rightSidebar?.open) {
      $cs.removeRouteQueryParam('nodedetails');
    }
  }

  public loadElementHistory() {
    const history = localStorage.getItem('element-history');
    if (history && history.length > 0) {
      this.elementHistory = history.split(',');
    } else {
      this.elementHistory = [];
    }
  }

  public saveElementHistory() {
    if (!this.elementHistory) {
      return;
    }
    const history = this.elementHistory.join(',');
    localStorage.setItem('element-history', history);
  }

  public addElementToHistory(id: string) {
    if (!this.elementHistory) {
      this.elementHistory = [];
    } else {
      // remove same item
      this.elementHistory = this.elementHistory.filter((e) => e !== id);
    }
    this.elementHistory.push(id);
    while (this.elementHistory.length > 10) {
      this.elementHistory.splice(0, 1);
    }
    this.saveElementHistory();
  }

  public execute(): Promise<DocDatasource> {
    return new Promise(async (resolve, reject) => {
      this.initStorage();
      
      await this.refresh(true);
      this.loadElementHistory();
      
      this.importPlugins.push(new EmptyDocumentImport());

      if (this.timesourceId) {
        AppState.Instance.loadDatasource<TimeDataSource>(this.timesourceId).then((ts) => {
          // this.timesource = ts;
          // this.initTimeDatasource();
          resolve(this);
        });
      }

      AppState.Instance.bus.subscribe(AppState.RIGHTSIDEBAR, (a: string, node: GraphElement) => {
        if (a === AppState.RIGHTSIDEBAR_CLOSED) {
          this.setQueryParams();
        }
      });

      this.bus.subscribe(CsMap.NODE, (a: string, node: GraphElement) => {
        switch (a) {
          case CsMap.NODE_SELECT:
            this.openElement(node);
            break;
        }
      });

      // this.applyGraphPreset(this.graphPresets[0]);

      resolve(this);
    });
  }
}
