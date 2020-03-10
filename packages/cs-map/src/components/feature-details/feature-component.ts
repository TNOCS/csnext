import Component from 'vue-class-component';

import './feature-component.css';
import { Vue, Watch } from 'vue-property-decorator';

import { LayerLegend, StatsDatasource } from '../../';
import { PropertyType, DataResource, InsightDashboard } from '@csnext/cs-data';
import Handlebars from 'handlebars';

import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { PropertySection } from './property-section';
import { PropertyDetails } from './property-details';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';

// tslint:disable-next-line: max-classes-per-file
@Component({
    name: 'feature-component',
    components: { simplebar },
    template: require('./feature-component.html')
} as any)
export class FeatureComponent extends WidgetBase {
    // #region Properties (4)

    public filter: string = '';
    public sections: PropertySection[] = [];
    public sectionsPanels: number[] = [];
    public tabs = null;

    public get dashboard(): InsightDashboard {
        const res = {
            panels: [
                // {
                //     title: 'test',
                //     sections: [
                //         { title: 'test', type: 'chart'}
                //     ]
                // },
                // {
                //     title: 'test2',
                //     sections: [
                //         { title: 'test', type: 'chart'}
                //     ]
                // }
            ]
        } as InsightDashboard;
        if (this.manager && this.manager.activeInsightView && this.manager.activeInsightView.dashboards && this.manager.activeInsightView.dashboards.feature) {
            const fd = this.manager.activeInsightView.dashboards.feature as InsightDashboard;
            if (fd && fd.panels) {
                res.panels = res.panels.concat(fd.panels);
            }
        } else {
            res.panels.push({
                'title': $cs.Translate('ALL'),
                'sections': [
                    {
                        type: 'properties',
                        title: '',
                        style: '',
                        groups: []
                    }
                ]
            });
        }
        return res;
    }

    private featureSectionsExpanded!: { [key: string]: string[] };

    // #endregion Properties (4)

    // #region Public Accessors (7)

    /** get active feature */
    public get feature(): mapboxgl.MapboxGeoJSONFeature | undefined {
        if (this.widget.data && this.widget.data.feature) {
            return this.widget.data.feature;
        }
        return undefined;
    }

    public get panels(): string[] {
        if (this.manager && this.manager.dataPackage && this.manager.dataPackage.resources) {
            return this.manager.dataPackage.resources.filter(r => r.data && r.title).map(r => r.title) as string[];
        } else {
            return [];
        }
    }

    public get resources(): DataResource[] | undefined {
        if (this.manager && this.manager.dataPackage && this.manager.dataPackage.resources) {
            return this.manager.dataPackage.resources.filter(r => r.data);
        }
    }

    public get filterPropertiesEnabled(): boolean {
        return (this.filter.length > 0);
    }

