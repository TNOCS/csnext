import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-editor.css';
import { Vue } from 'vue-property-decorator';
import { BaseLayer } from '../..';
import { CsForm } from '@csnext/cs-form';
import simplebar from 'simplebar-vue';

@Component({
    name: 'layer-editor',
    props: { widget: null, manager: null },
    components: { 'cs-form': CsForm, simplebar },
    template: require('./layer-editor.html')
} as any)
export class LayerEditor extends Vue {
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
        this.$cs.TriggerNotification({title: 'Updating layer'});
        console.log('layer saved');
        console.log(this.layer);
        if (this.layer && this.layer._service && this.layer._service.updateLayer) {
            this.layer.updateLayer();
            this.layer._service.updateLayer(this.layer);
        }
    }
}
