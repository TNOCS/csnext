import Component from 'vue-class-component';
import './package-explorer.css';
import simplebar from 'simplebar-vue';
import Vue from 'vue';
import axios from 'axios';
import { DataResource, Insight, InsightView, DataSourceEvents, LayerLegend  } from '@csnext/cs-data';
import { LayerLegendItem } from '../layer-legend-item/layer-legend-item';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { FeaturePreview } from './../feature-preview/feature-preview';
import { Watch } from 'vue-property-decorator';
import { MessageBusManager } from '@csnext/cs-core';
import { LayerSelection, LayerSelectionOptions, SidebarKeys } from '../..';

@Component({
    name: 'package-explorer',
    components: { simplebar, LayerLegendItem, FeaturePreview },
    props: ['data'],
    template: require('./package-explorer.html')
} as any)
export class PackageExplorer extends Vue {
    public data!: StatsDatasource;
    public collapsed: boolean = true;
    public fullscreen: boolean = false;
    public tab: string = 'insights';
    public value: any[] = [];
    public showInsightDetails = false;
    public showLegendDetails = false;
    public showtimeline = false;
    public search: string = '';
    public searchSelection: any = null;
    public searchResult: any[] = [];
    public tableHeaders: any[] = [];
    public tableProperties: string[] = [];
    

    private busManager = new MessageBusManager();
    // public search(s: string): any[] | undefined {
    //     debugger;
    //     if (this.data && this.data.mainLayer && this.data.mainLayer._source) {
    //         return this.data.mainLayer._source?._data.features;
    //     }
    // }

    constructor() {
        super();
        this.busManager.start();        
    }

    public beforeDestroy() {
        this.busManager.stop();
    }

    public get layers() {
        if (this.data.dataPackage) {
            return this.data.dataPackage.resources.filter(r => r.format === 'geojson');
        }
    }

    public shareState() {
        this.data.storeState();
        $cs.copyToClipboard(window.location.href);
        $cs.triggerNotification({ title: $cs.Translate('SHARELINKCOPIED')});
    }

    public showTable() {
        $cs.closeRightSidebar();
        this.collapsed = false;
        this.tab = 'table';
    }

    @Watch('tab')
    @Watch('collapsed')
    public changedTab(v: string) {
        if (v !== 'table') {
            this.fullscreen = false;
        }

    }

    public get activeBookmarks(): mapboxgl.MapboxGeoJSONFeature[] {
        if (this.data.mainLayer && this.data.mainLayer.bookmarks) {
            return this.data.mainLayer.bookmarks;
        }
        return [];
    }

    public get insights(): Insight[] | undefined {
        if (this.data.dataPackage) {
            return this.data.dataPackage.insights;
        }
    }

    public get legends(): LayerLegend[] {
        return [];
    }

    public downloadGeojson() {
        if (this.data && this.data.mainLayer) {
            this.data.downloadFile(this.data.mainLayer);
        }
    }

    public async downloadCsv() {
        if (this.data && this.data.mainLayer) {
            this.data.downloadCsv(this.data.mainLayer);
        }
    }

    public toggleLayers() {
        alert('open layers');
        this.$cs.addRightSidebarWidget(
            {
                component: LayerSelection,
                options: {
                    searchEnabled: true
                } as LayerSelectionOptions,
                datasource: this.data.id
            },
            {},
            SidebarKeys.LAYERS_SELECTION
        );
    }

    public downloadPackage() {
        if (this.data && this.data.mainLayer) {
            this.data.downloadFile(this.data.mainLayer);
        }
    }

    public tableOpenFeature(f: any) {
        if (this.data && this.data.mainLayer) {
            this.data.selectFeature(f, this.data.mainLayer, true);
        }
    }

    public toggleTableSize() {
        this.fullscreen = !this.fullscreen;
        $cs.closeRightSidebar();
        this.updateTableHeaders();
    }

