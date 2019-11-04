import Component from 'vue-class-component';
import { IWidget, IMenu } from '@csnext/cs-core';

import './feature-details.css';
import { Vue, Watch } from 'vue-property-decorator';
import { Feature } from 'geojson';
import { BaseLayer } from '../../layers/base-layer';
import { FeatureType, PropertyType } from '../../classes/feature-type';
import { MapDatasource, IMapLayer, LayerLegend, FeatureEventDetails, CsMap } from '../../';
import Handlebars from 'handlebars';

import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';

export class section {
    public id?: string;
    public title?: string;
    public properties?: PropertyDetails[];
}

export class PropertyDetails {
    public key?: string;
    public value?: any;
    public type?: PropertyType;
    public legends?: LayerLegend[];
}

@Component({
    name: 'feature-details',    
    components: { simplebar },
    template: require('./feature-details.html')
} as any)
export class FeatureDetails extends WidgetBase {
    public sectionsPanels: number[] = [];
    public tabs = 'feature-details';
    public filter: string = '';

    public sections: section[] = [];    

    public get filterPropertiesEnabled(): boolean {
        return (this.filter.length > 0);
    }

    @Watch('filter')
    filterChanged(v: string) {
        this.updateSections();
    }

    public updateFilter() {
        this.$forceUpdate();
    }

    /** get active layer */
    public get layer(): BaseLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as BaseLayer;
        }
        return undefined;
    }

    /** get feature title */
    public get title(): string {
        const layer = this.layer;
        if (layer) {
            return layer.parseTitle(this.feature);
        } else {
            return '';
        }
    }

    /** get layer color */
    public get layerColor(): string {
        const layer = this.layer;
        if (layer && layer.color) {
            return layer.color;
        }
        return 'blue';
    }

    public get manager(): MapDatasource | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer._manager as MapDatasource;
        }
    }

    /** get active feature */
    public get feature(): Feature | undefined {
        if (this.widget.data && this.widget.data.feature) {
            return this.widget.data.feature;
        }
        return undefined;
    }

    private propertyFilter(prop: PropertyType, filter: string): boolean {
        if (!filter || filter.length === 0) return true;
        const lowerCaseFilter = filter.toLowerCase();
        if (prop._key && prop._key.toLowerCase().indexOf(lowerCaseFilter) >= 0)
            return true;
        if (
            prop.title &&
            prop.title.toLowerCase().indexOf(lowerCaseFilter) >= 0
        )
            return true;
        return false;
    }

    /** get list of available section, with their properties */
    public updateSections() {
        let layer = this.layer;
        if (!layer || !this.feature || !this.feature.properties) {
            return [];
        }

        // create default section
        let defaultSection = {
            id: 'default',
            title: 'PROPERTIES',
            properties: []
        } as section;
        let result: section[] = [defaultSection];
        this.sectionsPanels = [0];

        /** find feature type */
        let ft: FeatureType | undefined = undefined;
        if (
            layer.featureTypes) {
            if (layer.defaultFeatureType &&
                layer.featureTypes.hasOwnProperty(layer.defaultFeatureType)
            ) {
                ft = layer.featureTypes[layer.defaultFeatureType];
            } else {
                ft = layer.featureTypes[Object.keys(layer.featureTypes)[0]];
            }
        }

        /** lookup all properties */
        for (const key in this.feature.properties) {
            if (key[0] !== '_') {
                let pt: PropertyType | string = key;
                /** find property type */
                if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(key)) {
                    pt = ft.propertyMap[key];
                } else {
                    // debugger;
                }
                let proptype: PropertyType;
                if (typeof pt === 'string') {
                    proptype = {
                        _key: key,
                        title: key,
                        type: 'number',
                        description: key
                    } as PropertyType;
                } else {
                    proptype = pt;
                }

                if (!this.filterPropertiesEnabled ||
                    this.propertyFilter(proptype, this.filter)
                ) {
                    let legends: LayerLegend[] = [];

                    // find legend
                    if (layer._legends) {
                        legends = layer._legends.filter(
                            l => l.property === key
                        );
                        if (legends.length > 0) {
                        }
                    }

                    const element = this.feature.properties[key];
                    let prop = {
                        key: key,
                        value: element,
                        type: proptype,
                        legends: legends,
                        display: element
                    };
                    if (proptype.stringFormat !== undefined) {
                        prop.display = prop.value; // String.format(pt.stringFormat, prop.value);
                    }
                    if (proptype.handlebarFormat !== undefined) {
                        const template = Handlebars.compile(proptype.stringFormat);
                        prop.display = template(prop);
                    }

                    let section: section | undefined = defaultSection;
                    if (proptype.section) {
                        section = result.find(t => t.id === (pt as PropertyType).section);
                        if (!section) {
                            section = { id: proptype.section, title: proptype.section, properties: [] };
                            result.push(section);
                            this.sectionsPanels.push(result.length - 1);
                        }
                    } else {

                    }

                    // section.properties!.push(prop as any);

                    section.properties!.push(prop);


                }
            }
        }
        Vue.set(this, 'sections', result);
    }

    public setLegend(property: PropertyDetails) {
        if (property && property.legends && property.legends.length > 0) {
            if (this.manager && this.layer) {
                this.layer.removeLegend(property, true);
            }
        } else {
            if (this.manager && this.layer) {
                this.layer.setLegend(property, true);
            }
        }
    }

    public get properties(): any[] {
        let result: any[] = [];
        if (this.feature && this.feature.properties) {
            for (const key in this.feature.properties) {
                if (this.feature.properties.hasOwnProperty(key)) {
                    const element = this.feature.properties[key];
                    result.push(element);
                }
            }
        } else {
        }
        return result;
    }

    public centerFeature() {
        if (this.feature && this.manager) {
            this.manager.zoomFeature(this.feature, 14);
        }
    }

    public initMenu() {
        this.addMenuItem({
            id: 'open-layer',
            type: 'icon',
            icon: 'list',
            toolTip: 'OPEN LAYER',
            title: 'OPEN LAYER',
            action: () => {
                if (this.manager && this.layer) {
                    this.manager.openLayer(this.layer);
                }
            }
        } as IMenu)
    }

    public contentLoaded() {
        this.initMenu();
        this.updateSections();

        // if (this.layer) {
        //     this.busManager.subscribe(this.layer._events, 'feature', (
        //         (a: string, f: FeatureEventDetails) => {
        //             if (a === CsMap.FEATURE_SELECT) {
        //                 if (this.widget.data.layer === f.layer) {
        //                     this.widget.data = f;                            
        //                     this.updateSections();
        //                     this.updateFilter();
        //                 } else {
        //                     alert('layer switch');
        //                 }
        //             }
        //         }));
        // }

        if (this.manager) {
            this.busManager.subscribe(this.manager.events, 'legends', (a: string) => {
                this.updateSections();
            })
        }
    }
}
