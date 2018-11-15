import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-map.css';
import mapboxgl, { GeoJSONSource, CirclePaint } from 'mapbox-gl';
import { Feature } from 'geojson';
import { RulerControl } from 'mapbox-gl-controls';
import { StylesControl } from 'mapbox-gl-controls';
import { ZoomControl, CompassControl } from 'mapbox-gl-controls';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import _mapDrawOption from './map-draw-opt.json';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import radiusMode from './../../draw-modes/radius/draw-mode-radius.js';

import {
    MapLayers,
    MapOptions,
    LayerSource,
    IMapLayer,
    IMapLayerType,
    IStartStopService,
    ILayerExtensionType,
    GeojsonPlusLayer
} from '../../.';
import { plainToClass } from 'class-transformer';
import { GeojsonLayer } from '../../layers/geojson-layer';

export interface FeatureEventDetails {
    context: any;
    features: Feature[];
}

@Component({
    template: require('./cs-map.html')
})
export class CsMap extends Vue {
    /** access the original widget from configuration */

    private mapOptions!: MapOptions;

    public static FEATURE_SELECT = 'select';
    public static FEATURE_MOUSE_ENTER = 'enter';
    public static FEATURE_MOUSE_LEAVE = 'enter';

    @Prop()
    public widget!: IWidget;
    public map!: mapboxgl.Map;
    public mapDraw!: any;

    public static layerTypes: IMapLayerType[] = [];
    public static serviceTypes: IStartStopService[] = [];
    public static layerExtensions: ILayerExtensionType[] = [];

    /** register new layertype  */
    public static AddLayerExtension(type: ILayerExtensionType) {
        if (CsMap.layerExtensions.findIndex(et => et.id === type.id) === -1) {
            CsMap.layerExtensions.push(type);
        }
    }

    /** register new layertype  */
    public static AddLayerType(type: IMapLayerType) {
        if (
            CsMap.layerTypes.findIndex(lt => lt.typeId === type.typeId) === -1
        ) {
            CsMap.layerTypes.push(type);
        }
    }

