import { MessageBusService, guidGenerator } from '@csnext/cs-core';
import {
    MapDatasource,
    FeatureEventDetails,
    IMapLayer,
    LayerStyle
} from './../.';
import extent from '@mapbox/geojson-extent';
import { LngLatBounds, SymbolLayout, CirclePaint } from 'mapbox-gl';
import { CsMap } from './..';
import mapboxgl from 'mapbox-gl';
import { plainToClass } from 'class-transformer';
import { BaseLayer } from './base-layer';
import { DataSource, FeatureType } from '@csnext/cs-data';

export class GeojsonLayer extends BaseLayer {
    // #region Properties (7)

    // public type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
    // public opacity?: number;
    public isEditable?: boolean;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(init?: Partial<IMapLayer>) {
        super(init);
    }

    // #endregion Constructors (1)

    // #region Public Accessors (6)

    public get layout(): mapboxgl.Layout {
        if (this.style) {
            if (!this.style.mapbox) { this.style.mapbox = {}; }
            switch (this.style.type) {
                case 'fill':
                    if (!this.style.mapbox.fillLayout) { this.style.mapbox.fillLayout = {}; }
                    return this.style.mapbox.fillLayout;
                case 'line':
                    if (!this.style.mapbox.lineLayout) { this.style.mapbox.lineLayout = {}; }
                    return this.style.mapbox.lineLayout;
                case 'symbol':
                    if (!this.style.mapbox.symbolLayout) { this.style.mapbox.symbolLayout = {}; }
                    return this.style.mapbox.symbolLayout;
                case 'circle':
                    if (!this.style.mapbox.circleLayout) { this.style.mapbox.circleLayout = {}; }
                    return this.style.mapbox.circleLayout;
            }
        }
        return {};
    }

    public set layout(value: mapboxgl.Layout) {
        if (this.style) {
            if (!this.style.mapbox) { this.style.mapbox = {}; }
            switch (this.style.type) {
                case 'fill':
                    this.style.mapbox.fillLayout = value;
                    break;
                case 'line':
                    this.style.mapbox.lineLayout = value;
                    break;
                case 'symbol':
                    this.style.mapbox.symbolLayout = value;
                    break;
                case 'circle':
                    this.style.mapbox.circleLayout = value;
                    break;
            }
        }
    }

    public get opacity(): number | undefined {
        if (!this.style) { this.style = new LayerStyle(); }
        if (this.MapControl) {
            try {
                const maxOpacity = 0;
                // for (const { } of this.layerTypeProps()) {
                //     const op =
                //         this.MapControl.getPaintProperty(
                //             this.id,
                //             this.type + '-opacity'
                //         ) * 100;
                //     if (op > maxOpacity) {
                //         maxOpacity = op;
                //     }
                // }
                this.style._opacity = maxOpacity;
            } catch (e) {
                this.style._opacity = 100;
            }
        }
        return this.style._opacity;
    }

    public set opacity(value: number | undefined) {
        //    this._opacity = value;
        // this.MapLayers.MapControl.setPaintProperty(layer.id, 'line-opacity', value / 100.0);
        // if (layer.paint) {
        //     layer.paint['raster-opacity'] = value / 100.0;
        // }
        // this.MapLayers.MapControl.setPaintProperty(layer.id, 'raster-opacity', value / 100.0);
    }

    public get paint(): mapboxgl.SymbolPaint
        | mapboxgl.LinePaint
        | mapboxgl.FillPaint
        | mapboxgl.CirclePaint {
        if (this.style && this.style.mapbox) {
            switch (this.style.type) {
                case 'fill':
                    return this.style.mapbox.fillPaint || {};
                case 'line':
                    return this.style.mapbox.linePaint || {};
                case 'symbol':
                    return this.style.mapbox.symbolPaint || {};
                case 'circle':
                    return this.style.mapbox.circlePaint || {};
            }
        }
        return {};
    }

    public set paint(value: mapboxgl.SymbolPaint
        | mapboxgl.LinePaint
        | mapboxgl.FillPaint
        | mapboxgl.CirclePaint) {
        if (this.style) {
            if (!this.style.mapbox) { this.style.mapbox = {}; }
            switch (this.style.type) {
                case 'fill':
                    this.style.mapbox.fillPaint = value as mapboxgl.FillPaint;
                    break;
                case 'line':
                    this.style.mapbox.linePaint = value as mapboxgl.LinePaint;
                    break;
                case 'symbol':
                    this.style.mapbox.symbolPaint = value as mapboxgl.SymbolPaint;
                    break;
                case 'circle':
                    this.style.mapbox.circlePaint = value as mapboxgl.CirclePaint;
                    break;
            }
        }
    }

    // #endregion Public Accessors (6)

    // #region Public Methods (8)

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

