import { Watch } from 'vue-property-decorator';
import Vue from 'vue';
import { guidGenerator } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
const locales = require('../../assets/locales.json');
import { PackageExplorer } from './../package-explorer/package-explorer';

import mapboxgl, { GeolocateControl, MapboxOptions, NavigationControl, ScaleControl, Marker } from 'mapbox-gl';
import { FeatureCollection, Feature } from 'geojson';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import RulerControl from 'mapbox-gl-controls/lib/ruler';

import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';
import PeliasGeocoder from '../../controls/pelias/pelias-geocoder'
import '../../controls/pelias/pelias-geocoder.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';

import {
    MapDatasource,
    MapOptions,
    LayerSource,
    IMapLayer,
    IStartStopService,
    ILayerExtensionType,
    GeojsonPlusLayer,
    LayerSelection,
    LayerSelectionOptions,
    MapboxStyleDefinition,
    IMapLayerType
} from '../../.';

import { WidgetBase, AppState } from '@csnext/cs-client';
import { MapboxStyleSwitcherControl, GridControl, LayerDraw, LayerLegendControl, LayersWidgetControl } from '../../controls';
import { SidebarKeys } from '../../datasources/map-datasource';
import { convertToDMS } from '../../utils/conversion';
import { ClusterSettings } from '../../classes/layer-source';

@Component({
    components: { PackageExplorer },
    template: require('./cs-map.html')
})
export class CsMap extends WidgetBase {
    // #endregion Properties (34)

    // topics used for events
    public static FEATURE_SELECT = 'select';
    public static FEATURE_CONTEXT = 'context';
    public static FEATURE_CREATED = 'created';
    public static FEATURE_DELETED = 'deleted';
    public static FEATURE_MOUSE_ENTER = 'enter';
    public static FEATURE_MOUSE_LEAVE = 'leave';
    public static FEATURE_UPDATED = 'updated';
    public static FEATURE = 'feature';
    public static LEGENDS = 'legends';
    public static LAYER_UPDATED = 'layer.updated';
    public static LAYER_ACTIVATED = 'layer.activated';
    public static LAYER_DISABLED = 'layer.disabled';
    public static LAYER = 'layer';
    public static SOURCE = 'source';
    public static SOURCE_UPDATED = 'updated';
    public static DRAWLAYER_ACTIVATED = 'drawlayer.activated';
    public static DRAWLAYER_DEACTIVATED = 'drawlayer.deactivated';
    public static DRAWLAYER_START_DRAWING = 'drawlayer.startdrawing';
    public static DRAWLAYER = 'drawlayer';
    public static MAP_DOUBLE_CLICK = 'map.doubleclick';
    public static MAP_CLICK = 'map.click';
    public static MAP_CONTEXT = 'map.context';
    public static MAP_MOVE = 'map.move';
    public static MAP = 'map';
    public static MAP_LOADED = 'loaded';
    public static SEARCH_RESULT_SELECT = 'search.select';
    public static NODE = 'node';
    public static NODE_SELECT = 'node.selected';


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

    public set options(options: MapOptions) {
        if (this.widget) {
            this.widget.options = options;
        }
    }

    public get pointPickerActivated(): boolean {
        return this._pointerPickerActivated;
    }

    public set pointPickerActivated(value: boolean) {
        this._pointerPickerActivated = value;
        this.map.getCanvas().style.cursor = value ? 'crosshair' : '';
    }

    public static LAYER_CREATED = 'layer.created';

    public static layerExtensions: ILayerExtensionType[] = [];
    public static layerTypes: IMapLayerType[] = [];
    public static serviceTypes: IStartStopService[] = [];

    /** register new layertype  */
    public static AddLayerExtension(type: ILayerExtensionType) {
        if (CsMap.layerExtensions.findIndex(et => et.id === type.id) === -1) {
            CsMap.layerExtensions.push(type);
        }
    }

