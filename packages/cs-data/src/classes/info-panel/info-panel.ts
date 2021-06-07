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
    /** property with url used for showing icon */
    public iconImageProperty?: string;

    public aliases?: string;

    /** list of sections included in this info panel */
    public sections?: InfoPanelSection[];

    /** original type this panel was inherited from */
    public _originalType?: string;
    
}
