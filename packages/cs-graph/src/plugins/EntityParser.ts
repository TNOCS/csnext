import { GraphElement } from '@csnext/cs-data';
import { GraphDocument } from '../classes/document/graph-document';
import { ViewType } from '../classes/document/view-type';
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

                source.viewTypes = {};

                let containingEntities = doc._outgoing?.filter(o => o.classId === 'CONTAINS');

                if (containingEntities && doc.entities) {
                    ids = [...new Set(containingEntities!.map(o => o.toId))] as string[];
                    for (const entityEdge of containingEntities) {
                        // find entity
                        const entity = doc.entities.find(i => i.node_id === entityEdge.toId);
                        if (entity) {
                            entity._edge = entityEdge;
                            entity._node = entityEdge.to;
                        }
                    }


                }
                
                // get list of approved entities
                
                

                for (const entity of doc.entities)
                {
                    entity._included = (entity.id !== undefined) && ids.includes(entity.node_id);
                    if (entity._node?._featureType?.type)
                    {
                        entity.class = entity._node._featureType.type as string;
                        if (!source.viewTypes.hasOwnProperty(entity.class))
                        {
                            const color = GraphElement.getBackgroundColor(entity._node);
                            source.viewTypes[entity.class] = { id: entity.class, title: entity._node._featureType.title, color, _selected: true } as ViewType;
                        }
                        // entity.view_class = 'doc-entity ' + entity.class + '-entity';
                        // if (entity._included)
                        // {
                        //     entity.view_class += ' ' + entity.class + '-entity-selected';
                        // }                        
                    } else if (entity.entity_class) {
                        entity.class = entity.entity_class as string;
                        if (entity.class && !source.viewTypes.hasOwnProperty(entity.class))
                        {
                            source.viewTypes[entity.class] = { id: entity.class, title: entity.entity_class!, color: 'lightgray', _selected: false };
                        }
                        // entity.view_class = 'doc-entity rec-entity ' + entity.class + '-entity';
                    }

                    if (entity._node?.properties?.location) {
                        entity._location = entity._node.properties.location;                        
                      } else if (entity.entity_class === 'location' && entity.converted) {
                          entity._location = entity.converted;
                      }
                    //   return node.attrs.type === 'location';

                    
                
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
