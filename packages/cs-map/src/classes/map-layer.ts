import { MessageBusService } from '@csnext/cs-core';
import { LayerSource, MapLayers } from './../.';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds } from 'mapbox-gl';

export class MapLayer {
    public id?: string;
    public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';
    public title?: string;
    public source?: string | LayerSource;
    public visible?: boolean;
    public tags?: string[];
    public parentId?: string;
    public _parent?: MapLayer;
    public layout?:
        | mapboxgl.SymbolLayout
        | mapboxgl.FillLayout
        | mapboxgl.LineLayout
        | mapboxgl.CircleLayout;
    public paint?:
        | mapboxgl.SymbolPaint
        | mapboxgl.LinePaint
        | mapboxgl.FillPaint
        | mapboxgl.CirclePaint;
    public _manager?: MapLayers;
    public events: MessageBusService;
    public popupContent?: string | Function | undefined;

    constructor() {
        this.events = new MessageBusService();
    }

    public get Visible(): boolean | undefined {
        return this.visible;
    }

    public set Visible(value: boolean | undefined) {            
        if (this.visible === value) { return; }
        this.visible = value;        
    }

    public getBounds(): LngLatBounds | undefined {
        if (this._source) {
            // create a clone of geojson source, otherwise all features will be reset, bug mapbox?
            let geo = { ...this._source._geojson};
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

    public _source?: LayerSource;
    public _initialized? = false;
}
