import { Form, FormField } from '@csnext/cs-core';
import { LayerStyle } from './layer-style';

@Form({
    title: 'Property',
    hideTitle: true,
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
    public _key?: string;
    @FormField({ title: 'Label', type: 'string' })
    public label!: string;
    public type?: string;
    public description?: string;
    @FormField({ title: 'String format', type: 'string' })
    public stringFormat?: string;
    @FormField({ title: 'Handlebar format', type: 'string' })
    public handlebarFormat?: string;
    @FormField({ title: 'Min', type: 'number', group: 'number' })
    public min?: number;
    @FormField({ title: 'Max', type: 'number', group: 'number' })
    public max?: number;
    public count?: number;
    public unique?: number;
    // public options?: any[];
    public mean?: number;
    public median?: number;
    public sd?: number;

    @FormField({ title: 'Default', type: 'number', group: 'number' })
    public default?: number;
    public options?: { [key: string]: string };
    @FormField({ title: 'Section', type: 'string' })
    public section?: string;
    public _values?: any[];
    public _initialized?: boolean = false;

}
export type PropertyCollection = PropertyType[];

@Form({
    title: 'Feature Types',
    keyValuesType: () => {
        return new FeatureType();
    }
})
export class FeatureTypes {
    [key: string]: FeatureType;
}
@Form({ title: 'Feature', hideTitle: true })
export class FeatureType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    public mode?: string;
    public style?: LayerStyle;
    public notification?: string;
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    @FormField({
        title: 'Properties',
        type: 'array',
        canAdd: true,
        canDelete: true,
        canEditKey: true        
        // keyValuesType: () => {
        //     return new PropertyType();
        // }
    })
    public properties?: PropertyCollection;
    /**  list of properties from propertyTypeData (as key) used for this featureType, seperated by a semi column
     * e.g: name;birthday;birthplay
    */
    public propertyTypeKeys?: string;
    public propertyMap!: { [label: string]: PropertyType };
}

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }
