import { guidGenerator } from '@csnext/cs-core';
import { TextEntity } from '@csnext/cs-data';
import { DocDatasource, GraphDocument, Observation } from '..';

export class DocUtils {
    // returns a clone list with clean set of document entities
  public static getSimplifiedEntities(doc: GraphDocument): TextEntity[] {
    if (!doc._entities) {
      return [];
    }
    let entities: TextEntity[] = [];
    for (const ent of doc._entities) {
      let entity = Object.assign({}, ent);
      for (const key of Object.keys(entity)) {
        if (key.startsWith('_') && entity.hasOwnProperty(key)) {
          delete (entity as any)[key];
        }
      }
      delete entity['@context'];
      entities.push(entity);
    }
    return entities;
  }

  public static syncEntities(
    document: GraphDocument,
    source: DocDatasource,
    content?: any,
    triggerUpdated?,    
    key?: string
    
  ) {
    if (!content) { content = document.properties?.doc?.content};    
    if (!document || !content || !Array.isArray(content)) {
      return;
    }

        // const res = [];
    if (!document._entities) {
      document._entities = [];
    }

    for (const node of content) {
      if (node.attrs && node.type === 'text-entity') {
        if (!node.attrs.id) {
          node.attrs.id = guidGenerator();
        }
        const e = node.attrs as TextEntity;
        if (!e._node && e.kg_id && source.graph.hasOwnProperty(e.kg_id)) {
          e._node = source.graph[e.kg_id];
        }
        document._entities.push(e);
        node.entity = e;
        // e._docEntity = node;
      }
      if (node.content) {
        DocUtils.syncEntities(document, source, node.content, false, key);
      }
    }
    if (triggerUpdated) {
      // remove entities with old keys (removed from document)
      // console.log('remove old entities');
      // document.entities = document.entities.filter((e) => e._key === key);

      source.triggerDocumentEntities();
    }
  }

  public static getSimplifiedObservations(doc: GraphDocument): Observation[] {
    if (!doc.observations) {
      return [];
    }
    let observations: Observation[] = [];
    for (const obs of doc.observations) {
      let observation = Object.assign({}, obs);
      for (const key of Object.keys(observations)) {
        if (key.startsWith('_') && observation.hasOwnProperty(key)) {
          delete (observation as any)[key];
        }
      }
      if (observation.relations) {
        for (const r of observation.relations) {
          delete r._entity;
        }
      }
      if (observation.properties) {
        for (const p of observation.properties) {
          delete p._entity;
        }
        delete observation['@context'];
        observations.push(observation);
      }
    }
    return observations;
  }
}