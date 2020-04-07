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
    // #region Properties (4)

    public allFeatures?: mapboxgl.MapboxGeoJSONFeature[];
    public listFilter: string = '';
    public filterItems = '';
    public filteredFeatures: mapboxgl.MapboxGeoJSONFeature[] = [];

    // #endregion Properties (4)

    // #region Public Accessors (4)

    /** get active layer */
    public get layer(): BaseLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as BaseLayer;
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

    public get manager(): MapDatasource | undefined {
        if (this.widget.data && this.widget.data.manager) {
            return this.widget.data.manager as MapDatasource;
        }
    }

    /** get feature title */
    public get title(): string {
        const layer = this.layer;
        if (layer && layer.title) {
            return layer.title;
        } else {
            return '';
        }
    }

    // #endregion Public Accessors (4)

    // #region Public Methods (4)

    public contentLoaded() {
        this.updateFeatures();
    }

    @Watch('listFilter')
    public filterChanged(v: string) {
        this.updateFeatures();
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

    // #endregion Public Methods (4)

    // #region Private Methods (3)

    /** returns true if features is included filter */
    private filterFeature(f: mapboxgl.MapboxGeoJSONFeature, s: string): boolean {
        if (!this.layer) { return false; }
        if (!s || s.length === 0) { return true; }
        return this.layer.parseTitle(f).toLowerCase().indexOf(s.toLowerCase()) >= 0;
    }

    private getAllFeatures() {
        if (this.layer && this.layer._source && this.layer._source._data) {
            this.allFeatures = this.layer._source._data.features as mapboxgl.MapboxGeoJSONFeature[];
        }
    }

    private updateFeatures() {

        if (!this.allFeatures) {
            this.getAllFeatures();
        }
        this.$set(this, 'filteredFeatures', this.allFeatures!.filter(f => this.filterFeature(f, this.listFilter)));
    }

    // #endregion Private Methods (3)
}
