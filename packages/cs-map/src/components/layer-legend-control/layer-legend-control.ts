import { LayerLegendComponent } from './layer-legend-component';
import Vue from 'vue';
import { MapDatasource } from '../..';

export class LayerLegendControl {
    public map?: mapboxgl.Map;
    public container?: HTMLDivElement;
    

    constructor(public manager: MapDatasource) {
        
    }

    onAdd(map) {        
        console.log('Adding layer-editor');
        this.map = map;
        this.container = document.createElement('div');
        this.container.id = 'layer-legend-' + this.manager.id;
        // this.container.innerHTML = '<my-checkbox></my-checkbox';
        // const control = Vue.extend(popupComponent);
        Vue.nextTick(() => {
            let editor = new LayerLegendComponent();
            editor.manager = this.manager;
            editor.$mount('#' + this.container!.id);
        });
        return this.container;
    }
    onRemove() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
            this.map = undefined;
        }
    }
}