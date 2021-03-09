import { IWidget } from '@csnext/cs-core';
import { CrossFilterUtils, CrossFilterDatasource, ChartOptions, IChartType, CrossDashboardManager } from '../..';
import * as dc from 'dc';
import * as d3 from 'd3';

export class ScatterPlot implements IChartType {
  id = 'scatter';
  static type = 'scatter';
  title = 'Scatterplot';

  verify(widget: IWidget, option: ChartOptions) {
    return true;
  }

  getFilters(options: ChartOptions): any[][] | undefined {
    let result : any[] = [];
    if (options._dimension) {
      if (options._dimension.hasCurrentFilter() && options._chart) {
        let filter = options._chart.filters();

        if (filter.length === 1 && filter[0].length === 2) {
          result.push([options.keyY, '>', filter[0][1][1]]);
          result.push([options.keyY, '<', filter[0][0][1]]);
          result.push([options.keyX, '>', filter[0][0][0]]);
          result.push([options.keyX, '<', filter[0][1][0]]);
          return result;
        }
      }
    }
  }

  draw(
    state: CrossDashboardManager,
    element: HTMLElement,
    widget: IWidget,
    options: ChartOptions
  ) {
    try {
      let maxx = 0;
      let minx = Number.MAX_VALUE;
      if (!widget?._size || !options || !state.source || !options._source?.ndx || !options._elementId) {
        return false;
      }
      // let metaX = options._view._meta.find(
      //   (m: Meta) => m.id === options.keyX
      // ) as Meta;
      // if (!metaX) {
      //   return false;
      // }

      // let metaY = options._view._meta.find(
      //   (m: Meta) => m.id === options.keyY
      // ) as Meta;
      // if (!metaY) {
      //   return false;
      // }

      options._dimension = options._source.ndx.dimension(d => {
        if (options.keyX) {
          let vx = CrossFilterUtils.getKeyValue(options.keyX, options, d)
          if (vx > maxx) {
            maxx = vx;
          }
          if (vx < minx) {
            minx = vx;
          }
          if (options.keyX && options.keyY) return [+vx, +CrossFilterUtils.getKeyValue(options.keyY, options, d)];
        }
        return d;
      //   // return [+d.time, this.getValue(this.options, d)];
      });
      options._group = options._dimension.group();
      // this.title = metaX.name + ' - ' + metaY.name;

      var el = dc.scatterPlot('#' + options._elementId);
      el.width(widget._size!.width)
        .height(widget._size!.height - 50)
        .dimension(options._dimension)
        .yAxisLabel(options.titleY || '')        
        .margins({ top: 20, right: 20, bottom: 30, left: 40 })
        .xAxisLabel(options.titleX || '')        
        .x(d3.scaleLinear().domain([minx, maxx]))        
        .group(options._group)
        .on('filtered',()=>{
          let f = this.getFilters(options);
          options._source.events.publish(CrossFilterDatasource.FILTER_CHANGED, options.chartId || '', f);
        });
      el.render();
      options._chart = el;

      return true;
    } catch (e) {
      console.log(e);
      // debugger;
      return false;
    }
  }
}
