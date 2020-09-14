import { Form, FormField } from '@csnext/cs-core';
// import { LayerStyle } from './layer-style';
import { PropertyCollection, PropertyType } from './..';

@Form({
    title: 'Feature Types',
    keyValuesType: () => {
        return new FeatureType();
    }
})
export class FeatureTypes {
    [key: string]: FeatureType;
}

export class InfoTemplate {
    public small?: string;
}

// tslint:disable-next-line: max-classes-per-file
@Form({ title: 'Feature', hideTitle: true })
export class FeatureType {
    
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
    public infoTemplate?: InfoTemplate;
    public style?: any;
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
}
