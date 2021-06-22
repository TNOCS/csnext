import { GraphElement } from '@csnext/cs-data';
import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IDocumentViewerPlugin {
    id: string;
    formats: string[];
    description: string;
    options: any;
    call(element: GraphElement, doc: GraphDocument, source: DocDatasource);
}




