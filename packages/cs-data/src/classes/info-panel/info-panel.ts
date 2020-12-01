import { InfoPanelSection } from './info-panel-section';

/** Info panel describes visual layout to present a feature, can be used for tooltips, or feature panels */
export class InfoPanel
{
    /** inherits from */
    public basePanel?: string;
    /** property of main title */
    public title?: string;
    /** property of sub title */
    public subtitle?: string;

    public aliases?: string;

    public sections?: InfoPanelSection[];
}