    public static AddLayerServiceType(type: IStartStopService) {
        if (CsMap.serviceTypes.findIndex(lt => lt.type === type.type) === -1) {
            CsMap.serviceTypes.push(type);
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

    /** actual mapbox gl control */
    public map!: mapboxgl.Map;
    public mapDraw!: any;
    public styles: MapboxStyleDefinition[] = MapboxStyleSwitcherControl.DEFAULT_STYLES;

    public featurePickerActivated = false;
    private _pointerPickerActivated = false;
    private cursorLocationInfoFormat: 'NONE' | 'LATLON' | 'DMS' = 'NONE';
    private cursorLocationInfo: string = '';
    private geocoderControl?: MapboxGeocoder;
    private geolocatorControl?: GeolocateControl;
    private peliasControl?: any;
    private gridControl?: GridControl;
    private layersWidgetControl?: LayersWidgetControl;
    private legendControl?: LayerLegendControl;
    private mapOptions!: MapOptions;
    // map controls
    private mapboxStyleSwitcherControl?: MapboxStyleSwitcherControl;
    private rulerControl?: RulerControl;
    private scaleControl?: ScaleControl;
    private trafficControl?: MapboxTraffic;
    private navigationControl?: NavigationControl;
    private searchLayer?: GeojsonPlusLayer;

    // #endregion Public Static Methods (3)

    // #region Public Methods (26)

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

    public addSource(source: LayerSource, clusterSettings?: ClusterSettings) {
        if (source.id) {
            const original = this.map.getSource(source.id);
            if (original !== undefined) {
                if (original.type === 'geojson' && source._data && source._data.type === 'FeatureCollection') {
                    original.setData(source._data as FeatureCollection);
                }
            } else {
                switch (source.type) {
                    case 'raster':
                        if (source.url) {
                            this.map.addSource(source.id, {
                                type: source.type,
                                tiles: [source.url],
                                tileSize: 256
                            });
                        }
                        break;
                    default:
                        source.type = 'geojson';
                        const _promoteId = source._promoteId || ((source._data) as any)._promoteId;
                        let mapsource = {
                            type: source.type,
                            data: source._data as FeatureCollection,
                            generateId: !_promoteId,
                            promoteId: _promoteId || undefined
                        } as any;
                        if (clusterSettings) {
                            Object.assign(mapsource, clusterSettings);
                        }
                        this.map.addSource(source.id, mapsource);
                        break;
                }
                // let vs = this.map.getSource(source.id) as GeoJSONSource;
            }
        }
    }

    public beforeDestroy() {
        this.$cs.closeRightSidebarKey(SidebarKeys.FEATURE_DETAILS);
        this.$cs.closeRightSidebarKey(SidebarKeys.FEATURE_LIST);
        this.$cs.closeRightSidebarKey(SidebarKeys.LAYERS_SELECTION);
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    @Watch('widget.content')
    public contentLoaded(d: MapDatasource) {
        this.initStyles();
        this.initMapLayers();
    }

    public destroyed() {
        this.map.remove();
    }

    private initStyles() {
        if (!this.widget || !this.widget.options || !this.widget.options) return;
        const opts = this.widget.options as MapOptions;
        if (opts.styleList && opts.styleList.length > 0) {
            Vue.set(this, 'styles', opts.styleList);
            console.log(`Set styles: ${JSON.stringify(opts.styleList)}`);
        }
    }

    public initLayerSource(source: LayerSource, clusterSettings?: ClusterSettings): any {
        // load datasource
        if (source.id && source._data) {
            if (!this.map.isSourceLoaded(source.id)) {
                this.addSource(source, clusterSettings);
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
            if (this.manager.images) {
                for (const id in this.manager.images) {
                    if (this.manager.images.hasOwnProperty(id)) {
                        this.addImage(id, this.manager.images[id]);
                    }
                }
            }
            this.manager.MapWidget = this;

            // show layers that are initialially set to visible
            if (this.manager.layers) {
                for (const l of this.manager.layers) {
                    if (l.enabled) {
                        this.showLayer(l);
                    }
                }
            }
        }
    }

    public mounted() {
        this.loadTranslations();
        this.initStyles();

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

            this.map.on('styleimagemissing', (e: any) => {
                if (this.manager && this.manager.layers) {
                    for (const layer of this.manager.layers) {
                        if (layer.extensions) {
                            for (const ext of layer._extensions) {
                                if (typeof ext.missingImage === 'function') {
                                    ext.missingImage(e.id);
                                }

                            }
                        }
                    }
                }
            });



            this.map.on('dblclick', (ev) => {
                if (this.manager && this.manager.events) {
                    this.manager.events.publish(CsMap.MAP, CsMap.MAP_DOUBLE_CLICK, ev);
                }
            });

            this.map.on('click', (ev) => {
                if (this.manager && this.manager.events) {
                    this.manager.events.publish(CsMap.MAP, CsMap.MAP_CLICK, ev);

                    if ($cs.activeInfoWidget) {
                        $cs.clearInfoWidget();
                    }
                }
            });

            this.map.on("contextmenu", (ev) => {
                if (this.manager && this.manager.events) {
                    this.manager.events.publish(CsMap.MAP, CsMap.MAP_CONTEXT, ev);
                }
            });

            this.map.on("mousemove", (ev) => {
                if (this.cursorLocationInfoFormat == 'LATLON') {
                    this.cursorLocationInfo = JSON.stringify(ev.lngLat.wrap());
                } else if (this.cursorLocationInfoFormat == 'DMS') {
                    this.cursorLocationInfo = `${convertToDMS(ev.lngLat.lat, false)} - ${convertToDMS(ev.lngLat.lng, true)}`;
                }
            });
            this.map.on('moveend', (() => {
                this.updateUrlQueryParams();
            }));

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
                    showEditor: false,
                    showTraffic: false,
                    doubleClickZoom: true
                },
                ...(this.widget.options as MapOptions)
            };

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
                        uncombine_features: false,
                        trash: false
                    },
                    modes: {
                        ...MapboxDraw.modes
                        // draw_circle: RadiusMode // eslint-disable-line camelcase
                    },
                    displayControlsDefault: true
                });

