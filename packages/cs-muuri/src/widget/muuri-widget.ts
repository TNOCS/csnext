import { Watch } from 'vue-property-decorator';
import { IWidget, Dashboard, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
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
    this.widget._style = { width: this.widget.options.width * 100 + 'px', height: this.widget.options.height * 100 + 'px' }    
  }

  @Watch('widget.options')
  public widgetChanged(n: IWidget, old: IWidget) {
  }

  public beforeMount() {
    this.initWidget();
  }
 

}
