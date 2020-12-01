import { PropertyCollection, PropertyType } from './property-type';


export class InfoTemplate {
    public small?: string;
}
/** Info panel describes visual layout to present a feature, can be used for tooltips, or feature panels */
export class InfoPanel {
    /** inherits from */
    public basePanel?: string;
    /** property of main title */
    public title?: string;
    /** property of sub title */
    public subtitle?: string;

    public aliases?: string;

    public sections?: InfoPanelSection[];
    
}


export class InfoPanelSection {
    public sectionType?: string;
    public property?: string;
    public properties?: string[];
    public title?: string;
    public filter?: string;
    public relation?: string;
    public incomming?: boolean;

}

// export class FeatureType {
//     public title?: string;
//     public mode?: string;
//     public notification?: string;
//     public icon?: string;
//     public properties?: PropertyCollection;
// }

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }


export class FeatureType {
    public title?: string;
    public type?: string;
    public baseType?: string;
    public icon?: string;
    public mode?: string;    
    public notification?: string;
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