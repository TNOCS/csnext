import { LayerLegendComponent } from './layer-legend-component';
import Vue from 'vue';
import { MapDatasource } from '../..';

export class LayerLegendControl {
    public map?: mapboxgl.Map;
    public container?: HTMLDivElement;
    private editor?: LayerLegendComponent;

    constructor(public manager: MapDatasource) {

    }

    public onAdd(map: mapboxgl.Map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.id = 'layer-legend-' + this.manager.id;
        // this.container.innerHTML = '<my-checkbox></my-checkbox';
        // const control = Vue.extend(popupComponent);
        Vue.nextTick(() => {
            this.editor = new LayerLegendComponent();
            this.editor.manager = this.manager;
            this.editor.$mount('#' + this.container!.id);
        });
        setTimeout(() => {
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
                this.map = undefined;
            }
        }, 5000);

        return this.container;
    }

    public onRemove() {
        if (this.editor) {
            this.editor.$destroy();
            this.editor.$el.remove();
        }

        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
            this.map = undefined;
        }

    }
}
