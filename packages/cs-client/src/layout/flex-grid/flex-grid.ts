import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard,
  ILayoutManagerConfig,
  IWidget} from '@csnext/cs-core';
import { LayoutManager, FlexSize } from '../..';
import './flex-grid.css';
import {
  IFlexGridOptions,
  IFlexGridContainer,
  IFlexWidgetOptions,
  IFlexGridContainerOptions
} from './flex-grid-options';
import { Watch } from 'vue-property-decorator';

@Component({
  template: require('./flex-grid.html'),
  props: {
    dashboard: null
  }
} as any)
export class FlexGrid extends Vue {
  public dashboard!: IDashboard;
  public containers: IFlexGridContainer[] = [];
  public get options(): IFlexGridOptions {
    return this.dashboard.options;
  }

  @Watch('dashboard.widgets')
  public widgetsUpdated(n: IWidget[]) {
    this.updateContainers();
  }
  // public containers: IFlexGridContainer[] = [];

  get backgroundWidgets() {
    if (!this.dashboard || !this.dashboard.widgets) {
      return null;
    }
    return this.dashboard.widgets.filter(
      w => w.options && w.options.background
    );
  }

  public getContainer(widget: IWidget): IFlexGridContainer {
    if (!this.options) {
      this.dashboard.options = {};
    }
    if (!this.containers) {
      this.containers = [];
    }
    if (!widget.options) {
      widget.options = {};
    }
    if (!(widget.options as IFlexWidgetOptions).container) {
      (widget.options as IFlexWidgetOptions).container = 0;
    }

    const containerIndex =
      (widget.options as IFlexWidgetOptions).container || 0;
    while (this.containers.length < containerIndex + 1) {
      this.containers.push({
        id: containerIndex,
        widgets: []
      } as IFlexGridContainer);
    }
    if (
      this.options.containers &&
      this.options.containers.length >= containerIndex
    ) {
      this.containers[containerIndex].options = this.options.containers[containerIndex];
    } else {
      this.containers[containerIndex].options = {
        direction: 'row'//
        // height: '300px'
      } as IFlexGridContainerOptions;
    }
    return this.containers[containerIndex];
  }

  public updateContainers() {
    this.containers = [];
    if (!this.dashboard || !this.dashboard.widgets) {
      return;
    }
    this.dashboard.widgets
      .filter(w => !w.options || !w.options.background)
      .forEach(widget => {
        const container = this.getContainer(widget);
        container.widgets.push(widget);
      });
  }

  public containerStyles(container: IFlexGridContainer): any {
    const res: any = {};
    if (container.options) {
      if (container.options.height) { res.height = container.options.height; }
      if (container.options.maxHeight) { res['max-height'] = container.options.maxHeight; }
    }
    return res;
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
        case FlexSize.AutoWidth:
          return 'autowidth';
      }
    }
    // return 'autowidth';
    return 'md2 sm6 xs12';
  }

  public flexStyles() {
    return { padding: '5px' };
  }

  public created() {
    this.updateContainers();
  }
}

LayoutManager.add({
  id: 'flex-grid',
  name: 'flex-grid page',
  component: FlexGrid
} as ILayoutManagerConfig);
