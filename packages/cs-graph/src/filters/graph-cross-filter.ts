import { FeatureType, GraphElement, IGraphFilter } from '@csnext/cs-data';
import crossfilter from 'crossfilter2';
import { TimeRange } from '@csnext/cs-crossfilter';

export class GraphCrossFilter extends IGraphFilter {
    public static CROSSFILTER = 'crossfilter';
    public static CROSSFILTER_DATALOADED = 'dataloaded';
    public static UPDATE_CHART = 'update_chart';
    public static FILTER_CHANGED = 'filter-changed';

    public dimensions: { [id: string] : crossfilter.Dimension<any, any>[]} = {};
    public groups: { [id: string]: crossfilter.Group<any, any, any>} = {};
    public featureType?: FeatureType;
    public ndx?: crossfilter.Crossfilter<any>;
    public timeRange?: TimeRange;
    public allData : GraphElement[] = [];
    

    public addDimension(id: string, dim: crossfilter.Dimension<any, any>) {      
        if (!this.dimensions.hasOwnProperty(id)) { this.dimensions[id] = []}
        this.dimensions[id].push(dim);
    }

    public addGroup(id: string, group: crossfilter.Group<any, any, any>) {                
        this.groups[id] = group;
    }

    public async updateCrossfilter(dataset: GraphElement[]) {
        this.allData = dataset;
        if (dataset && dataset.length>0) {
            this.ndx = crossfilter(dataset);
            this.timeRange = new TimeRange();
            for (const element of dataset) {
                if (element.properties?.point_in_time) {
                    this.timeRange.addTime(element.properties.point_in_time)
                }
                
            }
            if (this.source?.events) {
                this.source.events.publish(GraphCrossFilter.CROSSFILTER, GraphCrossFilter.CROSSFILTER_DATALOADED, this);
            }
        }
    }
}