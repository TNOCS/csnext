import { Form, FormField } from '@csnext/cs-core';
import { LayerLegend } from './layer-legend';
import { RelationType } from './relation-type';

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
    
    @FormField({ title: 'Label', type: 'string' })
    public label?: string;
    @FormField({ title: 'Label', type: 'string' })
    public description?: string;
    public count?: number;
    @FormField({ title: 'Default', type: 'number', group: 'number' })
    public default?: any;
    
    public unit?: string;
    public decimals?: number;
    @FormField({ title: 'Handlebar format', type: 'string' })
    public handlebarFormat?: string;
    
    @FormField({ title: 'Max', type: 'number', group: 'number' })
    public max?: number;
    // public options?: any[];
    public mean?: number;
    public bins?: number[];
    public median?: number;
    @FormField({ title: 'Min', type: 'number', group: 'number' })
    public min?: number;
    public options?: { [key: string]: string };
    public sd?: number;
    @FormField({ title: 'Section', type: 'string' })
    public section?: string;
    @FormField({ title: 'String format', type: 'string' })
    public stringFormat?: string;
    @FormField({ title: 'Title', type: 'string' })
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
    @FormField({
        title: 'Type',
        type: 'selection',
        defaultValue: 'text',
        required: true,
        options: ['text', 'number']
    })
    public _key?: string;
    public _values?: any[];    
}

export type PropertyCollection = PropertyType[];
