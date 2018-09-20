import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

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

    public get Layers() : MapLayers | undefined {
        if (this.widget.content) {
            return this.widget.content as MapLayers;
        }        
    }

    // public get Tree() : any {
    //     let tree: any[] = [];
    //     if (this.Layers && this.Layers.layers) {
    //         this.Layers.layers.forEach(l => {
    //             tree.push({ text: l.title, layer: l, children: [] });
    //         })
            
    //     }
    //     return tree;
    // }


    @Watch('widget.content')
    dataLoaded(n: MapLayers) {}
}
