import { IDatasourceProcessor, IDatasource, ProcessorActions } from '@csnext/cs-core';

/**
 * The DatasourceManager maintains a list of all datasource processors and all datasources?.
 */
export class DatasourceManager {
  /** Registration of a new data source handler */
  public static add(processor: IDatasourceProcessor) {
    DatasourceManager.Processors[processor.id] = processor;
  }

  /** Available datasource handlers  */
  private static Processors: { [id: string]: IDatasourceProcessor } = {};

  constructor(private datasources: { [id: string]: IDatasource }) { }

  /** Load a data source using the assigned data source handler(s) */
  public load(source: IDatasource | string): Promise<object> {
    const datasource = typeof source === 'string' ? this.datasources[source] : source;
    const handlers = datasource.handlers;
    if (!handlers) { return datasource.data; }
    // run processors
    return new Promise((resolve, reject) => {
      if (datasource.data && datasource.loaded) { resolve(datasource.data); }

      // if datasource is already being loaded added promise to queue
      if (datasource.isLoading) {
        if (!datasource.requestQueue) { datasource.requestQueue = []; }
        datasource.requestQueue.push({ resolve, reject });
        return;
      }
      datasource.isLoading = true;
      handlers.reduce((promise: Promise<any>, current) => {
        if (!DatasourceManager.Processors.hasOwnProperty(current.processorId)) { throw new Error(`DatasourceProcessor ${current.processorId} is not registered!`); }
        const dsProcessor = DatasourceManager.Processors[current.processorId];
        return promise.then(result => {
          return dsProcessor.execute(datasource, ProcessorActions.Read, result);
        });
      }, Promise.resolve()).catch(e => {
        datasource.loaded = false;
        datasource.isLoading = false;
        reject();

        // resolve promises for queued promises
        while (datasource.requestQueue && datasource.requestQueue.length > 0) {
          const item = datasource.requestQueue.pop();
          if (item) {
            item.reject();
          }
        }
      }).then(result => {
        datasource.data = result; // Save the data as part of the datasource
        datasource.loaded = true;
        datasource.isLoading = false;
        resolve(result);

        // resolve promises for queued promises
        while (datasource.requestQueue && datasource.requestQueue.length > 0) {
          const item = datasource.requestQueue.pop();
          if (item) {
            item.resolve(result);
          }
        }
      });
    });
  }

  /** load all data sources */
  public loadAll() {
    if (!this.datasources) { return; }
    for (const ds in this.datasources) {
      if (!this.datasources.hasOwnProperty(ds)) { continue; }
      const source = this.datasources[ds];
      this.load(source);
    }
  }

}
