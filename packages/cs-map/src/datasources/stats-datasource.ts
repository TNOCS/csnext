import {
    IMapLayer,
    LayerStyle
} from '../.';

import { DataResource, Insight, InsightView, DataSourceEvents, DataSource, DataSet } from '@csnext/cs-data';
import { MapDatasource, SidebarKeys } from './map-datasource';
import { GeojsonPlusLayer } from '../layers/geojson-plus-layer';
import axios from 'axios';
import Vue from 'vue';
import { SourceDetails } from '../components/source-details/source-details';

export class StatsDatasource extends MapDatasource {

    public static TIME_TOPIC = "TIME_TOPIC";
    public static FOCUS_TIME_CHANGED = "FOCUS_TIME_CHANGED";

    public id = 'stats-datasource';

    public activeInsight?: Insight;
    public activeInsightView?: InsightView;
    public mainLayer?: GeojsonPlusLayer;

    public async activateInsight(insight: string | Insight, view = 0) {
        if (typeof insight === 'string') {
            if (this.dataPackage && this.dataPackage.insights) {
                const i = this.dataPackage.insights.find(s => s.name === insight);
                if (i) { await this.activateInsight(i, view); }
            }
        } else {
            this.activeInsight = insight;
            if (insight.views && insight.views.length > view) {
                await this.activateInsightView(insight.views[view], insight);
            }
        }
    }

    public disableInsight() {
        this.activeInsight = undefined;
        this.activeInsightView = undefined;
    }

    public async downloadCsv(layer: GeojsonPlusLayer) {
        if (layer._source) {
            const csv = await layer._source.exportToCsv();
            this.forceFileDownload(csv, layer.title + '.csv');
        }
    }

    public downloadFile(layer: GeojsonPlusLayer) {
        if (layer._source && layer._source._data) {
            this.forceFileDownload(JSON.stringify(layer._source._data, undefined, 2), layer.title + '.json');
        }
    }

    /** Go to previous date available */
    public previousDate() {
        if (!this.focusDate) { return; }
        const focusIndex = this.dates.indexOf(this.focusDate);
        if (focusIndex > 0) {
            this.setFocusDate(this.dates[focusIndex - 1]);
        }
    }

    /** Go to next date available */
    public nextDate() {
        if (!this.focusDate) { return; }
        const focusIndex = this.dates.indexOf(this.focusDate);
        if (focusIndex < this.dates.length) {
            this.setFocusDate(this.dates[focusIndex + 1]);
        }
    }

    /** Set focus time to a specific date, calculate properties and refresh layer  */
    public setFocusDate(date: number) {
        Vue.set(this, 'focusDate', date);
        this.updateDateProperties(date);
        if (this.mainLayer) {
            this.refreshLayer(this.mainLayer);
        }
        this.events.publish(StatsDatasource.TIME_TOPIC, StatsDatasource.FOCUS_TIME_CHANGED, date);
        // this.focusDate = date;
    }

    /** update all feature properties for a specific date (if available)  */
    public updateDateProperties(date: number) {
        if (this.mainLayer && this.mainLayer._source && this.mainLayer._source._data && this.mainLayer._source) {
            for (const feature of this.mainLayer._source._data.features) {
                if (feature.properties && feature.properties.hasOwnProperty('_when')) {
                    for (const key in feature.properties._when) {
                        if (feature.properties._when.hasOwnProperty(key)) {
                            const property = feature.properties._when[key] as { [d: number]: any };
                            if (property.hasOwnProperty(date)) {
                                feature.properties[key] = property[date];
                            }
                        }
                    }
                }

            }
        }

    }

    public openSourceDetails(source: DataResource | string) {
        if (typeof source === 'string' && this.dataPackage && this.dataPackage.resources) {
            const dr = this.dataPackage.resources.find(r => r.name === source);
            if (dr) return this.openSourceDetails(dr);
        }
        $cs.addSidebar(SidebarKeys.SOURCE_DETAILS, { icon: 'folder_open' });
        $cs.openRightSidebarWidget(
            {
                id: 'source-details',
                component: SourceDetails,
                options: {
                    showToolbar: false,
                    toolbarOptions: {
                        backgroundColor: 'primary',
                        dense: true
                    },
                    hideSidebarButton: false
                },
                data: {
                    source,
                    manager: this
                }
            },
            { open: true },
            SidebarKeys.SOURCE_DETAILS,
            true
        );
    }

