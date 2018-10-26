import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-selection.css';
import { Vue, Watch } from 'vue-property-decorator';
import { MapLayers, IMapLayer } from '../../.';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export interface ILayerGroup {
    title: string;
    color: string;
    layers: IMapLayer[];
}

@Component({
    name: 'layer-selection',
    props: { widget: null },
    components: { VuePerfectScrollbar },
    template: require('./layer-selection.html')
} as any)
export class LayerSelection extends Vue {
    public widget!: IWidget;
    public tree: any[] = [];
    public items = [];
    public open = [];
    public groupsexpanded: boolean[] = [];
    public showMenu = false;

    constructor() {
        super();
    }

    public get Groups(): { [id: string]: ILayerGroup } {
        let res: { [id: string]: ILayerGroup } = {};
        if (this.MapLayers && this.MapLayers.layers) {
            this.MapLayers.layers.forEach(l => {
                if (!l.tags || l.tags.length === 0) {
                    l.tags = [' '];
                }
                l.tags.forEach(t => {
                    this.addLayerToGroup(res, t, l);
                });
            });
        }
        return res;
    }

    public showLayerMenu(e: MouseEvent, layer: IMapLayer) {
        if (e.currentTarget && this.MapLayers && this.MapLayers.layers) {
            let targetId = e.currentTarget['id'];
            let targetLayer = this.MapLayers.layers.find(l => l.id == targetId);
            if (targetLayer) {
                if (e) {
                    e.preventDefault();
                }
                targetLayer._showMenu = true;
                this.$forceUpdate();
                // targetLayer._showMenu = false;
                // this.x = e.clientX
                // this.y = e.clientY
                this.$nextTick(() => {
                    if (targetLayer) {
                        targetLayer._showMenu = true;
                    }
                });
            }
        }
    }

    public layerMenu(layer: IMapLayer): any[] {
        return layer.getLayerActions();
    }

    public toggleLayer(layer: IMapLayer) {
        if (!layer._manager) {
            return;
        }
        if (layer.Visible) {
            layer._manager.showLayer(layer);
        } else {
            layer._manager.hideLayer(layer);
        }
        console.log(layer.title, layer.Visible);
    }

    private addLayerToGroup(
        res: { [id: string]: ILayerGroup },
        t: string,
        l: IMapLayer
    ) {
        if (res.hasOwnProperty(t)) {
            res[t].layers.push(l);
            this.groupsexpanded.push(true);
        } else {
            res[t] = { title: t, color: 'gray', layers: [l] };
        }
    }

    public get MapLayers(): MapLayers | undefined {
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

    // private updateTree() {
    //     console.log('Update tree');
    //     this.tree = [];
    //     if (this.MapLayers && this.MapLayers.layers) {
    //         for (const l of this.MapLayers.layers) {
    //             console.log(l);
    //             if (!l.tags || l.tags.length === 0) {
    //                 l.tags = [' '];
    //             }
    //             l.tags.forEach(t => {
    //                 let tagchild = this.tree.find(i => i.name === t);
    //                 if (!tagchild) {
    //                     tagchild = { name: t, children: [] };
    //                     this.tree.push(tagchild);
    //                 }
    //                 tagchild.children.push({ name: l.title, children: [] });
    //             });
    //         }
    //     }
    // }

    @Watch('widget')
    dataLoaded(n: MapLayers) {
        console.log('layers updated');
        console.log(this.widget);
        if (this.MapLayers && this.MapLayers.events) {
            this.MapLayers.events.subscribe('layer', (a: string, e: any) => {
                this.$forceUpdate();
            });
        }

        // this.updateTree();
    }
}
