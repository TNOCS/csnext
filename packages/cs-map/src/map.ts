import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, IDatasource } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';
import mapboxgl, { GeoJSONSource, FlyToOptions } from 'mapbox-gl';
import { MapOptions } from './map-options';
import { LayerSource, LayerSources, MapLayer } from './';
import { FeatureCollection, Feature } from 'geojson';
import { MapLayers } from '.';

export interface FeatureEventDetails {
    context: any;
    features: Feature[];
}

@Component({
    template: require('./map.html')
})
export class Map extends Vue {
    /** access the original widget from configuration */

    public static FEATURE_SELECT = 'select';
    public static FEATURE_MOUSE_ENTER = 'enter';
    public static FEATURE_MOUSE_LEAVE = 'enter';

    @Prop()
    public widget!: IWidget;
    public map!: mapboxgl.Map;

    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });

    public get Layers(): MapLayers | undefined {
        if (this.widget) {
            if (this.widget.content) {
                return this.widget.content as MapLayers;
            } else if (this.widget.data) {
                return this.widget.data as MapLayers;
            }
        }
        return undefined;
    }

    public get options(): MapOptions {
        if (this.widget && this.widget.options) {
            return this.widget.options as MapOptions;
        }
        return new MapOptions();
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public addImage(id: string, url: string) {
        if (!this.map.hasImage(id)) {
            this.map.loadImage(url, (error, image) => {
                if (!this.map.hasImage(id)) {
                    if (error) throw error;
                    this.map.addImage(id, image);
                    console.log('Image added (' + id + ')');
                }
            });
        }
    }

    public initMapLayers() {
        if (this.Layers && this.map.loaded) {
            if (this.Layers.MapWidget === undefined) {
                this.Layers.MapWidget = this;
            }
            if (this.Layers._sources && this.Layers._sources.images) {
                for (var id in this.Layers._sources.images) {
                    this.addImage(id, this.Layers._sources.images[id]);
                }
            }

            this.Layers.MapWidget = this;

            this.Layers.events.subscribe(
                'layer',
                (action: string, layer: MapLayer) => {
                    switch (action) {
                        case 'enabled':
                            if (
                                layer.id &&
                                layer._source &&
                                layer._source.id &&
                                layer._source._geojson
                            ) {
                                this.addSource(layer._source);

                                // remove layer if it already exists
                                if (this.map.getLayer(layer.id) !== undefined) {
                                    this.map.removeLayer(layer.id);
                                }

                                this.map.addLayer({
                                    id: layer.id,
                                    type: layer.type,
                                    source: layer._source.id,
                                    layout: layer.layout
                                });

                                this.map.on('click', layer.id, e => {
                                    if (layer.events) {
                                        layer.events.publish(
                                            'feature',
                                            Map.FEATURE_SELECT,
                                            {
                                                features: e.features,
                                                context: e
                                            } as FeatureEventDetails
                                        );
                                    }
                                });
                                this.map.on('mousemove', layer.id, e => {
                                    if (layer.popupContent) {
                                        this.popup
                                            .setLngLat(e.lngLat)
                                            .setHTML('<h1>test</h1>')
                                            .addTo(this.map);
                                    }
                                });
                                this.map.on('mouseenter', layer.id, e => {
                                    if (layer.events) {
                                        layer.events.publish(
                                            'feature',
                                            Map.FEATURE_MOUSE_ENTER,
                                            {
                                                features: e.features,
                                                context: e
                                            }
                                        );
                                    }
                                });

                                this.map.on('mouseleave', layer.id, e => {
                                    if (layer.popupContent) this.popup.remove();
                                    if (layer.events) {
                                        layer.events.publish(
                                            'feature',
                                            Map.FEATURE_MOUSE_LEAVE,
                                            { features: e.features, context: e }
                                        );
                                    }
                                });
                            }
                            break;
                        case 'disabled': {
                            if (
                                layer.id &&
                                this.map.getLayer(layer.id) !== undefined
                            ) {
                                this.map.removeLayer(layer.id);
                            }
                        }
                        case 'remove': {
                            if (
                                layer.id &&
                                this.map.getLayer(layer.id) !== undefined
                            ) {
                                this.map.removeLayer(layer.id);
                            }
                        }
                    }
                }
            );
        }
    }

    @Watch('widget.content')
    dataLoaded(value: MapLayers) {
        this.initMapLayers();
    }

    mounted() {
        this.initMapLayers();

        Vue.nextTick(() => {
            if (this.options.token) {
                mapboxgl.accessToken = this.options.token;
            }

            if (!this.options.mbOptions) this.options.mbOptions = {};
            this.options.mbOptions = {
                ...{
                    container: 'mapbox-' + this.widget.id,
                    style: 'mapbox://styles/mapbox/basic-v9',
                    center: [5.753699, 53.450862],
                    zoom: 10
                },
                ...this.options.mbOptions
            };

            this.map = new mapboxgl.Map(this.options.mbOptions);

            var nav = new mapboxgl.NavigationControl();
            this.map.addControl(nav, 'top-left');

            if (this.widget.events) {
                this.widget.events.subscribe(
                    'resize',
                    (a: string, data: any) => {
                        this.map.resize();
                    }
                );
            }

            // this.map.addLayer('ameland');

            this.map.on('load', e => {
                if (this.widget.events)
                    this.widget.events.publish('map', 'loaded', e);
                if (this.options.activeLayers) {
                    this.options.activeLayers.forEach(id => {
                        if (
                            this.Layers &&
                            this.Layers.layers &&
                            this.Layers.layers.hasOwnProperty(id)
                        ) {
                            let layer = this.Layers.layers[id];
                            if (layer.id === undefined) {
                                layer.id = id;
                            }
                            this.initLayer(layer);
                        }
                    });
                }
            });
        });
    }

    private addSource(source: LayerSource, refresh = false) {
        if (source._geojson && source.id) {
            let original = this.map.getSource(source.id);
            if (original !== undefined) {
                if (original.type === 'geojson') {
                    original.setData(source._geojson);
                }
            } else {
                // add source
                this.map.addSource(source.id, {
                    type: 'geojson',
                    data: source._geojson
                });
            }
        }
    }

    private addLayerToMap(layer: LayerSource) {
        if (layer.id) {
            this.map.addLayer({
                id: layer.id,
                type: 'fill',
                source: layer.id
            });
        }
    }

    initLayer(layer: LayerSource): any {
        // load datasource
        if (layer.id && layer._geojson) {
            if (!this.map.isSourceLoaded(layer.id)) {
                this.addSource(layer);
            }
            this.addLayerToMap(layer);
        } else {
            if (layer.url) {
                // this.loadSource(layer.url)
                //     .then(gj => {
                //         layer._geojson = gj;
                //         this.addSource(layer);
                //         this.addLayerToMap(layer);
                //         console.log(gj);
                //     })
                //     .catch(e => {
                //         console.log(e);
                //     });
            }

            // load source
        }

        // add to map
        console.log('Adding layer' + layer.title);
    }
}
