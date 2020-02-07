import {
    IMapLayer,
    LayerStyle} from '../.';

import { DataResource, Insight, InsightView, DataSourceEvents } from '@csnext/cs-data';
import { MapDatasource } from './map-datasource';
import { GeojsonPlusLayer } from '../layers/geojson-plus-layer';
import axios from 'axios';

export class StatsDatasource extends MapDatasource {

    // #endregion Constructors (1)

    public id = 'stats-datasource';

    public activeInsight?: Insight;
    public activeInsightView?: InsightView;
    public mainLayer?: GeojsonPlusLayer;

    // #endregion Public Accessors (3)

    // #region Public Methods (28)

    public activateInsight(insight: Insight) {
        this.activeInsight = insight;
        if (insight.views && insight.views.length > 0) {
            this.activateInsightView(insight.views[0], insight);
        }
    }

    public disableInsight() {
        this.activeInsight = undefined;
        this.activeInsightView = undefined;
    }

    public downloadFile(layer: GeojsonPlusLayer) {
        if (layer._source && layer._source._data) {
            this.forceFileDownload(JSON.stringify(layer._source._data, undefined, 2), layer.title + '.json');
        }
    }

    public downloadSource(source: DataResource) {
        if (source.path) {
            axios.get(source.path.toString(), {
                responseType: 'arraybuffer'
            })
            .then(response => {
                this.forceFileDownload(response.data, source.name + '.' + source.format);
            })
            .catch(() => console.log('error occured'))
        }
    }

    public async activateInsightView(view: InsightView, insight: Insight) {
        const activeResources = this.activeInsightView?.resources;
        if (!view.title) { view.title = insight.title; }
        if (!view.description) { view.description = insight.description; }
        this.activeInsightView = view;
        let layer: DataResource | undefined;
        // unload existing resources
        if (view.resources && JSON.stringify(activeResources) !== JSON.stringify(view.resources)) {
            for (const key in this.resources) {
                if (!view.resources.includes(key) && this.resources.hasOwnProperty(key)) {
                    const resource = this.resources[key];
                    if (resource.format === 'geojson') {
                        this.removeLayer(resource.name);
                    }
                    this.unloadResource(key);
                }
            }
            for (const resourceName of view.resources) {
                const resource = await this.loadResource(resourceName);
                if (resource && resource.format === 'geojson') {
                    layer = await this.activateLayerResource(resource.name);
                }
            }

            if (layer && this.mainLayer && this.mainLayer._source && this.mainLayer._source._meta) {
                for (const resourceName in this.resources) {
                    if (resourceName !== layer.name && this.resources.hasOwnProperty(resourceName)) {
                        const resource = this.resources[resourceName];
                        await this.mergeResources(layer, resource);
                    }
                }
                this.mainLayer._source.updateFeatureTypePropertyMap(this.mainLayer._source._meta.default);
            }
        }
        if (this.mainLayer && this.MapWidget) {
            this.mainLayer.filter = undefined;
            if (view.map) {
                this.MapWidget.options = {...this.MapWidget.options, ...view.map};
            }
            if (view.style) {
                await this.mainLayer.setStyle(view.style as LayerStyle);
                // this.mainLayer.setLegend(view.defaultLegendProperty, true);
            }
            // if (view.selection) {
            //     this.mainLayer
            // }
        }
        this.events.publish(DataSourceEvents.INSIGHT_VIEW, DataSourceEvents.ACTIVATED, view);
    }

    public activateLayerResource(resourceName: string): Promise<DataResource> {
        return new Promise(async (resolve, reject) => {
            $cs.closeRightSidebar();
            if (this.activeResource) {
                this.removeLayer(this.activeResource.name);
            }
            await this.activateResource(resourceName);
            if (!this.activeResource || !this.activeResource.data) { reject(); return; }
            const style = this.activeResource.style;
            this.mainLayer = await this.addGeojsonLayerFromSource(
                resourceName,
                this.activeResource.data, style
            );
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
