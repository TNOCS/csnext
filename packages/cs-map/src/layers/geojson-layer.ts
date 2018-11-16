import { MessageBusService, guidGenerator } from '@csnext/cs-core';
import turf from 'turf';
import {
    LayerSource,
    MapLayers,
    FeatureEventDetails,
    IMapLayer,
    IMapLayerType,
    LayerStyle
} from './../.';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds, SymbolPaint, SymbolLayout } from 'mapbox-gl';
import { CsMap } from './..';
import mapboxgl from 'mapbox-gl';
import { plainToClass } from 'class-transformer';
import { ILayerAction } from '../classes/ilayer-action';
import { Feature, Polygon } from 'geojson';
import {
    ILayerExtension,
    ILayerExtensionType
} from '../classes/ilayer-extension';

export class GeojsonLayer implements IMapLayer, IMapLayerType {
    types = ['symbol', 'raster', 'line', 'fill', 'circle'];

    private mapEventsRegistered = false;
    public getInstance(init?: Partial<IMapLayer>) {
        let result = new GeojsonLayer(init);
        return result;
    }
    public typeId?: string = 'geojson';
    public id?: string;
    public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';
    public title?: string;
    // public opacity?: number;
    public description?: string;
    public source?: string | LayerSource;
    public visible?: boolean;
    public mask?: boolean;
    public tags?: string[];
    public color?: string;
    public style?: LayerStyle;
    public parentId?: string;
    public isEditable?: boolean;
    public _parent?: GeojsonLayer;
    public filter?: any;
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
    public events?: MessageBusService;
    public popupContent?: string | Function | undefined;
    public extensions?: ILayerExtensionType[];
    public _extensions: ILayerExtension[] = [];
    private _opacity?: number;

