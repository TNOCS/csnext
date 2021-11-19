import { guidGenerator, IDashboard, idGenerator } from '@csnext/cs-core';
import { SplitPanel } from './split-panel';

export * from './split-panel';
export * from './split-panel-options';
export * from './split-panel-dashboard-options';
export * from './split-element';
export * from './dashboard-layout/dashboard-layout';

export function SplitPanelDashboard(definition?: IDashboard): IDashboard {
  if (definition) {
    return {
      ...{ id: idGenerator(), layout: SplitPanel.id, options: {} },
      ...definition,
    };
  } else {
    return {};
  }
}
