import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IIntelPlugin {
    id: string;
    title: string;
    description: string;
    options: any;
    callDocument(doc: GraphDocument, source: DocDatasource) : Promise<IIntelPluginResult>;
}

export interface IIntelPluginResult {    
    document?: GraphDocument;
    error?: string;
}


