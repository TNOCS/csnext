import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator, MessageBusHandle, IMessageBusService } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as cs from '@csnext/cs-client';
const locales = require('../../assets/locales.json');

const MapboxDraw = require('@mapbox/mapbox-gl-draw');
import mapboxgl, { CirclePaint, MapboxOptions, GeolocateControl, ScaleControl } from 'mapbox-gl';
import { Feature, FeatureCollection } from 'geojson';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import RulerControl from 'mapbox-gl-controls/lib/ruler';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';
import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';

import {
    MapDatasource,
    MapOptions,
    LayerSource,
    IMapLayer,
    IMapLayerType,
    IStartStopService,
    ILayerExtensionType,
    GeojsonPlusLayer,
    FeatureDetails,
    LayerSelection,
    LayerSelectionOptions,
    FeatureEventDetails,
    LayerEditor
} from '../../.';

import { WidgetBase } from '@csnext/cs-client';
import { MapboxStyleSwitcherControl, MapboxStyleDefinition, GridControl, LayerDraw, LayerLegendControl, LayersWidgetControl } from '../../controls';

@Component({
    template: require('./cs-map.html')
})
export class CsMap extends WidgetBase {

    // topics used for events
    public static FEATURE_SELECT = 'select';
    public static FEATURE_CREATED = 'created';
    public static FEATURE_DELETED = 'deleted';
    public static FEATURE_MOUSE_ENTER = 'enter';
    public static FEATURE_MOUSE_LEAVE = 'leave';
    public static FEATURE_UPDATED = 'updated';
    public static FEATURE = 'feature';
    public static LAYER_UPDATED = 'layer.updated';
    public static LAYER_ACTIVATED = 'layer.activated';
    public static LAYER_DISABLED = 'layer.disabled';
    public static LAYER = 'layer';
    public static DRAWLAYER_ACTIVATED = 'drawlayer.activated';
    public static DRAWLAYER_DEACTIVATED = 'drawlayer.deactivated';
    public static DRAWLAYER_START_DRAWING = 'drawlayer.startdrawing';
    public static DRAWLAYER = 'drawlayer';
    public static MAP_DOUBLE_CLICK = 'map.doubleclick';
    public static MAP_CLICK = 'map.click';
    public static MAP_LOADED = 'loaded';
    public static SEARCH_RESULT_SELECT = 'search.select';

    public get pointPickerActivated(): boolean {
        return this._pointerPickerActivated;
    }

    public set pointPickerActivated(value: boolean) {
        this._pointerPickerActivated = value;
        this.map.getCanvas().style.cursor = value ? 'crosshair' : '';
    }

    public get featurePickerActivated(): boolean {
        return this._featurePickerActivated;
    }

    public set featurePickerActivated(value: boolean) {
        this._featurePickerActivated = value;
    }

