import { Watch } from 'vue-property-decorator';
import { IWidget, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, CsWidget, AppState, LayoutManager, guidGenerator } from '@csnext/cs-client';
import Component from 'vue-class-component';
const Muuri = require('muuri');
import "./muuri-widget.css";

@Component({
  template: require("./muuri-widget.html"),
  props: {
    widget: null,
    grid: null
  }
})
export class MuuriWidget extends Vue {
  public widget: IWidget;
  public grid: any;

  public initWidget() {
    // check if widget options is set
    if (!this.widget.options) {
      this.widget.options = { x: 1, y: 1, width: 1, height: 1 };
    }
    let totalwidth = AppState.Instance.windowSize.x;

    let baseSize = totalwidth / 24;
    if (totalwidth < 800) {
      baseSize = totalwidth / 8;
    } else {
      if (totalwidth < 1100) {
        baseSize = totalwidth / 12;
      } else if (totalwidth < 1300) {
        baseSize = totalwidth / 16;
      }
    }
    this.$set(this.widget, "_style", {
      padding: this.widget.options.margin
        ? this.widget.options.margin + "px"
        : "0",
      width: baseSize * this.widget.options.width + "px",
      height: baseSize * this.widget.options.height + "px"
    });
  }

  public beforeMount() {
    this.initWidget();
  }

  public created() {
    if (this.widget.events) {
      this.widget.events.subscribe("size-changed", () => {
        Vue.nextTick(() => {
          this.initWidget();
        });
      });
    }
  }
}
