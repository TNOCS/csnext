import { IWidget, Dashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger, cswidget, AppState, ITileDashboardOptions, LayoutManager } from '../../index';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

import './tiles.css';

@Component({
  template: require('./tiles.html'),
  props: {
    dashboard: null
  }
} as any)
export class Tiles extends Vue {
  public dashboard: Dashboard;

  constructor() {
    super();
    this.dashboard = new Dashboard();
  }

  public get options(): ITileDashboardOptions {
    return this.dashboard.options as ITileDashboardOptions;
  }

  public widgetClass(widget: IWidget) {
    let width = this.options.tileSize;
    let height = this.options.tileSize;
    if (widget.options) {
      if (widget.options.width) { width = width * widget.options.width; }
      if (widget.options.height) { height = height * widget.options.height; }
    }
    return { background: 'red', width: width + 'px', float: 'left', height: height + 'px', margin: '3px' };
  }
}

LayoutManager.add({ id: 'tiles', name: 'tiles page', component: Tiles } as ILayoutManagerConfig);
