import Component from 'vue-class-component';

import './layer-details.css';
import { Watch } from 'vue-property-decorator';
import { BaseLayer, MapDatasource } from '../..';
import simplebar from 'simplebar-vue';
import { Feature } from 'geojson';
import { WidgetBase } from '@csnext/cs-client';

@Component({
    name: 'layer-details',
    components: { simplebar },
    template: require('./layer-details.html')
} as any)
export class LayerDetails extends WidgetBase {

    public filterItems = '';
    public filter: string = '';
    public allFeatures?: Feature[];


    @Watch('filter')
    filterChanged(v: string) {
        this.updateFeatures();
    }

    /** get active layer */
    public get layer(): BaseLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as BaseLayer;
        }
        return undefined;
    }



    /** returns true if features is included filter */
    private filterFeature(f: Feature, s: string): boolean {
        if (!this.layer) { return false; }
        if (!s || s.length === 0) { return true; }
        return this.layer.parseTitle(f).toLowerCase().indexOf(s.toLowerCase()) >= 0;
    }

    public filteredFeatures: Feature[] = [];

    /** get feature title */
    public get title(): string {
        const layer = this.layer;
        if (layer && layer.title) {
            return layer.title;
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
        if (this.widget.data && this.widget.data.manager) {
            return this.widget.data.manager as MapDatasource;
        }
    }

    public fitLayer() {
        if (this.manager && this.layer) {
            this.manager.zoomLayer(this.layer);
        }
    }

    public openFeature(feature: any) {
        if (this.manager && this.layer) {
            this.manager.openFeature(feature, this.layer);
        }
    }

    private getAllFeatures() {

        if (this.layer && this.layer._source && this.layer._source._geojson) {
            this.allFeatures = this.layer._source._geojson.features;
        }

    }

    private updateFeatures() {
        if (!this.allFeatures) {
            this.getAllFeatures();
        }
        this.$set(this, 'filteredFeatures', this.allFeatures!.filter(f => this.filterFeature(f, this.filter)));

    }

    public contentLoaded() {
        this.updateFeatures();
    }

}