    public static AddLayerServiceType(type: IStartStopService) {
        if (CsMap.serviceTypes.findIndex(lt => lt.type === type.type) === -1) {
            CsMap.serviceTypes.push(type);
        }
    }

    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });

    public get manager(): MapLayers | undefined {
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

    public zoomLayer(mapLayer: IMapLayer) {
        let bounds = mapLayer.getBounds();
        if (bounds) {
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

    public async startServices() {
        if (this.manager && this.manager.services) {
            for (const service of this.manager.services) {
                if (service.Start) {
                    await service.Start(this.manager);
                }
            }
        }
    }

    public initMapLayers() {
        if (
            this.manager &&
            this.map &&
            this.map.loaded &&
            this.manager.events
        ) {
            if (this.manager.MapWidget === undefined) {
                this.manager.MapWidget = this;
            }
            if (this.manager._sources && this.manager._sources.images) {
                for (var id in this.manager._sources.images) {
                    this.addImage(id, this.manager._sources.images[id]);
                }
            }

            this.manager.MapWidget = this;

            if (this.manager.layers) {
                this.manager.layers.forEach(l => {
                    if (this.manager && l.Visible) {
                        this.showLayer(l);
                    }
                });
            }

            this.manager.events.subscribe(
                'layer',
                (action: string, layer: IMapLayer) => {
                    switch (action) {
                        case 'enabled':
                            // this.showLayer(layer);

                            break;
                        case 'disabled': {
                            // this.removeLayer(layer);
                            break;
                        }
                        case 'remove': {
                            // this.removeLayer(layer);
                            break;
                        }
                    }
                }
            );
        }
    }

    public async showLayer(layer: IMapLayer): Promise<IMapLayer> {
        return new Promise<IMapLayer>((resolve, reject) => {
            if (layer.id && layer._source && layer._source.id) {
                layer._source.LoadSource().then(geojson => {
                    if (layer.id && layer._source && layer._source.id) {
                        this.addSource(layer._source);
                        if (typeof layer.addLayer === 'function') {
                            layer.addLayer(this);
                        }
                        if (this.manager) {
                            this.manager.events.publish(
                                'layer',
                                'added',
                                layer
                            );
                        }
                        resolve(layer);
                    }
                });
            }
        });
    }

    public removeLayer(layer: IMapLayer) {
        if (layer.id) {
            if (typeof layer.removeLayer === 'function') {
                layer.removeLayer(this);
            }
        }
    }

    mounted() {
        this.initMapLayers();

        Vue.nextTick(() => {
            if (this.options.token) {
                mapboxgl.accessToken = this.options.token;
            }

            // if (!this.options.mbOptions) this.options.mbOptions = {};
            this.options.mbOptions = {
                ...{
                    container: 'mapbox-' + this.widget.id,
                    style: 'mapbox://styles/mapbox/basic-v9',
                    center: [5.753699, 53.450862],
                    zoom: 10
                },
                ...this.options.mbOptions
            };

            // init map
            this.map = new mapboxgl.Map(this.options.mbOptions);

            // ad navigation control
            this.mapOptions = {
                ...{
                    showCompass: true,
                    showZoom: true,
                    showStyles: true,
                    showRuler: true,
                    showGeocoder: true,
                    showLayer: true
                },
                ...(this.widget.options as MapOptions)
            };
            var nav = new mapboxgl.NavigationControl({
                showCompass: this.mapOptions.showCompass,
                showZoom: this.mapOptions.showZoom
            });
            this.map.addControl(nav, 'top-left');

            if (this.mapOptions.showStyles) {
                this.map.addControl(
                    new StylesControl([
                        {
                            name: 'Streets',
                            url: 'mapbox://styles/mapbox/streets-v9'
                        },
                        {
                            name: 'Satellite',
                            url: 'mapbox://styles/mapbox/satellite-v9'
                        },
                        {
                            name: 'Dark',
                            url: 'mapbox://styles/mapbox/dark-v9'
                        },
                        {
                            name: 'Light',
                            url: 'mapbox://styles/mapbox/light-v9'
                        }
                    ]),
                    'bottom-right'
                );
            }

            if (this.mapOptions.showRuler) {
                this.map.addControl(new RulerControl(), 'top-left');
            }

            // subscribe to widget events
            if (this.widget.events) {
                // check if widget has been resized
                this.widget.events.subscribe('resize', () => {
                    Vue.nextTick(() => {
                        this.map.resize();
                    });
                });
            }

            if (this.mapOptions.showDraw) {
                this.mapDraw = new MapboxDraw({
                    styles: _mapDrawOption,
    
                    modes: {
                        ...MapboxDraw.modes,
                        // draw_circle: radiusMode // eslint-disable-line camelcase
                    },
                    userProperties: true,
                    displayControlsDefault: true,                    
                });                
                this.map.addControl(this.mapDraw, 'top-left');
                this.map.on('draw.create', (e : GeoJSON.FeatureCollection) => {
                    if (this.manager && this.manager.activeDrawLayer) {                        
                        let source = this.manager.activeDrawLayer._source;
                        if (source && source._geojson) {
                            source._geojson.features = [...source._geojson.features, ...e.features];
                            this.manager.updateLayerSource(this.manager.activeDrawLayer, source._geojson);
                        }
                    }
                    // console.log(e.features);
                })
            }

            // check if map has loaded
            this.map.on('load', e => {
                this.startServices();
                this.mapLoaded(e);
                if (this.mapOptions.showGeocoder) {
                    this.addGeocoder();
                }
                // this.mapDraw.changeMode('draw_circle');
            });
        });
    }

    private addGeocoder() {
        this.map.on('moveend', () => {
            if (this.map.getZoom() > 9) {
                var center = this.map.getCenter().wrap(); // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
                geocoder.setProximity({
                    longitude: center.lng,
                    latitude: center.lat
                });
            } else {
                geocoder.setProximity(null);
            }
        });

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            country: 'nl',
            limit: 8
        });

        this.map.addControl(geocoder);

        // this.map.addSource('single-point', {
        //     type: 'geojson',
        //     data: {
        //         type: 'FeatureCollection',
        //         features: []
        //     }
        // });

        if (this.manager) {
            let rl = new GeojsonPlusLayer();
            
            rl.title = 'Search result';
            (rl.circlePaint = {
                'circle-radius': 10,
                'circle-color': 'grey'
            } as CirclePaint),
                (rl.tags = ['search']);
            rl.type = 'poi';
            rl.style = { pointCircle: true, icon: 'https://cdn4.iconfinder.com/data/icons/momenticons-basic/32x32/search.png'}
            rl.popupContent = f => {
                if (f.features) {
                    return f.features[0].properties['place_name'];                    
                }
            };

            rl.source = new LayerSource({
                type: 'FeatureCollection',
                features: []
            });
            this.manager.addLayer(rl).then(l => {
                if (l.events) {
                    l.events.subscribe('feature', (a: string, f: Feature) => {
                        if (a === CsMap.FEATURE_SELECT) {
                            
                        }
                    })
                }
            })
            

            geocoder.on('results', ev => {
                if (this.manager) {
                    for (const feature of ev.features) {
                        feature.properties['place_name'] = feature.place_name;
                    }
                    this.manager.updateLayerSource(rl, ev);
                }
            });

            geocoder.on('clear', ev => {
                if (this.manager) {
                    this.manager.updateLayerSource(rl, {
                        type: 'FeatureCollection',
                        features: []
                    });
                }
            });
        }
    }

    private mapLoaded(e: any) {
        if (!this.manager) {
            return;
        }
        if (!this.manager.MapWidget) {
            this.manager.MapWidget = this;
        }
        if (this.options.activeLayers) {
            for (const id of this.options.activeLayers) {
                if (this.manager && this.manager.layers) {
                    let layer = this.manager.layers.find(l => l.id === id);
                    if (layer) {
                        this.manager.addLayer(layer);
                    }
                }
            }
        }
        if (this.widget.events) this.widget.events.publish('map', 'loaded', e);
        this.manager.events.publish('map', 'loaded', e);

        // this.map.addSource('mask',);

        //     {
        //     "id": "zmask",
        //     "source": "mask",
        //     "type": "fill",
        //     "paint": {
        //       "fill-color": "#4192DD",
        //       'fill-opacity': 0.999
        //     }
        //   });
    }

    public addSource(source: LayerSource) {
        if (source.id) {
            let original = this.map.getSource(source.id);
            if (original !== undefined) {
                if (original.type === 'geojson' && source._geojson) {
                    original.setData(source._geojson);
                }
            } else {
                switch (source.type) {
                    case 'raster':
                        if (source.url) {
                            this.map.addSource(source.id, {
                                type: source.type,
                                tiles: [source.url],
                                tileSize: source.tileSize
                            });
                        }
                        break;
                    default:
                        source.type = 'geojson';
                        this.map.addSource(source.id, {
                            type: source.type,
                            data: source._geojson
                        });
                        break;
                }
                // let vs = this.map.getSource(source.id) as GeoJSONSource;
            }
        }
    }

    public initLayerSource(source: LayerSource): any {
        // load datasource
        if (source.id && source._geojson) {
            if (!this.map.isSourceLoaded(source.id)) {
                this.addSource(source);
            }
        }
    }
}
