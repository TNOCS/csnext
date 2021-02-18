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
    public baseType?: string | string[];
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
    /** list of parameters that e.g. can be used for import tasks */
    public attributes?: {[key: string]: any};
    public infoPanels?: {[key : string]:InfoPanel};
    public style?: any;    
    public _baseTypes? : FeatureType[] = [];

    public static mergeFeatureTypes(types: FeatureType[]) : FeatureType[] {
        console.log(types.length);
        for (const ft of types) {
            FeatureType.initType(ft);
            if (!ft.baseType && ft.type !== 'node') { ft.baseType = 'node'}
            if (ft.baseType) {
                ft._baseTypes = [];
                if (typeof ft.baseType === 'string') {                    
                    const baseType = ft.baseType;                
                    FeatureType.mergeBaseType(baseType, ft, types);
                } else {
                    for (const baseType of ft.baseType) {
                        this.mergeBaseType(baseType, ft, types);
                    }
                }                
            }
        }        
        return types;    
    }

    public static initType(ft: FeatureType) : FeatureType
    {
        if (ft.properties) {
            for (const prop of ft.properties) {
                if (!prop._originalType) {                     
                    prop._originalType = ft.type; 
                }
            }
        }
        return ft;
    }

    public static mergeBaseType(baseType: string, ft: FeatureType, types: FeatureType[]) : FeatureType[]
    {        
        let base = types.find(ft => ft.type === baseType);                
        if (base)
        {            
            ft._baseTypes?.push(base);
            
            // if (!ft.properties) { ft.properties = [];}                    
            if (base.properties)
            {
                if (ft.type === 'weapon') {
                    console.log(JSON.stringify(ft, null, 2));
                }
                let props: PropertyType[] = Object.assign([], base.properties);
                // ft.properties = base.properties;
                if (ft.properties)
                {
                    for (const p of ft.properties)
                    {
                        if (p.relation)
                        {
                            props.push(p);
                        } else
                        {
                            let i = props.findIndex(f => (f.key === p.key));
                            if (i === -1)
                            {
                                props.push(p);
                            } else
                            {
                                props[i] = p;
                            }
                        }
                    }
                    ft.properties = props;

                }
                // .filter(p => ft.properties?.findIndex(f => f._key === p._key) === -1)?.concat(ft.properties);
            }
            if (base.infoPanels)
            {
                if (!ft.infoPanels) { ft.infoPanels = {}; }
                for (const panel of Object.keys(base.infoPanels))
                {
                    if (!ft.infoPanels.hasOwnProperty(panel))
                    {
                        ft.infoPanels[panel] = base.infoPanels[panel];
                    } else
                    {
                        if (!ft.infoPanels[panel].sections) { ft.infoPanels[panel].sections = []; }
                        if (base.infoPanels[panel].sections)
                        {
                            ft.infoPanels[panel].sections = [...base.infoPanels[panel].sections!, ...ft.infoPanels[panel].sections!];
                        }
                        ft.infoPanels[panel] = { ...base.infoPanels[panel], ...ft.infoPanels[panel] };
                    }
                }
            }
        }
        return types;
    }
}

