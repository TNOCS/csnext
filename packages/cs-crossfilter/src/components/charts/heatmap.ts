import { IWidget } from '@csnext/cs-core';

import { ChartOptions, IChartType, CrossDashboardManager } from '../..';
import { PropertyType } from '@csnext/cs-data';
import crossfilter from 'crossfilter2';
import { GraphCrossFilter } from '../../../cross-filter';


export class HeatMap implements IChartType {
  id = 'heatmap';
  type = 'heatmap';
  title = 'Heat map';

  getFilters(options: ChartOptions) : any[][] | undefined {
    return undefined;
  }

  verify(widget: IWidget, option: ChartOptions) : boolean {
    return true;
  }

  draw(state : CrossDashboardManager, element: HTMLElement, widget: IWidget, options: ChartOptions,  filter: GraphCrossFilter) {
try{  
  
      var el: any;
      if (!widget || !options || !state.source || !filter.ndx || !options._elementId) {
        return false;
      }
      if (!options.keys) {
        return false;
      }
      let metas: PropertyType[] = [];
      // options.keys.forEach(k => {
      //   const m =  options._view._meta.find((m: Meta) => m.id === k) as Meta;
      //   if (m) {
      //     metas.push(m);
      //   }
      // });

      // if (metas.length === 0) {
      //   return false;
      // }
      // var currentDiv = document.getElementById(options._elementId);
      // while (currentDiv && currentDiv.firstChild) {
      //   currentDiv.removeChild(currentDiv.firstChild);
      // }

      // for (const meta of metas) {
      //   if (!currentDiv) {
      //     return;
      //   }
      //   var titleDiv = document.createElement('h3');
      //   if (titleDiv && meta.name) titleDiv.innerText = meta.name;
      //   titleDiv.style.textAlign = 'center';
      //   currentDiv.appendChild(titleDiv);
      //   var newDiv = document.createElement('div');
      //   newDiv.style.marginBottom = '-20px';
      //   currentDiv.appendChild(newDiv);
      //   options._dimension = options._source.ndx.dimension((d: any) => {
      //     if (options.horizontalTime && options.verticalTime) {
      //       let horizontal = CrossFilterDatasource.getDayProperty(
      //         d,
      //         options.horizontalTime
      //       );
      //       let vertical = CrossFilterDatasource.getDayProperty(d, options.verticalTime);
      //       return [horizontal, vertical];
      //     }
      //     // return [+d.time, this.getValue(options, d)];
      //   });
      //   options._group = options._dimension.group().reduceSum((d: any) => {
      //     if (meta.id) {
      //       const v = CrossFilterDatasource.getKeyValue(meta.id, options, d);
      //       return v;
      //     }
      //   }); //options._dimension.group();

      //   el = dc.heatMap(newDiv as any); // '#' + this.elementId());
      //   el.width(widget._size!.width)
      //     .height(widget._size!.height / metas.length - 25)
      //     .dimension(options._dimension)
      //     .group(options._group)
      //     .margins({ top: 0, right: 10, bottom: 60, left: 40 })
      //     .keyAccessor((d: any) => {
      //       return +d.key[0];
      //     })
      //     .on('filtered',()=>{
      //       let f = this.getFilters(options);
      //       AppState.Instance.bus.publish('filter-changed', options.chartId || '', f);
      //       console.log(f);
      //     })
      //     .valueAccessor((d: any) => {
      //       return +d.key[1];
      //     })
      //     .colorAccessor((d: any) => {
      //       return +d.value;
      //     })
      //     .colors(d3.scaleLinear().range(['#f4fff5', '#00890c'] as any))
      //     // .colors(d3.scaleOrdinal().range(['red','green','blue']))
      //     // .colors([
      //     //   '#ffffd9',
      //     //   '#edf8b1',
      //     //   '#c7e9b4',
      //     //   '#7fcdbb',
      //     //   '#41b6c4',
      //     //   '#1d91c0',
      //     //   '#225ea8',
      //     //   '#253494',
      //     //   '#081d58'
      //     // ])
      //     .rowOrdering(
      //       options.verticalTimeReverse ? d3.descending : d3.ascending
      //     )
      //     .colOrdering(
      //       options.rowTimeMode ? d3.descending : d3.ascending
      //     )
      //     .calculateColorDomain()
      //     .title((d: any) => {
      //       return (
      //         options.horizontalTime +
      //         ': ' +
      //         d.key[1] +
      //         '\n' +
      //         'Value: ' +
      //         d.value +
      //         ' '
      //       );
      //     });

      //   if (options.showXaxis) {
      //     if (options.horizontalTime === CrossFilterDatasource.timeBuckets[0])
      //       el.colsLabel((d: number) => {
      //         return d;
      //       });
      //     if (options.horizontalTime === CrossFilterDatasource.timeBuckets[1])
      //       el.colsLabel((d: number) => {
      //         return CrossFilterDatasource.weekNames[d];
      //       });
      //     if (
      //       options.showXaxis &&
      //       options.horizontalTime === CrossFilterDatasource.timeBuckets[5]
      //     )
      //       el.colsLabel((d: number) => {
      //         return CrossFilterDatasource.monthNames[d];
      //       });
      //     if (
      //       options.showXaxis &&
      //       options.horizontalTime === CrossFilterDatasource.timeBuckets[7]
      //     )
      //       el.colsLabel((d: number) => {
      //         return CrossFilterDatasource.getYearMonthTitle(d);
      //       });
      //   } else {
      //     el.colsLabel((d: number) => {
      //       return '';
      //     });
      //   }

      //   if (options.showYaxis) {
      //     if (options.verticalTime === CrossFilterDatasource.timeBuckets[1])
      //       el.rowsLabel((d: number) => {
      //         return CrossFilterDatasource.weekNames[d];
      //       });
      //     if (options.verticalTime === CrossFilterDatasource.timeBuckets[5])
      //       el.rowsLabel((d: number) => {
      //         return CrossFilterDatasource.monthNames[d];
      //       });
      //     if (options.verticalTime === CrossFilterDatasource.timeBuckets[7])
      //       el.rowsLabel((d: number) => {
      //         return CrossFilterDatasource.getYearMonthTitle(d);
      //       });
      //   } else {
      //     el.rowsLabel((d: number) => {
      //       return '';
      //     });
      //   }

      //   el.render();

      //   options._chart = el;
      // });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
