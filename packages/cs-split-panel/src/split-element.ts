import { SplitPanelOptions } from './.';

export class SplitElement {
    public size?: number;
    public sizeUnit?: string = '%';
    public minSize?: number;
    public widgetId?: string;
    public splitpanel?: SplitPanelOptions;
}
