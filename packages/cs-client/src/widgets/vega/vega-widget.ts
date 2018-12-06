import Component from 'vue-class-component';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';

declare var vega: any;

@Component({
  name: 'vega-widget',
  template: '<div :id="\'vega-\' + widget.id"></div>',
  props: {
    widget: null
  }
} as any)
export class VegaWidget extends Vue {
  public view: any;

  /** access the original widget from configuration */
  public widget!: IWidget;

  @Watch('widget.data', { deep: true})
  public dataChanged() {
    this.updateChart();
  }

  @Watch('widget.content', { deep: true})
  public contentChanged() {
    this.updateChart();
  }

  private updateChart() {
    Vue.nextTick(() => {
      // check if path for definition is available
      const data = this.widget.content ? this.widget.content.graph : this.widget.data;      
      if (data && data.path) {
        vega
          .loader()
          .load(data.path)
          .then((d: any) => {
            this.viewRender(JSON.parse(d));
          });
      } else {
        if (data) {
          this.viewRender(data);
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
