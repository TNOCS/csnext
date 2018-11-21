import Component from 'vue-class-component';
import { IWidget, MessageBusHandle, guidGenerator } from '@csnext/cs-core';

import './layer-editor.css';
import { Vue, Watch, Prop } from 'vue-property-decorator';
import { MapLayers, IMapLayer, CsMap, FeatureType } from '../../.';
import { Feature } from 'geojson';

@Component({
    name: 'layer-editor',
    props: { widget: null, manager: null },
    template: require('./layer-editor.html')
} as any)
export class LayerEditor extends Vue {
    public widget!: IWidget;
    public manager!: MapLayers;
    public busHandle?: MessageBusHandle;
    public layer!: IMapLayer | undefined;
    public mapDraw: any;
    public activeType: any;
    public types?: { [key: string]: FeatureType } = {};
    public map?: mapboxgl.Map;

    public addIcon(type: string) {
        if (
            this.layer &&
            this.layer.featureTypes &&
            this.types && 
            this.layer.featureTypes.hasOwnProperty(type)
        ) {
            this.activeType = this.types[type];
            this.mapDraw.changeMode(this.activeType.mode);
            this.manager.events.publish(
                CsMap.DRAWLAYER,
                CsMap.DRAWLAYER_START_DRAWING,
                this.activeType
            );
        }
    }

    public updateLayer() {
        this.layer = this.manager.activeDrawLayer;
        if (this.layer) {
            this.types = this.layer.featureTypes;
        }
        this.$forceUpdate();
    }

    public mounted() {
        console.log('Editor mounted');
        console.log(this.manager);
        this.map = this.manager.MapControl;
        this.mapDraw = this.manager.MapWidget!.mapDraw;
        if (this.map) {
            this.map.on(
                'draw.update',
                (e: { features: Feature[]; action: string }) => {
                    for (const feature of e.features) {
                        this.manager!.updateLayerFeature(
                            this.manager!.activeDrawLayer!,
                            feature,
                            true
                        );
                    }
                    // this.mapDraw.deleteAll();
                }
            );

            this.map.on('draw.delete', (e: GeoJSON.FeatureCollection) => {
                if (this.manager && this.manager.activeDrawLayer) {
                    for (const feature of e.features) {
                        if (typeof feature.id === 'string') {
                            this.manager.deleteLayerFeature(
                                this.manager.activeDrawLayer,
                                feature.id,
                                true
                            );
                        }
                    }

                    this.manager.events.publish(
                        'feature',
                        CsMap.FEATURE_DELETED,
                        e.features[0]
                    );

                    this.mapDraw.deleteAll();
                }
            });

            this.map.on('draw.create', (e: GeoJSON.FeatureCollection) => {
                if (this.manager && this.manager.activeDrawLayer) {
                    let source = this.manager.activeDrawLayer._source;
                    if (source && source._geojson) {
                        // set layer/feature ids
                        for (const feature of e.features) {
                            feature.properties = {};
                            feature.properties = {
                                ...this.activeType.properties
                            };

                            feature.id = feature.properties![
                                '_fId'
                            ] = guidGenerator();
                            feature.properties![
                                '_lId'
                            ] = this.manager.activeDrawLayer.id;
                        }
                        source._geojson.features = [
                            ...source._geojson.features,
                            ...e.features
                        ];

                        this.manager.updateLayerSource(
                            this.manager.activeDrawLayer,
                            source._geojson,
                            true
                        );

                        this.manager.events.publish(
                            'feature',
                            CsMap.FEATURE_CREATED,
                            { features: [e.features[0]] }
                        );
                    }
                    this.mapDraw.deleteAll();
                }
                // console.log(e.features);
            });
        }
        if (this.manager.events) {
            this.busHandle = this.manager.events.subscribe(
                CsMap.DRAWLAYER,
                (a: string, l: IMapLayer) => {
                    // if (a === CsMap.DRAWLAYER_ACTIVATED) {
                    //     this.$forceUpdate();
                    // }
                    this.updateLayer();
                    // this.$forceUpdate();
                }
            );
        }
    }
}
