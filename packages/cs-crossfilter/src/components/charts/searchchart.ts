import { IWidget } from '@csnext/cs-core';

import * as dc from 'dc';
import { IChartType, ChartOptions, CrossDashboardManager } from './../..';
import { GraphCrossFilter } from '../../../cross-filter';

export class SearchChart implements IChartType {
  id = 'search';
  title = 'search';
  static type = 'search';

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
      if (!widget?._size || !options || !state.source || !filter.ndx || !options._elementId) {
        return false;
      }
      
      options._dimension = filter.ndx.dimension((d: any) => {
        return `${d.properties?.name} ${d.properties?.description}`;
      });


      let i = 0;
      const el = new dc.TextFilterWidget('#' + options._elementId)
        .dimension(options._dimension)
        

      options._chart = el;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
