import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
// import mapboxgl from 'mapbox-gl';

import './layer-selection.css';
import { Vue, Watch } from 'vue-property-decorator';
import { MapLayers } from '../../.';

@Component({
    name: 'layer-selection',
    props: { widget: null },
    template: require('./layer-selection.html')
} as any)
export class LayerSelection extends Vue {
    public widget!: IWidget;

    created() {}

    @Watch('widget.content')
    dataLoaded(n: MapLayers) {}
}