    public get manager(): MapDatasource | undefined {
        if (this.widget) {
            if (this.widget.content) {
                return this.widget.content as MapDatasource;
            } else if (this.widget.data) {
                return this.widget.data as MapDatasource;
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

    public static layerTypes: IMapLayerType[] = [];
    public static serviceTypes: IStartStopService[] = [];
    public static layerExtensions: ILayerExtensionType[] = [];

    // map controls
    private mapboxStyleSwitcherControl?: MapboxStyleSwitcherControl;
    private rulerControl?: RulerControl;
    private trafficControl?: MapboxTraffic;
    private geocoderControl?: MapboxGeocoder;
    private gridControl?: GridControl;
    private layersWidgetControl?: LayersWidgetControl;
    private geolocatorControl?: GeolocateControl;
    private legendControl?: LayerLegendControl;
    private scaleControl?: ScaleControl;

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

    public styles: MapboxStyleDefinition[] = MapboxStyleSwitcherControl.DEFAULT_STYLES;
    /** actual mapbox gl control */
    public map!: mapboxgl.Map;


    public mapDraw!: any;
    // tslint:disable-next-line: variable-name

    private _featurePickerActivated = false;
    private _pointerPickerActivated = false;
    private mapOptions!: MapOptions;

    @Watch('widget.content')
    public dataLoaded() {
        this.initMapLayers();
    }

    @Watch('widget.options.showCompass')
    public showCompass(enabled: boolean) {
        console.log(`Show compass: ${enabled}`);
    }

    @Watch('widget.options.showStyles')
    public showStyles(enabled: boolean, old?: boolean) {
        console.log(`Show styles: ${enabled}`);
        if (!enabled && old && this.mapboxStyleSwitcherControl) {
            this.map.removeControl(this.mapboxStyleSwitcherControl);
        }
        if (enabled) {
            if (!this.mapboxStyleSwitcherControl) {
                this.mapboxStyleSwitcherControl = new MapboxStyleSwitcherControl(this.styles, this);
            }
            this.map.addControl(this.mapboxStyleSwitcherControl);
            // this.map.addControl(stylesControl, 'bottom-right');

            //todo unsubscribe
            this.map.on('style.load', () => {
                // let style = this.map.getStyle();
                if (this.manager) {
                    this.manager.refreshLayers();
                    // this.man
                }
            });
        }
    }

    @Watch('widget.options.showRuler')
    public showRuler(enabled: boolean, old?: boolean) {
        console.log(`Show ruler: ${enabled}`);
        if (!enabled && old && this.rulerControl) {
            this.map.removeControl(this.rulerControl);
        }
        if (enabled) {
            if (!this.rulerControl) {
                this.rulerControl = new RulerControl();
            }
            this.map.addControl(this.rulerControl, 'top-left');
        }
    }

    @Watch('widget.options.showGrid')
    public showGrid(enabled: boolean, old?: boolean) {
        console.log(`Show grid: ${enabled}`);

        if (!enabled && old && this.showGrid && this.gridControl) {
            this.map.removeControl(this.gridControl);
        }
        if (enabled) {
            if (!this.gridControl && this.manager) {
                this.gridControl = new GridControl(this);
            }
            if (this.gridControl) {
                this.map.addControl(this.gridControl, 'bottom-right');
            }
        }
    }

    @Watch('widget.options.showLayersWidget')
    public showLayersWidget(enabled: boolean, old?: boolean) {
        console.log(`Show layers widget: ${enabled}`);

        if (!enabled && old && this.showLayersWidget && this.layersWidgetControl) {
            this.map.removeControl(this.layersWidgetControl);
        }
        if (enabled) {
            if (!this.layersWidgetControl && this.manager) {
                this.layersWidgetControl = new LayersWidgetControl(this.manager);
            }
            if (this.layersWidgetControl) {
                this.map.addControl(this.layersWidgetControl, 'bottom-left');
            }
        }
    }

    @Watch('widget.options.showScale')
    public showScale(enabled: boolean, old?: boolean) {
        console.log(`Show grid: ${enabled}`);

        if (!enabled && old && this.showScale && this.scaleControl) {
            this.map.removeControl(this.scaleControl);
        }
        if (enabled) {
            if (!this.scaleControl && this.manager) {
                this.scaleControl = new ScaleControl();
            }
            if (this.scaleControl) {
                this.map.addControl(this.scaleControl, 'bottom-left');
            }
        }
    }

    @Watch('widget.options.showTraffic')
    public showTraffic(enabled: boolean, old?: boolean) {
        console.log(`Show traffic: ${enabled}`);
        if (!enabled && old && this.trafficControl) {
            this.map.removeControl(this.trafficControl);
        }
        if (enabled) {
            if (!this.trafficControl) {
                this.trafficControl = new MapboxTraffic();
            }
            this.map.addControl(this.trafficControl, 'top-left');
        }
    }

    @Watch('widget.options.showGeocoder')
    public showGeocoder(enabled: boolean, old?: boolean) {
        console.log(`Show geocoder: ${enabled}`);
        if (!enabled && old && this.geocoderControl) {
            this.removeGeocoder();
        }
        if (enabled) {
            this.addGeocoder();
        }
    }

    @Watch('widget.options.showLegend')
    public showLegend(enabled: boolean, old?: boolean) {
        if (!enabled && old && this.legendControl) {
            console.log('Remove legend');
            this.map.removeControl(this.legendControl);
        }
        if (enabled) {
            if (!this.legendControl) {
                this.legendControl = new LayerLegendControl(this.manager!);
            }
            this.map.addControl(this.legendControl, 'bottom-left');
        }
    }

    @Watch('widget.options.showGeolocater')
    public showGeolocator(enabled: boolean = true, old?: boolean) {
        console.log(`Show geolocator: ${enabled}`);
        if (!enabled && old && this.geolocatorControl) {
            this.map.removeControl(this.geolocatorControl);
        }
        if (enabled) {
            if (!this.geolocatorControl) {
                this.geolocatorControl = new GeolocateControl();
            }
            this.map.addControl(this.geolocatorControl, 'top-left');
        }
    }

    @Watch('widget.options.showBuildings')
    public showBuildings(enabled: boolean, old?: boolean) {
        if (!enabled && old) {
            this.map.removeLayer('3d-buildings');
        }
        if (enabled) {

            let layers = this.map.getStyle().layers;
            if (!layers) { return; }

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout!['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
            this.map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        }

    }

    @Watch('widget.options.showLayers')
    public showLayers(enabled: boolean = true, old?: boolean) {
        console.log(`Show layers: ${enabled}`);
        if (!enabled && old) {
            this.$cs.CloseRightSidebarKey('layers');
        }
        if (enabled) {
            this.$cs.AddSidebar('layers', { icon: 'layers' });

            this.$cs.OpenRightSidebarWidget(
                {
                    component: LayerSelection,
                    options: {
                        searchEnabled: true
                    } as LayerSelectionOptions,
                    datasource: this.widget.datasource
                },
                { open: false },
                'layers'
            );
        }
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public beforeDestroy() {
        this.$cs.CloseRightSidebarKey('feature');
        this.$cs.CloseRightSidebarKey('layers');

    }

    public zoomLayer(mapLayer: IMapLayer, padding = 20) {
        const bounds = mapLayer.getBounds();
        if (bounds) {
            this.map.fitBounds(bounds, { padding });
        }
    }

    public addImage(id: string, url: string) {
        if (!this.map.hasImage(id)) {
            this.map.loadImage(url, (error, image) => {
                if (!this.map.hasImage(id)) {
                    if (error) { throw error; }
                    this.map.addImage(id, image);
                }
            });
        }
    }

    public setStyle(style: MapboxStyleDefinition) {
        this.options.style = style.id;
        this.map.setStyle(style.uri);
        this.updateUrlQueryParams();
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
                for (const id in this.manager._sources.images) {
                    if (this.manager._sources.images.hasOwnProperty(id)) {
                        this.addImage(id, this.manager._sources.images[id]);
                    }
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
                                this.busManager.subscribe(layer._events, 'feature', (
                                    (a: string, f: FeatureEventDetails) => {
                                        if (a === CsMap.FEATURE_SELECT) {
                                            if (
                                                this.$cs &&
                                                layer.openFeatureDetails &&
                                                layer.openFeatureDetails ===
                                                true
                                            ) {
                                                // this.$cs.AddSidebar('feature', { icon: 'map' });
                                                // this.$cs.OpenRightSidebarWidget(
                                                //     {
                                                //         id: 'feature-details-component',
                                                //         component: FeatureDetails,
                                                //         options: {
                                                //             showToolbar: false,
                                                //             toolbarOptions: {
                                                //                 backgroundColor: 'primary',
                                                //                 dense: true
                                                //             },
                                                //             hideSidebarButton: true
                                                //         },
                                                //         data: {
                                                //             feature: f.feature,
                                                //             layer,
                                                //             manager: this
                                                //                 .manager
                                                //         }
                                                //     },
                                                //     { open: true },
                                                //     this.FEATURE_SIDEBAR_ID,
                                                //     true
                                                // );
                                            }
                                        }
                                    }));

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

    private loadTranslations() {        
        for (const lang in locales) {
            if (locales.hasOwnProperty(lang)) {
                const messages = locales[lang];
                this.$i18n.mergeLocaleMessage(lang, messages);
            }
        }
    }

    public mounted() {

        this.loadTranslations();

        Vue.nextTick(() => {
            if (this.options.token) {
                mapboxgl.accessToken = this.options.token;
            }

            if (!this.options.style) {
                this.options.style = this.styles[0].id;
            }

            // if (!this.options.mbOptions) this.options.mbOptions = {};
            this.options.mbOptions = {
                ...{
                    container: 'mapbox-' + this.widget.id,
                    style: this.getStyleUri(this.options.style),
                    center: [5.753699, 53.450862],
                    zoom: 10
                },
                ...this.options.mbOptions,
                ...this.getRouteOptions()
            };

            // init map
            this.map = new mapboxgl.Map(this.options.mbOptions);

            this.map.on('dblclick', (ev) => {
                if (this.manager) {
                    this.manager.events.publish('map', CsMap.MAP_DOUBLE_CLICK, ev);
                }
            });

            this.map.on('click', (ev) => {
                if (this.manager && this.manager.events) {
                    this.manager.events.publish('map', CsMap.MAP_CLICK, ev);
                }
            });

            // if (this.options.storePositionInUrl) {
            this.map.on('moveend', (() => {
                this.updateUrlQueryParams();
            }));
            // }

            // ad navigation control
            this.mapOptions = {
                ...{
                    showCompass: true,
                    showZoom: true,
                    showStyles: true,
                    showRuler: true,
                    showGeocoder: false,
                    showScale: false,
                    showGeolocater: false,
                    showLayer: true,
                    showEditor: true,
                    showTraffic: true,
                    doubleClickZoom: true
                },
                ...(this.widget.options as MapOptions)
            };

            if (this.mapOptions.doubleClickZoom) {
                this.map.doubleClickZoom.enable();
            } else {
                this.map.doubleClickZoom.disable();
            }

            // subscribe to widget events
            if (this.widget.events) {
                // check if widget has been resized
                this.busManager.subscribe(this.widget.events, 'resize', () => {
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
                    modes: {
                        ...MapboxDraw.modes,
                        // draw_circle: RadiusMode // eslint-disable-line camelcase
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
                        const layerEditorControl = new LayerDraw(
                            this.manager
                        );
                        this.map.addControl(layerEditorControl);
                    }
                }

                this.showGrid(this.mapOptions.showGrid || false);

                if (this.mapOptions.showClickLayer) {
                    this.addClickLayer();
                }

                this.showGeocoder(this.mapOptions.showGeocoder || false);

                const nav = new mapboxgl.NavigationControl({
                    showCompass: this.mapOptions.showCompass,
                    showZoom: this.mapOptions.showZoom,
                });
                this.map.addControl(nav, 'top-left');

                this.showStyles(this.mapOptions.showStyles);

                this.showRuler(this.mapOptions.showRuler || false);

                this.showTraffic(this.mapOptions.showTraffic || false);

                this.showLayers(this.mapOptions.showLayers || false);

                this.showGeolocator(this.mapOptions.showGeolocater || false);

                this.showBuildings(this.mapOptions.showBuildings || false);

                this.showLayersWidget(this.mapOptions.showLayersWidget || false);

                this.showLegend(this.mapOptions.showLegend || false);                

            });
        });
    }


    public addSource(source: LayerSource) {
        if (source.id) {
            const original = this.map.getSource(source.id);
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
        this.map.remove();
    }

    public initLayerSource(source: LayerSource): any {
        // load datasource
        if (source.id && source._geojson) {
            if (!this.map.isSourceLoaded(source.id)) {
                this.addSource(source);
            }
        }
    }

    private getRouteOptions(): mapboxgl.MapboxOptions {
        const options = {} as MapboxOptions;
        const q = this.$route.query;
        if (q.hasOwnProperty('lat') && q.hasOwnProperty('lng')) {
            const lng = parseFloat(q.lng as string);
            const lat = parseFloat(q.lat as string);
            options.center = [lng, lat];
        }
        if (q.hasOwnProperty('z')) {
            options.zoom = parseFloat(q.z as string);
        }
        if (q.hasOwnProperty('style')) {
            const styleId = q.style as string;
            this.options.style = styleId;
            options.style = this.getStyleUri(styleId);
        }
        return options;
    }

    private updateUrlQueryParams() {
        const center = this.map.getCenter();
        const zoom = this.map.getZoom();
        const combined = { ... this.$route.query, ...{ lat: center.lat.toFixed(5), lng: center.lng.toFixed(5), z: zoom.toFixed(3), style: this.options.style } };
        this.$router.replace({ path: this.$route.params[0], query: combined }).catch(() => {
            // console.log(err);
        }); // this.$route.query}
    }

    private getStyleUri(styleId: string): string {
        const style = this.styles.find(s => s.id === styleId);
        if (style) {
            return style.uri;
        }
        return '';
    }

    private removeGeocoder() {
        if (this.geocoderControl) {
            this.map.removeControl(this.geocoderControl);
        }

    }

    private addGeocoder() {
        this.map.on('moveend', () => {
            if (this.map.getZoom() > 9) {
                const center = this.map.getCenter().wrap(); // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
                this.geocoderControl.setProximity({
                    longitude: center.lng,
                    latitude: center.lat
                });
            } else {
                this.geocoderControl.setProximity(null);
            }
        });

        if (!this.geocoderControl) {

            this.geocoderControl = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                country: 'nl',
                limit: 8,
                marker: false
            });
        }

        this.map.addControl(this.geocoderControl);

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
                        return f.features[0].properties.place_name;
                    }
                };

                rl.source = new LayerSource({
                    type: 'FeatureCollection',
                    features: []
                });
                this.manager.addLayer(rl).then(l => {
                    if (l._events) {
                        this.busManager.subscribe(l._events, 'feature', (a: string) => {
                            if (a === CsMap.FEATURE_SELECT) {
                                // select feature
                            }
                        });
                    }
                });
            }

            this.geocoderControl.on('results', ev => {
                if (this.manager) {
                    for (const feature of ev.features) {
                        feature.properties.place_name = feature.place_name;
                        // set layer/feature ids
                        feature.id = feature.properties._fId = guidGenerator();
                        feature.properties._lId = rl.id;
                    }
                    this.manager.updateLayerSource(rl, { type: 'FeatureCollection', features: ev.features } as FeatureCollection);
                }
            });

            this.geocoderControl.on('result', (d: any) => {
                if (this.manager) {
                    this.manager.events.publish('map', CsMap.SEARCH_RESULT_SELECT, d);
                }
            });

            this.geocoderControl.on('clear', () => {
                if (this.manager) {
                    this.manager.updateLayerSource(rl, {
                        type: 'FeatureCollection',
                        features: []
                    });
                }
            });
        }
    }

    private addClickLayer() {
        if (this.manager && this.manager.layers) {
            let rl = this.manager.layers!.find(
                l => l.id === 'clicklayer'
            ) as GeojsonPlusLayer;
            if (!rl) {
                rl = new GeojsonPlusLayer();
                rl.id = 'clicklayer';
                // rl.visible = false,
                rl.title = 'Click layer';
                (rl._circlePaint = {
                    'circle-radius': 20,
                    'circle-color': 'red'
                } as CirclePaint),
                    (rl.tags = ['Click']);
                rl.type = 'poi';
                rl.style = {
                    pointCircle: true,
                    icon:
                        'https://cdn4.iconfinder.com/data/icons/momenticons-basic/32x32/search.png'
                };
                // rl.popupContent = f => {
                //     if (f.features) {
                //         return f.features[0].properties['place_name'];
                //     }
                // };

                rl.source = new LayerSource({
                    type: 'FeatureCollection',
                    features: []
                });
                this.manager.addLayer(rl).then(l => {
                    if (l._events) {
                        this.busManager.subscribe(l._events, 'feature', (a: string) => {
                            if (a === CsMap.FEATURE_SELECT) {
                                // select feature
                            }
                        })

                    }
                });

                this.map.on('click', (ev) => {
                    if (this.manager) {
                        const features = {
                            type: 'FeatureCollection',
                            features: [{
                                id: 'click-feature', type: 'Feature', properties: {
                                    'title': ev.lngLat.lng + ', ' + ev.lngLat.lat
                                }, geometry: {
                                    type: 'Point',
                                    coordinates: [ev.lngLat.lng, ev.lngLat.lat]
                                }
                            } as Feature]
                        };
                        this.manager.updateLayerSource(rl, features as any);
                    }
                });
            }
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
                    const layer = this.manager.layers.find(l => l.id === id);
                    if (layer) {
                        this.manager.addLayer(layer);
                    }
                }
            }
        }
        if (this.widget.events) { this.widget.events.publish('map', 'loaded', e); }
        if (this.manager && this.manager.events) {
            this.manager.events.publish('map', CsMap.MAP_LOADED, e);
        }
    }
}
