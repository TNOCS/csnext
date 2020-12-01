import { Form, FormField } from '@csnext/cs-core';
// import { LayerStyle } from './layer-style';
import { PropertyCollection, PropertyType } from './..';
import { InfoPanel } from './info-panel/info-panel';
import { InfoTemplate } from './info-panel/info-template';

@Form({
    title: 'Feature Types',
    keyValuesType: () => {
        return new FeatureType();
    }
})
export class FeatureTypes {
    [key: string]: FeatureType;
}

// tslint:disable-next-line: max-classes-per-file
@Form({ title: 'Feature', hideTitle: true })
export class FeatureType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    public type?: string;
    public baseType?: string;
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
    public propertyMap?: { [label: string]: PropertyType };    
    /**  list of properties from propertyTypeData (as key) used for this featureType, seperated by a semi column
     * e.g: name;birthday;birthplay
     */
    public propertyTypeKeys?: string;
    public infoTemplate?: InfoTemplate;
    public infoPanels?: {[key : string]:InfoPanel};
    public style?: any;
    
}
