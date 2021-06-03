import { GraphElement } from '@csnext/cs-data';
import { IntelDocument } from '../classes/document/intel-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { IIntelPlugin, IIntelPluginResult } from './intel-plugin';


export class EntityParser implements IIntelPlugin
{
    public id = 'EntityParser';
    public title = 'Entity Parser';
    public description = this.title;
    public options = {};

    public callDocument(doc: IntelDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            if (doc.entities)
            {
                let ids : (string | undefined) [] = [];

                source.viewTypes = {};

                let containingEntities = doc._node?._outgoing?.filter(o => o.classId === 'CONTAINS');

                if (containingEntities && doc.entities) {
                    ids = [...new Set(containingEntities!.map(o => o.toId))];
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
                    if (entity._node && entity._node.class?.id)
                    {
                        entity.class = entity._node.class.id;
                        if (!source.viewTypes.hasOwnProperty(entity.class))
                        {
                            const color = GraphElement.getBackgroundColor(entity._node);
                            source.viewTypes[entity.class] = { id: entity.class, title: entity._node.class._title!, color, _selected: true };
                        }
                        // entity.view_class = 'doc-entity ' + entity.class + '-entity';
                        // if (entity._included)
                        // {
                        //     entity.view_class += ' ' + entity.class + '-entity-selected';
                        // }                        
                    } else
                    {
                        entity.class = entity.entity_class;
                        if (entity.class && !source.viewTypes.hasOwnProperty(entity.class))
                        {
                            source.viewTypes[entity.class] = { id: entity.class, title: entity.entity_class!, color: 'lightgray', _selected: false };
                        }
                        // entity.view_class = 'doc-entity rec-entity ' + entity.class + '-entity';
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
