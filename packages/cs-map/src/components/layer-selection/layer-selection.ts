import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import './layer-selection.css';
import { Vue, Watch, Prop } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, ILayerAction } from '../../.';

import simplebar from 'simplebar-vue';
import { ILayerGroup } from './layer-group';
import { GeojsonPlusLayer } from '../../layers/geojson-plus-layer';
@Component({
    name: 'layer-selection',
    props: { widget: null },
    components: { simplebar },
    template: require('./layer-selection.html')
} as any)
export class LayerSelection extends Vue {
    public widget!: IWidget;
    public tree: any[] = [];
    public items = [];
    public filter : string | null = null;
    public tab = 'layers';
    public open = [];
    public groupsexpanded: number[] = [];
    public showMenu = false;    
    public Groups: { [id: string]: ILayerGroup } = {};
    public caseSensitive = false;
    public layerTree: any[] = [
    ]

    public mounted() {        
        this.updateTree();

        if (localStorage.layergroupsexpanded) {
            try {
                this.groupsexpanded = JSON.parse(
                    localStorage.layergroupsexpanded
                );
            } catch (e) {
                this.groupsexpanded = [];
            }
        } else {
            this.groupsexpanded = [];
        }
    }

    public toggleGroup(group: ILayerGroup) {
        if (
            group.layers &&
            group.layers.findIndex(l => l.enabled === true) !== -1
        ) {
            for (const layer of group.layers) {
                if (layer._manager) {
                    layer._manager.hideLayer(layer);
                }
            }
        } else {
            for (const layer of group.layers) {
                if (layer._manager) {
                    layer._manager.showLayer(layer);
                }
            }
        }
    }

    public updateTree() {

        let tree : any[] = [];
        console.log('update tree');

        if (this.MapManager && this.MapManager.layers) {
            for (const l of this.MapManager.layers) {
                if (l.title && !l.hideInLayerList) {                
                    // get layer tags
                    if (!l.tags || l.tags.length === 0) {
                        tree.push({name: l.title, id: l.id});
                    } else for (const tag of l.tags) {
                        // find tag tree item
                        let leaf = tree.find(l =>  l.name === tag);
                        if (!leaf) {
                            leaf = { name: tag, id: `tag-${tag}`, children: [] };
                            tree.push(leaf);
                        }
                        leaf.children.push({name: l.title, id: l.id});                            
                    }                
                }
            }   
            this.layerTree = tree;
            this.tree = this.MapManager.layers.filter(l=> l.enabled).map(r=>r.id);
            console.log(this.tree);
            this.$forceUpdate();         
        }

    }

    public activeUpdated() {
        if (!this.MapManager || !this.MapManager.layers) { return; }
        for (const layer of this.MapManager?.layers!) {
            if (layer.enabled && !this.tree.includes(layer.id)) {
                this.MapManager.hideLayer(layer);
            }
            if (!layer.enabled && this.tree.includes(layer.id)) {
                this.MapManager.showLayer(layer);
            }
            
        }
    }

    

    public toggleShowMore(layer: IMapLayer) {
        layer._showMore = !layer._showMore;
        this.$forceUpdate();
    }

    public setLayerOpacity(value: number, layer: IMapLayer) {
        if (this.MapManager && this.MapManager.MapControl && layer.id) {
            layer.setOpacity(value);
        }
    }

    public showLayerMenu(e: MouseEvent, layer: IMapLayer) {
        if (e.currentTarget && this.MapManager && this.MapManager.layers) {
            const targetId = e.currentTarget['id'];
            const targetLayer = this.MapManager.layers.find(
                l => l.id === targetId
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

    public layerMenu(layerId: string): ILayerAction[] {        
        const layer = this.MapManager!.layers!.find(l => l.id === layerId);
        if (!layer) return [];
        let results: ILayerAction[] = [];
        if (layer.getLayerActions) {
            results = [...results, ...layer.getLayerActions()];
        }
        if (layer._service && layer._service.getLayerActions) {
            results = [...results, ...layer._service.getLayerActions(layer)];
        }
        return results;
    }

    public toggleLayer(layer: IMapLayer) {
        if (!layer._manager) {
            return;
        }
        if (layer.enabled) {
            layer._manager.showLayer(layer);
        } else {
            layer._manager.hideLayer(layer);
        }
        console.log(layer.title, layer.enabled);
    }

    public async createLayer() {
        if (!this.MapManager) { return; }
        this.MapManager.addGeojsonLayer('newlayer');
    }

    private addLayerToGroup(
        res: { [id: string]: ILayerGroup },
        t: string,
        l: IMapLayer
    ) {
        if (res.hasOwnProperty(t)) {
            res[t].layers.push(l);
            this.groupsexpanded.push(this.groupsexpanded.length);
        } else {
            res[t] = { title: t, color: 'gray', layers: [l], state: 'none' };
        }
    }

    public get MapManager(): MapDatasource | undefined {
        if (this.widget.content) {
            return this.widget.content as MapDatasource;
        }
    }


    @Watch('groupsexpanded')
    private groupsChanged(v: boolean[]) {
        localStorage.layergroupsexpanded = JSON.stringify(v);
    }

    @Watch('filter')
    private filterChanged(search: string) {        
        this.updateTree();
    }

    @Watch('MapManager.layers')
    private layersChanged(d: any) {        
        this.updateTree();
    }

    @Watch('widget.content')
    private datasourceUpdated(n: MapDatasource) {
        if (this.MapManager && this.MapManager.events) {            
            this.updateTree();
            this.MapManager.events.subscribe('layer', (a: string, e: any) => {                
                this.updateTree();
            });
        }
        // this.updateTree();
    }
}