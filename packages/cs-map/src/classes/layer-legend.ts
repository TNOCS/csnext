import { PropertyType } from '@csnext/cs-data';

export interface LayerLegend {
    property: string;
    styleProperty: string;
    stops: any[][];
    type?: 'interval' | 'exponential' | 'identity' | 'categorical';
    style: any;
    styleKey: string;
    propertyInfo?: PropertyType;
}
