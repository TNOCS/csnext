import Component from 'vue-class-component';
import { IWidget, MessageBusHandle } from '@csnext/cs-core';

import './layer-legend-component.css';
import { Vue } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, FeatureType, LayerLegend, LayerFilter } from '../..';
import '../slider-control';
import { FeatureTypes } from '../../classes/feature-type';

@Component({
    name: 'layer-legend-component',
    props: { widget: null, manager: null },
    template: require('./layer-legend-component.html')
} as any)
export class LayerLegendComponent extends Vue {
    public widget!: IWidget;
    public manager!: MapDatasource;
    public busHandle?: MessageBusHandle;
    public layer!: IMapLayer | undefined;
    public activeType: any;
    public types?: FeatureTypes = {};
    public map?: mapboxgl.Map;
    public layers: IMapLayer[] = [];
    public activeLayer: IMapLayer | any = {};
    public activeLegend: LayerLegend | any = {};
    public value2 = [30, 60];

    public selectLayer(layer: IMapLayer) {
        this.activeLayer = layer;
        this.updateLegendList();
    }

    public mounted() {
        this.map = this.manager.MapControl;

        this.manager.events.subscribe('layer', () => {
            this.updateLegendList();
        });

        this.updateLegendList();
    }

    public initFilter(layer: IMapLayer, legend: LayerLegend) {
        layer.initFilter(legend.property);
    }

    public resetFilter(layer: IMapLayer) {
        layer.setFilter([]);
    }

    public beforeDestroy() {

    }

    private getStopColor(stop: any[], legend: any) {
        return { 'background': stop[1], 'width': '20px', 'height': '20px' };
    }

    private updateFilterList() {
        if (this.manager && this.manager.layers) {
        }
    }

    private updateLegendList() {
        if (this.manager && this.manager.layers) {
            this.layers = this.manager.layers.filter(
                l => l.Visible && (l._legends && l._legends.length > 0) || (l._filters)
            );
            if (this.layers.length > 0) {
                if (this.activeLayer === undefined || !this.activeLayer.hasOwnProperty('id')) {
                    Vue.set(this, 'activeLayer', this.layers[0]);
                }
                if (this.activeLayer._legends || this.activeLayer._filters) {
                    Vue.set(this, 'activeLegend', this.activeLayer._legends[0]);
                }
            }

        }
    }

    private applyFilter(layer: IMapLayer, filter: LayerFilter) {
        // layer.updateFilters();
        layer.applyFilter(filter);
    }
}
