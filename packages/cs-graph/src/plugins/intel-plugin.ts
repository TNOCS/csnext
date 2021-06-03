import { IntelDocument } from '../classes/document/intel-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IIntelPlugin {
    id: string;
    title: string;
    description: string;
    options: any;
    callDocument(doc: IntelDocument, source: DocDatasource) : Promise<IIntelPluginResult>;
}

export interface IIntelPluginResult {    
    document?: IntelDocument;
    error?: string;
}


