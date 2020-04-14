import { FormField } from '@csnext/cs-core';
import { MapDatasource, FeatureEventDetails, IMapLayer, PropertyDetails } from '..';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds, StyleFunction } from 'mapbox-gl';
import { CsMap } from '..';
import { PropertyType, MetaUtils, FeatureTypes } from '@csnext/cs-data';
import mapboxgl from 'mapbox-gl';
import { GeojsonLayer } from './geojson-layer';
import { MessageBusHandle } from '@csnext/cs-core';
import { BaseLayer } from './base-layer';
import { LayerLegend } from '../classes/layer-legend';
import { LayerStyle } from '../classes/layer-style';
// import { isNumber } from 'util';

export class OverpassLayer extends GeojsonLayer implements IMapLayer {

    // #region Properties (32)
    public iconZoomLevel?: number;
    public isEditable?: boolean;
    public isLive?: boolean;
    public socketEmitters: { [key: string]: SocketIOClient.Emitter } = {};
    public type?: 'overpass';
    public bookmarks: mapboxgl.MapboxGeoJSONFeature[] = [];
    public featureTypes?: FeatureTypes;
    @FormField({ title: 'Points of Interest', type: 'chips' })
    public pois: string[] = [];

    private clickEvent = this.onClick.bind(this);
    private contextMenuEvent = this.onContextMenu.bind(this);
    private enterEvent = this.onEnter.bind(this);
    private leaveEvent = this.onLeave.bind(this);
    private moveEvent = this.onMove.bind(this);
    private mapEventsRegistered = false;
    private symbolLayer?: mapboxgl.Layer;
    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });

    // #endregion Properties (32)

    // #region Constructors (1)

    constructor(init?: Partial<IMapLayer>) {
        super(init);
        // this.events = new MessageBusService();
    }

    // #endregion Constructors (1)

    // #region Public Methods (17)

    public addCircleSymbol(widget) {
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
        this.registerMapEvents(widget.map);
        this.registerLayerExtensions();
        this.addCircleSymbol(widget);
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

    public getInstance(init?: Partial<OverpassLayer>) {
        const result = new OverpassLayer();
        console.log('Returning overpass instance');
        return result;
    }

    public async initLayer(manager: MapDatasource): Promise<IMapLayer> {
        return new Promise(async (resolve) => {
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
        this.unregisterMapEvents(widget.map);
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
                                        this.style.mapbox[style][key] = element;
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
    // #endregion Public Methods (17)

    // #region Private Methods (5)

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

    private createPopup(widget: CsMap, layer: GeojsonLayer, e: FeatureEventDetails) {
        let popup: string | undefined;
        e.feature = BaseLayer.getFeatureFromEventDetails(e);
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

    private registerMapEvents(map: mapboxgl.Map) {
        if (this.id && !this.mapEventsRegistered) {
            // map.on('touchend', this.id, this.clickEvent);
            map.on('moveend', () => this.panEvent);
            this.mapEventsRegistered = true;
        }
    }

    private unregisterMapEvents(map: mapboxgl.Map) {
        if (this.id) {
            // map.off('touchend', this.id, this.clickEvent);
        }
        this.mapEventsRegistered = false;
    }

    private panEvent(e: mapboxgl.MapboxEvent) {
        if (this.Map && this._events) {
            
        }
    }

    // #endregion Private Methods (5)
}
