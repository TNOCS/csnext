
export class PropertyLegend {

}

export class PropertyType {
    public title?: string;
    public type?: string;
    public description?: string;
    public stringFormat?: string;
    public min?: number;
    public max?: number;
    public mean?: number;
    public median?: number;
    public count?: number;
    public unique?: number;
    public options?: any[];
    public variance?: number;
    public legend?: PropertyLegend;        
    public sd?: number;
    public default?: number;
    public _values?: any[];
}