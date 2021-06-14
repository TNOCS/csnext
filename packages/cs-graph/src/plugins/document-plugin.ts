import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IDocumentPlugin {
    id: string;
    title: string;
    description: string;
    options: any;
    callDocument(doc: GraphDocument, source: DocDatasource) : Promise<IDocumentPluginResult>;
}

export interface IDocumentPluginResult {    
    document?: GraphDocument;
    error?: string;
}


