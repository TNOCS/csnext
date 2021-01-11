import { LayerLegend } from '.';

export class PropertyLegend {

}

// export class PropertyType {
//     public title?: string;
//     public type?: string;
//     public description?: string;
//     public stringFormat?: string;
//     public min?: number;
//     public max?: number;
//     public mean?: number;
//     public median?: number;
//     public count?: number;
//     public unique?: number;
//     public options?: any[];
//     public variance?: number;
//     public legend?: PropertyLegend;        
//     public sd?: number;
//     public default?: number;
//     public _values?: any[];
// }

export class RelationType {
    public type?: string;
    public multipe?: boolean;
    public objectType?: string;
    public subjectType?: string;

}

export declare type PropertyCollection = PropertyType[];

export class PropertyType {
    
    public label?: string;    
    public description?: string;
    public count?: number;
    public _key?: string;
    
    public default?: any;
    
    public unit?: string;
    public decimals?: number;
    
    public handlebarFormat?: string;
    
    
    public max?: number;
    // public options?: any[];
    public mean?: number;
    public bins?: number[];
    public median?: number;
    
    public min?: number;
    public options?: string[]; //{ [key: string]: string };
    public sd?: number;
    
    public section?: string;
    
    public stringFormat?: string;
    
    public title?: string;
    public colorScheme?: string | string[];    
    public type?: string;
    public unique?: number;
    public legendStyle?: any;
    public resource?: string;
    public legend?: LayerLegend;
    public relation?: RelationType;
    public hidden?: boolean;
    public readonly?: boolean;  
    public urlTemplate?: string;  

    public class?: string;
    public _initialized?: boolean = false;        
    public _values?: any[];    
    public _originalType?: string;
}