    public downloadSource(source: DataResource) {
        if (source.path) {
            axios.get(source.path.toString(), {
                responseType: 'arraybuffer'
            })
                .then(response => {
                    this.forceFileDownload(response.data, source.name + '.' + source.format);
                })
                .catch((e) => console.log('error occured'));
        }
    }

    public storeState() {
        if (!$cs.router) { return; }
        const res = new URLSearchParams();
        if (this.activeInsight && this.activeInsight.name) {
            res.append('insight', this.activeInsight.name);

            if (this.activeInsightView && this.activeInsightView.pos) {
                res.append('view', this.activeInsightView.pos.toString());
            }
        } else {
            if (this.mainLayer) {
                res.append('layer', this.mainLayer.id);
                for (const resource of Object.keys(this.resources)) {
                    res.append('resources', resource);
                }
                if (this.mainLayer._legends) {
                    for (const legend of this.mainLayer._legends) {
                        res.append('legends', legend.property);
                    }
                }
            }
        }

        if (this.mainLayer) {
            if (this.mainLayer.bookmarks && this.mainLayer.bookmarks.length > 0) {
                for (const bookmark of this.mainLayer.bookmarks) {
                    if (bookmark.id) {
                        res.append('bookmarks', bookmark.id.toString());
                    }
                }
            }

            if (this.mainLayer.selectedFeature && this.mainLayer.selectedFeature.id) {
                res.append('feature', this.mainLayer.selectedFeature.id.toString());
            }
        }

        const combined = { ...$cs.router.currentRoute.query, ...{ q: res.toString() } };
        $cs.router.replace({ path: $cs.router.currentRoute.params[0], query: combined }).catch(() => {
            // console.log(err);
        }); // this.$route.query}
    }

    public async restoreState() {
        if (!$cs.router) { return; }
        await this.createLayers();
        const route = $cs.router.currentRoute;
        if (route && route.query.hasOwnProperty('q')) {
            const res = new URLSearchParams(route.query.q.toString());
            if (res.has('insight')) {
                let viewPos = 0;
                // tslint:disable-next-line: radix
                if (res.has('view')) { viewPos = parseInt(res.get('view')!) - 1; }
                await this.activateInsight(res.get('insight')!, viewPos);
            } else if (res.has('resources')) {
                const resources: string[] = res.getAll('resources');
                if (resources && resources.length > 0) {
                    await this.activateResources(resources);
                    if (this.mainLayer && res.has('legends')) {
                        const legends = res.getAll('legends');
                        if (legends && legends.length > 0) {
                            this.mainLayer.setLegend(legends[0]);
                        }
                    }
                }
            }
            if (this.mainLayer) {
                if (res.has('feature')) {
                    // tslint:disable-next-line: radix
                    this.selectFeature(parseInt(res.get('feature')!), this.mainLayer, true);
                }
                if (this.mainLayer._source && res.has('bookmarks')) {
                    for (const bookmark of res.getAll('bookmarks')) {
                        const feature = this.mainLayer.getFeature(bookmark);
                        if (feature) {
                            this.mainLayer.addBookmark(feature as mapboxgl.MapboxGeoJSONFeature);
                        }
                    }
                }
            }
        } else if (this.dataPackage) {
            const i = this.dataPackage.insights![0];
            if (i !== undefined) {
                await this.activateInsight(i);
            }
        }

    }

