import { Form, FormField } from '@csnext/cs-core';
import { LayerStyle, MapboxStyles } from './layer-style';
import { PropertyCollection, PropertyType } from './property-type';

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
    // #region Properties (8)

    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    public mode?: string;
    public notification?: string;
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
    public propertyMap!: { [label: string]: PropertyType };
    /**  list of properties from propertyTypeData (as key) used for this featureType, seperated by a semi column
     * e.g: name;birthday;birthplay
    */
    public propertyTypeKeys?: string;
    public style?: LayerStyle;
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;

    // #endregion Properties (8)
}

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }
