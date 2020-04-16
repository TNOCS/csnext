import { LayersWidgetComponent } from './layers-widget-component';
import Vue from 'vue';
import { MapDatasource } from '../..';
import { IControl } from 'mapbox-gl';

export class LayersWidgetControl implements IControl {
    private map?: mapboxgl.Map;
    private container?: HTMLDivElement;
    private layersWidget?: LayersWidgetComponent;

    constructor(public manager: MapDatasource) { }

    onAdd(map) {
        console.log('Adding layers-widget');
        this.map = map;
        this.container = document.createElement('div');
        this.container.id = 'layers-widget-' + this.manager.id;      
        Vue.nextTick(() => {
            this.layersWidget = new LayersWidgetComponent();
            this.layersWidget.manager = this.manager;
            this.layersWidget.$mount('#' + this.container!.id);
        });
        return this.container;
    }

    onRemove() {   
        if (this.layersWidget) {            
            this.layersWidget.$destroy();
            this.layersWidget.$el.remove();                    
        }

        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
            this.map = undefined;
        }
    }
}