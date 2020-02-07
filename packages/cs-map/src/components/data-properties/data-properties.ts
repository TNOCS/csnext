import Component from 'vue-class-component';
import vue from 'vue';
import './data-properties.css';
import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { PropertyDetails, LayerLegend, GeojsonPlusLayer, PropertySection } from '../..';
import { InsightDashboardPanel, InsightSection, PropertyType } from '@csnext/cs-data';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';

@Component({
    name: 'data-properties',
    components: { simplebar },
    props: ['data', 'section', 'panel', 'features', 'layer'],
    template: require('./data-properties.html')
} as any)
export class DataProperties extends WidgetBase {

    public panel?: InsightDashboardPanel;
    public data?: StatsDatasource;
    public section?: InsightSection;
    public features?: mapboxgl.MapboxGeoJSONFeature[];
    public feature?: mapboxgl.MapboxGeoJSONFeature;
    public layer?: GeojsonPlusLayer;
    public sections: PropertySection[] = [];

    private filterPropertiesEnabled = false;
    private featureSectionsExpanded!: { [key: string]: string[] };
    private sectionsPanels: number[] = [];

    public setLegend(property: PropertyDetails) {
        if (!property || !property.allowLegend) { return; }
        if (property.legends && property.legends.length > 0) {
            if (this.data && this.layer) {
                this.layer.removeLegend(property, true);
            }
        } else {
            if (this.data && this.layer) {
                this.layer.setLegend(property, true);
            }
        }
        if (this.data && this.data.activeInsight) {
            this.data.disableInsight();
        }
    }

    public get style(): string {
        return (this.section && this.section.style) ? this.section.style : 'list';
    }

    public updateSections() {
        if (!this.layer) { return; }
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
        if (!this.featureSectionsExpanded.hasOwnProperty(this.layer.id)) {
            this.featureSectionsExpanded[this.layer.id] = [defaultSection.id!];
        }

        if (this.featureSectionsExpanded[this.layer.id].includes(defaultSection.id!)) {
            this.sectionsPanels.push(0);
        }

        if (this.data && this.layer && this.layer._source && this.features && this.features.length === 1) {
            /** find feature type */
            const ft = this.layer._source.getFeatureType();
            this.feature = this.features[0];

            /** lookup all properties */
            for (const key in this.feature.properties) {
                if (key[0] !== '_') {
                    let pt: PropertyType | string = key;
                    /** find property type */
                    if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(key)) {
                        pt = ft.propertyMap[key];
                    // tslint:disable-next-line: no-empty
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

                    if (this.section && this.section.groups.length > 0 && (!proptype.section || (proptype.section && this.section && this.section.groups && !this.section.groups.includes(proptype.section)))) {
                        continue;
                    }

                    // if (!this.filterPropertiesEnabled ||
                    //     this.propertyFilter(proptype, this.filter)
                    // ) {
                    let legends: LayerLegend[] = [];

                    // find legend
                    if (this.layer._legends) {
                        legends = this.layer._legends.filter(
                            l => l.property === key
                        );
                        // if (legends.length > 0) {
                        // }
                    }

                    const element = this.feature.properties[key];
                    const prop = {
                        key,
                        value: element,
                        allowLegend: proptype.type === 'number',
                        type: proptype,
                        legends,
                        display: element
                    };
                    if (proptype.stringFormat !== undefined) {
                        prop.display = prop.value; // String.format(pt.stringFormat, prop.value);
                    }
                    if (proptype.handlebarFormat !== undefined) {
                        const template = Handlebars.compile(proptype.stringFormat);
                        prop.display = template(prop);
                    }

                    // tslint:disable-next-line: no-shadowed-variable
                    let section: PropertySection | undefined = defaultSection;
                    if (proptype.section) {
                        section = result.find(t => t.id === (pt as PropertyType).section);
                        if (!section) {
                            section = { id: proptype.section, title: proptype.section, properties: [] };
                            result.push(section);
                            if (this.featureSectionsExpanded && this.featureSectionsExpanded.hasOwnProperty(this.layer.id) && this.featureSectionsExpanded[this.layer.id].includes(section.id!)) {
                                this.sectionsPanels.push(result.length - 1);
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
        // this.busManager.subscribe(this.data.events, '')
        this.updateSections();
    }

    @Watch('sectionsPanels')
    public saveSectionsState() {
        const res: string[] = [];
        if (!this.featureSectionsExpanded || !this.sectionsPanels || !this.sections || !this.layer) { return; }
        for (const panel of this.sectionsPanels) {
            if (this.sections.hasOwnProperty(panel)) {
                res.push(this.sections[panel].id!);
            }
        }
        this.featureSectionsExpanded[this.layer.id] = res;
        localStorage.featureSectionsExpanded = JSON.stringify(this.featureSectionsExpanded);
    }

}

vue.component('data-properties', DataProperties);
