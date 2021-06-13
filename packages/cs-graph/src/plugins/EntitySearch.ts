import { TextEntity } from '@csnext/cs-data';
import { IntelDocument } from '../classes/document/intel-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { CacheRequest } from '../utils/cache-requests';
import { IIntelPlugin, IIntelPluginResult } from './intel-plugin';


export class EntitySearch implements IIntelPlugin
{
    public id = 'EntitySearch';
    public title = 'Entity Search';
    public description = this.title;
    public options = {
        url: 'http://localhost:8000'
    };

    public callDocument(doc: IntelDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            // CacheRequest.Post(source.base_url + '/entitysearch', { doc: doc.doc}, { 'Content-Type': 'application/json' }, false).then(d =>
            //     {
            //         debugger;
            //         console.log(d);

            //         // Axios.post(this.options.url, { text: doc.originalText, entities_dtb: source.searchEntities, prerecognized_entities: doc.entities }, { headers: { 'Content-Type': 'application/json' } }).then(d => {                
            //         // doc.entities = d as TextEntity[];
            //         // for (const ent of doc.entities)
            //         // {
            //         //     if (source.graph && ent.id && ent.id !== 'None' && source.graph.hasOwnProperty(ent.id))
            //         //     {
            //         //         ent._node = source.graph[ent.id];
            //         //         ent.node_id = ent._node.id;
            //         //     }
            //         // }
            //         resolve({ document: doc });
            //     }).catch(e =>
            //     {
            //         resolve({ error: JSON.stringify(e) });
            //     });

            let search = source.searchEntities?.filter(se => !JSON.stringify(se).includes('?'));
           
            const entities = [...doc.entities!.map(e => {delete e._node; return e; } ) ]            

            CacheRequest.Post(this.options.url, { text: doc.originalText, entities_dtb: search, prerecognized_entities: entities }, { 'Content-Type': 'application/json' }, false).then(d =>
            {
                // Axios.post(this.options.url, { text: doc.originalText, entities_dtb: source.searchEntities, prerecognized_entities: doc.entities }, { headers: { 'Content-Type': 'application/json' } }).then(d => {                
                doc.entities = d as TextEntity[];
                for (const ent of doc.entities)
                {
                    if (source.graph && ent.id && ent.id !== 'None' && source.graph.hasOwnProperty(ent.id))
                    {
                        ent._node = source.graph[ent.id];
                        ent.node_id = ent._node.id;
                    }
                }
                resolve({ document: doc });
            }).catch(e =>
            {
                resolve({ error: JSON.stringify(e) });
            });
        });
    }

}
