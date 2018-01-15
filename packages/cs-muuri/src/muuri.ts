import { Watch } from 'vue-property-decorator';
import { IWidget, Dashboard, ILayoutManagerConfig, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, cswidget, AppState, LayoutManager } from '@csnext/cs-client';
import Component from 'vue-class-component';
const  Muuri = require('muuri');

export interface IMuuriOptions extends IDashboardOptions {
 
}

@Component({
  template: require('./muuri.html'),
  props: {
    dashboard: null
  }
})
export class MuuriLayout extends Vue {
  public mode: any;
  public dashboard: Dashboard;
  public options: IMuuriOptions;
  public grid: any;

  get widgets() {
    return this.dashboard.widgets.filter(w => !w.options || !w.options.background);
  }

  get backgroundWidgets() {
    return this.dashboard.widgets.filter(w => w.options && w.options.background);
  }

  public initWidget(widget: IWidget) {
    // check if widget options is set
    if (!widget.options) {
      widget.options = { x: 1, y: 1, width: 1, height: 1 };
    }
  }

  @Watch('dashboard.widgets')
  public widgetsChanged(n: IWidget[], old: IWidget[]) {
    Vue.nextTick(() => {
      n.forEach(w => {
       //  this.grid.data('gridstack').makeWidget('#' + w.id);
        // this.grid.addWidget()
      });
    });
  }

  public beforeMount() {
    this.options = this.dashboard.options as IMuuriOptions;
   
    this.dashboard.widgets.forEach(widget => {
      this.initWidget(widget);
    });
  }

  public created() {
    if (!this.dashboard) { return; }
    Vue.nextTick(() => {
      if (!this.dashboard.options) {
        this.options = {};
      }

      var muuri = new Muuri('#muurigrid');


      // const options = {
      //   // tslint:disable-next-line:no-bitwise
       
      // };
      // this.grid = $('#gridstack');
      // this.grid.gridstack(options);

      // // store resize result
      // this.grid.on('change', (event, items) => {
      //   items.forEach(i => {
      //     if (i.id) {
      //       this.options.autoposition = false;
      //       const widget = this.dashboard.widgets.find(k => k.id === i.id);
      //       if (widget) {
      //         widget.options.width = i.width;
      //         widget.options.height = i.height;
      //         widget.options.x = i.x;
      //         widget.options.y = i.y;
      //       }
      //     }
      //   });
      // });
    });
  }
}
