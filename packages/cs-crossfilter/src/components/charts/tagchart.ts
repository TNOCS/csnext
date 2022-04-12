import { IWidget } from '@csnext/cs-core';
import { AppState } from '@csnext/cs-client';
import { CrossFilterUtils, IChartType, CrossFilterDatasource, ChartOptions, CrossDashboardManager  } from '../..';
import * as dc from 'dc';
import { pluck } from 'dc';
import crossfilter, { Group } from 'crossfilter2';
import { GraphCrossFilter } from '../../../cross-filter';
import { GraphElement } from '@csnext/cs-data';

export class TagChart implements IChartType {
  id = 'tagchart';
  title = 'Tag Chart';
  public static type = 'tagchart';

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

      // tags chart
      function reduceAdd(p, v) {
        
        v._flat.entities.forEach ((val, idx) => {
            p[val] = (p[val] || 0) + 1; //increment counts
        });
        return p;
    }

    function reduceRemove(p, v) {
      v._flat.entities.forEach ((val, idx) =>{
            p[val] = (p[val] || 0) - 1; //decrement counts
        });
        return p;
    }

    function reduceInitial() {
        return [];
    }

      options._dimension = filter.ndx.dimension((d: any) => { 
        return d._flat.entities; }
      );
      var tags2 = filter.ndx.dimension((d: any) => { return d._flat.entities; });
      var groupall = options._dimension.groupAll();

      options._group = groupall.reduce(reduceAdd, reduceRemove, reduceInitial).value() as any;

      options._group!.all = function() {
        var newObject: any = [];
        for (var key in this) {
            if (this[key] && key != "all") {
                newObject.push({
                    key: key,
                    value: this[key]
                });
            }
        }
        return newObject;
    }
      
      // if (!widget || !options.key || !options._view || !options._view._meta) { return false; }
      // let meta = state.metaKeys[options.key]; //  options._view._meta.find((m: Meta) => m.id === options.key) as Meta;
      // if (!meta) { return false; }

     

      let el = dc.rowChart('#' + options._elementId);
      el
        .width(widget._size!.width)
        .height(widget._size!.height - 55)
        .dimension(options._dimension)
        .margins({ top: 20, right: 20, bottom: 30, left: 20 })
        .elasticX(true)
        .cap(options.top)
        .ordering((d) => {          
          return -d.value; }
          )
        // .top(16)
        // .ordering(pluck(options.key!))
        .group(options._group)
        .label((d)=> d.key)
        .filterHandler ((dimension, filters) => {
          dimension.filter(null);
          dimension.filterFunction(function (d) {
              for (var i=0; i < filters.length; i++) {
                  if (d.indexOf(filters[i]) <0) return false;
              }
              return true;
          });

          return filters;
      })

        // .valueAccessor( d=> {          
        //   return d.value.total; })    
        .on('filtered', () => {
          let f = this.getFilters(options);
          options!._source!.events!.publish(CrossFilterDatasource.FILTER_CHANGED, options.chartId || '', f);          
        });
      // if (options.orderByName) {
      //   el.ordering(pluck(options.key!));
      // } else {
      //   el.ordering((d) => {          
      //     return -d.value.count; }
      //     )
      // }
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
