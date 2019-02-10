import { Form, FormField } from '@csnext/cs-core';
import { PropertyType, PropertyCollection } from './';

@Form({ title: 'Feature', isPanel: true })
export class FeatureType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    public mode?: string;
    public notification?: string;
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    @FormField({
        title: 'Properties',
        type: 'keysobject',
        canAdd: true,
        canDelete: true,
        canEditKey: true,
        keyValuesType: () => {
            return new PropertyType();
        }
    })
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