    @Watch('tableProperties')
    public updateTableHeaders() {
        if (this.data && this.data.mainLayer && this.data.mainLayer.style) {
            const headers: any[] = [
                {
                    text: 'Title',
                    align: 'left',
                    filterable: false,
                    value: 'properties.' + this.data.mainLayer.style.title
                }];
            if (this.fullscreen) {
                if (this.data.mainLayer._source && this.data.mainLayer._source._featureType && this.data.mainLayer._source._featureType.properties) {
                    if (this.tableProperties.length === 0) {
                        let p = 0;
                        for (const prop of this.data.mainLayer._source._featureType.properties) {
                        if (p < 10 && prop.type === 'number' && prop._key) {
                            this.tableProperties.push(prop._key);
                            p += 1;
                        }
                    }
                    }
                    for (const prop of this.tableProperties) {
                        if (this.data.mainLayer._source._featureType?.propertyMap?.hasOwnProperty(prop)) {
                            const p = this.data.mainLayer._source._featureType.propertyMap[prop];
                            headers.push({
                                text: p.title,
                                align: 'right',
                                value: 'properties.' + p._key
                            });
                        }
                    }
                }
            } else {
                if (this.data.mainLayer._legends) {
                    for (const legend of this.data.mainLayer._legends) {
                        if (legend.propertyInfo) {
                            headers.push({
                                text: legend.propertyInfo.title,
                                align: 'right',
                                value: 'properties.' + legend.property
                            });
                        }
                    }
                }
            }
            this.$set(this, 'tableHeaders', headers);
        }
    }

    @Watch('searchSelection')
    public searchSelectionChanged(value: any) {
        if (this.data && this.data.mainLayer && value) {
            this.data.selectFeature(value, this.data.mainLayer, true);
        }
    }

    @Watch('search')
    public doSearch(val: string) {
        if (this.data && this.data.mainLayer && this.data.mainLayer._source && this.data.mainLayer._source._data) {
            this.searchResult = this.data.mainLayer._source._data.features;
        }
    }

    public openInsights() {
        this.collapsed = false;
        this.tab = 'insights';
    }

    public openBookmarks() {
        this.collapsed = false;
        this.tab = 'bookmarks';
    }

    public activateInsight(insight: Insight) {
        this.data.activateInsight(insight);
        this.collapsed = true;
    }

    public activateInsightView(view: InsightView, insight: Insight) {
        this.data.activateInsightView(view, insight);
        this.collapsed = true;
    }

    public activateLayer(layer: DataResource) {
        if (this.data.activeResource && layer !== this.data.activeResource) {
            this.data.activateLayerResource(layer.name);
        }
    }

    @Watch('data')
    public dataChanged() {
        this.busManager.subscribe(this.data.events, DataSourceEvents.INSIGHT_VIEW, (a, e) => {
            this.updateTableHeaders();
            this.$forceUpdate();
        });
        this.busManager.subscribe(this.data.events, 'legends', (a, e) => {
            this.updateTableHeaders();
            this.$forceUpdate();
        });
        this.busManager.subscribe(this.data.events, 'bookmarks', (a, e) => {
            this.$forceUpdate();
        });
        this.busManager.subscribe(this.data.events, StatsDatasource.TIME_TOPIC, (action: string, date: number) => {
            if (action === StatsDatasource.FOCUS_TIME_CHANGED) {                    
                this.$forceUpdate();
            }
        });
        this.updateTableHeaders();
        this.$forceUpdate();
    }

    public resourceInfo(resourceName: string): DataResource | undefined {
        if (this.data.dataPackage && this.data.dataPackage.resources) {
            const re = this.data.dataPackage.resources.find(s => s.name === resourceName);
            return re;
        }
    }

    public insightResources(insight: Insight): DataResource[] {
        const result: DataResource[] = [];
        if (insight.views) {
            for (const view of insight.views) {
                if (view.resources && this.data.dataPackage) {
                    for (const resource of view.resources) {
                        const re = this.data.dataPackage.resources.find(s => s.name === resource);
                        if (re && re.path) {
                            if (result.findIndex(r => re && r && r.path === re.path) === -1) {
                                result.push(re);
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    public loadResource(resource: DataResource) {
        if (!resource.data) {
            this.data.loadResource(resource.name).then(() => {
                // alert('Loaded data');
            });
        } else {
            this.data.unloadResource(resource.name).then(() => {
                this.$forceUpdate();
            });
        }
    }

}
