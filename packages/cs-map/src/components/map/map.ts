import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';
import mapboxgl from 'mapbox-gl';
import { Feature } from 'geojson';
import { MapLayers, MapOptions, LayerSource, MapLayer } from '../../.';

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

    @Watch('widget.content')
    dataLoaded() {
        this.initMapLayers();
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public zoomLayer(mapLayer: MapLayer) {
        let bounds = mapLayer.getBounds();
        if (bounds !== undefined) {
            this.map.fitBounds(bounds, { padding: 20 });
        }
    }

    public addImage(id: string, url: string) {
        if (!this.map.hasImage(id)) {
            this.map.loadImage(url, (error, image) => {
                if (!this.map.hasImage(id)) {
                    if (error) throw error;
                    this.map.addImage(id, image);
                }
            });
        }
    }

    private isFunction(functionToCheck) {
        return (
            functionToCheck &&
            {}.toString.call(functionToCheck) === '[object Function]'
        );
    }

    public initMapLayers() {
        if (this.Layers && this.map && this.map.loaded && this.Layers.events) {
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
                            this.enableLayer(layer);
                            break;
                        case 'disabled': {
                            this.disableLayer(layer);
                        }
                        case 'remove': {
                            this.removeLayer(layer);
                        }
                    }
                }
            );
        }
    }

    private enableLayer(layer: MapLayer) {
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
            let mblayer = {
                id: layer.id,
                type: layer.type,
                source: layer._source.id
            } as mapboxgl.Layer;
            if (layer.layout) {
                mblayer.layout = layer.layout;
            }
            if (layer.paint) {
                mblayer.paint = layer.paint;
            }
            this.map.addLayer(mblayer);
            this.zoomLayer(layer);
            this.map.on('click', layer.id, e => {
                this.click(layer, e);
            });
            this.map.on('mousemove', layer.id, () => {});
            this.map.on('mouseenter', layer.id, e => {
                this.mouseEnter(layer, e);
            });
            this.map.on('mouseleave', layer.id, e => {
                this.mouseLeave(layer, e);
            });
        }
    }

    private click(layer: MapLayer, e: any) {
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_SELECT, {
                features: e.features,
                context: e
            } as FeatureEventDetails);
        }
    }

    private mouseLeave(layer: MapLayer, e: any) {
        if (layer.popupContent) this.popup.remove();
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_MOUSE_LEAVE, {
                features: e.features,
                context: e
            });
        }
    }

    private mouseEnter(layer: MapLayer, e: any) {
        let popup: string | undefined = undefined;
        if (layer.popupContent) {
            if (typeof layer.popupContent === 'string') {
                popup = layer.popupContent;
            } else if (this.isFunction(layer.popupContent)) {
                popup = layer.popupContent(e);
            }
            if (popup) {
                this.popup
                    .setLngLat(e.lngLat)
                    .setHTML(popup)
                    .addTo(this.map);
            }
        }
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_MOUSE_ENTER, {
                features: e.features,
                context: e
            });
        }
    }

    private removeLayer(layer: MapLayer) {
        if (layer.id && this.map.getLayer(layer.id) !== undefined) {
            this.map.removeLayer(layer.id);
        }
    }

    private disableLayer(layer: MapLayer) {
        if (layer.id && this.map.getLayer(layer.id) !== undefined) {
            this.map.removeLayer(layer.id);
        }
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
                this.widget.events.subscribe('resize', () => {
                    Vue.nextTick(() => {
                        this.map.resize();
                    });
                });
            }
            this.map.on('load', e => {
                this.mapLoaded(e);
            });
        });
    }

    private mapLoaded(e: any) {
        if (this.widget.events) this.widget.events.publish('map', 'loaded', e);
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
    }

    private addSource(source: LayerSource) {
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
        // console.log('Adding layer' + layer.title);
    }
}