    public addLayer(widget: CsMap) {
        if (!this.id || !this._source) {
            return;
        }

        const mblayer = {
            id: this.id,
            type: this.style!.type,
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

         // remove layer if it already exists
        this.removeLayer(widget);
        if (widget.map.getLayer(this.id) !== undefined) {
             widget.map.removeLayer(this.id);
         }

        this.registerLayerExtensions();

        widget.map.addLayer(mblayer);
        this.state = 'visible';
        // this.visible = true;
        // map.zoomLayer(this);
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

    public getInstance(init?: Partial<IMapLayer>) {
        const result = new GeojsonLayer(init);
        return result;
    }

    public initLayer(manager: MapDatasource): Promise<IMapLayer> {
        return new Promise((resolve, reject) => {
            // check if we need to create an instance first of maplayer (needed if imported from json)
            const l =
                typeof this.getBounds === 'function'
                    ? this
                    : plainToClass(GeojsonLayer, this);

            // add reference to this maplayers manager
            this._manager = manager;

            if (l.id === undefined) {
                l.id = guidGenerator();
            }
            if (typeof l.source === 'string') {
                // if source is a string, it references another existing source
                if (
                    manager.sources &&
                    manager.sources.hasOwnProperty(l.source)
                ) {
                    l._source = manager.sources[l.source];
                }
            } else {
                if (!l._source) {
                    l._source = l.source = plainToClass(DataSource, l.source);
                }
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

            l.style = {
                ...({ title: '{{title}}' } as LayerStyle),
                ...l.style
            };

            if (!l.opacity) { l.opacity = 100; }

            if (!l.style.type) {
                // infer type from first feature, expect all to be the same
                if (l._source && l._source._data && l._source._data.features && l._source._data.features.length > 0) {
                    const first = l._source._data.features[0];
                    if (first.geometry && first.geometry.type) {
                        switch (first.geometry.type) {
                            case 'MultiPoint':
                            case 'Point':
                                l.style.type = 'circle';
                                break;
                            case 'LineString':
                            case 'MultiLineString':
                                l.style.type = 'line';
                                break;
                            case 'Polygon':
                            case 'MultiPolygon':
                                l.style.type = 'fill';
                                break;
                        }
                    }
                }
                if (!l.style.type) {
                    l.style.type = 'circle';
                }
            }

            // if no color is set, set default color
            if (!l.color) { l.color = 'red'; }

            // for symbol layers without an icon image, add style icon
            if (l.style.type === 'symbol' && l.style.icon && !this.layout.hasOwnProperty('icon-image')) {
                const imageId = l.id + '-symbol';
                this.addImage(imageId, l.style.icon);
                (this.layout as SymbolLayout)['icon-image'] = imageId;
            }

            if (l.style.icons) {
                for (const key in l.style.icons) {
                    if (l.style.icons.hasOwnProperty(key)) {
                        const url = l.style.icons[key];
                        this.addImage(key, url);
                    }
                }
            }

            l._initialized = true;
            resolve(l);
        });
    }

    public moveLayer(beforeId?: string) {
        if (this._manager && this._manager.MapControl && this.id) {
            this._manager.MapControl.moveLayer(this.id, beforeId);
        }
    }

    public removeLayer(widget: CsMap) {
        super.removeLayer(widget);
        this.removeExtensions();
        if (this.id) {
            if (widget.map.getLayer(this.id) !== undefined) {
                widget.map.removeLayer(this.id);
                this.state = 'hidden';
            }
        }
        // this.visible = false;
    }

    // public layerTypeProps(): string[] {
    //     const props: string[] = [];
    //     if (this.type === 'symbol') {
    //         props.push('text');
    //         props.push('icon');
    //     } else if (this.type) {
    //         props.push(this.type);
    //     }
    //     return props;
    // }
    public setOpacity(value: number) {
        if (!this.style) { this.style = new LayerStyle(); }
        this.style._opacity = value;

        if (
            this.MapControl
        ) {
            // for (const prop of this.layerTypeProps()) {
            //     this.MapControl.setPaintProperty(
            //         this.id,
            //         prop + '-opacity',
            //         value / 100.0
            //     );
            //     if (!this.paint) { this.paint = {}; }
            //     this.paint[prop + '-opacity'] = this.style._opacity / 100.0;
            // }
        }
    }

    // #endregion Public Methods (8)

    // #region Protected Methods (2)

    protected registerLayerExtensions() {
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

    protected removeExtensions() {
        if (this._extensions && this._extensions.length) {
            this._extensions.forEach(extension => {
                extension.stop();
            });
            this._extensions.length = 0;
        }
    }

    // #endregion Protected Methods (2)

    // #region Private Methods (8)

 


    // #endregion Private Methods (8)
}
