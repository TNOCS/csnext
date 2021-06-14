import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IImportPlugin {
    id: string;
    title: string;
    description?: string;
    image: string;
    options?: any;
    callImport(doc: GraphDocument, source: DocDatasource) : Promise<IImportPluginResult>;
}

export interface IImportPluginResult {    
    document?: GraphDocument;
    error?: string;
}


