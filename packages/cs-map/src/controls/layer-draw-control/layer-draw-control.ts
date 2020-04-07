import Component from 'vue-class-component';
import { IWidget, MessageBusHandle, guidGenerator } from '@csnext/cs-core';

import './layer-draw-control.css';
import { Vue } from 'vue-property-decorator';
import { MapDatasource, IMapLayer, CsMap } from '../..';
import { Feature } from 'geojson';
import { FeatureType } from '@csnext/cs-data';

@Component({
    name: 'layer-draw-control',
    props: { widget: null, manager: null },
    template: require('./layer-draw-control.html')
} as any)
export class LayerDrawControl extends Vue {
    // #region Properties (8)

    public activeType: any;
    public busHandle?: MessageBusHandle;
    public layer?: IMapLayer = {} as IMapLayer;
    public manager!: MapDatasource;
    public map?: mapboxgl.Map;
    public mapDraw: any;
    public types?: { [key: string]: FeatureType } = {};
    public widget!: IWidget;

    // #endregion Properties (8)

    // #region Public Methods (3)

    public addIcon(type: string) {
        if (
            this.layer &&
            this.layer._source &&
            this.layer._source._meta &&
            this.types &&
            this.layer._source._meta.hasOwnProperty(type)
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

    public mounted() {
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
                    const source = this.manager.activeDrawLayer._source;
                    if (source && source._data) {
                        // set layer/feature ids
                        for (const feature of e.features) {
                            feature.properties = {};
                            feature.properties = {
                                ...this.activeType.properties
                            };

                            feature.id = feature.properties!._fId = guidGenerator();
                            feature.properties!._lId = this.manager.activeDrawLayer.id;
                        }
                        source._data.features = [
                            ...source._data.features,
                            ...e.features
                        ];

                        this.manager.updateLayerSource(
                            this.manager.activeDrawLayer,
                            source._data,
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
                () => {
                    // if (a === CsMap.DRAWLAYER_ACTIVATED) {
                    //     this.$forceUpdate();
                    // }
                    this.updateLayer();
                    // this.$forceUpdate();
                }
            );
        }
    }

    public updateLayer() {
        this.layer = this.manager.activeDrawLayer;
        if (this.layer && this.layer._source) {
            this.types = this.layer._source._meta;
        }
        this.$forceUpdate();
    }


    // #endregion Private Methods (1)
}