    /** get active layer */
    public get layer(): GeojsonPlusLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as GeojsonPlusLayer;
        }
        return undefined;
    }

    /** get layer color */
    public get layerColor(): string {
        const layer = this.layer;
        if (layer && layer.color) {
            return layer.color;
        }
        return 'blue';
    }

    public get manager(): StatsDatasource | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer._manager as StatsDatasource;
        }
    }

    public get properties(): any[] {
        const result: any[] = [];
        if (this.feature && this.feature.properties) {
            for (const key in this.feature.properties) {
                if (this.feature.properties.hasOwnProperty(key)) {
                    const element = this.feature.properties[key];
                    result.push(element);
                }
            }
        } else { }
        return result;
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

    public get isBookmarked(): boolean {
        return (this.layer && this.feature) ? this.layer.bookmarks.includes(this.feature) : false;
    }

    public toggleBookmark() {
        if (this.layer !== undefined && this.feature !== undefined) {
            if (this.layer.toggleBookmark(this.feature)) {
                $cs.triggerNotification({ icon: 'bookmark', title: $cs.Translate('BOOKMARK_ADDED') });
            }
        }
    }

    public getSectionProperties() {

    }

    public getSections(resource: DataResource): PropertySection[] {
        const defaultSection = {
            id: 'default',
            title: $cs.Translate('PROPERTIES'),
            type: 'properties',
            properties: []
        } as PropertySection;
        const result: PropertySection[] = [defaultSection];

        if (resource.schema && resource.schema.fields) {
            for (const field of resource.schema.fields) {
                if (!field.group) { field.group = 'default'; }
                if (result.findIndex(s => s.id === field.group) === -1) {
                    result.push({
                        id: field.group,
                        title: field.group,
                        type: 'properties',
                        properties: []
                    });
                }
                const group = result.find(s => s.id === field.group);
                if (group && group.properties) {
                    group.properties.push({
                        key: field.name
                    } as PropertyDetails);
                }
            }
        }
        return result;
    }

    public closeSidebar() {
        $cs.closeRightSidebar();
    }

    // #endregion Public Accessors (7)

    // #region Public Methods (7)

    public centerFeature() {
        if (this.feature && this.manager) {
            this.manager.zoomFeature(this.feature, 14);
        }
    }

    public contentLoaded() {
        // this.initMenu();
        // this.updateSections();
        // this.busManager.subscribe(this.manager.events, 'legends', (a, e) => {
        //     this.$forceUpdate();
        // });

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
            this.busManager.subscribe(this.manager.events, 'legends', () => {
                this.updateSections();
            });
        }
    }

    @Watch('filter')
    public filterChanged() {
        this.updateSections();
    }

    public initMenu() {
        // this.addMenuItem({
        //     id: 'open-layer',
        //     type: 'icon',
        //     icon: 'list',
        //     toolTip: 'OPEN LAYER',
        //     title: 'OPEN LAYER',
        //     action: () => {
        //         if (this.manager && this.layer) {
        //             this.manager.openLayer(this.layer);
        //         }
        //     }
        // } as IMenu);
    }

    public setLegend(property: PropertyDetails) {
        if (!property || !property.allowLegend) { return; }
        if (property.legends && property.legends.length > 0) {
            if (this.manager && this.layer) {
                this.layer.removeLegend(property, true);
            }
        } else {
            if (this.manager && this.layer) {
                this.layer.setLegend(property, true);
            }
        }
    }

    public updateFilter() {
        this.$forceUpdate();
    }

    public sectionChanged() {
        this.saveSectionsState();
    }

    public zoomIn() {
        if (!this.manager || !this.feature) { return; }
        this.manager.zoomFeature(this.feature);
        
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
        // localStorage.featureSectionsExpanded = JSON.stringify(this.featureSectionsExpanded);
    }

    /** get list of available section, with their properties */
    public updateSections() {

        if (!this.layer || !this.feature || !this.feature.properties || !this.layer._source) {
            return [];
        }

        // create default section
        const defaultSection = {
            id: 'default',
            title: $cs.Translate('PROPERTIES'),
            properties: []
        } as PropertySection;
        const result: PropertySection[] = [defaultSection];
        this.sectionsPanels = [];

        /** find feature type */
        const ft = this.layer._source.getFeatureType();

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

        /** lookup all properties */
        for (const key in this.feature.properties) {
            if (key[0] !== '_') {
                let pt: PropertyType | string = key;
                /** find property type */
                if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(key)) {
                    pt = ft.propertyMap[key];
                } else { }
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
                                if (this.sectionsPanels.indexOf(result.length - 1) === -1) {
                                    this.sectionsPanels.push(result.length - 1);
                                }
                            }
                        }
                    } else { }
                    section.properties!.push(prop);
                }
            }
        }
        Vue.set(this, 'sections', result);
    }

    private propertyFilter(prop: PropertyType, filter: string): boolean {
        if (!filter || filter.length === 0) { return true; }
        const lowerCaseFilter = filter.toLowerCase();
        if (prop._key && prop._key.toLowerCase().indexOf(lowerCaseFilter) >= 0) {
            return true;
        }
        if (
            prop.title &&
            prop.title.toLowerCase().indexOf(lowerCaseFilter) >= 0
        ) {
            return true;
        }
        return false;
    }

    // #endregion Private Methods (1)
}
