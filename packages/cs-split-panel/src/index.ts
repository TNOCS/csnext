import { guidGenerator, IDashboard } from '@csnext/cs-core';
import { SplitPanel } from './split-panel';

export * from './split-panel';
export * from './split-panel-options';
export * from './split-panel-dashboard-options';
export * from './split-element';


export function SplitPanelDashboard(definition?: IDashboard): IDashboard {
    if (definition) {
      return { ...{ id: guidGenerator(), layout: SplitPanel.id, options: { } }, ...definition };
    } else {
      return {};
    }
  }