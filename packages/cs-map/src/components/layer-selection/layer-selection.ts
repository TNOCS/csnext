import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import './layer-selection.css';
import { Vue, Watch, Prop } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, ILayerAction } from '../../.';

import simplebar from 'simplebar-vue';
import { ILayerGroup } from './layer-group';
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
    public open = [];
    public groupsexpanded: number[] = [];
    public showMenu = false;
    public filter: string = '';
    public Groups: { [id: string]: ILayerGroup } = {};

    public mounted() {
        this.updateGroups();
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
            group.layers.findIndex(l => l.Visible === true) !== -1
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

    public updateGroups() {
        let res: { [id: string]: ILayerGroup } = {};
        this.groupsexpanded = [];

        if (this.MapManager && this.MapManager.layers) {
            for (const l of this.MapManager.layers) {
                if (l.title && !l.hideInLayerList) {
                    if (
                        this.filter.length === 0 ||
                        l.title
                            .toLowerCase()
                            .indexOf(this.filter.toLowerCase()) !== -1
                    ) {
                        if (!l.tags || l.tags.length === 0) {
                            l.tags = [' '];
                        }
                        for (const t of l.tags) {
                            this.addLayerToGroup(res, t, l);
                        }
                    }
                }
            }
            let c = 0;
            while (this.groupsexpanded.length < Object.keys(res).length) {
                this.groupsexpanded.push(c);
                c += 1;
            }

            for (const group in res) {
                if (res.hasOwnProperty(group)) {
                    const element = res[group];
                    if (
                        element.layers &&
                        element.layers.findIndex(l => l.Visible === true) !== -1
                    ) {
                        element.state = 'some';
                    } else {
                        element.state = 'none';
                    }
                }
            }
        }
        this.Groups = res;
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

    public layerMenu(layer: IMapLayer): ILayerAction[] {
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
            this.groupsexpanded.push(this.groupsexpanded.length - 1);
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
        this.updateGroups();
    }

    @Watch('MapManager.layers')
    private layersChanged(d: any) {
        this.updateGroups();
    }

    @Watch('widget.content')
    private datasourceUpdated(n: MapDatasource) {
        if (this.MapManager && this.MapManager.events) {
            this.updateGroups();
            this.MapManager.events.subscribe('layer', (a: string, e: any) => {
                this.updateGroups();
            });
        }
        // this.updateTree();
    }

}
