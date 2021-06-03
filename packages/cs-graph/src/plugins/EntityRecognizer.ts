import { TextEntity } from '@csnext/cs-data';
import { IntelDocument } from '../classes/document/intel-document';
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

    public callDocument(doc: IntelDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            CacheRequest.Post(this.options.url, { text: doc.originalText }, { 'Content-Type': 'application/json' }).then((d : TextEntity[]) =>
            {
                if (Array.isArray(d)) {
                    for (const entity of d) {
                        entity.entity_idx = entity.entity_idx?.toString();
                        // (entity as TextEntity).entity_idx = entity.entity_idx
                        source.updateTextEntity(doc, entity as TextEntity);                        
                    }
                }
                // doc.entities = d;
                // console.log(doc.entities);
                resolve({ document: doc });
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
