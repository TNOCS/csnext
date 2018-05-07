import Component from 'vue-class-component';
import { WidgetBase } from './widget-base';
import Vue from 'vue';

declare var vega: any;

@Component({
  name: 'vega-widget',
  template: '<div :id="\'vega-\' + widget.id"></div>'
} as any)
export class VegaWidget extends WidgetBase {
  public view: any;

  public mounted() {
    Vue.nextTick(() => {
      // check if path for definition is available
      if (this.widget && this.widget.data && this.widget.data.path) {
        vega
          .loader()
          .load(this.widget.data.path)
          .then((data: any) => {
            this.viewRender(JSON.parse(data));
          });
      }
    });
  }

  public viewRender(spec: any) {
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
