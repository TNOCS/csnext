import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layers-widget-component.css';
import { Vue } from 'vue-property-decorator';
import { MapDatasource } from '../..';
import { IMapLayer } from '../../classes/imap-layer';

@Component({
    name: 'layers-widget-component',
    props: { widget: null, manager: null },
    template: require('./layers-widget-component.html')
} as any)
export class LayersWidgetComponent extends Vue {
    public widget!: IWidget;
    public manager!: MapDatasource;
    public map?: mapboxgl.Map;

    public get activeLayers(): IMapLayer[] | undefined {
        if (this.manager && this.manager.layers) {
            return this.manager.layers.filter(i => i.enabled && !i.hideInLayerList && i._source && i._source._loaded);
        }
    }

    public mounted() {
        this.map = this.manager.MapControl;

        // if (this.manager.events) {
        //     this.manager.events.subscribe(
        //         CsMap.DRAWLAYER,
        //         (a: string, l: IMapLayer) => {

        //         }
        //     );
        // }
    }
}
