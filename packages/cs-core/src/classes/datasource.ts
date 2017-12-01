import { LinkedList } from 'typescript-collections';

export interface IDatasource {
    id?: string;
    handler?: LinkedList<IDatasourceHandler>;
    source?: string;
    data?: any;
    options?: any;
}

export interface IDatasourceHandler {
    processor: string;
    options: { [key: string]: string | number | boolean };
    _processor?: IDatasourceProcessor;
}

export enum ProcessorActions {
    create,
    read,
    update,
    delete
}


export interface IDatasourceProcessor {
    id: string;

    execute(datasource: IDatasource, action?: ProcessorActions, data?: any);
}

export class DatasourceProcessorBase implements IDatasourceProcessor {
    id: string;

    execute(datasource: IDatasource, action?: ProcessorActions) {

    }
}

