import {
  IDatasource
} from '@csnext/cs-core';

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

  constructor(private datasources: { [id: string]: IDatasource }) {}

  /** Load a data source using the assigned data summary handler(s) */
  public load<T>(source: IDatasource | string): Promise<T> {
    const datasource =
      typeof source === 'string' ? this.datasources[source] : source;
    
    if (datasource.loaded) {
      return new Promise((resolve, reject) => {
        resolve(datasource as T);
        return;
      });
    }

    if (datasource.data) {
      return new Promise((resolve, reject) => {
        resolve(datasource.data);
        return;
      });
    }

    if (typeof datasource.execute !== 'function') {
      return new Promise(resolve => {
        resolve(datasource as T);
        return;
      });
    }

    // if (typeof datasource.execute === 'function' && datasource.loaded) {
    //   return new Promise((resolve, reject) => {
    //     resolve(datasource as any);
    //     return;
    //   });
    // }

    // run processors
    return new Promise((resolve, reject) => {
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
          .execute(this.datasources)
          .catch(e => {
            datasource.loaded = false;
            datasource.isLoading = false;
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
    });
  }

  /** load all data sources */
  public loadAll() {
    if (!this.datasources) {
      return;
    }
    for (const ds in this.datasources) {
      if (!this.datasources.hasOwnProperty(ds)) {
        continue;
      }
      const source = this.datasources[ds];
      if (source) {
        this.load(source);
      }
    }
  }
}
