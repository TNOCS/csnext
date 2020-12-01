// export interface LayerLegend {
//     property: string;
//     stops: any[][];
// }

import { PropertyType } from '.';


export interface LayerLegend {
    property: string;
    styleProperty: string;
    stops: any[][];
    type?: 'interval' | 'exponential' | 'identity' | 'categorical';
    style: any;
    styleKey: string;
    propertyInfo?: PropertyType;
}
