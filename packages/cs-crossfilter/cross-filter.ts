import { DataSet, FeatureType, IGraphFilter } from '@csnext/cs-data';
import crossfilter from 'crossfilter2';
import { TimeRange } from './src';

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

    public addDimension(id: string, dim: crossfilter.Dimension<any, any>) {      
        if (!this.dimensions.hasOwnProperty(id)) { this.dimensions[id] = []}
        this.dimensions[id].push(dim);
    }

    public addGroup(id: string, group: crossfilter.Group<any, any, any>) {                
        this.groups[id] = group;
    }

    public async updateCrossfilter(dataset?: DataSet) {
        // if (!dataset) {
        //     dataset = this.mainLayer?._source?._data;            
        // }
        // if (dataset && dataset.features?.length>0) {
        //     this.ndx = crossfilter(dataset.features);
        //     this.timeRange = new TimeRange();
        //     for (const feature of dataset.features) {
        //         if (feature.properties?.point_in_time) {
        //             this.timeRange.addTime(feature.properties.point_in_time)
        //         }
                
        //     }
        //     this.events.publish(CrossFilterDatasource.CROSSFILTER, CrossFilterDatasource.CROSSFILTER_DATALOADED, this);
        // }
    }
}