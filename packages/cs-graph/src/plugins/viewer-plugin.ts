import { GraphElement } from '@csnext/cs-data';
import { GraphDocument } from '../classes/document/graph-document';
import { DocDatasource } from '../datasources/doc-datasource';

export interface IDocumentViewerPlugin {
    id: string;
    formats?: string[];
    description: string;
    options: any;
    check?(element: GraphElement): boolean;
    call(element: GraphElement, doc: GraphElement, source: DocDatasource);
}




