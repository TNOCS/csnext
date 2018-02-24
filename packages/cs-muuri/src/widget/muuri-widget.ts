import { Watch } from 'vue-property-decorator';
import { IWidget, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, CsWidget, AppState, LayoutManager, guidGenerator } from '@csnext/cs-client';
import Component from 'vue-class-component';
const Muuri = require('muuri');
import "./muuri-widget.css";

@Component({
  template: require('./muuri-widget.html'),
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
    let baseSize = totalwidth / ((totalwidth < 800) ? 8 : 24);
    this.widget._style = { margin: this.widget.options.margin ? this.widget.options.margin + "px" : "0", width: baseSize * this.widget.options.width + 'px', height: baseSize * this.widget.options.height + 'px' }
  }

  @Watch('widget.options')
  public widgetChanged(n: IWidget, old: IWidget) {
    console.log('widget changed');
  }

  public beforeMount() {
    this.initWidget();
  }

  public created() {
    if (this.widget.events) {
      debugger;
      this.widget.events.subscribe('size-changed', () => {
        console.log('size changed');

        this.initWidget();
        this.grid.layout(true);

      })
    }
  }


}
