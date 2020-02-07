import { PropertyType } from '@csnext/cs-data';

export class LayerFilter {
    public static operators = ['>=', '<=', '='];
    public type: 'range' | 'value' = 'range';
    public min?: number;
    public max?: number;
    public value?: any;
    public property?: string;
    public propertyType?: PropertyType;

    public get rangeArray(): number[] | undefined {
        if ((this.min !== undefined) && (this.max !== undefined)) {
            return [this.min, this.max];
        }
    }

    public set rangeArray(values: number[] | undefined) {
        if (values && values.length === 2) {
            this.min = values[0];
            this.max = values[1];
        }
    }

    constructor(input?: LayerFilter) {
        if (input) {
            Object.assign(this, input);
        }
    }

}