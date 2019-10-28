import { MessageBusService, guidGenerator } from '@csnext/cs-core';
import {
    LayerSource,
    MapDatasource,
    FeatureEventDetails,
    IMapLayer,
    IMapLayerType,
    ILayerAction,
    ILayerExtensionType,
    ILayerExtension,
    FeatureType,
    FeatureTypes,
    PropertyType,
    PropertyDetails
} from './../.';
import extent from '@mapbox/geojson-extent';
import {
    min,
    max,
    mean,
    median,
    standardDeviation,
    ckmeans,
    uniqueCountSorted
} from 'simple-statistics';
import {
    LngLatBounds,
    CirclePaint,
    SymbolLayout,
    LinePaint,
    FillPaint
} from 'mapbox-gl';
import { CsMap } from './..';
import mapboxgl from 'mapbox-gl';
import { plainToClass } from 'class-transformer';
import { GeojsonLayer } from './geojson-layer';
import centroid from '@turf/centroid';
import { FeatureCollection, Feature } from 'geojson';
import { MessageBusHandle } from '@csnext/cs-core';
import { LayerStyle, MapboxStyles } from '../classes/layer-style';
import { BaseLayer } from './base-layer';
import { LayerLegend } from '../classes/layer-legend';
import { PropertyCollection } from '../classes/feature-type';
import Axios from 'axios';
import { MetaFile } from '../classes/meta-file';
import { uniq } from 'lodash';

