import { BaseDashboardOptions } from '@csnext/cs-core';
import { SplitPanelOptions } from './.';

export class SplitPanelPresetOptions {
  public showSteppers?: boolean;
}

export class SplitPanelDashboardOptions extends BaseDashboardOptions {
  public splitpanel?: SplitPanelOptions;
  public defaultPreset?: string;
  public presetOptions?: SplitPanelPresetOptions;
  public presets?: { [title: string] : SplitPanelOptions };
}
