import { MessageBusService, guidGenerator } from '@csnext/cs-core';
import {
    LayerSource,
    MapLayers,
    FeatureEventDetails,
    IMapLayer,
    IMapLayerType
} from './../.';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds, CirclePaint, SymbolLayout } from 'mapbox-gl';
import { CsMap } from './..';
import mapboxgl from 'mapbox-gl';
import { plainToClass } from 'class-transformer';
import { GeojsonLayer } from './geojson-layer';

export class PoiLayer implements IMapLayer, IMapLayerType {
    types? = ['poi'];

    public getInstance(init?: Partial<PoiLayer>) {
        let result = new PoiLayer(init);
        return result;
    }
    public typeId?: string = 'poi';
    public id?: string;
    public type?: 'poi';
    public title?: string;
    public source?: string | LayerSource;
    public visible?: boolean;
    public tags?: string[];
    public parentId?: string;
    public _parent?: PoiLayer;
    public iconLayer?: GeojsonLayer;
    public circleLayer?: GeojsonLayer;

    public circleLayout?: mapboxgl.CircleLayout;
    public circlePaint?: mapboxgl.CirclePaint;

    public symbolLayout?: mapboxgl.SymbolLayout;
    public symbolPaint?: mapboxgl.SymbolPaint;

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

    public getBounds(): LngLatBounds | undefined {
        if (this.iconLayer) {
            return this.iconLayer.getBounds();
        } else {
            return undefined;
        }
    }

    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });

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

        this.circleLayer = new GeojsonLayer({
            id: this.id + '-circles',
            type: 'circle',
            popupContent: this.popupContent,
            source: this.source,
            parentId: this.id,
            layout: this.circleLayout ? this.circleLayout : {},
            paint: this.circlePaint
                ? this.circlePaint
                : ({
                      'circle-radius': 20,
                      'circle-color': ['get', 'circle-color'],
                      'circle-opacity': 0.5,
                      'circle-stroke-width': 1,
                      'circle-stroke-color': '#fff',
                      'circle-stroke-opacity': 1
                  } as CirclePaint)
        });
        this.circleLayer = this.circleLayer.initLayer(manager);

        // publish all events received from the circle layer
        // if (this.circleLayer.events) {
        //     this.circleLayer.events.subscribe(
        //         'feature',
        //         (a: string, data: FeatureEventDetails) => {
        //             this.events.publish('feature', a, data);
        //         }
        //     );
        // }

        this.iconLayer = new GeojsonLayer({
            id: this.id + '-symbol',
            type: 'symbol',
            source: this.source,
            parentId: this.id,
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
            paint: this.symbolPaint ? this.symbolPaint : {}
        });
        this.iconLayer.initLayer(manager);

        // add reference to this maplayers manager
        this._manager = manager;
        this._initialized = true;
        return this;
    }

    public addLayer(map: CsMap) {
        if (!this.iconLayer || !this.circleLayer) {
            return;
        }
        this.circleLayer.addLayer(map);
        this.iconLayer.addLayer(map);
        this.Visible = true;
    }

    public removeLayer(map: CsMap) {
        if (!this.iconLayer || !this.circleLayer) {
            return;
        }
        this.circleLayer.removeLayer(map);
        this.iconLayer.removeLayer(map);
        this.Visible = false;
    }

    public _source?: LayerSource;
    public _initialized? = false;
}
