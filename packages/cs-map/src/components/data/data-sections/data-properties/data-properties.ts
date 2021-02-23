import {GeojsonPlusLayer } from './../../../../layers/geojson-plus-layer';
import Component from 'vue-class-component';
import vue from 'vue';
import './data-properties.css';
import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { InsightDashboardPanel, LayerLegend, InsightSection, PropertyType } from '@csnext/cs-data';
import { Watch } from 'vue-property-decorator';
import { IDatasource } from '@csnext/cs-core';
import { PropertySection } from './property-section';
import { PropertyDetails} from './property-details';

@Component({
    name: 'data-properties',
    components: { simplebar },
    props: ['data', 'section', 'panel', 'feature', 'layer'],
    template: require('./data-properties.html')
} as any)
export default class DataProperties extends WidgetBase {

    public panel?: InsightDashboardPanel;
    public data?: IDatasource;
    public section?: InsightSection;
    public feature?: mapboxgl.MapboxGeoJSONFeature;
    public layer?: GeojsonPlusLayer;
    public sections: PropertySection[] = [];
    public content?: any;

    private filterPropertiesEnabled = false;
    private featureSectionsExpanded!: { [key: string]: string[] };
    private sectionsPanels: number[] = [];

    public clickPropertyKey(property: PropertyDetails) {

        // if (!property || !property.allowLegend) { return; }
        // if (property.legends && property.legends.length > 0) {
        //     if (this.data && this.layer) {
        //         this.layer.removeLegend(property, true);
        //     }
        // } else {
        //     if (this.data && this.layer) {
        //         this.layer.setLegend(property, true);
        //     }
        // }
        // if (this.data && this.data.activeInsight) {
        //     this.data.disableInsight();
        // }
    }

    public get style(): string {
        return (this.section && this.section.style) ? this.section.style : 'list';
    }

    public updateSections() {        
        if (!this.layer || !this.layer.id || !this.panel) { return; }        
        if (this.section && !this.section.id) {
            this.section.id = this.layer.id + '-' + this.panel.title + '-' + this.panel.sections.indexOf(this.section);
        }
        const defaultSection = {
            id: 'default',
            title: $cs.Translate('PROPERTIES'),
            type: 'list',
            properties: []
        } as PropertySection;
        const result: PropertySection[] = [defaultSection];

        if (!localStorage.featureSectionsExpanded) {
            localStorage.featureSectionsExpanded = '{}';
        }
        this.featureSectionsExpanded = JSON.parse(localStorage.featureSectionsExpanded);
        if (this.section && this.section.id && !this.featureSectionsExpanded.hasOwnProperty(this.section.id)) {
            this.featureSectionsExpanded[this.section.id] = [defaultSection.id!];
        }

        if (this.section && this.section.id && defaultSection.id && this.featureSectionsExpanded[this.section.id].includes(defaultSection.id)) {
            this.sectionsPanels.push(0);
        }

        if (this.data && this.layer && this.layer._source && this.data) {
            /** find feature type */
            const ft = this.layer._source.getFeatureType();
            // this.feature = this.features[0];

            /** lookup all properties */
            for (const key in this.data) {
                if (key[0] !== '_') {
                    let pt: PropertyType | string = key;
                    /** find property type */
                    if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(key)) {
                        pt = ft.propertyMap[key];

                    }
                    let proptype: PropertyType;
                    if (typeof pt === 'string') {
                        proptype = {
                            key: key,
                            title: key,
                            type: 'string',
                            description: key
                        } as PropertyType;
                    } else {
                        proptype = pt;
                    }

                    if (this.section && this.section.groups && this.section.groups.length > 0 && (!proptype.section || (proptype.section && this.section && this.section.groups && !this.section.groups.includes(proptype.section)))) {
                        continue;
                    }

                    // if (!this.filterPropertiesEnabled ||
                    //     this.propertyFilter(proptype, this.filter)
                    // ) {
                    let legends: LayerLegend[] = [];

                    // find legend
                    if (this.layer._legends) {
                        legends = this.layer._legends.filter(
                            (l: any) => l.property === key
                        );
                        // if (legends.length > 0) {
                        // }
                    }

                    const element = this.data[key];
                    const prop = {
                        key,
                        value: element,
                        allowLegend: proptype.type === 'number' || proptype.legendStyle,
                        type: proptype,
                        legends,
                        display: element
                    };
                    if (proptype.stringFormat !== undefined) {
                        prop.display = prop.value; // String.format(pt.stringFormat, prop.value);
                    }
                    // if (proptype.handlebarFormat !== undefined) {
                    //     const template = Handlebars.compile(proptype.stringFormat);
                    //     prop.display = template(prop);
                    // }

                    // tslint:disable-next-line: no-shadowed-variable
                    let section: PropertySection | undefined = defaultSection;
                    if (proptype.section) {
                        section = result.find(t => t.id === (pt as PropertyType).section);
                        if (!section) {
                            section = { id: proptype.section, title: proptype.section, properties: [] };
                            result.push(section);
                            if (this.section && section.id && this.section.id && this.featureSectionsExpanded && this.featureSectionsExpanded.hasOwnProperty(this.section.id) && this.featureSectionsExpanded[this.section.id].includes(section.id)) {
                                if (this.sectionsPanels.indexOf(result.length - 1) === -1) {
                                    this.sectionsPanels.push(result.length - 1);
                                }
                            }
                        }
                    }
                    section.properties!.push(prop);
                    // }
                }
            }
            // return f;
        }
        vue.set(this, 'sections', result);
    }

    public mounted() {           
        if (!this.data) { return; }        
        this.busManager.subscribe(this.data.events, 'legends', (a, e) => {
            this.updateSections();
        });
        // this.busManager.subscribe(this.data.events,  CsMap.FEATURE, (a, e) => {
        //     if (a === CsMap.FEATURE_SELECT) {
        //         this.updateSections();
        //     }
        // });
        // this.busManager.subscribe(this.data.events, StatsDatasource.TIME_TOPIC, (action: string, date: number) => {
        //     if (action === StatsDatasource.FOCUS_TIME_CHANGED) {                     
        //         this.updateSections();                    
        //     }
        // });
        // this.busManager.subscribe(this.data.events, '')
        this.updateSections();
    }

    @Watch('sectionsPanels')
    public saveSectionsState() {
        if (!this.section || !this.section.id) { return; }
        const res: string[] = [];
        if (!this.featureSectionsExpanded || !this.sectionsPanels || !this.sections || !this.layer) { return; }
        for (const panel of this.sectionsPanels) {
            if (this.sections.hasOwnProperty(panel)) {
                const id = this.sections[panel].id!;
                if (res.indexOf(id) === -1) {
                    res.push(id);
                }
            }
        }
        this.featureSectionsExpanded[this.section.id] = res;
        localStorage.featureSectionsExpanded = JSON.stringify(this.featureSectionsExpanded);
    }

}

vue.component('data-properties', DataProperties);
