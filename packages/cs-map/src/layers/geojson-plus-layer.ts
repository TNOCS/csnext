import { MessageBusService, guidGenerator } from '@csnext/cs-core';
import {
    LayerSource,
    MapLayers,
    FeatureEventDetails,
    IMapLayer,
    IMapLayerType,
    ILayerAction
} from './../.';
import extent from '@mapbox/geojson-extent';
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
import { centroid } from 'turf';
import { FeatureCollection, Feature } from 'geojson';
import { debounce } from 'lodash.debounce';
import { MessageBusHandle } from '@csnext/cs-core/dist/utils/message-bus/message-bus-handle';

export class GeojsonPlusLayer implements IMapLayer, IMapLayerType {
    types? = ['poi'];

    public getInstance(init?: Partial<GeojsonPlusLayer>) {
        let result = new GeojsonPlusLayer(init);
        return result;
    }
    public typeId?: string = 'poi';
    public id?: string;
    public type?: 'poi';
    public title?: string;
    public source?: string | LayerSource;
    public visible?: boolean;
    public tags?: string[];
    public color?: string;
    public parentId?: string;
    public filter?: any;
    public _parent?: GeojsonPlusLayer;
    public symbolLayer!: GeojsonLayer;
    public lineLayer!: GeojsonLayer;
    public fillLayer!: GeojsonLayer;
    public circleLayer!: GeojsonLayer;
    public opacity?: number = 100;

    public centerGeoJson?: FeatureCollection;
    public centerSource?: LayerSource;

    // circle style
    public circleLayout!: mapboxgl.CircleLayout;
    public circlePaint!: mapboxgl.CirclePaint;
    public circleHandle?: MessageBusHandle;

    // symbol style
    public symbolLayout!: mapboxgl.SymbolLayout;
    public symbolPaint!: mapboxgl.SymbolPaint;
    public symbolHandle?: MessageBusHandle;

    // line style
    public lineLayout!: mapboxgl.LineLayout;
    public linePaint!: mapboxgl.LinePaint;
    public lineHandle?: MessageBusHandle;

    // fill style
    public fillLayout!: mapboxgl.FillLayout;
    public fillPaint!: mapboxgl.FillPaint;
    public fillHandle?: MessageBusHandle;

    public _manager?: MapLayers;
    public events: MessageBusService;
    public popupContent?: string | Function | undefined;

