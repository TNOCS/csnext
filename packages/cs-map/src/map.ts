import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './map.css';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import { MapOptions } from './map-options';
import { LayerSource, LayerSources, MapLayer } from './';
import { FeatureCollection } from 'geojson';
import { MapLayers } from '.';

@Component({
    template: require('./map.html')
})
export class Map extends Vue {
    /** access the original widget from configuration */

    @Prop()
    public widget!: IWidget;
    public map!: mapboxgl.Map;

    public get layerCollection(): LayerSources {
        if (this.widget && this.widget.content) {
            return this.widget.content as LayerSources;
        } else {
            return new LayerSources({});
        }
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

    @Watch('widget.content')
    dataLoaded(value: MapLayers) {
        value.events.subscribe('layer', (action: string, layer: MapLayer) => {
            switch (action) {
                case 'enabled':
                    if (
                        layer.id &&
                        layer._source &&
                        layer._source.id &&
                        layer._source._geojson
                    ) {
                        this.addSource(layer._source);
                        this.map.addLayer({
                            id: layer.id,
                            type: 'line',
                            source: layer._source.id
                        });
                    }
                    break;
                case 'disabled': {
                    if (layer.id) {
                        this.map.removeLayer(layer.id);
                    }
                }
            }
        });
    }

    created() {
        console.log(this);

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
                            this.layerCollection.layers &&
                            this.layerCollection.layers.hasOwnProperty(id)
                        ) {
                            let layer = this.layerCollection.layers[id];
                            if (layer.id === undefined) {
                                layer.id = id;
                            }
                            this.initLayer(layer);
                        }
                    });
                }
            });

            this.map.on('mousedown', (e: any) => {
                // var features = this.map.queryRenderedFeatures(e.point, {
                //   layers: ['venues']
                // });
                // if (features.length > 0) {
                //   let fid = features[0].properties.ID.toString();
                // }
            });
        });
    }

    private addSource(source: LayerSource) {
        if (source._geojson && source.id) {
            if (this.map.getSource(source.id) === undefined) {
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
                type: 'line',
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
