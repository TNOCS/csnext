import { LayerDrawControl } from './layer-draw-control';
import Vue from 'vue';
import { MapDatasource } from '../..';
import { IControl } from 'mapbox-gl';

export class LayerDraw implements IControl {
    public map?: mapboxgl.Map;
    public container?: HTMLDivElement;

    constructor(public manager: MapDatasource) { }

    onAdd(map) {
        console.log('Adding layer-editor');
        this.map = map;
        this.container = document.createElement('div');
        this.container.id = 'layer-editor-' + this.manager.id;
        // this.container.innerHTML = '<my-checkbox></my-checkbox';
        // const control = Vue.extend(popupComponent);
        Vue.nextTick(() => {
            let editor = new LayerDrawControl();
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