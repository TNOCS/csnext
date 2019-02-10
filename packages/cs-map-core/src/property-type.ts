import { Form, FormField } from '@csnext/cs-core';

@Form({
    title: 'Property',
    isPanel: true,
    groups: {
        number: {
            visible(f) {
                return f.hasOwnProperty('type') && f['type'] === 'number';
            }
        }
    }
})
export class PropertyType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    @FormField({
        title: 'Type',
        type: 'selection',
        defaultValue: 'text',
        required: true,
        options: ['text', 'number']
    })
    public type?: string;
    public description?: string;
    public stringFormat?: string;
    @FormField({ title: 'Min', type: 'number', group: 'number' })
    public min?: number;
    @FormField({ title: 'Max', type: 'number', group: 'number' })
    public max?: number;
    @FormField({ title: 'Default', type: 'number', group: 'number' })
    public default?: number;
}