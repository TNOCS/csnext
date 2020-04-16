import { IDatasource } from '@csnext/cs-core';
import { rejects } from 'assert';

/**
 * The DatasourceManager maintains a list of all datasource processors and all datasources?.
 */
export class DatasourceManager {
  /** Registration of a new data source handler */
  // public static add(processor: IDatasourceProcessor) {
  //   DatasourceManager.Processors[processor.id] = processor;
  // }

  /** Available datasource handlers  */
  // private static Processors: { [id: string]: IDatasourceProcessor } = {};

  constructor() { }

  /** Load a data source using the assigned data summary handler(s) */
  public load<T>(source: IDatasource | string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (typeof source === 'string' && $cs.project.datasources && $cs.project.datasources.hasOwnProperty(source)) {
        const datasource = $cs.project.datasources[source];
        if (datasource.loaded) {
          resolve(datasource as T);
          return;
        }

        if (datasource.data) {
          resolve(datasource.data);
          return;
        }

        if (typeof datasource.execute !== 'function') {
          resolve(datasource as T);
        }

        if (datasource.data && datasource.loaded) {
          resolve(datasource.data);
          return;
        }

        // if datasource is already being loaded added promise to queue
        if (datasource.isLoading) {
          if (!datasource.requestQueue) {
            datasource.requestQueue = [];
          }
          datasource.requestQueue.push({ resolve, reject });
          return;
        }
        datasource.isLoading = true;
        if (typeof datasource.execute === 'function') {
          datasource
            .execute($cs.project.datasources)
            .catch(e => {
              datasource.loaded = false;
              datasource.isLoading = false;
              reject(e);
              return;
            })
            .then(r => {
              datasource.loaded = true;
              datasource.isLoading = false;
              resolve(r);

              while (
                datasource.requestQueue &&
                datasource.requestQueue.length > 0
              ) {
                const item = datasource.requestQueue.pop();
                if (item) {
                  item.resolve(r);
                }
              }
            });
        }
      }
    });
  }

  public update(id: string, value: any) {
    if (!$cs.project.datasources) {
      $cs.project.datasources = {};
    }
    $cs.project.datasources[id] = value;
    $cs.bus.publish('ds-' + id, 'updated', value);
  }

  /** load all data sources */
  public loadAll() {
    if (!$cs.project.datasources) {
      return;
    }
    for (const ds in $cs.project.datasources) {
      if (!$cs.project.datasources.hasOwnProperty(ds)) {
        continue;
      }
      const source = $cs.project.datasources[ds];
      if (source) {
        this.load(source);
      }
    }
  }
}