    public async activateInsightView(view: InsightView, insight: Insight) {
        // tslint:disable-next-line:whitespace
        // const activeResources = this.activeInsightView?.resources;
        if (!view.title) { view.title = insight.title; }
        if (!view.description) { view.description = insight.description; }
        this.activeInsightView = view;
        // unload existing resources
        const resources = view.resources;
        if (resources) {
            await this.activateResources(resources);
            if (this.mainLayer && this.MapWidget) {
                this.mainLayer.filter = undefined;
                if (view.map) {
                    this.MapWidget.options = { ...this.MapWidget.options, ...view.map };
                    // this.MapControl.triggerRepaint();                    
                    const options = this.MapWidget.options.mbOptions;
                    if (options && this.MapControl) {
                        if (options.center) { this.MapControl.setCenter(options.center); }
                        if (options.zoom) { this.MapControl.setZoom(options.zoom); }
                    }
                }
                if (view.style) {
                    await this.mainLayer.setStyle(view.style as LayerStyle);
                    // this.mainLayer.setLegend(view.defaultLegendProperty, true);
                }
                // if (view.selection) {
                //     this.mainLayer
                // }
            }
        }
        this.events.publish(DataSourceEvents.INSIGHT_VIEW, DataSourceEvents.ACTIVATED, view);
    }

    public async addResourceToInsightView(source: string) {
        if (this.activeInsight && this.activeInsightView && this.activeInsightView.resources) {
            if (!this.activeInsightView.resources.includes(source)) {
                this.activeInsightView.resources.push(source)
                await this.activateInsightView(this.activeInsightView, this.activeInsight);
            }
        };
    }

    public async createLayers() {
        if (!this.dataPackage || !this.layers) { return; }
        for (const resource of this.dataPackage.resources) {
            if (resource.format === 'geojson' && typeof resource.path === 'string') {
                console.log('activate ' + resource.name);
                if (!this.getLayer(resource.name)) {
                    let source = await this.createDataSourceFromResource(undefined, resource); // new DataSource({ type : 'FeatureCollection', features : [] });                    
                    let l = new GeojsonPlusLayer({
                        externalUrl: resource.path,
                        title: resource.name,
                        id: resource.name,
                        style: resource.style,
                        source: source
                    });                    
                    await l.initLayer(this);
                    this.layers.push(l);
                    

                    // const source = await this.activateLayerResource(resource.name);
                    // await this.addGeojsonLayer(resource.name);
                }
            }
        }

    }

    public async activateResources(resources: string[]) {
        const activeResources = Object.keys(this.resources);
        let layer: DataResource | undefined;
        if (resources && JSON.stringify(activeResources) !== JSON.stringify(resources)) {
            // for (const key in this.resources) {
            //     if (!resources.includes(key) && this.resources.hasOwnProperty(key)) {
            //         const resource = this.resources[key];                    
            //     }
            // }
            for (const resourceName of resources) {
                const resource = await this.loadResource(resourceName);
                
                if (resource && resource.format === 'geojson') {
                    layer = await this.activateLayerResource(resource.name);                    
                }
            }            
            if (layer?.data?._meta && this.mainLayer && this.mainLayer._source && this.mainLayer._source._meta) {
                for (const resourceName in this.resources) {
                    if (resourceName !== layer.name && this.resources.hasOwnProperty(resourceName)) {
                        const resource = this.resources[resourceName];                          
                        await this.mergeResources(layer, resource);                                                
                    }
                }
                this.mainLayer._source._meta = layer.data._meta;
                this.mainLayer._source.updateFeatureTypePropertyMap(this.mainLayer._source._meta.default);
            }
        }
    }

    public activateLayerResource(resourceName: string): Promise<DataResource> {
        return new Promise(async (resolve, reject) => {
            $cs.closeRightSidebar();
            // if (this.activeResource) {
            //     this.removeLayer(this.activeResource.name);
            // }
            await this.activateResource(resourceName);
            if (!this.activeResource || !this.activeResource.data) { reject(); return; }
            // find layer
            this.mainLayer = this.getLayer(resourceName) as GeojsonPlusLayer;
            this.mainLayer.updateGeojson(this.activeResource.data._geojson as unknown as DataSet);
            this.showLayer(this.mainLayer)
            
            // this.mainLayer = await this.addGeojsonLayerFromSource(
            //     resourceName,
            //     this.activeResource.data, this.activeResource.style, { id: resourceName } as IMapLayer
            // );
            resolve(this.activeResource);
        });
    }

    private forceFileDownload(data: any, filename: string) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }

    // #endregion Private Methods (4)
}
