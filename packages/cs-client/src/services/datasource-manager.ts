import { IDatasourceHandler, IDatasourceProcessor, IDatasource, Project } from '@csnext/cs-core';

export class DatasourceManager {

    constructor(private dataSources: { [id: string]: IDatasource }) {
    }

    /** Available datasource handlers  */
    public IDatasourceProcessors: { [id: string]: IDatasourceProcessor } = {};


    /** Registration of a new data source handler */
    public add(processor: IDatasourceProcessor) {
        this.IDatasourceProcessors[processor.id] = processor;
    }

    /** Load a data source using the assigned data source handler */
    public load(source: IDatasource) {

        // source.read() => result
        //     webrequest.next(geojson).result
            

        // source.write({<feature>})
        //     geojson().previous(<feature>webrequest()'/tiles', 'get')

        // Webrequest.read('url')
        
        // Geojson.read()

        // LayerX.read(<GeoJSON>{});


        // find datasource
        // let src: IDatasource;
        // if (typeof (source) === 'string') {
        //     if (this.dataSources && this.dataSources.hasOwnProperty(source)) {
        //         src = this.dataSources[source];
        //     } else {
        //         // reject('data source not found');
        //         // return;
        //     }
        // } else { src = source };


        // if (source && source.handler && source.handler.length > 0) {
        //     // link processors
        //     for (var i = 0; i < source.handler.length; i++) {
        //         let h = source.handler[i];
                
        //         if (!this.IDatasourceProcessors.hasOwnProperty(h.processor)) {
        //             throw new Error(`Error, datasource processor ${h.processor} is unknown`);                    
        //         }
        //         h._processor = this.IDatasourceProcessors[h.processor];
        //         if (i > 0) { h.previous = source.handler[i - 1]; }
        //         if (i < source.handler.length - 1) { h.next = source.handler[i + 1]; }
        //     }
        //     // if (source.handler[0]._processor) {
        //     //    source.data = source.handler.reduce(h => {
        //     //        return h._processor.execute(source, 'create');
        //     //    });
        //     //     source.handler[0]._processor.run(source, action: 'create' | 'read');
        //     // }
        // }




        // run processors
        return new Promise((resolve, reject) => {


            // if (src.handler && this.IDatasourceProcessors.hasOwnProperty(src.handler)) {
            //     this.IDatasourceProcessors[src.handler].load(src).then(data => {
            //         resolve(data);
            //         // this.EventBus.$emit('data-' + source, 'loaded');
            //     }).catch(e => {
            //         reject(e);
            //     });
            // }
        });
    }

    /** load all data sources */
    public loadAll() {
        if (this.dataSources) {
            for (let ds in this.dataSources) {
                let source = this.dataSources[ds];
                this.load(source);
            }
        }
    }

}