import Component from 'vue-class-component';
import { WidgetBase } from './../..';
import Vue from 'vue';
import { WidgetOptions, IWidget } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';

declare var vega: any;

@Component({
  name: 'vega-widget',
  template: '<div :id="\'vega-\' + widget.id"></div>',
  props: {
    widget: null
  }
} as any)
export class VegaWidget extends WidgetBase {
  public view: any;

  @Watch('widget.data', { deep: true})
  public dataChanged(d: any) {
    this.updateChart();
  }

  private updateChart() {
    Vue.nextTick(() => {
      // check if path for definition is available
      if (this.widget && this.widget.data && this.widget.data.path) {
        vega
          .loader()
          .load(this.widget.data.path)
          .then((data: any) => {
            this.viewRender(JSON.parse(data));
          });
      } else {
        if (this.widget && this.widget.data) {
          this.viewRender(this.widget.data);
        }
      }
    });
  }

  private viewRender(spec: any) {
    Vue.nextTick(() => {
      if (!this.widget || !this.widget.id) {
        return;
      }
      if (!spec.autosize) {
        if (!spec.width) {
          spec.width = this.$el.clientWidth - 50;
        }
        if (!spec.height) {
          spec.height = this.$el.clientHeight - 50;
        }
      }
      this.view = new vega.View(vega.parse(spec))
        .renderer('canvas') // set renderer (canvas or svg)
        .initialize('#vega-' + this.widget.id) // initialize view within parent DOM container
        .hover() // enable hover encode set processing
        .run();
    });
  }
}