    constructor(init?: Partial<IMapLayer>) {
        Object.assign(this, init);
        this.events = new MessageBusService();
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

    public getLayerActions(): ILayerAction[] {
        let res: ILayerAction[] = [];
        if (this.Visible) {
            res.push({
                title: 'Zoom to',
                action: () => {
                    if (this._manager) {
                        this._manager.zoomLayer(this);
                    }
                }
            });
            res.push({
                title: 'Hide',
                action: () => {
                    if (this._manager) {
                        this._manager.hideLayer(this);
                    }
                }
            });
        } else {
            res.push({
                title: 'Show',
                action: () => {
                    if (this._manager) {
                        this._manager.showLayer(this);
                    }
                }
            });
        }
        return res;
    }

    public setOpacity(value: number) {
        this.opacity = value;
        if (this.circleLayer) {
            this.circleLayer.setOpacity(value);
        }
        if (this.symbolLayer) {
            this.symbolLayer.setOpacity(value);
        }
        if (this.fillLayer) {
            this.fillLayer.setOpacity(value);
        }
        if (this.lineLayer) {
            this.lineLayer.setOpacity(value);
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

    public createCenterSource() {
        if (this.centerGeoJson) {
            return;
        }
        if (
            this._source &&
            this._source._geojson &&
            this._manager &&
            this._manager._sources
        ) {
            this.centerGeoJson = {
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
                if (nf.geometry.coordinates.length > 1) {
                    this.centerGeoJson.features.push(nf);
                }
            }
            this.centerSource = new LayerSource(this.centerGeoJson);
            this.centerSource.id = this._source.id + '-center';
            this.centerSource._loaded = true;

            this._manager._sources.layers[
                this.centerSource.id
            ] = this.centerSource;
            this._manager.updateSource(this.centerSource);

            this.circleLayer = new GeojsonLayer({
                id: this.id + '-circles',
                type: 'circle',
                popupContent: this.popupContent,
                source: this.centerSource,
                parentId: this.id,
                layout: this.circleLayout ? this.circleLayout : {},
                paint: this.circlePaint
                    ? this.circlePaint
                    : ({
                          'circle-radius': 10,
                          'circle-color': ['get', 'stroke'],
                          'circle-opacity': 0.5,
                          'circle-stroke-width': 1,
                          'circle-stroke-color': ['get', 'stroke'],
                          'circle-stroke-opacity': 1
                      } as CirclePaint),
                filter: ['<=', ['zoom'], 15]
                // filter: ['==', ['geometry-type'], 'Point']
            });

            this.circleLayer = this.circleLayer.initLayer(this._manager);
            // publish all events received from the circle layer            
        }
    }

    public initLayer(manager: MapLayers) {
        // check if we need to create an instance first of maplayer (needed if imported from json)

        // debugger;
        // this.circleLayer = new GeojsonLayer(this);

        if (this.id === undefined) {
            this.id = guidGenerator();
        }
        if (typeof this.source === 'string') {
            if (
                manager._sources &&
                manager._sources.layers.hasOwnProperty(this.source)
            ) {
                this._source = manager._sources.layers[this.source];
            }
        } else {
            this._source = this.source = plainToClass(LayerSource, this.source);
        }
        if (this.title === undefined && this._source && this._source.id) {
            this.title = this._source.id;
        }

        if (!this.popupContent) {
            this.popupContent = (d: Feature) => {
                return d['lngLat'];
            };
        }

        this.symbolLayer = new GeojsonLayer({
            id: this.id + '-symbol',
            type: 'symbol',
            source: this.source,
            parentId: this.id,
            popupContent: this.popupContent,
            layout: this.symbolLayout
                ? this.symbolLayout
                : ({
                      'icon-image': '{icon}',
                      'icon-size': 0.45,
                      'text-field': '{name}',
                      'text-anchor': 'center',
                      'text-size': 12,
                      'text-offset': [0, 1.5],
                      'icon-allow-overlap': true,
                      'icon-ignore-placement': true
                  } as SymbolLayout),
            paint: this.symbolPaint ? this.symbolPaint : {},
            filter: ['==', ['geometry-type'], 'Point']
        });
        this.symbolLayer.initLayer(manager);
        

        this.lineLayer = new GeojsonLayer({
            id: this.id + '-line',
            type: 'line',
            source: this.source,
            parentId: this.id,
            popupContent: this.popupContent,
            layout: this.lineLayout,
            paint: this.linePaint
                ? this.linePaint
                : ({
                      'line-color': ['get', 'stroke'],
                      'line-opacity': ['get', 'stroke-opacity'],
                      'line-width': ['get', 'stroke-width']
                  } as LinePaint),
            filter: ['==', ['geometry-type'], 'LineString']
        });
        this.lineLayer.initLayer(manager);

        this.fillLayer = new GeojsonLayer({
            id: this.id + '-fill',
            type: 'fill',
            source: this.source,
            parentId: this.id,
            popupContent: this.popupContent,
            layout: this.fillLayout,
            paint: this.fillPaint
                ? this.fillPaint
                : ({
                      'fill-color': ['get', 'stroke'],
                      'fill-opacity': ['get', 'stroke-opacity']                      
                  } as FillPaint)
            // filter: ['==', ['geometry-type'], 'Polygon']
        });
        this.fillLayer.initLayer(manager);
        
        // add reference to this maplayers manager
        this._manager = manager;
        this._initialized = true;
        return this;
    }
    pipeEvents(layer: GeojsonLayer, handle?: MessageBusHandle): MessageBusHandle | undefined {
        if (layer.events) {
            if (handle !== undefined) {
                return handle;
            } else {
                return layer.events.subscribe(
                    'feature',
                    (a: string, data: FeatureEventDetails) => {
                        this.events.publish('feature', a, data);
                    }
                );
            }
        }
    }

    removeSubLayer(map: CsMap, layer: GeojsonLayer, handle?: MessageBusHandle) {
        if (layer.events && handle) {
            layer.events.unsubscribe(handle);
            handle = undefined;
        }
        layer.removeLayer(map);

    }

    public addLayer(map: CsMap) {
        if (!this.symbolLayer || !this.lineLayer || !this._manager) {
            return;
        }
        this.createCenterSource();

        // add layers
        this.circleLayer.addLayer(map);
        this.symbolLayer.addLayer(map);
        this.lineLayer.addLayer(map);
        this.fillLayer.addLayer(map);

        // subscribe to events
        this.circleHandle = this.pipeEvents(this.circleLayer, this.circleHandle);
        this.symbolHandle = this.pipeEvents(this.symbolLayer, this.symbolHandle);
        this.lineHandle = this.pipeEvents(this.lineLayer,this.lineHandle);
        this.fillHandle = this.pipeEvents(this.fillLayer, this.fillHandle);
        
        this.Visible = true;
    }


    public removeLayer(map: CsMap) {
        if (!this.symbolLayer || !this.lineLayer) {
            return;
        }

        // remove event handles
        this.removeSubLayer(map, this.lineLayer, this.lineHandle);
        this.removeSubLayer(map, this.symbolLayer, this.symbolHandle);
        this.removeSubLayer(map, this.circleLayer, this.circleHandle);
        this.removeSubLayer(map, this.fillLayer, this.fillHandle);
        
        this.Visible = false;
    }

    public _source?: LayerSource;
    public _initialized? = false;
}
