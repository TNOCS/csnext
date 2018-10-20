import { MessageBusService } from '@csnext/cs-core';
import { LayerSource, MapLayers, FeatureEventDetails } from './../.';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds } from 'mapbox-gl';
import { Map } from './..';
import mapboxgl from 'mapbox-gl';

export interface IMapLayer {
    /** layer id */
    id?: string;
    /** layer as shown in interface */
    title?: string;
    /** list of tags, used for clustering in layer selection */
    tags?: string[];

    /** toggle visibility of layer */
    Visible?: boolean;
}

export class MapLayer implements IMapLayer {
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
        if (this.visible === value) {
            return;
        }
        this.visible = value;
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

    private isFunction(functionToCheck) {
        return (
            functionToCheck &&
            {}.toString.call(functionToCheck) === '[object Function]'
        );
    }

    // Create a popup, but don't add it to the map yet.
    private popup = new mapboxgl.Popup({
        closeButton: false
    });

    public addLayer(map: Map) {
        if (!this.id || !this._source) {
            return;
        }
        // remove layer if it already exists
        if (map.map.getLayer(this.id) !== undefined) {
            map.map.removeLayer(this.id);
        }
        let mblayer = {
            id: this.id,
            type: this.type,
            source: this._source.id,
            interactive: true
        } as mapboxgl.Layer;
        if (this.layout) {
            mblayer.layout = this.layout;
        }
        if (this.paint) {
            mblayer.paint = this.paint;
        }
        map.map.addLayer(mblayer);
        this.Visible = true;
        map.zoomLayer(this);
        map.map.on('click', this.id, e => {
            this.click(this, e);
        });
        map.map.on('mousemove', this.id, () => {});
        map.map.on('mouseenter', this.id, e => {
            this.mouseEnter(map, this, e);
        });
        map.map.on('mouseleave', this.id, e => {
            this.mouseLeave(map, this, e);
        });
    }

    public removeLayer(map: Map) {
        if (this.id) {
            map.map.removeLayer(this.id);
        }        
    }

    private click(layer: MapLayer, e: any) {
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_SELECT, {
                features: e.features,
                context: e
            } as FeatureEventDetails);
        }
    }

    private mouseLeave(map: Map, layer: MapLayer, e: any) {
        if (layer.popupContent) this.popup.remove();
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_MOUSE_LEAVE, {
                features: e.features,
                context: e
            });
        }
    }

    private mouseEnter(map: Map, layer: MapLayer, e: any) {
        let popup: string | undefined = undefined;
        if (layer.popupContent) {
            if (typeof layer.popupContent === 'string') {
                popup = layer.popupContent;
            } else if (this.isFunction(layer.popupContent)) {
                popup = layer.popupContent(e);
            }
            if (popup) {
                this.popup
                    .setLngLat(e.lngLat)
                    .setHTML(popup)
                    .addTo(map.map);
            }
        }
        if (layer.events) {
            layer.events.publish('feature', Map.FEATURE_MOUSE_ENTER, {
                features: e.features,
                context: e
            });
        }
    }

    public _source?: LayerSource;
    public _initialized? = false;
}
