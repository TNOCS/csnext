import { IWidget } from '@csnext/cs-core';

import * as dc from 'dc';
import * as d3 from 'd3';
import { IChartType, ChartOptions, CrossFilterUtils, CrossDashboardManager, CrossFilterDatasource } from './../..';

export class TimeChart implements IChartType {
  id = 'time';
  title = 'Time';
  static type = 'time';

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
    options: ChartOptions
  ) {
    try {      
      if (!widget?._size || !options || !state.source || !options._source?.ndx || !options._elementId) {
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

      options._dimension = options._source.ndx.dimension((d: any) => {
        let value = d.properties; // CrossFilterUtils.getValue(options, d);
        switch (options.timeAggregation) {
          case 'hour':
            return value.hourStart;
          case 'day':
            return value.dayStart;
          case 'week':
            return value.weekStart;
          case 'month':
            return value.monthStart;
          // case 'quarter': return value.quarterStart;
          case 'year':
            return value.yearStart;
          default:
            if (
              options.timeAggregation &&
              value.hasOwnProperty(options.timeAggregation)
            )
              return d[options.timeAggregation];
        }
        return [+value.time, CrossFilterUtils.getValue(options, d)];
      });


      // options._dimension = options._source.ndx.dimension((d: any) => {
      //   if (options && options.bucketSize) {
      //     let value = CrossFilterUtils.getValue(options, d);
      //     if (value) {
      //       if (typeof value === 'number') {
      //         let res =
      //           Math.round(value / options.bucketSize) * options.bucketSize;
      //         if (res > max) {
      //           max = res;
      //         }
      //         // console.log(res);
      //         return res;
      //       } else {
      //         return value;
      //       }
      //     } else {
      //       return 0;
      //     }
      //     // return (Math.round(this.getValue(this.options, d) )) ;
      //   }
      // });
      if (!options._dimension || !options.timeRange) { return false; }
      // options._group = options._dimension.group().reduceSum((d: any) => {
      //   let value = CrossFilterUtils.getValue(options, d);
      //   if (!options.bucketSize) { options.bucketSize = 1; }
      //   if (value && typeof value === 'number') {
      //     return value / options.bucketSize;
      //   } else {
      //     return 0;
      //   }
      // });

      


      options._group = options._dimension.group().reduce(
        (p: any, v: any) => {
          p.count+=1;          
          p.total += CrossFilterUtils.getValue(options, v); //v[options.key!];          
          if (options.secondaryKey) {
            let secValue = CrossFilterUtils.getValue(options, v, options.secondaryKey);
            if (secValue) {
              if (!p.secondaryCount.hasOwnProperty(secValue)) {
                p.secondaryCount[secValue] = 1;
              } else {
                p.secondaryCount[secValue]+=1;
              }
            }
          }
          
          return p;
        },
        (p: any, v: any) => {
          p.count-=1;          
          p.total -= CrossFilterUtils.getValue(options, v); //v[options.key!];
          let secValue = CrossFilterUtils.getValue(options, v, options.secondaryKey);
          if (secValue && p.secondaryCount) {
            if (p.secondaryCount.hasOwnProperty(secValue)) {
              p.secondaryCount[secValue]-=1;
            }
          }
          return p;
        },
        () => {
          return {
            count: 0,
            total: 0,
            secondaryCount: {}
          };
        }
      );

      let el = dc
      // .barChart('#' + options._elementId)
      .lineChart('#' + options._elementId)      
      .colors(['#00890c'])
      .brushOn(options.disableFilter === false);

      if (options.showPoints === true) {
        el.renderDataPoints({
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          radius: 2
        });
      }

      switch (options.timeAggregation) {
        case 'hour':
          el.xUnits(d3.timeHours).x(
            d3
              .scaleTime()
              .domain([
                options.timeRange.start,
                options.timeRange.end
              ])
          );
          break;
        case 'day':
          el.xUnits(d3.timeDays).x(
            d3
              .scaleTime()
              .domain([
                options.timeRange.start,
                options.timeRange.end
              ])
          );
          break;
        case 'week':
          el.xUnits(d3.timeWeeks).x(
            d3
              .scaleTime()
              .domain([
                options.timeRange.start,
                options.timeRange.end
              ])
          );
          break;
        case 'month':
          el.xUnits(d3.timeMonths).x(
            d3
              .scaleTime()
              .domain([
                options.timeRange.start,
                options.timeRange.end
              ])
          );
          break;
        //   case 'quarter':
        //     el.round(d3.time.quarters.round)
        //       .xUnits(d3.time.quarters)
        //       .x(d3.scaleTime().domain([options._view.timeRange.start, options._view.timeRange.end]))
        //     break;
        case 'year':
          el.xUnits(d3.timeYears).x(
            d3
              .scaleTime()
              .domain([
                options.timeRange.start,
                options.timeRange.end
              ])
          );
          break;
        default:
          el.xUnits(d3.scaleLinear).x(d3.scaleLinear().domain([0, 100]));
      }


      // switch (options.lineCurve) {
      //   case 'curve':
      //     el.curve(d3.curveBasis);
      //     break;
      //   case 'linear':
      //     el.curve(d3.curveLinear);
      //     break;
      //   default:
      //     el.curve(d3.curveStepAfter);
      //     break;
      // }

    

      // var el = dc.lineChart('#' + options._elementId);
      let width = widget._size!.width -25;
      el.width(width)
        .height(widget._size!.height-50)
        // .margins({ top: 20, right: 20, bottom: 40, left: 60 })
        .dimension(options._dimension)        
        .group(options._group)
        .renderArea(false)
        .colors(['#00890c'])
        .yAxisLabel(options.titleY || '')        
        .xAxisLabel(options.titleX || '')    
        // .brushOn(false)
        .valueAccessor( d=> {
          return d.value.total; })    
        // .xUnits(d3.timeDays)
        .elasticY(true)        
        .renderLabel(false)
        .renderHorizontalGridLines(true)        
        .mouseZoomable(false) 
        .stack(options._group, 'Hawthorne Industrial Airport', (d: any) => { 
          // console.log(d);
          return d.value.secondaryCount['Hawthorne Industrial Airport']; })               
        .on('filtered',()=>{          
          let f = this.getFilters(options);          
          options._source.events.publish(CrossFilterDatasource.FILTER_CHANGED, options.chartId || '', f);          
        })
        
        // .x(d3.scaleTime());  //[meta.min, max]));      
      el.render();
      options._chart = el;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
