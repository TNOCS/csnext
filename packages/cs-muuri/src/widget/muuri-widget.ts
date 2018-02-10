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
    widget: null
  }
})

export class MuuriWidget extends Vue {
  public widget: IWidget;

  public initWidget() {
    // check if widget options is set    
    if (!this.widget.options) {
      this.widget.options = { x: 1, y: 1, width: 1, height: 1 };
    }
    let totalwidth = AppState.Instance.windowSize.x;
    let baseSize = totalwidth / ((totalwidth < 800) ? 4 : 12);
    this.widget._style = { width: baseSize * this.widget.options.width + 'px', height: baseSize * this.widget.options.height + 'px' }
  }

  @Watch('widget.options')
  public widgetChanged(n: IWidget, old: IWidget) {
  }

  public beforeMount() {
    this.initWidget();
  }


}
