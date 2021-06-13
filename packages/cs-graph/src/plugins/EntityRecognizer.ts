import { TextEntity } from '@csnext/cs-data';
import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { CacheRequest } from '../utils/cache-requests';
import { IIntelPlugin, IIntelPluginResult } from './intel-plugin';


export class EntityRecognizer implements IIntelPlugin
{
    public id = 'EntityRecognizer';
    public title = 'Entity Recognizer';
    public description = this.title;
    public options = {
        url: 'http://localhost:5001'
    };

    public callDocument(doc: GraphDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            let entities: TextEntity[] = [];
            CacheRequest.Post(this.options.url, { text: doc.originalText }, { 'Content-Type': 'application/json' }).then((d : TextEntity[]) =>
            {
                console.log(d);                
                entities = d as TextEntity[];
                console.log('recognizer');
                console.log(entities)
                // if (Array.isArray(d)) {
                //     for (const entity of d) {
                //         entity.entity_idx = entity.entity_idx?.toString();
                //         // (entity as TextEntity).entity_idx = entity.entity_idx
                //         source.updateTextEntity(doc, entity as TextEntity);                        
                //     }
                // }
                CacheRequest.Post('http://localhost:8000', { text: doc.originalText, entities_dtb:[], prerecognized_entities: d }, { 'Content-Type': 'application/json' }, false).then(r =>
                {
                    
                    entities = r as TextEntity[];
                    console.log('search');
                    console.log(entities);
                    // Axios.post(this.options.url, { text: doc.originalText, entities_dtb: source.searchEntities, prerecognized_entities: doc.entities }, { headers: { 'Content-Type': 'application/json' } }).then(d => {                
                    // doc.entities = d as TextEntity[];
                    // for (const ent of doc.entities)
                    // {
                    //     if (source.graph && ent.id && ent.id !== 'None' && source.graph.hasOwnProperty(ent.id))
                    //     {
                    //         ent._node = source.graph[ent.id];
                    //         ent.node_id = ent._node.id;
                    //     }
                    // }
                    
                }).catch(e =>
                {                    
                    resolve({ document: doc,  error: JSON.stringify(e) });
                }).finally(()=>{
                    if (Array.isArray(entities)) {
                        for (const entity of entities) {
                            entity.entity_idx = entity.entity_idx?.toString();
                            // (entity as TextEntity).entity_idx = entity.entity_idx
                            source.updateTextEntity(doc, entity as TextEntity);                        
                        }
                    }
                    resolve({ document: doc });
                })



                // doc.entities = d;
                // console.log(doc.entities);
                // resolve({ document: doc });
            }).catch(e =>
            {
                resolve({ error: JSON.stringify(e) });
            });
            // Axios.post(this.options.url, , { headers:  }).then(d => {
            //     doc.entities = d.data;
            //     resolve({ document: doc });
            // }).catch(e => {
            //     resolve({ error: JSON.stringify(e)});
            //     // reject(e);
            // });
        });
    }

}
