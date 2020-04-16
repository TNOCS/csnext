import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, guidGenerator } from '@csnext/cs-core';
import { LayoutManager } from '../..';

import './mobile-flow.css';

@Component({
  template: require('./mobile-flow.html'),
  props: {
    dashboard: null
  }
} as any)
export class MobileFlow extends Vue {
  public static id = 'mobile-flow';
  public dashboard?: IDashboard;
}

LayoutManager.addLayoutManager(MobileFlow);

export function MobileFlowDashboard(definition?: IDashboard): IDashboard {
  if (definition) {
    return { ...{ id: guidGenerator(), layout: MobileFlow.id, options: { } }, ...definition };
  } else {
    return {};
  }
}

