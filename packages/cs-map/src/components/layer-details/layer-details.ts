import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-details.css';
import { Vue, Watch } from 'vue-property-decorator';
import { BaseLayer } from '../../layers/base-layer';
import { PropertyType } from '../../classes/feature-type';
import { MapLayers } from '../../classes/map-layers';
import { IMapLayer } from '../../classes/imap-layer';
import { LayerEditor } from '../layer-editor/layer-editor';
import { LayerServiceEditor } from '../layer-service-editor/layer-service-editor';
import { FeatureDetails } from '../feature-details/feature-details';
import simplebar from 'simplebar-vue';
import { Feature } from 'geojson';

export class section {
    public id?: string;
    public title?: string;
    public properties?: property[];
}

export class property {
    public key?: string;
    public value?: any;
    public type?: PropertyType;
}

@Component({
    name: 'feature-details',
    props: { widget: null },
    components: { simplebar },
    template: require('./layer-details.html')
} as any)
export class LayerDetails extends Vue {
    public widget!: IWidget;
    public sectionsPanels: boolean[] = [];
    public tabs = null;
    public filterProperties: string = '';
    public filterPropertiesEnabled = false;
    public filterItems = '';

    /** get active layer */
    public get layer(): BaseLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as BaseLayer;
        }
        return undefined;
    }

    @Watch('filterItems')
    private filterChanged() {
        this.$forceUpdate();
    }

    /** returns true if features is included filter */
    private filterFeature(f: Feature, s: string) : boolean {
        if (!this.layer) { return false; }
        return this.layer.parseTitle(f).toLowerCase().indexOf(s.toLowerCase())>=0;
    }

    public get filteredFeatures(): Feature[] {
        if (this.layer && this.layer._source && this.layer._source._geojson) {
            return this.layer._source._geojson.features.filter(f => {
                return this.filterFeature(f, this.filterItems);
            })
        }
        return [];
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

    /** get layer color */
    public get layerColor(): string {
        const layer = this.layer;
        if (layer && layer.color) {
            return layer.color;
        }
        return 'blue';
    }

    public get manager(): MapLayers | undefined {
        if (this.widget.data && this.widget.data.manager) {
            return this.widget.data.manager as MapLayers;
        }
    }

    public openFeature(feature: any) {
        this.$cs.OpenRightSidebarWidget({
            component: FeatureDetails,
            data: { layer: this.layer, feature: feature }
        });
    }

    public editLayer(layer: IMapLayer) {
        this.$cs.OpenRightSidebarWidget({
            component: LayerServiceEditor,
            data: { layer: layer }
        });
    }
}