    constructor(init?: Partial<IMapLayer>) {
        Object.assign(this, init);
        // this.events = new MessageBusService();
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

    public set opacity(value: number | undefined) {
        //    this._opacity = value;
        // this.MapLayers.MapControl.setPaintProperty(layer.id, 'line-opacity', value / 100.0);
        // if (layer.paint) {
        //     layer.paint['raster-opacity'] = value / 100.0;
        // }
        // this.MapLayers.MapControl.setPaintProperty(layer.id, 'raster-opacity', value / 100.0);
    }

    public get opacity(): number | undefined {
        if (
            this._initialized &&
            this.id &&
            this._manager &&
            this._manager.MapControl &&
            this.type
        ) {
            try {
                let maxOpacity = 0;
                for (const prop of this.layerTypeProps()) {
                    const op =
                        this._manager.MapControl.getPaintProperty(
                            this.id,
                            this.type + '-opacity'
                        ) * 100;
                    if (op > maxOpacity) {
                        maxOpacity = op;
                    }
                }
                this._opacity = maxOpacity;
            } catch (e) {
                this._opacity = 100;
            }
        }
        return this._opacity;
    }

    layerTypeProps(): string[] {
        let props: string[] = [];
        if (this.type === 'symbol') {
            props.push('text');
            props.push('icon');
        } else if (this.type) {
            props.push(this.type);
        }
        return props;
    }

    setOpacity(value: number) {
        this._opacity = value;
        if (
            this._initialized &&
            this.id &&
            this._manager &&
            this._manager.MapControl
        ) {
            for (const prop of this.layerTypeProps()) {
                this._manager.MapControl.setPaintProperty(
                    this.id,
                    prop + '-opacity',
                    value / 100.0
                );
                if (!this.paint) this.paint = {};
                this.paint[prop + '-opacity'] = this._opacity / 100.0;
            }
        }
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

    public initLayer(manager: MapLayers) {
        // check if we need to create an instance first of maplayer (needed if imported from json)
        let l =
            typeof this.getBounds === 'function'
                ? this
                : plainToClass(GeojsonLayer, this);

        // add reference to this maplayers manager
        this._manager = manager;

        if (l.id === undefined) {
            l.id = guidGenerator();
        }
        if (typeof l.source === 'string') {
            if (
                manager._sources &&
                manager._sources.layers.hasOwnProperty(l.source)
            ) {
                l._source = manager._sources.layers[l.source];
            }
        } else {
            l._source = l.source = plainToClass(LayerSource, l.source);
        }
        // if no title has been set
        if (l.title === undefined) {
            // check if source has a title
            if (l._source && l._source.title) {
                l.title = l._source.title;
            } else {
                // otherwise use id
                l.title = l.id;
            }
        }

        if (!l.opacity) {
            l.opacity = 100;
        }

        // check for event bus existence
        if (!l.events) {
            l.events = new MessageBusService();
        }

        // if no color is set, set default color
        if (!l.color) {
            l.color = 'red';
        }

        l.style = {
            ...({ title: '{name}', popover: '{name}' } as LayerStyle),
            ...l.style
        };

        if (l.id && l.style.icon) {
            this.addImage(l.id, l.style.icon);
            (this.layout as SymbolLayout)['icon-image'] = l.id;
        }

        if (l.id && l.style.icons) {
            for (const key in l.style.icons) {
                if (l.style.icons.hasOwnProperty(key)) {
                    const url = l.style.icons[key];
                    this.addImage(key, url);
                }
            }
        }
        l._initialized = true;
        return l;
    }

    public addImage(id: string, url: string) {
        if (this._manager && this._manager.MapControl) {
            if (!this._manager.MapControl.hasImage(id)) {
                this._manager.MapControl.loadImage(url, (error, image) => {
                    if (!error) {
                        this._manager!.MapControl!.addImage(id, image);
                    }
                });
            }
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

    private registerMapEvents(map: CsMap) {
        if (this.id && !this.mapEventsRegistered) {
            map.map.on('touchend', this.id, e => {
                this.click(this, e);
            });
            map.map.on('click', this.id, e => {
                this.click(this, e);
            });
            map.map.on('mousemove', this.id, e => {
                this.mouseMove(map, this, e);
            });
            map.map.on('mouseenter', this.id, e => {
                this.mouseEnter(map, this, e);
            });
            map.map.on('mouseleave', this.id, e => {
                this.mouseLeave(map, this, e);
            });
            this.mapEventsRegistered = true;
        }
    }

    public addLayer(map: CsMap) {
        if (!this.id || !this._source) {
            return;
        }

        if (this.mask && this._source._geojson) {
            try {
                const bounds = [-180, -180, 180, 90];

                let diff: undefined | Feature<Polygon> = undefined; //turf.difference(bboxPoly, mask);
                const bboxPoly = turf.bboxPolygon(bounds);
                for (const f of this._source._geojson.features) {
                    const mask = f as Feature<Polygon>; //this._source._geojson.features[0] as Feature<Polygon>;
                    diff = turf.difference(diff ? diff : bboxPoly, mask);
                }
                // const diff = turf.difference(bboxPoly, mask);
                if (diff !== undefined) {
                    this._source._geojson.features = [diff];
                    if (this._manager && this._manager.MapControl) {
                        this._manager.updateLayerSource(
                            this,
                            this._source._geojson
                        );
                    }
                }
            } catch (e) {}
            this.type = 'fill';
            // this.source = { type: 'geojson', data: difference.default(bboxPoly, mask)}

            //         let res = {
            //             id: id,
            //             source: {
            //                 type: 'geojson',
            //                 data: difference.default(bboxPoly, mask)
            //             },
            //             type: 'fill',
            //             paint: paint
            //         } as Layer;

            //         return res;
            //     }
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
        if (this.filter) {
            mblayer.filter = this.filter;
        }

        this.registerLayerExtensions();
        this.registerMapEvents(map);

        // remove layer if it already exists
        if (map.map.getLayer(this.id) !== undefined) {
            map.map.removeLayer(this.id);
        }
        map.map.addLayer(mblayer);
        this.Visible = true;
        // map.zoomLayer(this);
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
        this.removeExtensions();
        if (this.id) {
            if (map.map.getLayer(this.id) !== undefined) {
                map.map.removeLayer(this.id);
            }
        }
        this.Visible = false;
    }

    private click(layer: GeojsonLayer, e: any) {
        if (layer.events) {
            layer.events.publish('feature', CsMap.FEATURE_SELECT, {
                features: e.features,
                context: e
            } as FeatureEventDetails);
        }
    }

    private mouseLeave(map: CsMap, layer: GeojsonLayer, e: any) {
        map.map.getCanvas().style.cursor = '';
        if (layer.popupContent) this.popup.remove();
        if (layer.events) {
            layer.events.publish('feature', CsMap.FEATURE_MOUSE_LEAVE, {
                features: e.features,
                context: e
            });
        }
    }

    private mouseMove(map: CsMap, layer: GeojsonLayer, e: any) {
        if (layer.popupContent && e && e.features) {
            this.createPopup(map, layer, e);
        }
    }

    private mouseEnter(map: CsMap, layer: GeojsonLayer, e: any) {
        map.map.getCanvas().style.cursor = 'pointer';
        this.createPopup(map, layer, e);
        if (layer.events) {
            layer.events.publish('feature', CsMap.FEATURE_MOUSE_ENTER, {
                features: e.features,
                context: e
            });
        }
    }

    private createPopup(map: CsMap, layer: GeojsonLayer, e: any) {
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
    }

    public _source?: LayerSource;
    public _initialized? = false;
}
