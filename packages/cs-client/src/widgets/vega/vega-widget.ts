import Component from 'vue-class-component';
import Vue from 'vue';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';

declare var vega: any;
declare var vegaEmbed: any;

@Component({
  name: 'vega-widget',
  template: '<div :id="\'vega-\' + id"></div>',
  props: {
    data: null,
    widget: null
  }
} as any)
export class VegaWidget extends Vue {
  public view: any;
  public data?: any;

  /** access the original widget from configuration */
  public widget!: IWidget;
  // tslint:disable-next-line:variable-name
  private _id?: string;

  public get id(): string {
    if (this.widget !== undefined && this.widget.id) {
      return this.widget.id;
    }
    if (!this._id) {
      this._id = guidGenerator();
      return this._id;
    }
    return this._id;
  }

  @Watch('widget.data', { deep: true })
  public dataChanged() {
    this.updateChart();
  }

  @Watch('widget.content', { deep: true })
  @Watch('data')
  public contentChanged() {
    this.updateChart();
  }

  public mounted() {
    this.updateChart();
    // alert('Init chart');
  }

  private updateChart() {
    Vue.nextTick(() => {
      // check if path for definition is available
      if (!this.data) {
        this.data = this.widget.content
          ? this.widget.content.graph
          : this.widget.data;
      }
      if (this.data && this.data.path) {
        vega
          .loader()
          .load(this.data.path)
          .then((d: any) => {
            this.viewRender(JSON.parse(d));
          });
      } else {
        if (this.data) {
          this.viewRender(this.data);
        }
      }
    });
  }

  private viewRender(spec: any) {
    Vue.nextTick(() => {
      if (!spec.autosize) {
        if (!spec.width) {
          spec.width = this.$el.clientWidth - 50;
        }
        if (!spec.height) {
          spec.height = this.$el.clientHeight - 50;
        }
      }
      vegaEmbed('#vega-' + this.id, spec);
      // this.view = new vega.View(vega.parse(spec))
      //   .renderer('canvas') // set renderer (canvas or svg)
      //   .initialize('#vega-' + this.id) // initialize view within parent DOM container
      //   .hover() // enable hover encode set processing
      //   .run();
    });
  }
}
