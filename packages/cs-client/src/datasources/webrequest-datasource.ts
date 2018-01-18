import { IDatasource, IDatasourceHandler, IDatasourceProcessor } from '@csnext/cs-core';
import { AppState, DatasourceManager } from '../index';
import axios from 'axios';

// export interface IWebRequestOptions {
//   url: string;
//   interval?: number;
// }

export class WebRequestDatasourceProcessor implements IDatasourceProcessor {
  public id = 'webrequest';

  public execute(ds: IDatasource): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ds.source === undefined) { return reject('No source defined'); }
      axios.get(ds.source)
        .catch(e => { reject(e); })
        .then(response => {
          if (response) { resolve(response.data); }
        });
    });
  }
}

DatasourceManager.add(new WebRequestDatasourceProcessor());
