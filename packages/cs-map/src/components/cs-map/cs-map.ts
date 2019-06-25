import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-map.css';
import mapboxgl, { CirclePaint, LngLat } from 'mapbox-gl';
import { Feature } from 'geojson';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import { RulerControl } from 'mapbox-gl-controls';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import _mapDrawOption from './map-draw-opt.json';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { LayerEditorControl } from './../layer-editor/layer-editor-control';
import { LayerLegendControl } from './../layer-legend-control/layer-legend-control';
import RadiusMode from './../../draw-modes/radius/draw-mode-radius.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import "mapbox-gl-style-switcher/styles.css";

import {
    MapLayers,
    MapOptions,
    LayerSource,
    IMapLayer,
    IMapLayerType,
    IStartStopService,
    ILayerExtensionType,
    GeojsonPlusLayer,
    FeatureDetails
} from '../../.';
import { GridControl } from '../grid-control/grid-control';

export interface FeatureEventDetails {
    context: any;
    features: Feature[];
    feature?: Feature;
    lngLat: LngLat;
}

@Component({
    template: require('./cs-map.html')
})
export class CsMap extends Vue {

    public static FEATURE_SELECT = 'select';
    public static FEATURE_CREATED = 'created';
    public static FEATURE_DELETED = 'deleted';
    public static FEATURE_MOUSE_ENTER = 'enter';
    public static FEATURE_MOUSE_LEAVE = 'leave';
    public static FEATURE_UPDATED = 'updated';
    public static LAYER_UPDATED = 'layer.updated';
    public static LAYER_ACTIVATED = 'layer.activated';
    public static LAYER_DISABLED = 'layer.disabled';
    public static DRAWLAYER_ACTIVATED = 'drawlayer.activated';
    public static DRAWLAYER_DEACTIVATED = 'drawlayer.deactivated';
    public static DRAWLAYER_START_DRAWING = 'drawlayer.startdrawing';
    public static DRAWLAYER = 'drawlayer';
    public static MAP_DOUBLE_CLICK = 'map.doubleclick';
    public static MAP_CLICK = 'map.click';
    public static SEARCH_RESULT_SELECT = 'search.select';

    public static layerTypes: IMapLayerType[] = [];
    public static serviceTypes: IStartStopService[] = [];
    public static layerExtensions: ILayerExtensionType[] = [];

    @Prop()
    public widget!: IWidget;
    public map!: mapboxgl.Map;
    public mapDraw!: any;

    private mapOptions!: MapOptions;

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

    @Watch('widget.content')
    public dataLoaded() {
        this.initMapLayers();
    }

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


    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public zoomLayer(mapLayer: IMapLayer, padding = 20) {
        let bounds = mapLayer.getBounds();
        if (bounds) {
            this.map.fitBounds(bounds, { padding: padding });
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
        console.log('init map layers');
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

            // show layers that are initialially set to visible
            if (this.manager.layers) {
                this.manager.layers.forEach(l => {
                    if (this.manager && l.Visible) {
                        this.showLayer(l);
                    }
                });
            }

        }
    }