                this.map.addControl(this.mapDraw, 'bottom-left');
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

                // if (this.mapOptions.showClickLayer) {
                //     this.addClickLayer();
                // }

                this.showCursorLocationInfo(this.mapOptions.showCursorLocationInfo || 'NONE');

                this.showGeocoder(this.mapOptions.showGeocoder || false);

                this.showPelias(this.mapOptions.showPelias || false);

                this.updateNavigationControl();

                this.showStyles(this.mapOptions.showStyles || false);

                this.showRuler(this.mapOptions.showRuler || false);

                this.showTraffic(this.mapOptions.showTraffic || false);

                this.showLayers(this.mapOptions.showLayers || false);

                this.showFeatureDetails(this.mapOptions.showFeatureDetails || false);

                this.showFeatureList(this.mapOptions.showFeatureDetails || false);

                this.showGeolocator(this.mapOptions.showGeolocater || false);

                this.showBuildings(this.mapOptions.showBuildings || false);

                this.showLayersWidget(this.mapOptions.showLayersWidget || false);

                this.showLegend(this.mapOptions.showLegend || false);

                this.setDoubleClickZoom(this.mapOptions.doubleClickZoom || false);

                this.setBoxZoom(this.mapOptions.boxZoom || true);

                this.setScrollZoom(this.mapOptions.scrollZoom || true);

