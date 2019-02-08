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

@Form({
    title: 'Property Collection',
    isPanel: true,            
    keyValuesType: () => {
        return new PropertyType();
    }
})
export class PropertyCollection {
    [key: string]: string | PropertyType;
}

@Form({
    title: 'Feature Types',   
    keyValuesType: () => {
        return new FeatureType();
    }
})
export class FeatureTypes {
    [key: string]: FeatureType;
}
@Form({ title: 'Feature', isPanel: true})
export class FeatureType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    public mode?: string;
    public notification?: string;
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    @FormField({ title: 'Properties', type: 'keysobject', canEditKey: true  })
    public properties?: PropertyCollection;
}

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }
