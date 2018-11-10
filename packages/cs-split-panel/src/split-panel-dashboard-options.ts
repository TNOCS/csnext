import { BaseDashboardOptions } from '@csnext/cs-core';
import { SplitPanelOptions } from './.';

export class SplitPanelDashboardOptions extends BaseDashboardOptions {
  public splitpanel?: SplitPanelOptions;
  public defaultPreset?: string;
  public presets?: { [title: string] : SplitPanelOptions };
}
