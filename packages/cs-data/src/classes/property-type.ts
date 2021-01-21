import { Form, FormField } from '@csnext/cs-core';
import { LayerLegend } from './layer-legend';
import { RelationType } from './relation-type';

export enum PropertyValueType {    
    boolean = 'boolean',
    date = 'date',
    datetime = 'datetime',    
    number = 'number',    
    string = 'string',
    time = 'time',
    year = 'year',
    yearmonth = 'yearmonth',
    relation = 'relation',
    url = 'url',
    options = 'options',
    image = 'image'
}


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
    static isOptions = [ (v: any) => { return v.type && v.type === PropertyValueType.options}];
    static isRelation = [ (v: any) => { return v.type && v.type === PropertyValueType.relation}];
    static isUrl = [ (v: any) => { return v.type && v.type === PropertyValueType.url}];
    
    @FormField({ title: 'Label', type: 'string' })
    public label?: string;
    @FormField({ title: 'Description', type: 'string', optional: true })
    public description?: string;
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
    public options?: { [key: string]: string };
    public sd?: number;    
    public section?: string;
    @FormField({ title: 'String format', type: 'string', requirements: PropertyType.isString, optional: true })
    public stringFormat?: string;    
    public title?: string;
    public colorScheme?: string | string[];    
    @FormField({ title: 'Type', 
        required: true,
        defaultValue: 'text',
        type: 'selection', options: ['string', 'number', 'url', 'relation'] })
    public type?: PropertyValueType;

    public unique?: number;
    public legendStyle?: any;
    public resource?: string;
    public legend?: LayerLegend;
    public relation?: RelationType;
    public hidden?: boolean;
    public readonly?: boolean;  
    @FormField({ title: 'Url template', type: 'string', requirements: PropertyType.isUrl, optional: true })
    public urlTemplate?: string;  

    public class?: string;
    public _initialized?: boolean = false;
    public _originalType?: string;        
    public _key?: string;
    public _values?: any[];    
}

export type PropertyCollection = PropertyType[];
