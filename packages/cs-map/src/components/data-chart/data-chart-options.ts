import { WidgetOptions } from '@csnext/cs-core';

export class DataChartOptions extends WidgetOptions {
    public dataId?: string;
    public spec?: any;
    public charttype?: 'prop-history' | 'histogram' | 'scatterplot' | 'rows';
    public propertyGroup?: string;
    public key?: string;
    public mark?: string | any;
    public secondKey?: string;
    public color?: string;
}