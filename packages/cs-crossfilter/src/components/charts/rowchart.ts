import { IWidget } from '@csnext/cs-core';
import { AppState } from '@csnext/cs-client';
import { CrossFilterUtils, IChartType, CrossFilterDatasource, ChartOptions, CrossDashboardManager  } from '../..';
import * as dc from 'dc';
import { pluck } from 'dc';
import crossfilter from 'crossfilter2';
import { GraphCrossFilter } from '../../../cross-filter';

export class RowChart implements IChartType {
  id = 'rowchart';
  title = 'Row Chart';
  public static type = 'rowchart';

  verify() {
    return true;
  }

  getFilters(options: ChartOptions): any[][] | undefined {
    if (!options._chart) { return; }
    const filters = options._chart.filters();
    if (filters.length > 0) {
      return [[options.key, "in", filters]];
    }
    return undefined;
  }

  draw(state: CrossDashboardManager, element: HTMLElement, widget: IWidget, options: ChartOptions,  filter: GraphCrossFilter) {
    try {

      if (!widget?._size || !options || !state.source || !filter.ndx || !options._elementId) {
        return false;
      }

      // if (!widget || !options.key || !options._view || !options._view._meta) { return false; }
      // let meta = state.metaKeys[options.key]; //  options._view._meta.find((m: Meta) => m.id === options.key) as Meta;
      // if (!meta) { return false; }

      options._dimension = filter.ndx.dimension((d: any) => {
        if (options.rowTimeMode && options.horizontalTime) {
          let horizontal = CrossFilterUtils.getDayString(d, options.horizontalTime);
          return horizontal;
        } else {
          if (options.key)  {
            
            const v = CrossFilterUtils.getKeyValue(options.key, options, d);
            // console.log(v);
            // return 'test'
            return v;
          }
        }
        return undefined;
      });
      // options._group = options._dimension.group((d:any) => {
      //   return d;
      // }); // .reduceSum((d: any) => { return this.getValue(this.options, d) / options.bucketSize; });                     //options._dimension.group();

      options._group = options._dimension.group()
      .reduce(
        (p: any, v: any) => {
          p.count+=1;          
          p.total += 1; //CrossFilterUtils.getValue(options.key!, options, v); //v[options.key!];                    
          return p;
        },
        (p: any, v: any) => {
          p.count-=1;          
          p.total -=1; // CrossFilterUtils.getValue(options.key, options, v); //v[options.key!];          
          return p;
        },
        () => {
          return {
            count: 0,
            total: 0
          };
        }
      );


      let el = dc.rowChart('#' + options._elementId);
      el
        .width(widget._size!.width)
        .height(widget._size!.height - 55)
        .dimension(options._dimension)
        .margins({ top: 20, right: 20, bottom: 30, left: 20 })
        .elasticX(true)
        // .ordering(pluck(options.key!))
        .group(options._group)
        .valueAccessor( d=> {
          return d.value.total; })    
        .on('filtered', () => {
          let f = this.getFilters(options);
          options!._source!.events!.publish(CrossFilterDatasource.FILTER_CHANGED, options.chartId || '', f);          
        });
      if (options.orderByName) {
        el.ordering(pluck(options.key!));
      }
      if (options.top) {
        el.cap(options.top);
      }
      el.render();
      options._chart = el;
      // console.log(options._group!.all());
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
