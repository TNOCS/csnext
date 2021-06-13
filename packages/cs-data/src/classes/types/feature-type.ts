import { Form, FormField } from '@csnext/cs-core';
import { InfoPanel, InfoTemplate, PropertyValueType, FeatureTypes, PropertyCollection, PropertyType, GraphElement, TextEntity, TextRelation } from './../..';

@Form({ title: 'Feature', hideTitle: true })
export class FeatureType {
    @FormField({ title: 'Title', type: 'string' })
    public title?: string;
    public type?: string;
    public baseType?: string | string[];
    public _baseTypes?: FeatureType[];
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    public mode?: string;    
    @FormField({ title: 'Abstract', type: 'checkbox'})
    public abstract?: boolean;  
    public color?: string;
    public _node?: GraphElement;
    public _nlpType?: string;
    public _edge?: GraphElement;
    public typeId?: string;
    public notification?: string;
    public _entities?: TextEntity[];
    // public featureType?: string;
    // public _featureType?: FeatureType;
    // public patterns?: ObservationPattern[];
    public relations?: TextRelation[];
    public _collapsed?: boolean;        

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
    /** list of parameters that e.g. can be used for import tasks */
    public attributes?: {[key: string]: any};
    public infoTemplate?: InfoTemplate;
    public infoPanels?: {[key : string]:InfoPanel};
    public style?: any;    
    public _originalFeatureType?: FeatureType;
    public _inheritedTypes?: string[];

    public static initFeatureTypes(types: FeatureTypes) {
        for (const type in types) {
            let ft = types[type];
            // if (!ft.baseType && ft.type !== 'node') { ft.baseType = ['node']}
            if (typeof(ft.baseType) === 'string' ) {
                ft.baseType = [ft.baseType];
            }   

            // if (ft.infoPanels!) {
            //     ft.infoPanels = {
            //         popup: {
            //             title: 'title',
            //             subtitle: 'description'
            //         }
            //     }
            // }

            
            if (ft.properties) {
                for (const p of ft.properties)
                {     
                    if (!p.key && p.label) { p.key = p.label.toLowerCase(); }
                    if (!p.type) {                         
                        if (p.relation) {
                            p.type = PropertyValueType.relation;                                
                        } else {
                            p.type = PropertyValueType.string; }
                    }
                    if (p.type === PropertyValueType.relation && !p.relation) {
                        p.relation = {};
                    }
                }
            }
        }
    }

    public static mergeFeatureTypes(types: FeatureTypes) : FeatureTypes {        
        let res: FeatureTypes = {};
        for (const key in types) {
            if (Object.prototype.hasOwnProperty.call(types, key)) {
                const type = types[key];
                let ft = Object.assign({}, type);
                ft._originalFeatureType = type;
                FeatureType.initType(ft);            
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
                res[key] = ft; 
            }
        }      
        return res;
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

    public static updateTypeInheritence(base: FeatureType, ft: FeatureType, types: FeatureTypes) {        
        if (!base._inheritedTypes) {            
            if (base.baseType && Array.isArray(base.baseType)) {
                for (const bb of base.baseType) {                    
                    let ob = types[bb];        
                    if (ob) {
                        FeatureType.updateTypeInheritence(ob, base, types);
                    }                    
                }
            }            
        }
        if (!ft._inheritedTypes) {
            ft._inheritedTypes = [];
        }
            if (ft.type && !ft._inheritedTypes.includes(ft.type)) { ft._inheritedTypes.push(ft.type)};
            if (base.type && !ft._inheritedTypes.includes(base.type)) { ft._inheritedTypes.push(base.type)};
            if (base._inheritedTypes) {
                for (const it of base._inheritedTypes) {
                    if (!ft._inheritedTypes.includes(it)) {
                        ft._inheritedTypes.push(it);
                    }                    
                }
            }            
        
    }

    public static mergeBaseType(baseType: string, ft: FeatureType, types: FeatureTypes) : FeatureTypes
    {                        
        if (types.hasOwnProperty(baseType))
        {                        
            let base = types[baseType];            
            
            // find inherited types
            FeatureType.updateTypeInheritence(base, ft, types);

            if (base.baseType && Array.isArray(base.baseType)) {
                for (const b of base.baseType) {                    
                        FeatureType.mergeBaseType(b, base, types);                    
                }
            }

            ft._baseTypes?.push(base);
            if (base._inheritedTypes) {
                for (const type of base._inheritedTypes) {
                    if (!ft._inheritedTypes?.includes(type)) {
                        ft._inheritedTypes?.push(type);
                    }                    
                }
            }
            
            // if (!ft.properties) { ft.properties = [];}                    
            if (base.properties)
            {               
                let props: PropertyType[] = Object.assign([], base.properties);
                // ft.properties = base.properties;
                if (ft.properties)
                {
                    for (const p of ft.properties)
                    {       
                        let i = props.findIndex(f => (f.key === p.key));                 
                        if (p.relation)
                        {
                            if (i === -1) {
                                props.push(p);
                            } else {
                                props[i] = p;
                            }
                        } else
                        {
                            
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
            if (base.attributes)
            {   
                ft.attributes = {...base.attributes, ...ft.attributes};                                                
            }
            if (base.infoPanels)
            {
                if (!ft.infoPanels) { ft.infoPanels = {}; }
                for (const panel of Object.keys(base.infoPanels))
                {
                    if (!ft.infoPanels.hasOwnProperty(panel))
                    {
                        ft.infoPanels[panel] = { ...base.infoPanels[panel], ...{ _originalType: baseType }};

                        
                    } else
                    {
                        // if (!ft.infoPanels[panel].sections) { ft.infoPanels[panel].sections = []; }
                        // if (base.infoPanels[panel].sections)
                        // {                        
                        //     let res = [...base.infoPanels[panel].sections!.filter(s => ft.infoPanels![panel].sections?.findIndex(t => t.title === s.title))];     
                            
                        //     ft.infoPanels[panel].sections = [...res, ...ft.infoPanels[panel].sections!];
                        // }
                        // ft.infoPanels[panel] = { ...base.infoPanels[panel], ...ft.infoPanels[panel] };
                    }
                }
            }
        }
        return types;
    }
    
}
