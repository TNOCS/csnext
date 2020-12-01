import { DataPackage, Insight, InsightView } from '@csnext/cs-data';
import { StatsDatasource } from '@csnext/cs-map';
import crossfilter from 'crossfilter';


export class CrossFilterDatasource extends StatsDatasource {
    constructor() {
        super();        
    }

    public async activateInsightView(view: InsightView, insight: Insight) {
        await super.activateInsightView(view, insight);
        // const ndx = new crossfilter()
        // load into dcjs
        console.log(this);
        debugger;
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