import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, Logger, cswidget, AppState } from '@csnext/cs-client';
import Component from 'vue-class-component';
import * as $ from 'jquery';
import '../../../node_modules/gridstack/dist/gridstack.css';
import * as _ from 'lodash';
import 'jquery';
import 'lodash';
import 'gridstack/dist/gridstack.all';
import './gridstack.css';
import { DashboardOptions } from '@csnext/cs-core';

export interface IGridStackOptions extends DashboardOptions {
  /** height of each cell unit */
  cellHeight?: number;
  /**  vertical gap size (default: 20). */
  verticalMargin?: number;
  /** amount of columns (default: 12) */
  width?: number;
  /** disallows dragging of widgets (default: false). */
  disableDrag?: boolean;
  /** disallows resizing of widgets (default: false). */
  disableResize?: boolean;
  /** maximum rows amount. Default is 0 which means no maximum rows */
  height?: number;
  /** enable floating widgets (default: false) */
  float?: boolean;
  /* tells to ignore data-gs-x and data-gs-y attributes and to place element to the first available position */
  autoposition?: boolean;
  /** makes grid static (default false). If true widgets are not movable/resizable. You don't even need jQueryUI draggable/resizable. A CSS class grid-stack-static is also added to the container. */
  staticGrid?: boolean;
  resizable?: any;
}

@Component({
  template: require('./gridstack.html'),
  props: {
    dashboard: null
  }
})
export class GridStack extends Vue {
  public mode: any;
  public dashboard: Dashboard;
  public gridoptions: IGridStackOptions;

  get widgets() {
    return this.dashboard.widgets.filter(w => !w.options.background);
  }

  get backgroundWidgets() {
    return this.dashboard.widgets.filter(w => w.options.background);
  }

  public beforeMount() {
    this.gridoptions = this.dashboard.options as IGridStackOptions;
    if (this.gridoptions.autoposition === undefined) { this.gridoptions.autoposition = false; }
  }

  public created() {
    if (!this.dashboard) { return; }
    Vue.nextTick(() => {
      if (!this.dashboard.options) {
        this.gridoptions = {};
      }

      const options = {
        // tslint:disable-next-line:no-bitwise
        cellHeight: this.gridoptions.cellHeight | 20,
        // tslint:disable-next-line:no-bitwise
        verticalMargin: this.gridoptions.verticalMargin | 10,
        // tslint:disable-next-line:no-bitwise
        width: this.gridoptions.width | 12,
        disableDrag: this.gridoptions.disableDrag || false,
        disableResize: this.gridoptions.disableResize || false,
        // tslint:disable-next-line:no-bitwise
        height: this.gridoptions.height | 0,
        float: this.gridoptions.float || false,
        staticGrid: this.gridoptions.staticGrid || false,
        resizable: this.gridoptions.resizable || { handles: 'e, se, s, sw, w' }
      };
      const gs = $('#gridstack');
      gs.gridstack(options);
      gs.on('change', (event, items) => {
        items.forEach(i => {
          if (i.id) {
            this.gridoptions.autoposition = false;
            const widget = this.dashboard.widgets.find(k => k.id === i.id);
            if (widget) {
              widget.options.width = i.width;
              widget.options.height = i.height;
              widget.options.x = i.x;
              widget.options.y = i.y;
            }
          }
        });
      });
    });
  }
}
