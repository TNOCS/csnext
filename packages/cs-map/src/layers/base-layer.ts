import { MessageBusService, Form, FormField } from '@csnext/cs-core';
import {
    LayerSource,
    MapDatasource,
    IMapLayer,
    LayerStyle,
    FeatureType,
    ILayerService,
    PropertyType,
    FeatureTypes,
    PropertyDetails,
    FeatureEventDetails
} from './../.';
import { CsMap } from './..';
import mapboxgl, { CirclePaint } from 'mapbox-gl';
import { ILayerAction } from '../classes/ilayer-action';
import {
    ILayerExtension,
    ILayerExtensionType
} from '../classes/ilayer-extension';
import { MessageBusHandle } from '@csnext/cs-core';
import { Feature } from 'geojson';
import Handlebars from 'handlebars';
import { LayerLegend } from '../classes/layer-legend';
import HandlebarsIntl from 'handlebars-intl';

HandlebarsIntl.registerWith(Handlebars);

@Form({ title: 'Layer' })
export class BaseLayer implements IMapLayer {

    private _titleTemplate?: Handlebars.TemplateDelegate;

    public get Visible(): boolean | undefined {
        return this.visible;
    }

    public set Visible(value: boolean | undefined) {
        if (this.visible === value) {
            return;
        }
        this.visible = value;
    }

    public static getFeatureFromEventDetails(
        e: FeatureEventDetails
    ): Feature | undefined {
        if (e.features.length > 0) {
            return e.features[0];
        }
        return undefined;
    }

    // tslint:disable-next-line: variable-name
    public _source?: LayerSource;
    public _initialized?= false;
    public typeId?: string = 'geojson';
    public id!: string;
    // public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';

    @FormField({ title: 'Title', type: 'string', group: 'edit' })
    public title: string = '';

    @FormField({ title: 'Description', type: 'string' })
    public description: string = '';
    public source?: string | LayerSource;
    public visible?: boolean;

    @FormField({ title: 'Tags', type: 'chips' })
    public tags: string[] = [];
    @FormField({ title: 'Color', type: 'string' })
    public color: string = 'blue';
    public style?: LayerStyle;
    public parentId?: string;
    public _parent?: IMapLayer;
    public filter?: any;
    /** if multiple feature types are avaible, this is the default feature type key  */
    public defaultFeatureType?: string;

    @FormField({ title: 'Hide in layer list', type: 'checkbox' })
    public hideInLayerList?: boolean;

    @FormField({ title: 'Open Feature Details', type: 'checkbox' })
    public openFeatureDetails?: boolean;
    @FormField({ title: 'Disable Feature List', type: 'checkbox' })
    public disableFeatureList?: boolean;

    public _service?: ILayerService;
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
    public _manager?: MapDatasource;
    public _events?: MessageBusService;
    public popupContent?: string | Function | undefined;
    public extensions?: ILayerExtensionType[];
    public _extensions: ILayerExtension[] = [];

    // @FormField({ title: 'Features', type: 'keyvalue', canAdd: true, canDelete: true })
    @FormField({
        title: 'Feature types',
        type: 'keysobject',
        canEditKey: true,
        canAdd: true,
        canDelete: true,
        addUsingDialog: true,
        keyValuesType: () => {
            return new FeatureType();
        }
    })
    public featureTypes?: FeatureTypes;
    /** list of active layers */
    public _legends?: LayerLegend[];

    public _showMenu?: boolean | undefined;
    public _showMore?: boolean | undefined;
    public _featureEventHandle?: MessageBusHandle;

    constructor(init?: Partial<IMapLayer>) {
        Object.assign(this, init);
        if (init && init.style) {
            Object.assign(this.style, init.style);
        }
        // this.events = new MessageBusService();
    }
    // tslint:disable-next-line: no-empty
    public getBounds() { }

    public intlData = {
        "locales": "en-US",
        "formats": {
            "number": {
                "USD": {
                    "style": "currency",
                    "currency": "USD"
                },
                "percentage": {
                    "style": "percent"
                }
            }
        }
    };

    public addLayer(map: CsMap) { }

    public initLayer(manager: MapDatasource) { }
    public setOpacity(value: number) { }
    public getLayerActions(): ILayerAction[] {
        const res: ILayerAction[] = [];
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
            res.push({
                title: 'Refresh',
                action: () => {
                    if (this._manager) {
                        this._manager.refreshLayer(this);
                    }
                }
            });
            if (!this.disableFeatureList) {
                res.push({
                    title: 'Show features',
                    action: () => {
                        if (this._manager) {
                            this._manager.openLayer(this);
                        }
                    }
                });
            }
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
    public updateLayer() { }
    public removeLayer(map: CsMap) { }
    public moveLayer(beforeId?: string) { }

    public removeLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer: boolean
    ) { }

    public setLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer: boolean
    ) { }

    public getStyleLegendKey(styleKey: string): LayerLegend[] {
        let result: LayerLegend[] = [];
        if (
            this.style &&
            this.style.mapbox &&
            this.style.mapbox.hasOwnProperty(styleKey)
        ) {
            const style = this.style!.mapbox![styleKey];
            result = result.concat(this.getStyleLegend(styleKey, style));
        }
        return result;
    }

    public getStyleLegend(styleKey: string, style: any): LayerLegend[] {
        const result: LayerLegend[] = [];
        for (const key in style) {
            if (style.hasOwnProperty(key)) {
                const prop = style[key];
                if (prop.hasOwnProperty('stops')) {
                    result.push({
                        property: prop.property,
                        stops: prop.stops,
                        styleProperty: key,
                        style,
                        styleKey
                    });
                }
            }
        }

        return result;
    }

    public updateLegends() {
        const result: LayerLegend[] = [];
        if (this.paint) { result.concat(this.getStyleLegend('paint', this.paint)); }
        if (this.layout) { result.concat(this.getStyleLegend('layout', this.layout)); }
        this._legends = result;
    }

    public parsePopup(f?: Feature) {
        if (this.style && this.style.popup && f) {
            const template = Handlebars.compile(this.style.popup);
            const res = template(f);
            return res ? res : 'empty title';
        } else {
            return `<h2>${this.title}</h2>`;
        }
    }

    public parseTitle(f?: Feature) {
        if (this.style && this.style.title && f) {
            if (!this._titleTemplate) {
                this._titleTemplate = Handlebars.compile(this.style.title);
            }
            return this._titleTemplate(f, { data: { intl: this.intlData } });
        } else {
            return `${this.title}`;
        }
    }
}
