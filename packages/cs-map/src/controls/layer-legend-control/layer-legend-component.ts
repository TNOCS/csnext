import Component from 'vue-class-component';
import { IWidget, MessageBusHandle } from '@csnext/cs-core';

import './layer-legend-component.css';
import { Vue } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, FeatureType, LayerLegend } from '../..';

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
    public types?: { [key: string]: FeatureType } = {};
    public map?: mapboxgl.Map;
    public layers: IMapLayer[] = [];
    public activeLayer: IMapLayer | any = {};
    public activeLegend: LayerLegend | any = {};

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

    public beforeDestroy() {
        
    }

    
    private updateLegendList() {

        if (this.manager && this.manager.layers) {
            this.layers = this.manager.layers.filter(
                l => l.Visible && l._legends && l._legends.length > 0
            );
            if (this.layers.length > 0) {
                if (this.activeLayer === undefined || !this.activeLayer.hasOwnProperty('id')) {
                    Vue.set(this, 'activeLayer', this.layers[0]);
                }
                if (this.activeLayer._legends) {
                    Vue.set(this, 'activeLegend', this.activeLayer._legends[0]);
                }
            }
        }
    }
}
