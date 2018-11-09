import { IProject } from './project';
import { IMenu } from '..';

export interface IDatasource {
  id?: string;
  handlers?: IDatasourceHandler[];
  source?: string;
  data?: any;
  options?: any;
  // load directly from start
  instant?: boolean;
  isLoading?: boolean;
  loaded?: boolean;
  // tslint:disable-next-line:ban-types
  requestQueue?: Array<{ resolve: Function; reject: Function }>;
  execute?(
    datasources?: { [id: string]: IDatasource },
    action?: ProcessorActions,
    data?: any
  ): Promise<any>;
  // {(value: any) => void, (reason?: any) => void }
  // | PromiseLike<object> | undefined
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
  execute(
    sources: { [id: string]: IDatasource },
    datasource: IDatasource,
    action?: ProcessorActions,
    data?: any
  ): Promise<any>;
}

export class DatasourceProcessorBase implements IDatasourceProcessor {
  public id: string;

  public execute(sources: { [id: string]: IDatasource }, datasource: IDatasource, action?: ProcessorActions) {
    return Promise.resolve();
  }
}
