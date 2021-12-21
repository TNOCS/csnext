import { GraphElement } from '@csnext/cs-data';
import Vue from 'vue';
import { GraphDocument } from '../classes/document/graph-document';
import { EntityType } from '../classes/document/view-type';
import { DocDatasource } from '../datasources/doc-datasource';
import { IDocumentPlugin, IDocumentPluginResult } from './document-plugin';


export class EntityParser implements IDocumentPlugin
{
    public id = 'EntityParser';
    public title = 'Entity Parser';
    public description = this.title;
    public options = {};

    public callDocument(doc: GraphDocument, source: DocDatasource): Promise<IDocumentPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            if (doc.entities && source)
            {
                let ids : (string | undefined) [] = [];
                
                // clear entity types
                Vue.set(doc, 'entityTypes', {})
                

                // find existing entities
                let containingEntities = doc._outgoing?.filter(o => o.classId === 'CONTAINS');

                if (containingEntities && doc.entities) {
                    ids = [...new Set(containingEntities!.map(o => o.toId))] as string[];
                    for (const entityEdge of containingEntities) {
                        // find entity
                        const entity = doc.entities.find(i => i.kg_id === entityEdge.toId);
                        if (entity) {
                            entity._edge = entityEdge;
                            entity._node = entityEdge.to;
                        }
                    }


                }
                
                // get list of approved entities
                
                

                for (const entity of doc.entities)
                {
                    entity._included = (entity.id !== undefined) && ids.includes(entity.kg_id);
                    if (entity._node?._featureType?.type)
                    {
                        entity.spacy_label = entity._node._featureType.type as string;
                        if (!doc.entityTypes.hasOwnProperty(entity.spacy_label))
                        {
                            const color = GraphElement.getBackgroundColor(entity._node);
                            doc.entityTypes[entity.spacy_label] = { id: entity.spacy_label, _featureType: entity._node._featureType, title: entity._node._featureType.title, color, _selected: true } as EntityType;
                        }
                        // entity.view_class = 'doc-entity ' + entity.class + '-entity';
                        // if (entity._included)
                        // {
                        //     entity.view_class += ' ' + entity.class + '-entity-selected';
                        // }                        
                    } else if (entity.spacy_label) {
                        entity.spacy_label = entity.spacy_label as string;
                        if (entity.spacy_label && !doc.entityTypes.hasOwnProperty(entity.spacy_label))
                        {
                            doc.entityTypes[entity.spacy_label] = { id: entity.spacy_label, title: entity.spacy_label!, color: 'lightgray', _selected: false };
                        }
                        // entity.view_class = 'doc-entity rec-entity ' + entity.class + '-entity';
                    }


                    if (entity.spacy_label && doc.entityTypes[entity.spacy_label]) {
                        if (!doc.entityTypes[entity.spacy_label].count) {
                            doc.entityTypes[entity.spacy_label]!.count = 1;
                        } else {
                            doc.entityTypes[entity.spacy_label].count! += 1;
                        }
                    }

                    if (entity.spacy_label && entity._node?.properties?.location) {
                        entity._location = entity._node.properties.location;                        
                      } else if (entity.spacy_label === 'location' && entity.converted) {
                          entity._location = entity.converted;
                      }                    
                    

                    if (entity.spacy_label && entity._node?.properties?.point_in_time) {
                        entity._date = entity._node.properties.point_in_time;                        
                      } else if (entity.spacy_label === 'DATE' && entity.converted) {
                          entity._date = entity.converted;
                      }                    
                    }
                
            }
            // if (doc.relations && doc.entities)
            // {
            //     for (const relation of doc.relations)
            //     {
            //         relation._subject_entity = doc.entities.find(e => e.entity_idx?.toString() === relation.subj_entity_id);
            //         relation._object_entity = doc.entities.find(e => e.entity_idx?.toString() === relation.obj_entity_id);

            //         if (relation._object_entity)
            //         {
            //             if (!relation._object_entity._relations)
            //             {
            //                 relation._object_entity._relations = [relation];
            //             } else
            //             {
            //                 relation._object_entity._relations.push(relation);
            //             }
            //         }

            //         if (relation._subject_entity)
            //         {
            //             if (!relation._subject_entity._relations)
            //             {
            //                 relation._subject_entity._relations = [relation];
            //             } else
            //             {
            //                 relation._subject_entity._relations.push(relation);
            //             }
            //         }
            //     }
            // }
            resolve({ document: doc });
        });
    }
}
