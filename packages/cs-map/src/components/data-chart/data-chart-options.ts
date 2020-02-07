import { WidgetOptions } from '@csnext/cs-core';

export class DataChartOptions extends WidgetOptions {
    public dataId?: string;
    public spec?: any;
    public charttype?: 'histogram' | 'scatterplot' | 'rows';
    public propertyGroup?: string;
    public key?: string;
    public secondKey?: string;
    public color?: string;
}