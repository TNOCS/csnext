import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { IIntelPlugin, IIntelPluginResult } from './intel-plugin';


export class EntityLinker implements IIntelPlugin
{
    public id = 'EntityLinker';
    public title = 'Entity Linker';
    public description = this.title;
    public options = {
        // url: 'http://localhost:5002'
    };

    public callDocument(doc: GraphDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {            
            if (doc.entities)
            {
                console.log('Linking entities');
                for (const entity of doc.entities)
                {
                    if (!entity.id || entity.id === 'None')
                    {
                        const t = entity.text?.toLowerCase();
                        const node = Object.values(source.graph).find(i => i._title?.toLowerCase() === t);                        
                        if (node)
                        {                            
                            entity.node_id = node.id;
                            entity._node = node;
                            source.updateTextEntity(doc, entity);
                        };
                    }
                }
            }
            resolve({ document: doc });
        });
    }

}
