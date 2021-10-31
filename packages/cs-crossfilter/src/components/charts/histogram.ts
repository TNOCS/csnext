import { IWidget } from '@csnext/cs-core';

import * as dc from 'dc';
import * as d3 from 'd3';
import { IChartType, ChartOptions, CrossFilterUtils, CrossDashboardManager, CrossFilterDatasource } from './../..';
import { GraphCrossFilter } from '../../../cross-filter';

export class Histogram implements IChartType {
  id = 'histogram';
  title = 'Histogram';
  static type = 'histogram';

  verify(widget: IWidget, option: ChartOptions) {
    return true;
  }

  getFilters(options: ChartOptions): any[][] | undefined {
    let result : any[] = [];
    if (options._dimension) {
      if (options._dimension.hasCurrentFilter() && options._chart) {
        let filter = options._chart.filters();                
        if (filter.length === 1 && filter[0].length === 2) {
          result.push([options.key, '>', filter[0][0]]);
          result.push([options.key, '<', filter[0][1]]);          
          return result;
        }
      }
    }
  }

  draw(
    state : CrossDashboardManager,
    element: HTMLElement,
    widget: IWidget,
    options: ChartOptions,
    filter: GraphCrossFilter
  ) {
    try {      
      if (!widget?._size || !options || !state.source || !options?._source?.events || !filter?.ndx || !options._elementId) {
        return false;
      }
      // let meta = options._view._meta.find((m: Meta) => m.id === options.key);
      // if (!options.disableFilter) {
      //   options.disableFilter = false;
      // }

      // if (!meta) {
      //   return false;
      // }

      if (!options.bucketSize) {
        options.bucketSize = 1;
      }
      let max = 0;
      options._dimension = filter.ndx.dimension((d: any) => {
        if (options && options.bucketSize) {
          let value = CrossFilterUtils.getValue(options, d);
          if (value) {
            if (typeof value === 'number') {
              let res =
                Math.round(value / options.bucketSize) * options.bucketSize;
              if (res > max) {
                max = res;
              }
              // console.log(res);
              return res;
            } else {
              return value;
            }
          } else {
            return 0;
          }
          // return (Math.round(this.getValue(this.options, d) )) ;
        }
      });
      if (!options._dimension) { return false; }
      options._group = options._dimension.group().reduceSum((d: any) => {
        let value = CrossFilterUtils.getValue(options, d);
        if (!options.bucketSize) { options.bucketSize = 1; }
        if (value && typeof value === 'number') {
          return value / options.bucketSize;
        } else {
          return 0;
        }
      });
    

      var el = dc.barChart('#' + options._elementId);
      let width = widget._size!.width -25;
      el.width(width)
        .height(widget._size!.height-50)
        // .margins({ top: 20, right: 20, bottom: 40, left: 60 })
        .dimension(options._dimension)
        .group(options._group)
        .colors(['#00890c'])
        .yAxisLabel(options.titleY || '')        
        .xAxisLabel(options.titleX || '')        
        .elasticX(true)
        .elasticY(true)        
        .renderLabel(options.showLabel === true)
        .mouseZoomable(false)
        .brushOn(options.disableFilter === false)
        .barPadding(1/options.bucketSize) // options.barPadding
        .on('filtered',()=>{          
          let f = this.getFilters(options);          
          options!._source!.events!.publish(CrossFilterDatasource.FILTER_CHANGED, options.chartId || '', f);          
        })
        .x(d3.scaleLinear().domain([0, 10]));  //[meta.min, max]));      
      el.render();
      options._chart = el;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
