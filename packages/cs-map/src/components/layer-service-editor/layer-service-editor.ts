import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-service-editor.css';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { Vue } from 'vue-property-decorator';
import { BaseLayer } from '../../.';

@Component({
    name: 'layer-service-editor',
    props: { widget: null, manager: null },
    components: { VuePerfectScrollbar },
    template: require('./layer-service-editor.html')
} as any)
export class LayerServiceEditor extends Vue {
    public widget!: IWidget;
    public tabs = null;
    
    /** get active layer */
    public get layer(): BaseLayer | undefined {
        if (this.widget.data && this.widget.data.layer) {
            return this.widget.data.layer as BaseLayer;
        }
        return undefined;
    }

    /** get layer color */
    public get layerColor(): string {
        const layer = this.layer;
        if (layer && layer.color) {
            return layer.color;
        }
        return 'blue';
    }

    public updateLayer() {
        if (this.layer && this.layer._service && this.layer._service.updateLayer) {
            this.layer._service.updateLayer(this.layer);
        }
    }
}
