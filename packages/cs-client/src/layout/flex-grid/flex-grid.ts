import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard,
  ILayoutManagerConfig,
  IWidget,
  IGridDashboardOptions,
  IWidgetOptions
} from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './flex-grid.css';
import { FlexSize } from './flex-size';

@Component({
  template: require('./flex-grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class FlexGrid extends Vue {
  public dashboard!: IDashboard;

  get backgroundWidgets() {
    if (!this.dashboard || !this.dashboard.widgets) {
      return null;
    }
    return this.dashboard.widgets.filter(
      w => w.options && w.options.background
    );
  }

  get widgets() {
    if (!this.dashboard || !this.dashboard.widgets) {
      return null;
    }
    return this.dashboard.widgets.filter(
      w => !w.options || !w.options.background
    );
  }

  public flexClasses(widget: IWidget) {
    if (widget.options && (widget.options as IFlexWidgetOptions).size) {
      const opt = widget.options as IFlexWidgetOptions;
      switch (opt.size) {
        case FlexSize.Small:
          return 'md2 sm4 xs6';
        case FlexSize.Medium:
          return 'md4 sm4 xs6';
        case FlexSize.Large:
          return 'md6 sm6 xs12';
        case FlexSize.Tall:
          return 'md4 sm6 xs12';
        case FlexSize.Wide:
          return 'md6 sm6 xs12';
      }
    }
    return 'md2 sm6 xs12';
  }

  public flexStyles(widget: IWidget) {
    return { padding: '5px' };
  }
}

export interface IFlexWidgetOptions extends IWidgetOptions {
  size?: FlexSize;
}

LayoutManager.add({
  id: 'flex-grid',
  name: 'flex-grid page',
  component: FlexGrid
} as ILayoutManagerConfig);
