import { IDatasource, IDatasourceHandler, IDatasourceProcessor, ProcessorActions } from '@csnext/cs-core';
import { AppState, DatasourceManager } from '@csnext/cs-client';

export class Dimension {
  public Label: string;
}

export class CrossFilterOptions {

  public Dimensions: Dimension[];
  
}

/**
 */
export class CrossFilterProcessor implements IDatasourceProcessor {
  public id = 'crossfilter';

  public execute(ds: IDatasource, action?: ProcessorActions, data?: object): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data) { return reject('crossfilter: No data received'); }
      let opt = ds.options as CrossFilterOptions;
      if (opt) {
        console.log(opt);
      }
      resolve(data);
    });
  }
}

