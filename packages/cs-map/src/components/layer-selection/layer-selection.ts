import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './layer-selection.css';
import { Vue, Watch, Prop } from 'vue-property-decorator';
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
    public filter: string = '';

    

    // public get groupsexpanded() : boolean[]

    @Watch('groupsexpanded')
    groupsChanged(v: boolean[]) {
        localStorage.layergroupsexpanded = JSON.stringify(v);
    }

    constructor() {
        super();
    }

    public mounted() {
        if (localStorage.layergroupsexpanded) {
            try {
                this.groupsexpanded = JSON.parse(localStorage.layergroupsexpanded);
                
            } catch (e) {
                this.groupsexpanded = [];
            }
        }
        else {
            this.groupsexpanded = [];
        }
    }

    public get Groups(): { [id: string]: ILayerGroup } {
        let res: { [id: string]: ILayerGroup } = {};
        if (this.MapManager && this.MapManager.layers) {
            this.MapManager.layers.forEach(l => {
                if (l.title) {
                    if (
                        this.filter.length === 0 ||
                        l.title
                            .toLowerCase()
                            .indexOf(this.filter.toLowerCase()) !== -1
                    ) {
                        if (!l.tags || l.tags.length === 0) {
                            l.tags = [' '];
                        }
                        l.tags.forEach(t => {
                            this.addLayerToGroup(res, t, l);
                        });
                    }
                }
            });
            
            while (this.groupsexpanded.length < Object.keys(res).length) {
                this.groupsexpanded.push(true);
            }
        }
        return res;
    }

    public toggleShowMore(layer: IMapLayer) {
        layer._showMore = !layer._showMore;
        this.$forceUpdate();
    }

    public setLayerOpacity(value: number, layer: IMapLayer) {
        if (this.MapManager && this.MapManager.MapControl && layer.id) {
            layer.setOpacity(value);
            // layer.opacity = value / 100.0;
            // this.MapLayers.MapControl.setPaintProperty(layer.id, 'line-opacity', value / 100.0);
            // if (layer.paint) {
            //     layer.paint['raster-opacity'] = value / 100.0;
            // }
            // this.MapLayers.MapControl.setPaintProperty(layer.id, 'raster-opacity', value / 100.0);
        }
        // console.log(layer.opacity);
    }

    public showLayerMenu(e: MouseEvent, layer: IMapLayer) {
        if (e.currentTarget && this.MapManager && this.MapManager.layers) {
            let targetId = e.currentTarget['id'];
            let targetLayer = this.MapManager.layers.find(
                l => l.id == targetId
            );
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

    public get MapManager(): MapLayers | undefined {
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
        if (this.MapManager && this.MapManager.events) {
            this.MapManager.events.subscribe('layer', (a: string, e: any) => {
                this.$forceUpdate();
            });
        }

        // this.updateTree();
    }
}
