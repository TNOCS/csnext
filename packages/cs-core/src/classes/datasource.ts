export interface IDatasource {
    id?: string;
    handlers?: IDatasourceHandler[];
    source?: string;
    data?: any;
    options?: any;
    // load directly from start
    instant?: boolean;
}

export interface IDatasourceHandler {
  processorId: string;
  options?: { [key: string]: string | number | boolean };
  _processor?: IDatasourceProcessor;
}

export enum ProcessorActions {
  Create,
  Read,
  Update,
  Delete
}

export interface IDatasourceProcessor {
  id: string;
  execute(datasource: IDatasource, action?: ProcessorActions, data?: any): Promise<any>;
}

export class DatasourceProcessorBase implements IDatasourceProcessor {
  public id: string;

  public execute(datasource: IDatasource, action?: ProcessorActions) {
    return Promise.resolve();
  }
}
