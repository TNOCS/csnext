import { IWidget } from '@csnext/cs-core';

import * as dc from 'dc';
import * as d3 from 'd3';
import { IChartType, ChartOptions, CrossFilterUtils, CrossDashboardManager, CrossFilterDatasource } from './../..';

export class Stat implements IChartType {
  id = 'stat';
  title = 'Stat';
  static type = 'stat';

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
      if (!widget?._size || !options || !state.source || !options._source?.ndx || !options._elementId || !options.key) {
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
        if (options.key) return d[options.key];        
      });
      if (!options._dimension) { return false; }

      options._group = options._source.ndx.groupAll().reduce(        
        (p: any, v: any) => {          
          if (
            options.statValue === 'unique' &&
            p &&
            p.u &&
            p.u.indexOf(v[options.key!]) === -1
          ) {
            p.u.push(v[options.key!]);
            ++p.n;
          } else if (options.statValue === 'average') {
            ++p.n;
            p.tot += v[options.key!];
          }
          return p;
        },
        (p: any, v: any) => {
          if (options.statValue === 'unique' && p && p.u) {
            let index = p.u.indexOf(v[options.key!]);
            if (index >= 0) {
              --p.n;
              delete p.u[index];
            }
          } else if (options.statValue === 'average') {
            --p.n;
            p.tot -= v[options.key!];
          }
          return p;
        },
        () => {
          return { n: 0, u: [], tot: 0 };
        }
      ) as any;

      var unique = (d: any) => {
        if (d) return +d.n;
      };

      var average = (d: any) => {
        return d.n ? d.tot / d.n : 0;
      };






      // options._group = options._dimension.group().reduceSum((d: any) => {
      //   let value = CrossFilterUtils.getValue(options, d);
      //   if (!options.bucketSize) { options.bucketSize = 1; }
      //   if (value && typeof value === 'number') {
      //     return value / options.bucketSize;
      //   } else {
      //     return 0;
      //   }
      // });
    

      var el = dc.numberDisplay('#content-' + widget.id).formatNumber(d3.format('~s'))

      el.html({
        one: '<span>%number</span>',
        some: '<span>%number</span>',
        none: '<span>-</span>'
      }).group(options._group);

      switch (options.statValue) {
        case 'unique':
          el.valueAccessor(unique);
          break;
        case 'average':          
          el.valueAccessor(average);
          break;
      }
      
      el.render();
      options._chart = el;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
