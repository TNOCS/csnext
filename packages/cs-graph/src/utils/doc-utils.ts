import { guidGenerator } from '@csnext/cs-core';
import { TextEntity } from '@csnext/cs-data';
import { DocDatasource, GraphDocument, Observation } from '..';

export class DocUtils {
    // returns a clone list with clean set of document entities
  public static getSimplifiedEntities(doc: GraphDocument): TextEntity[] {
    if (!doc.entities) {
      return [];
    }
    let entities: TextEntity[] = [];
    for (const ent of doc.entities) {
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
    content: any,
    triggerUpdated = false,
    source: DocDatasource,
    key?: string
    
  ) {
    if (!document || !content || !Array.isArray(content)) {
      return;
    }

    // const res = [];
    if (!document.entities) {
      document.entities = [];
    }

    for (const node of content) {
      if (node.attrs && node.type === 'text-entity') {
        if (!node.attrs.id) {
          node.attrs.id = guidGenerator();
        }

        const e = {
          text: node.attrs.text,
          id: node.attrs.id,
          spacy_label: node.attrs.spacy_label,
          kg_id: node.attrs.kg_id,
          // entity_class: node.attrs.type,
          // _key: key,
        } as TextEntity;
        if (e.kg_id && source.graph.hasOwnProperty(e.kg_id)) {
          e._node = source.graph[e.kg_id];
        }
        document.entities.push(e);
        node.entity = e;
        // e._docEntity = node;
      }
      if (node.content) {
        DocUtils.syncEntities(document, node.content, false, source, key);
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