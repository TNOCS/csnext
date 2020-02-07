import Component from 'vue-class-component';
import './package-explorer.css';
import simplebar from 'simplebar-vue';
import Vue from 'vue';
import axios from 'axios';
import { DataResource, Insight, InsightView, DataSourceEvents } from '@csnext/cs-data';
import { LayerLegend } from '../../classes/layer-legend';
import { LayerLegendItem } from '../layer-legend-item/layer-legend-item';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';
import { MessageBusManager } from '@csnext/cs-core';

@Component({
    name: 'package-explorer',
    components: { simplebar, LayerLegendItem },
    props: ['data'],
    template: require('./package-explorer.html')
} as any)
export class PackageExplorer extends Vue {
    public data!: StatsDatasource;
    public collapsed: boolean = true;
    public tab: string = 'insights';
    public value: any[] = [];
    public showInsightDetails = false;
    public showLegendDetails = false;
    public search: string = '';
    public searchSelection: any = null;
    public searchResult: any[] = [];
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

    public downloadFile() {
        if (this.data && this.data.mainLayer) {
            this.data.downloadFile(this.data.mainLayer);
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
            this.$forceUpdate();
        });
        this.busManager.subscribe(this.data.events, 'legends', (a, e) => {
            this.$forceUpdate();
        });
        this.busManager.subscribe(this.data.events, 'bookmarks', (a, e) => {
            this.$forceUpdate();
        });
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
