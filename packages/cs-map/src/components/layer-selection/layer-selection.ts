import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-selection.css';
import { Vue, Watch } from 'vue-property-decorator';
import { MapLayers, MapLayer } from '../../.';

export interface ILayerGroup {
    title: string;
    color: string;
    layers: MapLayer[];
}

@Component({
    name: 'layer-selection',
    props: { widget: null },
    template: require('./layer-selection.html')
} as any)
export class LayerSelection extends Vue {
    public widget!: IWidget;

    public get Groups(): { [id: string]: ILayerGroup } {
        let res: { [id: string]: ILayerGroup } = {};
        if (this.Layers && this.Layers.layers) {
            this.Layers.layers.forEach(l => {
                if (!l.tags || l.tags.length === 0) {
                    l.tags = [' '];
                }
                l.tags.forEach(t => {
                    this.addLayerToGroup(res, t, l);
                });
            });
        }
        console.log(res);
        return res;
    }

    private addLayerToGroup(
        res: { [id: string]: ILayerGroup },
        t: string,
        l: MapLayer
    ) {
        if (res.hasOwnProperty(t)) {
            res[t].layers.push(l);
        } else {
            res[t] = { title: t, color: 'gray', layers: [l] };
        }
    }

    public get Layers(): MapLayers | undefined {
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
