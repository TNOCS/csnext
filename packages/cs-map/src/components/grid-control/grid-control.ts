import { GridControlComponent } from './grid-control-component';
import Vue from 'vue';
import { MapLayers, GridLayer, LayerSource } from '../..';
import { FeatureCollection } from 'geojson';
import { guidGenerator } from '@csnext/cs-core';

export class GridControl {
    public map?: mapboxgl.Map;
    public container?: HTMLDivElement;
    public layer?: GridLayer;
    public gridControl?: GridControlComponent;


    constructor(public manager: MapLayers) {

    }

    onAdd(map) {
        console.log('Adding grid control');
        this.map = map;
        this.container = document.createElement('div');
        this.container.id = 'layer-legend-' + this.manager.id;

        // this.container.innerHTML = '<my-checkbox></my-checkbox';
        // const control = Vue.extend(popupComponent);
        Vue.nextTick(() => {
            this.gridControl = new GridControlComponent();
            this.gridControl.manager = this.manager;
            this.gridControl.$mount('#' + this.container!.id);
            this.gridControl.init();
        });

        return this.container;
    }
    onRemove() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
            this.map = undefined;

            // remove layer
        }
    }
}