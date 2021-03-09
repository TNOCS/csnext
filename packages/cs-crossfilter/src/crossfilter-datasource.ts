import { DataPackage, DataSet, Insight, InsightView } from '@csnext/cs-data';
import { StatsDatasource } from '@csnext/cs-map';
import crossfilter from 'crossfilter2';



export class CrossFilterDatasource extends StatsDatasource {

    public static CROSSFILTER = 'crossfilter';
    public static CROSSFILTER_DATALOADED = 'dataloaded';
    public static UPDATE_CHART = 'update_chart';
    public static FILTER_CHANGED = 'filter-changed';

    public dimensions: { [id: string] : crossfilter.Dimension<any, any>} = {};
    public groups: { [id: string]: crossfilter.Group<any, any, any>} = {};

    public ndx?: crossfilter.Crossfilter<any>;

    constructor() {
        super();        
    }

    public addDimension(id: string, dim: crossfilter.Dimension<any, any>) {                
        this.dimensions[id] = dim;
    }

    public addGroup(id: string, group: crossfilter.Group<any, any, any>) {                
        this.groups[id] = group;
    }

    public async updateCrossfilter(dataset?: DataSet) {
        console.log('update crossfilter');
        console.log(dataset);
        if (!dataset) {
            dataset = this.mainLayer?._source?._data;            
        }
        if (dataset && dataset.features?.length>0) {
            this.ndx = crossfilter(dataset.features);
            this.events.publish(CrossFilterDatasource.CROSSFILTER, CrossFilterDatasource.CROSSFILTER_DATALOADED, this);
        }
    }

    public async activateInsightView(view: InsightView, insight: Insight) {
        await super.activateInsightView(view, insight);
        this.updateCrossfilter(this.mainLayer?._source?._data);        
        console.log(this);        
    }    

    public loadPackage(uri: string) : Promise<DataPackage> 
    {
        return new Promise((resolve, reject) => {            
            super.loadPackage(uri).then(r => {                                                                                          
                resolve(r);
            }).catch(e => {
                reject(e);
            })
        })
        
    }
       
    

}