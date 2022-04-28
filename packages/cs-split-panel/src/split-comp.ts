import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { IDashboard, IWidget, MessageBusHandle } from '@csnext/cs-core';
import './split-panel.css';
import { SplitGrid, SplitGridArea, SplitGridGutter } from 'vue-split-grid';
import { SplitElement } from './split-element';
import { SplitPanel, SplitPanelOptions } from '.';

@Component({
  template: require('./split-comp.html'),
  components: {
    SplitComp,
    SplitGrid,
    SplitGridArea,
    SplitGridGutter,
  },
} as any)
export class SplitComp extends Vue {
  @Prop({ default: null }) private options?: SplitPanelOptions;
  @Prop({ default: null }) private dashboard?: IDashboard | null;

  public splitGridOptions = {
    gutterSize: 5,
  };

  public allHidden(element: SplitPanelOptions) {
    return element.elements && element.elements.every((e) => e.hide);
  }

  public getSplitpanel(panelElm: SplitElement) {
    console.log(panelElm);
    return panelElm && panelElm.splitpanel ? panelElm.splitpanel : undefined;
  }

  public getDirection(dir: string) {
    switch (dir) {
      case 'vertical':
        return 'row';
      case 'horizontal':
        return 'column';
      default:
        return dir;
    }
  }

  public getWidget(id: string, dashboard: IDashboard): IWidget | undefined {
    if (dashboard && dashboard.widgets) {
      return dashboard.widgets.find((w) => w.id === id);
    }
  }

  public getDashboard(
    id: string,
    dashboard: IDashboard
  ): IDashboard | undefined {
    if (dashboard && dashboard.refDashboards) {
      return dashboard.refDashboards.find((d) => d.id === id);
    }
  }

  private panelHandle?: MessageBusHandle;

  public mounted() {
    if (!this.dashboard?.events) {
      return;
    }
    if (!this.panelHandle) {
      this.panelHandle = this.dashboard.events.subscribe('panel', () => {
        console.log('panel changed');
        this.$forceUpdate();
      });
    }
  }
}