export type LayerFeatureTypes = { [key: string]: FeatureType };
export class GeojsonPlusLayer extends BaseLayer
    implements IMapLayer, IMapLayerType {
    types?= ['poi', 'geojson'];

    public getInstance(init?: Partial<GeojsonPlusLayer>) {
        let result = new GeojsonPlusLayer(init);
        return result;
    }
    public typeId?: string = 'poi';
    public type?: 'poi';
    public source?: string | LayerSource;
    public visible?: boolean;
    public tags: string[] = [];

    public parentId?: string;
    public filter?: any;
    public iconZoomLevel?: number;
    public _parent?: GeojsonPlusLayer;
    public _symbolLayer!: GeojsonLayer;
    public _centerLayer!: GeojsonLayer;
    public _lineLayer!: GeojsonLayer;
    public _fillLayer!: GeojsonLayer;
    public _circleLayer!: GeojsonLayer;
    public style!: LayerStyle;
    public _centerHandle?: MessageBusHandle;
    public isEditable?: boolean;
    public isLive?: boolean;
    public _centerGeoJson?: FeatureCollection;
    public _centerSource?: LayerSource;
    public featureTypes?: FeatureTypes;
    public featureTypesUrl?: string;

    // circle style
    public _circleLayout?: mapboxgl.CircleLayout;
    public _circlePaint?: mapboxgl.CirclePaint;
    public _circleHandle?: MessageBusHandle;

    // symbol style
    public _symbolLayout?: mapboxgl.SymbolLayout;
    public _symbolPaint?: mapboxgl.SymbolPaint;
    public _symbolHandle?: MessageBusHandle;

    // line style
    public _lineLayout?: mapboxgl.LineLayout;
    public _linePaint?: mapboxgl.LinePaint;
    public _lineHandle?: MessageBusHandle;

    // fill style
    public _fillLayout?: mapboxgl.FillLayout;
    public _fillPaint?: mapboxgl.FillPaint;
    public _fillHandle?: MessageBusHandle;

    public _manager?: MapDatasource;
    public _events: MessageBusService;
    public popupContent?: string | Function | undefined;
    public extensions?: ILayerExtensionType[];
    public _extensions: ILayerExtension[] = [];

    public socketEmitters: { [key: string]: SocketIOClient.Emitter } = {};

    constructor(init?: Partial<IMapLayer>) {
        super();
        Object.assign(this, init);
        this._events = new MessageBusService();
    }

    public get Visible(): boolean | undefined {
        return this.visible;
    }

    public set Visible(value: boolean | undefined) {
        if (this.visible === value) {
            return;
        }
        this.visible = value;
    }

    public updateLegends() {
        let result: LayerLegend[] = [];
        if (this.style && this.style.mapbox) {
            for (const styleKey of Object.keys(this.style.mapbox)) {
                if (styleKey) {
                    result = result.concat(this.getStyleLegendKey(styleKey));
                }
            }
        }
        this._legends = result;
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
                (property as PropertyDetails).legends!.forEach(l => {
                    if (this.style && this.style._originalMapbox) {
                        l.style[l.styleProperty] = this.style._originalMapbox[
                            l.styleKey
                        ][l.styleProperty];
                    }
                });
            }
        }
        if (this._manager && refreshLayer) {
            this._manager.refreshLayer(this);
        }
        this.updateLegends();
        // console.log(this._legends);
    }

    public updateMeta() {
        if (!this.defaultFeatureType || !this.featureTypes || !this.featureTypes.hasOwnProperty(this.defaultFeatureType)) {
            return;
        };
        const ft = this.featureTypes[this.defaultFeatureType];
        if (!ft.properties || !ft.propertyMap || !this._source || !this._source._geojson) { return; }
        let source = this._source!._geojson;

        for (const prop of ft.properties) {
            if (!prop._values) {
                prop._values = [];
            }
            console.log(prop.type);
        }

        // for (const feature of source.features) {
        if (source.features && source.features.length > 0) {
            //   let feature = source.features[0];
            for (const feature of source.features) {
                if (feature.properties) {
                    for (const prop of ft.properties) {
                        if (prop.label && feature.properties.hasOwnProperty(prop.label)) {
                            if (prop.type !== undefined) {
                                let value = feature.properties[prop.label];
                                if (
                                    prop.type === 'number' &&
                                    typeof value === 'string'
                                ) {
                                    value = parseFloat(value);
                                    feature.properties[prop.label] = value;
                                }
                                prop._values!.push(value);
                            }

                        }

                    }
                }
            }
        }

        for (const proptype of ft.properties) {
            if (proptype._values) {
                proptype.count = proptype._values.length;
                let unique: any[] = uniq(proptype._values);
                proptype.unique = unique.length;
                if (proptype.unique < 7) {
                    // proptype.options =  unique.reduce(i => ) new Map(unique, (i) => [i,i] as [string, string]);
                }

                if (proptype.type === 'number' && proptype._values) {
                    if (unique.length > 1) {
                        proptype.min = parseFloat(
                            min(proptype._values).toString()
                        );
                        proptype.max = parseFloat(
                            max(proptype._values).toString()
                        );
                        proptype.mean = mean(proptype._values);
                        if (proptype.count > 10) {
                            proptype.median = median(proptype._values);
                            proptype.sd = standardDeviation(
                                proptype._values
                            );
                        }
                    }

                    // let steps = ckmeans(proptype._values, 5);
                    // proptype.legend = {};
                }
                delete proptype._values;
            }
        }
    }

    public setLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer = true
    ) {
        if (typeof property === 'string') {
            // find property details
            if (
                this.featureTypes &&
                this.featureTypes.hasOwnProperty('main') &&
                this.featureTypes['main'].properties
            ) {
                let val = property;
                property = {
                    type: this.featureTypes['main'].properties[property],
                    key: val
                } as any;
            }
        }
        if (property.hasOwnProperty('key')) {
            if (this.style && this.style.mapbox) {
                let propdetails = property as PropertyDetails;
                if (propdetails.type && propdetails.type.min && propdetails.type.max) {
                    let color = {
                        property: propdetails.key,
                        stops: [
                            // "temperature" is 0   -> circle color will be blue
                            [propdetails.type!.min, 'blue'],
                            // "temperature" is 100 -> circle color will be red
                            [propdetails.type!.max, 'red']
                        ]
                    };
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
        if (this._manager && refreshLayer) {
            // this._manager.refreshLayer(this);
        }
        this.updateLegends();
        console.log(this._legends);
    }

    public updateLayer() {
        console.log('Updating geojson plus layer');
        console.log(this);
        if (this._manager) {
            this.initLayer(this._manager);
            this._manager.refreshLayer(this);
        }
    }

    public setOpacity(value: number) {
        this.opacity = value;
        if (this._circleLayer) {
            this._circleLayer.setOpacity(value);
        }
        if (this._centerLayer) {
            this._centerLayer.setOpacity(value);
        }
        if (this._symbolLayer) {
            this._symbolLayer.setOpacity(value);
        }
        if (this._fillLayer) {
            this._fillLayer.setOpacity(value);
        }
        if (this._lineLayer) {
            this._lineLayer.setOpacity(value);
        }
    }

    public getBounds(): LngLatBounds | undefined {
        if (this._source) {
            // create a clone of geojson source, otherwise all features will be reset, bug mapbox?
            let geo = { ...this._source._geojson };
            try {
                let bounds = extent(geo);
                return bounds;
            } catch {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public moveLayer(beforeId?: string) {
        if (this._manager && this._manager.MapControl && this.id) {
            const map = this._manager.MapControl;
            if (this._fillLayer) map.moveLayer(this._fillLayer.id!, beforeId);
            if (this._centerLayer)
                map.moveLayer(this._centerLayer.id!, beforeId);
            if (this._circleLayer)
                map.moveLayer(this._circleLayer.id!, beforeId);
            if (this._symbolLayer)
                map.moveLayer(this._symbolLayer.id!, beforeId);
            if (this._lineLayer) map.moveLayer(this._lineLayer.id!, beforeId);
        }
    }

    private registerLayerExtensions() {
        if (this.extensions) {
            this.extensions.forEach(ext => {
                const extensionType = CsMap.layerExtensions.find(
                    le => le.id === ext.id
                );
                if (extensionType && extensionType.getInstance) {
                    const extension = extensionType.getInstance(ext.options);
                    this._extensions.push(extension);
                    extension.start(this);
                } else {
                    console.warn(`Could not find extension ${ext.id}`);
                }
            });
        }
    }

    public createCenterSource() {
        if (this.iconZoomLevel === undefined) {
            return;
        }
        if (this._centerGeoJson) {
            return;
        }
        if (
            this._source &&
            this._source._geojson &&
            this._manager &&
            this._manager._sources
        ) {
            this._centerGeoJson = {
                type: 'FeatureCollection',
                features: []
            } as FeatureCollection;
            for (const f of this._source._geojson.features) {
                let nf = {
                    type: 'Feature',
                    properties: f.properties,
                    id: f.id
                } as Feature;
                nf.geometry = { type: 'Point', coordinates: [] };

                try {
                    switch (f.geometry.type) {
                        case 'LineString':
                            nf.geometry = centroid(f).geometry; //.coordinates[0];
                            break;
                        case 'Polygon':
                            nf.geometry = centroid(f).geometry;
                            break;
                        case 'Point':
                            nf.geometry = f.geometry;

                            break;
                    }
                } catch (e) {
                    console.log('Error calculating center');
                }
                if (nf.geometry.coordinates.length > 1) {
                    this._centerGeoJson.features.push(nf);
                }
            }
            this._centerSource = new LayerSource(this._centerGeoJson);
            this._centerSource.id = this._source.id + '-center';
            this._centerSource._loaded = true;

            this._manager._sources.layers[
                this._centerSource.id
            ] = this._centerSource;
            this._manager.updateSource(this._centerSource);

            this._centerLayer = new GeojsonLayer({
                id: this.id + '-center',
                type: 'circle',
                popupContent: this.popupContent,
                source: this._centerSource,
                parentId: this.id,
                layout: this._circleLayout ? this._circleLayout : {},
                paint: this._circlePaint
                    ? this._circlePaint
                    : ({
                        'circle-radius': 10,
                        'circle-color': ['get', 'stroke'],
                        'circle-opacity': 0.5,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': ['get', 'stroke'],
                        'circle-stroke-opacity': 1
                    } as CirclePaint),
                filter: ['<=', ['zoom'], this.iconZoomLevel]
                // filter: ['==', ['geometry-type'], 'Point']
            });

            this._centerLayer.initLayer(this._manager);

            this._symbolLayer = new GeojsonLayer({
                id: this.id + '-symbol',
                type: 'symbol',
                source: this._centerSource,
                parentId: this.id,
                style: this.style,
                popupContent: this.popupContent,
                layout: this._symbolLayout
                    ? this._symbolLayout
                    : ({
                        'icon-size': 0.45,
                        'text-field': this.style.mapTitle,
                        'text-anchor': 'center',
                        'text-size': 12,
                        'text-offset': [0, 1.5],
                        'text-ignore-placement': true,
                        'text-allow-overlap': true,
                        'icon-allow-overlap': true,
                        'icon-ignore-placement': true
                    } as SymbolLayout),
                paint: this._symbolPaint ? this._symbolPaint : {},
                filter: ['<=', ['zoom'], this.iconZoomLevel]
            });
            this._symbolLayer.initLayer(this._manager);
            // publish all events received from the circle layer
        }
    }

    private async initFeatureTypes() {
        if (this.featureTypes) {
            let keys = Object.keys(this.featureTypes);
            Object.keys(this.featureTypes).forEach(k => {
                if (this.featureTypes && this.featureTypes.hasOwnProperty(k)) {
                    this.featureTypes[k] = plainToClass(
                        FeatureType,
                        this.featureTypes[k]
                    );

                    let type = this.featureTypes[k] as FeatureType;
                    if (type.properties) {
                        type.propertyMap = {};
                        for (const prop of type.properties) {
                            if (prop.label) {
                                type.propertyMap[prop.label] = prop;
                            }

                        }
                        // type.propertyMap = type.properties.reduce((map, obj) => {
                        //     map[obj.label] = obj;
                        //     return map;
                        // }, {});
                    }
                }
            });

            this.featureTypes = plainToClass(
                FeatureTypes,
                this.featureTypes
            ) as FeatureTypes;


            this.updateMeta();

        }
    }

    public async initLayer(manager: MapDatasource) {
        // check if we need to create an instance first of maplayer (needed if imported from json)

        if (this.id === undefined) {
            this.id = guidGenerator();
        }



        if (this.featureTypesUrl && !this.featureTypes) {
            MetaFile.loadMetaUrl(this.featureTypesUrl).then(r => {
                if (r.featureTypes) {
                    this.featureTypes = r.featureTypes;
                    this.initFeatureTypes();
                }
            })
        } else {
            this.initFeatureTypes();
        }

        console.log('Loading source');

        if (!this._source) {
            if (typeof this.source === 'string') {
                if (
                    manager._sources &&
                    manager._sources.layers.hasOwnProperty(this.source)
                ) {
                    this._source = manager._sources.layers[this.source];
                }
            } else {
                this._source = this.source = plainToClass(
                    LayerSource,
                    this.source
                );
            }
        }
        if (this.title === undefined && this._source && this._source.id) {
            this.title = this._source.id;
        }

        this.style = plainToClass(LayerStyle, {
            ...({
                title: '{{title}}',
                fill: false,
                mapbox: {},
                types: []
            } as LayerStyle),
            ...this.style
        });


        this.initFeatureTypes();



        this.style.mapbox = plainToClass(MapboxStyles, this.style.mapbox);

        if (this.style.types!.includes('point')) {
            if (!this.style.mapbox!.symbolLayout)
                this.style.mapbox!.symbolLayout = {};
            if (!this.style.mapbox!.symbolPaint)
                this.style.mapbox!.symbolPaint = {};
            if (!this.style.mapbox!.circleLayout)
                this.style.mapbox!.circleLayout = {};
            if (!this.style.mapbox!.circlePaint)
                this.style.mapbox!.circlePaint = {};
        }

        if (this.style.types!.includes('line')) {
            if (!this.style.mapbox!.lineLayout)
                this.style.mapbox!.lineLayout = {};
            if (!this.style.mapbox!.linePaint)
                this.style.mapbox!.linePaint = {};
        }

        if (this.style.types!.includes('fill')) {
            if (!this.style.mapbox!.fillLayout)
                this.style.mapbox!.fillLayout = {};
            if (!this.style.mapbox!.fillPaint)
                this.style.mapbox!.fillPaint = {};
        }

        if (this.style && this.style.mapbox) {
            this._symbolLayout = this.style.mapbox.symbolLayout;
            this._symbolPaint = this.style.mapbox.symbolPaint;
            this._circlePaint = this.style.mapbox.circlePaint;
            this._circleLayout = this.style.mapbox.circleLayout;
            this._fillPaint = this.style.mapbox.fillPaint;
            this._linePaint = this.style.mapbox.linePaint;
        }

        // store original layouts
        if (!this.style._originalMapbox) {
            this.style._originalMapbox = JSON.parse(
                JSON.stringify(this.style.mapbox)
            );
        }

        if (!this.popupContent) {
            this.popupContent = (d: FeatureEventDetails) => {
                return this.parsePopup(d.feature);
            };
        }

        if (this.style.pointCircle === true) {
            this._circleLayer = new GeojsonLayer({
                id: this.id + '-circles',
                type: 'circle',
                popupContent: this.popupContent,
                source: this.source,
                parentId: this.id,
                layout: this._circleLayout,
                paint: this._circlePaint,
                filter: ['all']
            });
            if (this.style.pointCircle) {
                this._circleLayer.filter.push([
                    '==',
                    ['geometry-type'],
                    'Point'
                ]);
            }
            this._circleLayer.initLayer(manager);
        }

        // make sure a text style is available
        if (this.style.mapTitle) {
            this.style.mapbox!.symbolLayout = {
                ...{
                    'text-field': this.style.mapTitle,
                    'text-anchor': 'center',
                    'text-size': 12,
                    'text-offset': [0, 1.5]
                },
                ...this.style.mapbox!.symbolLayout
            };
        }

        this._symbolLayer = new GeojsonLayer({
            id: this.id + '-symbol',
            type: 'symbol',
            source: this.source,
            parentId: this.id,
            style: this.style,
            popupContent: this.popupContent,
            paint: this._symbolPaint,
            layout: this._symbolLayout,
            filter: ['==', ['geometry-type'], 'Point']
        });

        this._symbolLayer.initLayer(manager);

        this._lineLayer = new GeojsonLayer({
            id: this.id + '-line',
            type: 'line',
            source: this.source,
            parentId: this.id,
            popupContent: this.popupContent,
            layout: this._lineLayout,
            paint: this._linePaint
                ? this._linePaint
                : ({
                    'line-color': ['get', 'stroke'],
                    'line-opacity': ['get', 'stroke-opacity'],
                    'line-width': ['get', 'stroke-width']
                } as LinePaint),
            filter: ['all']
        });
        if (!this.style.line) {
            this._lineLayer.filter.push([
                '==',
                ['geometry-type'],
                'LineString'
            ]);
        }
        if (this.iconZoomLevel !== undefined) {
            this._lineLayer.filter.push(['>=', ['zoom'], this.iconZoomLevel]);
        }
        this._lineLayer.initLayer(manager);

        this._fillLayer = new GeojsonLayer({
            id: this.id + '-fill',
            type: 'fill',
            source: this.source,
            parentId: this.id,
            popupContent: this.popupContent,
            layout: this._fillLayout,

            paint: this._fillPaint
                ? this._fillPaint
                : ({
                    'fill-color': ['get', 'color'],
                    'fill-opacity': ['get', 'stroke-opacity']
                } as FillPaint),
            filter: ['all']
        });

        if (!this.style.fill) {
            this._fillLayer.filter.push(['==', ['geometry-type'], 'Polygon']);
        }
        if (this.iconZoomLevel !== undefined) {
            this._fillLayer.filter.push(['>=', ['zoom'], this.iconZoomLevel]);
        }
        this._fillLayer.initLayer(manager);

        if (this.style) {
            // if specified, set default legend
            if (this.style.defaultLegendProperty) {
                this.setLegend(this.style.defaultLegendProperty, false);
            }
        }

        this.updateLegends();

        // add reference to this maplayers manager
        this._manager = manager;
        this._initialized = true;
        return this;
    }

    pipeEvents(
        map: CsMap,
        layer?: GeojsonLayer,
        handle?: MessageBusHandle
    ): MessageBusHandle | undefined {
        if (layer && layer._events) {
            if (handle !== undefined) {
                return handle;
            } else {
                layer.addLayer(map);
                return layer._events.subscribe(
                    'feature',
                    (a: string, data: FeatureEventDetails) => {
                        if (a === CsMap.FEATURE_SELECT) {
                            this._events.publish('feature', a, data);
                        }
                    }
                );
            }
        }
    }

    removeSubLayer(
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

    public addLayer(map: CsMap) {
        if (!this._symbolLayer || !this._lineLayer || !this._manager) {
            return;
        }
        this.createCenterSource();
        this.registerLayerExtensions();

        // subscribe to events
        this._circleHandle = this.pipeEvents(
            map,
            this._circleLayer,
            this._circleHandle
        );
        this._centerHandle = this.pipeEvents(
            map,
            this._centerLayer,
            this._centerHandle
        );
        this._symbolHandle = this.pipeEvents(
            map,
            this._symbolLayer,
            this._symbolHandle
        );
        this._lineHandle = this.pipeEvents(
            map,
            this._lineLayer,
            this._lineHandle
        );
        this._fillHandle = this.pipeEvents(
            map,
            this._fillLayer,
            this._fillHandle
        );

        this.Visible = true;
    }

    private removeExtensions() {
        if (this._extensions && this._extensions.length) {
            this._extensions.forEach(extension => {
                extension.stop();
            });
            this._extensions.length = 0;
        }
    }

    public removeLayer(map: CsMap) {
        console.log('Removing layer');
        this.removeExtensions();

        if (!this._symbolLayer || !this._lineLayer) {
            return;
        }

        // remove event handles
        this._lineHandle = this.removeSubLayer(
            map,
            this._lineLayer,
            this._lineHandle
        );
        this._symbolHandle = this.removeSubLayer(
            map,
            this._symbolLayer,
            this._symbolHandle
        );
        this._circleHandle = this.removeSubLayer(
            map,
            this._circleLayer,
            this._circleHandle
        );
        this._centerHandle = this.removeSubLayer(
            map,
            this._centerLayer,
            this._centerHandle
        );
        this._fillHandle = this.removeSubLayer(
            map,
            this._fillLayer,
            this._fillHandle
        );

        this.Visible = false;
    }

    public _source?: LayerSource;
    public _initialized?= false;
}