    /** Add layer to mapbox. Load source of necessary */
    public async showLayer(layer: IMapLayer): Promise<IMapLayer> {
        return new Promise<IMapLayer>(resolve => {
            if (layer.id && layer._source && layer._source.id) {
                // make sure source is loaded
                layer._source.LoadSource().then(() => {
                    if (layer.id && layer._source && layer._source.id) {
                        // load source in memory
                        this.addSource(layer._source);

                        // check if layer handler has an addlayer function, if so call it
                        if (typeof layer.addLayer === 'function') {
                            layer.addLayer(this);
                        }

                        if (this.manager) {
                            this.manager.events.publish(
                                'layer',
                                'added',
                                layer
                            );

                            if (layer._events) {
                                layer._events.publish('layer', CsMap.LAYER_ACTIVATED);
                                layer._events.subscribe(
                                    'feature',
                                    (a: string, f: FeatureEventDetails) => {
                                        if (a === CsMap.FEATURE_SELECT) {
                                            if (
                                                this.$cs &&
                                                layer.openFeatureDetails &&
                                                layer.openFeatureDetails ===
                                                true
                                            ) {

                                                this.$cs.OpenRightSidebarWidget(
                                                    {
                                                        component: FeatureDetails,
                                                        data: {
                                                            feature: f.feature,
                                                            layer: layer,
                                                            manager: this
                                                                .manager
                                                        },
                                                        datasource: 'project'
                                                    },
                                                    { open: true }
                                                );
                                            }
                                        }
                                    }
                                );
                            }
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
                if (layer._events) {
                    layer._events.publish('layer', CsMap.LAYER_DISABLED);
                }
            }
        }
    }

    public mounted() {
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

            this.map.on('dblclick', (ev) => {
                if (this.manager) {
                    this.manager.events.publish('map', CsMap.MAP_DOUBLE_CLICK, ev);
                }
            });

            this.map.on('click', (ev) => {
                if (this.manager) {
                    this.manager.events.publish('map', CsMap.MAP_CLICK, ev);
                }
            });


            // ad navigation control
            this.mapOptions = {
                ...{
                    showCompass: true,
                    showZoom: true,
                    showStyles: true,
                    showRuler: true,
                    showGeocoder: false,
                    showLayer: true,
                    showEditor: true,
                    doubleClickZoom: true
                },
                ...(this.widget.options as MapOptions)
            };



            if (this.mapOptions.doubleClickZoom) {
                this.map['doubleClickZoom'].enable();
            } else {
                this.map['doubleClickZoom'].disable();
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
                    clickBuffer: 5,
                    touchBuffer: 15,
                    controls: {
                        point: false,
                        line_string: false,
                        polygon: false,
                        combine_features: false,
                        uncombine_features: false
                    },
                    styles: [
                        {
                            id: 'draw-radius-label',
                            type: 'symbol',
                            filter: ['==', 'meta', 'currentPosition'],
                            layout: {
                                'text-field': '{radiusMetric}',
                                'text-anchor': 'left',
                                'text-offset': [1, 0],
                                'text-size': 16
                            },
                            paint: {
                                'text-color': '#000',
                                'text-halo-color': '#fff',
                                'text-halo-width': 3,
                                'text-halo-blur': 1
                            }
                        },
                        {
                            id: 'draw-line',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'LineString'],
                                ['!=', 'mode', 'static'],
                                ['==', 'active', 'true']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#fd9c27',
                                'line-dasharray': [0.2, 2],
                                'line-width': 2
                            }
                        },
                        {
                            id: 'draw-polygon-fill',
                            type: 'fill',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['!=', 'mode', 'static'],
                                ['==', 'active', 'true']
                            ],
                            paint: {
                                'fill-color': '#fd9c27',
                                'fill-opacity': 0.1
                            }
                        },
                        {
                            id: 'draw-polygon-stroke-active',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['!=', 'mode', 'static'],
                                ['==', 'active', 'true']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#fd9c27',
                                'line-dasharray': [0.2, 2],
                                'line-width': 2
                            }
                        },
                        {
                            id: 'draw-polygon-and-line-midpoint',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'midpoint'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'circle-radius': 3,
                                'circle-color': '#fd9c27',
                                'circle-opacity': 0.8
                            }
                        },
                        {
                            id: 'draw-polygon-and-line-vertex-halo-active',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'circle-radius': 5,
                                'circle-color': '#fff'
                            }
                        },
                        {
                            id: 'draw-polygon-and-line-vertex-active',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'circle-radius': 3,
                                'circle-color': '#fd9c27'
                            }
                        },
                        {
                            id:
                                'draw-polygon-and-line-vertex-halo-active-highlight',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static'],
                                ['==', 'active', 'true']
                            ],
                            paint: {
                                'circle-radius': 7,
                                'circle-color': '#fff'
                            }
                        },
                        {
                            id: 'draw-polygon-and-line-vertex-active-highlight',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static'],
                                ['==', 'active', 'true']
                            ],
                            paint: {
                                'circle-radius': 5,
                                'circle-color': '#fd9c27'
                            }
                        },
                        {
                            id: 'draw-polygon-fill-static',
                            type: 'fill',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                [
                                    'any',
                                    ['==', 'mode', 'static'],
                                    ['==', 'active', 'false']
                                ]
                            ],
                            paint: {
                                'fill-color': '#fd9c27',
                                'fill-opacity': 0.4
                            }
                        },
                        {
                            id: 'draw-polygon-stroke-static',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                [
                                    'any',
                                    ['==', 'mode', 'static'],
                                    ['==', 'active', 'false']
                                ]
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#fd9c27',
                                'line-opacity': 0.5,
                                'line-width': 2
                            }
                        },
                        {
                            id: 'points-active',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', '$type', 'Point'],
                                ['==', 'meta', 'feature'],
                                ['==', 'active', 'true']
                            ],
                            paint: {
                                'circle-stroke-width': 3,
                                'circle-stroke-color': '#fff',
                                'circle-radius': 5,
                                'circle-color': '#fd9c27'
                            }
                        },
                        {
                            id: 'points',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', '$type', 'Point'],
                                ['==', 'meta', 'feature'],
                                ['!=', 'meta', 'radius'],
                                ['==', 'active', 'false']
                            ],
                            paint: {
                                'circle-stroke-width': 2,
                                'circle-stroke-color': '#fff',
                                'circle-radius': 4,
                                'circle-color': '#fd9c27'
                            }
                        },
                        {
                            id: 'highlight-active-points',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', '$type', 'Point'],
                                ['==', 'meta', 'feature'],
                                ['==', 'active', 'true']
                            ],
                            paint: {
                                'circle-radius': 17,
                                'circle-color': '#000000'
                            }
                        },
                        {
                            id: 'points-are-blue',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', '$type', 'Point'],
                                ['==', 'meta', 'feature'],
                                ['==', 'active', 'false']
                            ],
                            paint: {
                                'circle-radius': 15,
                                'circle-color': '#000088'
                            }
                        },
                        {
                            id: 'gl-draw-line',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'LineString'],
                                ['!=', 'mode', 'static']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#D20C0C',
                                'line-dasharray': [0.2, 2],
                                'line-width': 2
                            }
                        },
                        // polygon fill
                        {
                            id: 'gl-draw-polygon-fill',
                            type: 'fill',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'fill-color': '#D20C0C',
                                'fill-outline-color': '#D20C0C',
                                'fill-opacity': 0.1
                            }
                        },
                        // polygon outline stroke
                        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                        {
                            id: 'gl-draw-polygon-stroke-active',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['!=', 'mode', 'static']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#D20C0C',
                                'line-dasharray': [0.2, 2],
                                'line-width': 5
                            }
                        },
                        // vertex point halos
                        {
                            id: 'gl-draw-polygon-and-line-vertex-halo-active',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'circle-radius': 15,
                                'circle-color': '#FFF'
                            }
                        },
                        // vertex points
                        {
                            id: 'gl-draw-polygon-and-line-vertex-active',
                            type: 'circle',
                            filter: [
                                'all',
                                ['==', 'meta', 'vertex'],
                                ['==', '$type', 'Point'],
                                ['!=', 'mode', 'static']
                            ],
                            paint: {
                                'circle-radius': 13,
                                'circle-color': '#D20C0C'
                            }
                        },

                        // INACTIVE (static, already drawn)
                        // line stroke
                        {
                            id: 'gl-draw-line-static',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'LineString'],
                                ['==', 'mode', 'static']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#000',
                                'line-width': 5
                            }
                        },
                        // polygon fill
                        {
                            id: 'gl-draw-polygon-fill-static',
                            type: 'fill',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['==', 'mode', 'static']
                            ],
                            paint: {
                                'fill-color': '#000',
                                'fill-outline-color': '#000',
                                'fill-opacity': 0.1
                            }
                        },
                        // polygon outline
                        {
                            id: 'gl-draw-polygon-stroke-static',
                            type: 'line',
                            filter: [
                                'all',
                                ['==', '$type', 'Polygon'],
                                ['==', 'mode', 'static']
                            ],
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                            },
                            paint: {
                                'line-color': '#000',
                                'line-width': 3
                            }
                        }
                    ],

                    modes: {
                        ...MapboxDraw.modes,
                        draw_circle: RadiusMode // eslint-disable-line camelcase
                    },
                    displayControlsDefault: true
                });

                this.map.addControl(this.mapDraw, 'top-left');
            }

            // this.map.on('styledata', (e:any) => {
            //     // noinspection JSUnresolvedVariable
            //     console.log(e);
            // });

            // check if map has loaded
            this.map.on('load', e => {
                this.initMapLayers();
                this.startServices();
                this.mapLoaded(e);

                if (this.manager) {
                    // add layer editor control (adding features, lines, etc.)
                    if (this.mapOptions.showEditor) {
                        const layerEditorControl = new LayerEditorControl(
                            this.manager
                        );
                        this.map.addControl(layerEditorControl);
                    }

                    // add legend control
                    if (this.mapOptions.showLegend) {
                        const layerLegendControl = new LayerLegendControl(
                            this.manager
                        );
                        this.map.addControl(layerLegendControl, 'bottom-left');
                    }

                    if (this.mapOptions.showGrid) {
                        const gridControl = new GridControl(
                            this.manager
                        );
                        this.map.addControl(gridControl, 'bottom-right');
                    }
                }

                // add geocoder
                if (this.mapOptions.showGeocoder) {
                    this.addGeocoder();
                }

                var nav = new mapboxgl.NavigationControl({
                    showCompass: this.mapOptions.showCompass,
                    showZoom: this.mapOptions.showZoom
                });
                this.map.addControl(nav, 'top-left');

                if (this.mapOptions.showStyles) {
                    const styles: MapboxStyleDefinition[] = [
                        { title: "Dark", uri: "mapbox://styles/mapbox/dark-v9" },
                        { title: "Light", uri: "mapbox://styles/mapbox/light-v9" },
                        { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v10" },
                        { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v10" },
                        { title: "Streets", uri: "mapbox://styles/mapbox/streets-v10" }
                    ];

                    this.map.addControl(new MapboxStyleSwitcherControl(styles));

                    // this.map.addControl(stylesControl, 'bottom-right');
                    this.map.on('style.load', () => {
                        if (this.manager) {
                            this.manager.refreshLayers();
                            // this.man
                        }
                    });


                }

                if (this.mapOptions.showRuler) {
                    this.map.addControl(new RulerControl(), 'top-left');
                }
            });
        });
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

    public destroyed() {
        //    this.map.remove();
    }

    public initLayerSource(source: LayerSource): any {
        // load datasource
        if (source.id && source._geojson) {
            if (!this.map.isSourceLoaded(source.id)) {
                this.addSource(source);
            }
        }
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

        if (this.manager && this.manager.layers) {
            let rl = this.manager.layers!.find(
                l => l.id === 'searchlayer'
            ) as GeojsonPlusLayer;
            if (!rl) {
                rl = new GeojsonPlusLayer();
                rl.id = 'searchlayer';
                rl.title = 'Search result';
                (rl._circlePaint = {
                    'circle-radius': 10,
                    'circle-color': 'grey'
                } as CirclePaint),
                    (rl.tags = ['Search']);
                rl.type = 'poi';
                rl.style = {
                    pointCircle: true,
                    icon:
                        'https://cdn4.iconfinder.com/data/icons/momenticons-basic/32x32/search.png'
                };
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
                    if (l._events) {
                        l._events.subscribe(
                            'feature',
                            (a: string, f: Feature) => {
                                if (a === CsMap.FEATURE_SELECT) {
                                }
                            }
                        );
                    }
                });
            }

            geocoder.on('results', ev => {
                if (this.manager) {
                    for (const feature of ev.features) {
                        feature.properties['place_name'] = feature.place_name;
                        // set layer/feature ids
                        feature.id = feature.properties[
                            '_fId'
                        ] = guidGenerator();
                        feature.properties['_lId'] = rl.id;
                    }
                    this.manager.updateLayerSource(rl, ev);
                }
            });

            geocoder.on('result', (d) => {
                if (this.manager) {
                    this.manager.events.publish('map', CsMap.SEARCH_RESULT_SELECT, d);
                }
            }

            geocoder.on('clear', () => {
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
        if (this.manager && this.manager.events) {
            this.manager.events.publish('map', 'loaded', e);
        }

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


}
