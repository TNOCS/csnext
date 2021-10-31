import Component from 'vue-class-component';
import { WidgetBase } from '@csnext/cs-client';
import './chart.css';
import { ChartOptions, CrossFilterDatasource } from './../../';
import Vue from 'vue';
import crossfilter from 'crossfilter2';
import { GraphCrossFilter } from '../../../cross-filter';

@Component({
  name: 'actions',
  template: require('./chart.html'),
} as any)
export class CrossChart extends WidgetBase {

    
  public options?: ChartOptions;
  public valid?: boolean;
  public resizing = false;
  public filter!: GraphCrossFilter;
  
  public clear() {
    Vue.nextTick(()=> {      
      // this.options?._dimension?.groupAll();
      this.options?._chart?.filterAll();      
      this.options?._chart?.redraw();
      
    })        
  }

  public updateChart() { 
    this.options = this.widget.data.options as ChartOptions;  
    this.filter = this.widget.data.filter as GraphCrossFilter;
    this.options._elementId  = 'chart-' + this.widget.id;
    if (this.options?.type && this.filter.ndx && this.options._manager?.chartTypes?.hasOwnProperty(this.options.type))
    {          
      this.valid = this.options._manager.chartTypes[this.options.type].draw(
        this.options._manager,
        this.$el as any,
        this.widget,
        this.options,
        this.filter
      );      
      if (this.options._dimension && this.options._source) {
        if (this.options.key) {
          this.filter.addDimension(this.options.key, this.options._dimension);
        }        
      }
      if (this.options._group) {
        if (this.options.key) {
          this.filter.addGroup(this.options.key, this.options._group);
        }        
      }
    }

    
    
    
    // Vue.nextTick(()=>{
    //   if (this.options && this.widget._size) {    
    //     console.log('options');
    //     console.log(this.options);
    //     const testChart = dc.barChart(`#${this.options._elementId}`)
    //       .width(this.widget._size.width)
    //       .height(this.widget._size.height - 25)
    //       .dimension(this.options._dimension)
    //       .group(this.options._group)
    //       .gap(1)
    //       .x(d3.scaleLinear().domain([0, 10]))
    //       .brushOn(true)
    //       // .colors(d3.schemeRdYlGn)

    //       .elasticX(true)
    //       .elasticY(true);
    //       console.log(testChart);
    //       testChart.render();
    //     }    
            
    // });
  }


  public mounted() {    

    // this.updateChart();   
    
    // , 
  
    this.busManager.subscribe(this.widget.events, CrossFilterDatasource.CROSSFILTER, (a: string, e: any) => {            
      if (a === CrossFilterDatasource.UPDATE_CHART) {
        this.updateChart();      
      }
    } )
    // this.busManager.subscribe(this.datasource.events, CrossFilterDatasource.CROSSFILTER, (a: string, d: any) => {
    //   switch (a) {
    //     case CrossFilterDatasource.CROSSFILTER_DATALOADED:
    //       this.updateChart();
    //       break;
    //   }
    // });
  }

  public resize() {
    this.updateChart();
    this.resizing = false;
    this.$forceUpdate();
  }

  public resizeStart() {
    // this.resizing = true;

  }


  public contentLoaded(data: CrossFilterDatasource) {    
    this.updateChart();
    
  }
}
