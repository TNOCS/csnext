import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { IImportPlugin, IImportPluginResult } from './import-plugin';

export class EmptyDocumentImport implements IImportPlugin {
    public id = "empty-document";
    public title = "EMPTY_DOCUMENT";    
    public image = "images/empty.svg";    
    callImport(doc: GraphDocument, source: DocDatasource): Promise<IImportPluginResult>
    {
        return new Promise((resolve, reject) => {
            resolve({ document: doc});
        })
    }

}