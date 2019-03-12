import axios from 'axios';
import { IDatasource} from '@csnext/cs-core';
import { AppState, DatasourceManager } from '../';

// export class WebRequestDatasourceProcessor implements IDatasourceProcessor {
//   public id = 'webrequest';

//   public execute(sources: {[id: string]: IDatasource}, ds: IDatasource): Promise<any> {
//     return new Promise((resolve, reject) => {
//       if (ds.source === undefined) { return reject('No source defined'); }
//       axios.get(ds.source)
//         .catch(e => { reject(e); })
//         .then(response => {
//           if (response) { resolve(response.data); }
//         });
//     });
//   }
// }

// DatasourceManager.add(new WebRequestDatasourceProcessor());