                this.setDragPan(this.mapOptions.dragPan || true);

            });
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

    public setStyle(style: MapboxStyleDefinition) {
        this.options.style = style.id;
        this.map.setStyle(style.uri);
        this.updateUrlQueryParams();
    }

    @Watch('widget.options.doubleClickZoom')
    public setDoubleClickZoom(enabled: boolean) {
        if (enabled) {
            this.map.doubleClickZoom.enable();
        } else {
            this.map.doubleClickZoom.disable();
        }
    }


    @Watch('widget.options.boxZoom')
    public setBoxZoom(enabled: boolean) {
        if (enabled) {
            this.map.boxZoom.enable();
        } else {
            this.map.boxZoom.disable();
        }
    }

    @Watch('widget.options.scrollZoom')
    public setScrollZoom(enabled: boolean) {
        if (enabled) {
            this.map.scrollZoom.enable();
        } else {
            this.map.scrollZoom.disable();
        }
    }

    @Watch('widget.options.dragPan')
    public setDragPan(enabled: boolean) {
        if (enabled) {
            this.map.dragPan.enable();
        } else {
            this.map.dragPan.disable();
        }
    }

    @Watch('widget.options.showBuildings')
    public showBuildings(enabled: boolean, old?: boolean) {
        if (!enabled && old) {
            this.map.removeLayer('3d-buildings');
        }
        if (enabled) {
            const layers = this.map.getStyle().layers;
            if (!layers) { return; }

            let labelLayerId;
            for (const layer of layers) {
                if (layer.type === 'symbol' && layer.layout!['text-field']) {
                    labelLayerId = layer.id;
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
                        'interpolate', ['linear'], ['zoom'],
                        15, 0,
                        15.05, ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate', ['linear'], ['zoom'],
                        15, 0,
                        15.05, ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        }
    }

    @Watch('widget.options.showCompass')
    @Watch('widget.options.showZoom')
    public updateNavigationControl() {
        if (this.navigationControl) {
            this.map.removeControl(this.navigationControl);
        }
        if (this.mapOptions.showCompass || this.mapOptions.showZoom) {
            this.navigationControl = new mapboxgl.NavigationControl({
                showCompass: this.options.showCompass,
                showZoom: this.options.showZoom,
                visualizePitch: true
            });
            this.map.addControl(this.navigationControl, 'top-left');
        }
    }

    @Watch('widget.options.showCursorLocationInfo')
    public showCursorLocationInfo(enabled: 'NONE' | 'LATLON' | 'DMS', old?: 'NONE' | 'LATLON' | 'DMS') {
        if ((!enabled || enabled == 'NONE') && (!!old || old != 'NONE')) {
            this.cursorLocationInfo = '';
            this.cursorLocationInfoFormat = 'NONE';
        }
        if (enabled) {
            (enabled == 'DMS') ? this.cursorLocationInfoFormat = 'DMS' : this.cursorLocationInfoFormat = 'LATLON';
        }
    }

    @Watch('widget.options.showGeocoder')
    public showGeocoder(enabled: boolean, old?: boolean) {
        if (!enabled && old && this.geocoderControl) {
            this.removeGeocoder();
        }
        if (enabled) {
            this.addGeocoder();
        }
    }

    @Watch('widget.options.showGeolocater')
    public showGeolocator(enabled: boolean = true, old?: boolean) {
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

    @Watch('widget.options.showPelias')
    public showPelias(enabled: boolean = true, old?: boolean) {
        if (!enabled && old && this.peliasControl) {
            this.map.removeControl(this.peliasControl);
        }
        

        if (enabled && this.options.peliasOptions) {
            if (!this.peliasControl) {
                this.peliasControl = new PeliasGeocoder(
                    {
                        params: { 'access-token': this.options.peliasOptions.accessToken },
                        flyTo: 'hybrid',
                        wof: true,
                        url: this.options.peliasOptions.url ?? 'https://places.jawg.io/v1',
                        useFocusPoint: true,
                        customAttribution: 'JAWG search'
                    });
                    
            }
            this.map.addControl(this.peliasControl, 'top-right');
        }
    }


    @Watch('widget.options.showGrid')
    public showGrid(enabled: boolean, old?: boolean) {
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

    /** Add layer to mapbox. Load source of necessary */
    public async showLayer(layer: IMapLayer): Promise<IMapLayer> {
        return new Promise<IMapLayer>(resolve => {
            if (layer.id && layer._source && layer._source.id) {
                // make sure source is loaded
                layer._source.loadSource(layer.featureTypes).then(() => {
                    if (layer.id && layer._source && layer._source.id) {
                        // load source in memory
                        this.addSource(layer._source, layer.style?.clusterSettings);

                        // check if layer handler has an addlayer function, if so call it
                        if (typeof layer.addLayer === 'function') {
                            layer.addLayer(this);
                        }

                        if (this.manager && this.manager.events) {
                            this.manager.events.publish('layer', 'added', layer);
                            if (layer._events) {
                                layer._events.publish(CsMap.LAYER, CsMap.LAYER_ACTIVATED);
                            }
                        }
                        resolve(layer);
                    }
                });
            } else {
                resolve(layer);
            }
        });
    }

    @Watch('widget.options.showLayers')
    public showLayers(enabled: boolean = true, old?: boolean) {
        if (!enabled && old) {
            this.$cs.closeRightSidebarKey(SidebarKeys.LAYERS_SELECTION);
        }
        if (enabled) {
            this.$cs.addSidebar(SidebarKeys.LAYERS_SELECTION, { icon: 'layers' });
            this.$cs.addRightSidebarWidget(
                {
                    component: LayerSelection,
                    options: {
                        searchEnabled: true
                    } as LayerSelectionOptions,
                    datasource: this.widget.datasource ?? this.widget?._dashboard?.datasource
                },
                {},
                SidebarKeys.LAYERS_SELECTION
            );
        }
    }

    @Watch('widget.options.showFeatureDetails')
    public showFeatureDetails(enabled: boolean = true, old?: boolean) {
        if (!enabled && old) {
            this.$cs.closeRightSidebarKey(SidebarKeys.FEATURE_DETAILS);
        }
        if (enabled && this.manager) {
            this.manager.openFeature();
        }
    }

    @Watch('widget.options.showFeatureList')
    public showFeatureList(enabled: boolean = true, old?: boolean) {
        if (!enabled && old) {
            this.$cs.closeRightSidebarKey(SidebarKeys.FEATURE_LIST);
        }
        if (enabled && this.manager) {
            this.manager.openFeature();
        }
    }

    @Watch('widget.options.showLayersWidget')
    public showLayersWidget(enabled: boolean, old?: boolean) {
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

    @Watch('widget.options.showLegend')
    public showLegend(enabled: boolean, old?: boolean) {
        if (!enabled && old && this.legendControl) {
            this.map.removeControl(this.legendControl);
        }
        if (enabled) {
            if (!this.legendControl) {
                this.legendControl = new LayerLegendControl(this.manager!);
            }
            this.map.addControl(this.legendControl, 'bottom-left');
        }
    }

    @Watch('widget.options.showRuler')
    public showRuler(enabled: boolean, old?: boolean) {
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

    @Watch('widget.options.showScale')
    public showScale(enabled: boolean, old?: boolean) {
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

    @Watch('widget.options.showStyles')
    public showStyles(enabled: boolean, old?: boolean) {
        if (!enabled && old && this.mapboxStyleSwitcherControl) {
            this.map.removeControl(this.mapboxStyleSwitcherControl);
        }
        if (enabled) {
            if (!this.mapboxStyleSwitcherControl) {
                this.mapboxStyleSwitcherControl = new MapboxStyleSwitcherControl(this.styles, this);
            }
            this.map.addControl(this.mapboxStyleSwitcherControl);
            // this.map.addControl(stylesControl, 'bottom-right');

            // todo unsubscribe
            this.map.on('style.load', () => {
                // let style = this.map.getStyle();
                if (this.manager) {
                    this.manager.refreshLayers();
                    // this.man
                }
            });
        }
    }

    @Watch('widget.options.showTraffic')
    public showTraffic(enabled: boolean, old?: boolean) {
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

    public async startServices() {
        if (this.manager && this.manager.services) {
            for (const service of this.manager.services) {
                if (service.Start) {
                    await service.Start(this.manager);
                }
            }
        }
    }

    public zoomLayer(mapLayer: IMapLayer, padding = 20) {
        const bounds = mapLayer.getBounds();
        if (bounds) {
            this.map.fitBounds(bounds, { padding });
        }
    }

    private async addGeocoder() {
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

        this.searchLayer = await this.manager!.addGeojsonLayer('Search Layer', undefined, {
            title: '{{properties.place_name}}',
            popup: '{{properties.place_name}}',
            mapbox: {
                circlePaint: {
                    'circle-color': 'blue',
                    'circle-radius': 15
                }
            }
        }, undefined, { hideInLayerList: true } as IMapLayer) as GeojsonPlusLayer;

        this.geocoderControl.on('results', ev => {
            if (this.manager && ev && ev.features && this.searchLayer) {
                for (const feature of ev.features) {
                    feature.properties.place_name = feature.place_name;
                    // set layer/feature ids
                    feature.id = feature.properties._fId = guidGenerator();
                    // feature.properties._lId = this.searchLayer.id;
                }
                this.searchLayer.updateGeojson({ type: 'FeatureCollection', features: ev.features } as FeatureCollection);
                // this.manager.updateLayerSource(rl, { type: 'FeatureCollection', features: ev.features } as FeatureCollection);
            }
        });

        this.geocoderControl.on('result', (d: any) => {
            if (this.manager && this.manager.events) {
                this.manager.events.publish(CsMap.MAP, CsMap.SEARCH_RESULT_SELECT, d);
            }
        });

        this.geocoderControl.on('clear', () => {
            if (this.manager && this.searchLayer) {
                this.searchLayer.updateGeojson({ type: 'FeatureCollection', features: [] } as FeatureCollection);
            }
        });
    }

    

    private getStyleUri(styleId: string): string {
        const style = this.styles.find(s => s.id === styleId);
        if (style) {
            return style.uri;
        }
        return '';
    }

    private loadTranslations() {
        for (const lang in locales) {
            if (locales.hasOwnProperty(lang)) {
                const messages = locales[lang];
                this.$i18n.mergeLocaleMessage(lang, messages);
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
        if (this.options.showInfoWidget) {
            this.busManager.subscribe($cs.bus, AppState.INFO_WIDGET, (a: string, e: string) => {
                this.$forceUpdate();

            })
        }
        if (this.widget.events) { this.widget.events.publish(CsMap.MAP, CsMap.MAP_LOADED, e); }
        if (this.manager && this.manager.events) {
            this.manager.events.publish(CsMap.MAP, CsMap.MAP_LOADED, e);
        }
    }

    private removeGeocoder() {
        if (this.geocoderControl) {
            this.map.removeControl(this.geocoderControl);
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
        $cs.updateRouteQuery({ lat: center.lat.toFixed(5), lng: center.lng.toFixed(5), z: zoom.toFixed(3), style: this.options.style });        
    }
}
