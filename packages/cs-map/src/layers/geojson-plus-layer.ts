import {
    MapDatasource,
    FeatureEventDetails,
    IMapLayer,
    PropertyDetails
} from './../.';
import extent from '@mapbox/geojson-extent';

import {
    LngLatBounds,
    StyleFunction,
    LngLatLike
} from 'mapbox-gl';
import { CsMap } from './..';
import { PropertyType, MetaUtils, FeatureTypes, LayerLegend } from '@csnext/cs-data';
import mapboxgl from 'mapbox-gl';
import { GeojsonLayer } from './geojson-layer';
import { MessageBusHandle } from '@csnext/cs-core';
import { BaseLayer } from './base-layer';
import { LayerStyle } from '../classes/layer-style';
import { CsWidget } from '@csnext/cs-client';
import { Geometry } from 'geojson';

export class GeojsonPlusLayer extends GeojsonLayer implements IMapLayer {

    public colorSchemes =
        {
            BuGn: [['#e5f5f9', '#2ca25f'], ['#e5f5f9', '#99d8c9', '#2ca25f'], ['#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'], ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'], ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c']],
            BuPu: [['#e0ecf4', '#8856a7'], ['#e0ecf4', '#9ebcda', '#8856a7'], ['#edf8fb', '#b3cde3', '#8c96c6', '#88419d'], ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'], ['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c']],
            GnBu: [['#e0f3db', '#43a2ca'], ['#e0f3db', '#a8ddb5', '#43a2ca'], ['#f0f9e8', '#bae4bc', '#7bccc4', '#2b8cbe'], ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'], ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#43a2ca', '#0868ac']],
            OrRd: [['#fee8c8', '#e34a33'], ['#fee8c8', '#fdbb84', '#e34a33'], ['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f'], ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'], ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000']],
            PuBu: [['#ece7f2', '#2b8cbe'], ['#ece7f2', '#a6bddb', '#2b8cbe'], ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'], ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'], ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d']],
            Greys: [['#f0f0f0', '#636363'], ['#f0f0f0', '#bdbdbd', '#636363'], ['#f7f7f7', '#cccccc', '#969696', '#525252'], ['#f7f7f7', '#cccccc', '#969696', '#636363', '#252525'], ['#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#636363', '#252525']],
            Blues: [['#deebf7', '#3182bd'], ['#deebf7', '#9ecae1', '#3182bd'], ['#eff3ff', '#bdd7e7', '#6baed6', '#2171b5'], ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'], ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c']],
            BrBg: [['#d8b365', '#5ab4ac'], ['#d8b365', '#f5f5f5', '#5ab4ac'], ['#a6611a', '#dfc27d', '#80cdc1', '#018571'], ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'], ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e']],
            PuOr: [['#f1a340', '#998ec3'], ['#f1a340', '#f7f7f7', '#998ec3'], ['#e66101', '#fdb863', '#b2abd2', '#5e3c99'], ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'], ['#b35806', '#f1a340', '#fee0b6', '#d8daeb', '#998ec3', '#542788']],
            Spectral: [['#fc8d59', '#99d594'], ['#fc8d59', '#ffffbf', '#99d594'], ['#d7191c', '#fdae61', '#abdda4', '#2b83ba'], ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba'], ['#d53e4f', '#fc8d59', '#fee08b', '#e6f598', '#99d594', '#3288bd']]

        }
    public iconZoomLevel?: number;
    public isEditable?: boolean;
    public isLive?: boolean;
    public socketEmitters: { [key: string]: SocketIOClient.Emitter } = {};
    public type?: 'poi';
    public bookmarks: mapboxgl.MapboxGeoJSONFeature[] = [];
    public featureTypes?: FeatureTypes;
    public activeFeatureTypes?: string[];

    private clickEvent = this.onClick.bind(this);
    private contextMenuEvent = this.onContextMenu.bind(this);
    private enterEvent = this.onEnter.bind(this);
    private leaveEvent = this.onLeave.bind(this);
    private moveEvent = this.onMove.bind(this);
    private mapEventsRegistered = false;
    private symbolLayer?: mapboxgl.Layer;
    private clusterLayer?: mapboxgl.Layer;
    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });
    private hoveredStateId: any = null;

    constructor(init?: Partial<IMapLayer>) {
        super(init);
        // this.events = new MessageBusService();
    }

    public addCircleSymbol() {
        if (!this.style || !this._source || !this.style.showSymbol) { return; }
        const imageId = this.id + '-symbol';
        const symbolLayout = { ...{ 'icon-image': imageId }, ...this.style.mapbox?.symbolLayout };
        if (this.style.icon) {
            this.addImage(imageId, this.style.icon);
        }
        this.symbolLayer = {
            id: this.id + '-circle',
            type: 'symbol',
            source: this._source.id,
            interactive: true,
            layout: symbolLayout
        } as mapboxgl.Layer;
        this.addSupportLayer(this.symbolLayer);
    }

    public addClusterLayer() {
        this.clusterLayer = {
            id: 'clusters',
            type: 'circle',
            source: this._source?.id,
            filter: ['has', 'point_count'],
            paint: this.style?.clusterSettings?.paint ?? {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#e0f3db',
                    50,
                    '#a8ddb5',
                    450,
                    '#43a2ca'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    50,
                    30,
                    450,
                    40
                ]
            }
        };
        this.addSupportLayer(this.clusterLayer);

        this.addSupportLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: this._source?.id,
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });
    }

    public toggleBookmark(bookmark: mapboxgl.MapboxGeoJSONFeature): boolean {
        if (this.bookmarks.includes(bookmark)) {
            return this.removeBookmark(bookmark);
        } else {
            return this.addBookmark(bookmark);
        }
    }

    public addBookmark(bookmark: mapboxgl.MapboxGeoJSONFeature): boolean {
        this.bookmarks.push(bookmark);
        this._manager?.events.publish('bookmarks', 'updated');
        return true;
    }

    public removeBookmark(bookmark: mapboxgl.MapboxGeoJSONFeature): boolean {
        const index = this.bookmarks.findIndex(b => b.id === bookmark.id);
        if (index >= 0) {
            this.bookmarks.splice(index, 1);
        }
        this._manager?.events.publish('bookmarks', 'updated');
        return true;
    }


    public addLayer(widget: CsMap) {
        super.addLayer(widget);
        this.registerMapEvents(widget.map, widget.options.mouseEventsOnIcon);
        this.registerLayerExtensions();
        this.updateImages();
        this.addCircleSymbol();
        if (this.style?.clusterSettings?.cluster) {
            this.addClusterLayer();
        }
    }

    public setFilter(filter: any[]) {
        super.setFilter(filter);
        this.updateFilters();
    }

    public getBounds(): LngLatBounds | undefined {
        if (this._source) {
            // create a clone of geojson source, otherwise all features will be reset, bug mapbox?
            const geo = { ...this._source._data };
            try {
                const bounds = extent(geo);
                return bounds;
            } catch {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public getInstance(init?: Partial<GeojsonPlusLayer>) {
        const result = new GeojsonPlusLayer();
        return result;
    }

    public async initLayer(manager: MapDatasource): Promise<IMapLayer> {
        return new Promise(async (resolve, reject) => {
            await super.initLayer(manager);

            // store original layouts
            if (this.style && this.style.mapbox && !this.style._originalMapbox) {
                this.style._originalMapbox = JSON.parse(
                    JSON.stringify(this.style.mapbox)
                );
            }

            if (!this.popupContent) {
                this.popupContent = (d: FeatureEventDetails) => {
                    return this.parsePopup(d.feature);
                };
            }

            // make sure a text style is available
            if (this.style && this.style.mapTitle && this.style.type === 'symbol') {
                this.layout['text-field'] = this.style.mapTitle;
                this.layout['text-anchor'] = 'center';
                this.layout['text-size'] = 12;
                this.layout['text-offset'] = [0, 1.5];
            }

            this.updateFilters();

            if (this.style) {
                // if specified, set default legend
                if (this.style.defaultLegendProperty) {
                    this.setLegend(this.style.defaultLegendProperty, false);
                }
            } else {
                this.updateLegends();
            }

            // add reference to this maplayers manager
            this._manager = manager;
            this._initialized = true;
            resolve(this);
        });
    }

    public moveLayer(beforeId?: string) {
        super.moveLayer(beforeId);
    }

    public removeLayer(widget: CsMap) {
        super.removeLayer(widget);
        this.removeExtensions();
        this.unregisterMapEvents(widget.map, widget.options.mouseEventsOnIcon);
    }

    public removeLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer = true
    ) {
        if (typeof property === 'string') {
            // AppState.Instance.TriggerNotification({
            //     title: 'set property ' + property
            // });
        } else if (property.hasOwnProperty('key')) {
            if (this.style && this.style.mapbox) {
                for (const l of (property as PropertyDetails).legends!) {
                    if (this.style && this.style._originalMapbox) {
                        l.style[l.styleProperty] = this.style._originalMapbox[
                            l.styleKey
                        ][l.styleProperty];
                    }
                }
            }
        }
        this.updateLegends();
        if (this._manager && refreshLayer) {
            this._manager.refreshLayer(this);
        }
    }

    public removeSubLayer(
        map: CsMap,
        layer?: GeojsonLayer,
        handle?: MessageBusHandle
    ): MessageBusHandle | undefined {
        if (!layer) {
            return;
        }
        if (layer._events && handle) {
            layer._events.unsubscribe(handle);
            handle = undefined;
        }
        layer.removeLayer(map);
        return handle;
    }

    public async setStyle(style: LayerStyle) {
        // const ft = this._source.getFeatureType();
        this.style = { ...this.style, ...style };
        await this.updateLayer();
    }

    public setLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer = true
    ) {
        if (!this._source) { return; }
        const ft = this._source.getFeatureType();
        if (typeof property === 'string') {
            // find property details

            if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(property)) {
                property = { type: ft.propertyMap[property], key: property };
            }
        }
        if (ft && property.hasOwnProperty('key')) {
            if (this.style && this.style.mapbox && this._source) {
                const propdetails = property as PropertyDetails;
                MetaUtils.updateMetaProperty(this._source, ft, propdetails.type as PropertyType);

                if (propdetails.type && propdetails.type._initialized) {
                    if (propdetails.type.legendStyle !== undefined) {
                        for (const style in propdetails.type.legendStyle) {
                            if (propdetails.type.legendStyle.hasOwnProperty(style)) {
                                const st = propdetails.type.legendStyle[style];
                                if (!this.style.mapbox.hasOwnProperty(style)) {
                                    this.style.mapbox[style] = {};
                                }

                                for (const key in st) {
                                    if (propdetails.type.legendStyle[style].hasOwnProperty(key)) {                                        
                                        const element = propdetails.type.legendStyle[style][key];
                                        if (element.hasOwnProperty('expression')) {
                                            this.style.mapbox[style][key] = element.expression;    
                                        } else {
                                            if (!element.hasOwnProperty('property')) {
                                                element.property = propdetails.key;
                                            }
                                            this.style.mapbox[style][key] = element;
                                        }
                                    }
                                }
                            }
                        }

                        // let color = propdetails.type.legendStyle.fillPaint['fill-color'];
                        // this.style.mapbox.fillPaint['fill-color']  = color;
                        // this.style.mapbox = JSON.parse(JSON.stringify(propdetails.type.legendStyle));
                    } else {
                        if (propdetails.type) {
                            const bins = propdetails.type.bins || [propdetails.type.min, propdetails.type.max];
                            let colors = ['#e5f5f9', '#99d8c9', '#2ca25f'];
                            if (Array.isArray(propdetails.type.colorScheme)) {
                                colors = propdetails.type.colorScheme;
                            } else {
                                const scheme = propdetails.type.colorScheme || 'BuPu';
                                if (this.colorSchemes.hasOwnProperty(scheme) && this.colorSchemes[scheme].length >= bins.length - 1) {
                                    colors = this.colorSchemes[scheme][bins.length - 2];
                                }
                            }
                            let stops: any[] = [];
                            for (let i = 0; i < bins.length; i++) {
                                stops.push([bins[i], colors[i]]);;
                            }

                            const color = {
                                property: propdetails.key,
                                // stops: [[0, 'blue'], [5, 'yellow'], [10, 'red']]
                                stops: stops,
                                default: 'grey'
                            } as StyleFunction;

                            if (this.style.mapbox.fillPaint) {
                                this.style.mapbox.fillPaint['fill-color'] = color;
                            }
                            if (this.style.mapbox.circlePaint) {
                                this.style.mapbox.circlePaint['circle-color'] = color;
                            }
                            if (this.style.mapbox.linePaint) {
                                this.style.mapbox.linePaint['line-color'] = color;
                            }
                        }
                    }
                }
            }
        }
        this.updateLegends();
        if (this._manager && refreshLayer) {
            this._manager.refreshLayer(this);
        }
    }

    public setOpacity(value: number) {
        if (!this.style) { return; }
        this.style.opacity = value;
    }

    public setPopupContent(popup: string | ((f: FeatureEventDetails) => {})) {
        this.popupContent = popup;
    }

    public async updateLayer() {
        if (this._manager) {
            await this.initLayer(this._manager);
            this._manager.refreshLayer(this);
        }
    }

    public updateImages() {
        if (this.featureTypes) {
            for (const key in this.featureTypes) {
                if (Object.prototype.hasOwnProperty.call(this.featureTypes, key)) {
                    const ft = this.featureTypes[key];
                    if (ft.icon) {
                        this.addImage(key, ft.icon);
                    }
                }
            }
        }

    }

    public updateLegends() {
        if (!this._source) { return; }
        let result: LayerLegend[] = [];

        let key = '';

        switch (this.style!.type) {
            case 'line':
                key = 'linePaint';
                break;
            case 'fill':
                key = 'fillPaint';
                break;
            default:
                key = 'circlePaint';
        }

        result = result.concat(this.getStyleLegend(key, this.style!.mapbox![key]));
        const featureType = this._source.getFeatureType();
        for (const legend of result) {
            if (legend.property && featureType?.propertyMap && featureType.propertyMap.hasOwnProperty(legend.property)) {
                legend.propertyInfo = featureType.propertyMap[legend.property];
            }
        }

        this._legends = result;
        if (this._manager) {
            this._manager.events.publish('legends', 'updated', this._legends);
        }
    }

    protected registerLayerExtensions() {
        super.registerLayerExtensions();
    }

    protected removeExtensions() {
        super.removeExtensions();
    }

    private isFunction(functionToCheck) {
        return (
            functionToCheck &&
            {}.toString.call(functionToCheck) === '[object Function]'
        );
    }

    public getComponent() {

    }

    private createPopup(widget: CsMap, layer: GeojsonLayer, e: FeatureEventDetails) {
        let popup: string | undefined;
        e.feature = BaseLayer.getFeatureFromEventDetails(e);
        if (this.popupInfoWidget && this.popupInfoWidget.component) {
            const app = new CsWidget();
            app.widget = this.popupInfoWidget;
            app.initWidget();
            if (!app.widget.data) { app.widget.data = {} };
            app.widget.data.event = e;
            // :widget="widget"
            // :style="widgetStyles()"
            let popupContainer = document.createElement('span');
            app.$mount(popupContainer);
            const geom: Geometry = e.feature!.geometry;
            let lngLat: LngLatLike;
            if (geom.type === 'Point') {
                lngLat = geom.coordinates.slice() as [number, number];
            } else if (geom.type === 'LineString') {
                lngLat = geom.coordinates[0].slice() as [number, number];
            } else if (geom.type === 'Polygon') {
                lngLat = geom.coordinates[0][0].slice() as [number, number];
            } else {
                lngLat = widget.map.getCenter();
            }
            this.popup
                .setLngLat(lngLat)
                .setDOMContent(app.$el)
                .addTo(widget.map);
        }
        // if (layer.style && layer.style.popup) {
        //     popup = layer.style.popup;
        // } else
        if (layer.popupContent) {
            if (typeof layer.popupContent === 'string') {
                popup = layer.popupContent;
            } else if (this.isFunction(layer.popupContent)) {
                popup = layer.popupContent(e);
            }
        }
        if (popup) {
            this.popup
                .setLngLat(e.lngLat)
                .setHTML(popup)
                .addTo(widget.map);
        }

    }

    private registerMapEvents(map: mapboxgl.Map, forSymbol: boolean = false) {
        const id = forSymbol ? this.id + '-circle' : this.id;
        if (id && !this.mapEventsRegistered) {
            // map.on('touchend', id, this.clickEvent);
            map.on('click', id, this.clickEvent);
            map.on('contextmenu', id, this.contextMenuEvent);
            map.on('mousemove', id, this.moveEvent);
            map.on('mouseenter', id, this.enterEvent);
            map.on('mouseleave', id, this.leaveEvent);
            this.mapEventsRegistered = true;
        }
    }

    private unregisterMapEvents(map: mapboxgl.Map, forSymbol: boolean = false) {
        const id = this.id && forSymbol ? this.id + '-circle' : this.id;
        if (id) {
            // map.off('touchend', id, this.clickEvent);
            map.off('click', id, this.clickEvent);
            map.off('contextmenu', id, this.contextMenuEvent);
            map.off('mouseenter', id, this.enterEvent);
            map.off('mouseleave', id, this.leaveEvent);
            map.off('mousemove', id, this.moveEvent);
        }
        this.mapEventsRegistered = false;
    }

    private onContextMenu(e: mapboxgl.MapLayerMouseEvent) {
        if (this.Map && this._events) {
            const feature = (e.features && e.features.length > 0) ? e.features[0] : undefined;
            if (feature) {
                this._events.publish(CsMap.FEATURE, CsMap.FEATURE_CONTEXT, {
                    feature,
                    features: e.features,
                    context: e,
                    lngLat: e.lngLat,
                    layer: this
                } as FeatureEventDetails);
            }
        }
    }

    private onClick(e: mapboxgl.MapLayerMouseEvent) {
        if (this.Map && this._events) {
            const feature = (e.features && e.features.length > 0) ? e.features[0] : undefined;
            if (feature) {
                if (!feature.properties?.cluster) {
                    this._events.publish(CsMap.FEATURE, CsMap.FEATURE_SELECT, {
                        feature,
                        features: e.features,
                        context: e,
                        lngLat: e.lngLat,
                        layer: this
                    } as FeatureEventDetails);
                    if (!(this._manager!.MapWidget as CsMap).featurePickerActivated) {
                        const openDetails = (this.openFeatureDetails === false || this.Map.options.showFeatureDetails === false) ? false : true;
                        this._manager!.selectFeature(feature, this, openDetails);
                    }
                }
            }

        }
    }

    private onEnter(e: mapboxgl.MapLayerMouseEvent) {
        if (this.Map && this._events) {
            this.Map.map.getCanvas().style.cursor = 'pointer';
            this.createPopup(this.Map, this, e as any as FeatureEventDetails);
            this._events.publish(CsMap.FEATURE, CsMap.FEATURE_MOUSE_ENTER, {
                features: e.features,
                context: e
            });
        }
    }

    private onLeave(e) {
        if (this.Map && this._events && this.MapControl) {
            this.Map.map.getCanvas().style.cursor = '';
            if (this.popupContent) { this.popup.remove(); }
            this._events.publish(CsMap.FEATURE, CsMap.FEATURE_MOUSE_LEAVE, {
                features: e.features,
                context: e
            });
            if (this.hoveredStateId && this._source && this._source.id) {
                const fId = { source: this._source.id, id: this.hoveredStateId };
                this.MapControl.setFeatureState(fId, { hover: false });
            }
            this.hoveredStateId = null;
        }
    }

    private onMove(e) {
        if (this.Map && this.MapControl) {
            if (!this.popupInfoWidget && this.popupContent && e && e.features) {
                this.createPopup(this.Map, this, e);
            }
            if (e.features.length > 0 && this._source && this._source.id) {
                if (this.hoveredStateId) {
                    const fId = { source: this._source.id, id: this.hoveredStateId };
                    this.MapControl.setFeatureState(fId, { hover: false });
                }
                this.hoveredStateId = e.features[0].id;
                const fId = { source: this._source.id, id: this.hoveredStateId };
                this.MapControl.setFeatureState(fId, { hover: true });
            }
        }
    }
}
