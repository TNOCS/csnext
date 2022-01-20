import { Form, FormField } from '@csnext/cs-core';
import { LayerLegend, PropertyValueType, RelationType } from './../..';

@Form({
    title: 'Property',
    hideTitle: true,
    groups: {
        number: {
            visible(f: any) {
                return f.hasOwnProperty('type') && f.type === 'number';
            }
        }
    }
})
/** Property description */
export class PropertyType {

    static isNumber = [ (v: any) => { return v.type && v.type === PropertyValueType.number}];
    static isString = [ (v: any) => { return v.type && v.type === PropertyValueType.string}];
    static isEpoch = [ (v: any) => { return v.type && v.type === PropertyValueType.epoch}];
    static isOptions = [ (v: any) => { return v.type && v.type === PropertyValueType.options}];
    static isListItem = [ (v: any) => { return v.type && v.type === PropertyValueType.listitem}];
    static isRelation = [ (v: any) => { return v.type && v.type === PropertyValueType.relation}];
    static isUrl = [ (v: any) => { return v.type && v.type === PropertyValueType.url}];
    
    @FormField({ title: 'Label', type: 'string' })
    public label?: string;
    @FormField({ title: 'Description', type: 'string', optional: true })
    public description?: string;
    @FormField({ title: 'Hint', type: 'string', optional: true })
    public hint?: string;
    public count?: number;
    @FormField({ title: 'Default', type: 'number', group: 'number', optional: true })
    public default?: any;
    @FormField({ title: 'Unit', type: 'string', requirements: PropertyType.isNumber })
    public unit?: string;
    @FormField({ title: 'Decimals', type: 'number', requirements: PropertyType.isNumber })
    public decimals?: number;
    @FormField({ title: 'Handlebar format', type: 'string', optional: true, requirements: PropertyType.isString })
    public handlebarFormat?: string;
    
    @FormField({ title: 'Max', type: 'number', group: 'number', requirements: PropertyType.isNumber, optional: true})
    public max?: number;
    // public options?: any[];
    public mean?: number;
    public bins?: number[];
    public median?: number;
    @FormField({ title: 'Min', type: 'number', group: 'number', requirements: PropertyType.isNumber, optional: true })
    public min?: number;
    public options?: string[];
    public mapping?: {[text: string]: any};
    
    public sd?: number;
    @FormField({ title: 'String format', type: 'string', requirements: PropertyType.isString, optional: true })
    public stringFormat?: string;  
    @FormField({ title: 'Date format', type: 'selection', options: ['date', 'time', 'datetime'], defaultValue: 'datetime', requirements: PropertyType.isEpoch, optional: true })
    public dateFormat?: 'date' | 'time' | 'datetime';
    public title?: string;
    public optionsList?: string;
    public colorScheme?: string | string[];  
    public array?: boolean;
    public defaultLegendColor?: string;    
    @FormField({ title: 'Type', 
        required: true,
        defaultValue: 'text',
        type: 'selection', options: ['string', 'number', 'url', 'relation'] })
    public type?: PropertyValueType;
    // element type if type is element type
    public elementType?: string;
    public unique?: number;
    public legendStyle?: any;
    public group?: string;
    public section?: string;
    public resource?: string;
    public legend?: LayerLegend;
    public relation?: RelationType;
    public hidden?: boolean;
    public readonly?: boolean;  
    @FormField({ title: 'Url template', type: 'string', requirements: PropertyType.isUrl, optional: true })
    public urlTemplate?: string;  
    public required?: boolean;
    public timeseries?: boolean;

    public class?: string;
    public _initialized?: boolean = false;
    public _originalType?: string;        
    @FormField({ title: 'Key', type: 'string' })
    public key?: string;
    public attributes?: {[key: string]: string};

    public _values?: any[]; 
    public _visible?: boolean;   
}

export type PropertyCollection = PropertyType[];
