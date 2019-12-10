import { MessageBusService, Form, FormField, MessageBusManager } from '@csnext/cs-core';
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
import {
    min,
    max,
    mean,
    median,
    standardDeviation,
    ckmeans,
    uniqueCountSorted
} from 'simple-statistics';
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
import { LayerFilter } from '../classes/layer-filter';
import { plainToClass } from 'class-transformer';
import { MetaFile } from '../classes/meta-file';

HandlebarsIntl.registerWith(Handlebars);

@Form({ title: 'Layer' })
export class BaseLayer implements IMapLayer {

    // #region Public Static Methods (1)

    public static getFeatureFromEventDetails(
        e: FeatureEventDetails
    ): Feature | undefined {
        if (e.features.length > 0) {
            return e.features[0];
        }
        return undefined;
    }

    // #endregion Public Static Methods (1)
    // #region Properties (35)

    public _busManager: MessageBusManager = new MessageBusManager();
    public _events: MessageBusService;
    public _extensions: ILayerExtension[] = [];
    public _featureType: FeatureType | undefined;
    public _filters?: { [key: string]: LayerFilter };
    // public _featureEventHandle?: MessageBusHandle;
    public _initialized?= false;
    /** list of active layers */
    public _legends?: LayerLegend[];
    public _manager?: MapDatasource;
    public _parent?: IMapLayer;
    public _service?: ILayerService;
    public _showMenu?: boolean | undefined;
    public _showMore?: boolean | undefined;
    // tslint:disable-next-line: variable-name
    public _source?: LayerSource;
    @FormField({ title: 'Color', type: 'string' })
    public color: string = 'blue';
    /** if multiple feature types are avaible, this is the default feature type key  */
    public defaultFeatureType?: string;
    @FormField({ title: 'Description', type: 'string' })
    public description: string = '';
    @FormField({ title: 'Disable Feature List', type: 'checkbox' })
    public disableFeatureList?: boolean;
    public extensions?: ILayerExtensionType[];
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
    public filter?: any[];
    @FormField({ title: 'Hide in layer list', type: 'checkbox' })
    public hideInLayerList?: boolean;
    public id!: string;
    public intlData = {
        'locales': 'en-US',
        'formats': {
            'number': {
                'USD': {
                    'style': 'currency',
                    'currency': 'USD'
                },
                'percentage': {
                    'style': 'percent'
                }
            }
        }
    };
    public layout?:
        | mapboxgl.SymbolLayout
        | mapboxgl.FillLayout
        | mapboxgl.LineLayout
        | mapboxgl.CircleLayout;
    @FormField({ title: 'Open Feature Details', type: 'checkbox' })
    public openFeatureDetails?: boolean;
    public paint?:
        | mapboxgl.SymbolPaint
        | mapboxgl.LinePaint
        | mapboxgl.FillPaint
        | mapboxgl.CirclePaint;
    public parentId?: string;
    public popupContent?: string | Function | undefined;
    public source?: string | LayerSource;
    public style?: LayerStyle;
    @FormField({ title: 'Tags', type: 'chips' })
    public tags: string[] = [];
    // public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';
    @FormField({ title: 'Title', type: 'string', group: 'edit' })
    public title: string = '';
    public typeId?: string = 'geojson';
    public visible?: boolean;

    private _titleTemplate?: Handlebars.TemplateDelegate;

    // #endregion Properties (35)

    // #region Constructors (1)

    constructor(init?: Partial<IMapLayer>) {
        Object.assign(this, init);
        if (init && init.style) {
            Object.assign(this.style, init.style);
        }
        this._events = new MessageBusService();
    }

    // #endregion Constructors (1)

    // #region Public Accessors (3)

    public get MapControl(): mapboxgl.Map | undefined {
        if (this._initialized &&
            this.id &&
            this._manager &&
            this._manager.MapControl) {
            return this._manager.MapControl;
        } else {
            return undefined;
        }
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

    // #endregion Public Accessors (3)



    // #region Public Methods (24)

    public addLayer(map: CsMap) { }

    public applyFilter(filter: LayerFilter) {
        if (!this.filter) {
            this.filter = ['all'];
        }
        // find prop
        let found = false;
        for (let i = 1; i < this.filter.length; i++) {
            const f = this.filter[i];
            if (Array.isArray(f) && LayerFilter.operators.includes(f[0]) && f[1] === filter.property) {
                switch (f[0]) {
                    case '>':
                        f[2] = filter.min;
                        found = true;
                        break;
                    case '<':
                        f[2] = filter.max;
                        found = true;
                        break;
                    case '=':
                        f[2] = filter.value;
                        found = true;
                        break;
                }
            }
        }
        if (!found) {
            switch (filter.type) {
                case 'range':
                    this.filter.push(['>', filter.property, filter.min]);
                    this.filter.push(['<', filter.property, filter.max]);
                    break;
                case 'value':
                    this.filter.push(['=', filter.property, filter.value]);
                    break;
            }
        }
        console.log(this.filter);
        this.setFilter(this.filter);
    }

    // tslint:disable-next-line: no-empty
    public getBounds() { }

    public getFeatureType(): FeatureType | undefined {
        if (!this._featureType) {
            /** find feature type */
            if (
                this.featureTypes) {
                if (this.defaultFeatureType &&
                    this.featureTypes.hasOwnProperty(this.defaultFeatureType)
                ) {
                    this._featureType = this.featureTypes[this.defaultFeatureType];
                } else {
                    this._featureType = this.featureTypes[Object.keys(this.featureTypes)[0]];
                }
            }
            return this._featureType;
        } else {
            return this._featureType;
        }
    }

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

    public getPropertType(prop: string): PropertyType | undefined {
        const ft = this.getFeatureType();
        if (ft && ft.propertyMap && ft.propertyMap.hasOwnProperty(prop)) {
            const propType = ft.propertyMap[prop];
            if (!propType._initialized && this._source) {
                MetaFile.updateMetaProperty(this._source, ft, propType);
            }
            return propType;
        }
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
                        type: prop.type,
                        styleProperty: key,
                        style,
                        styleKey
                    });
                }
            }
        }

        return result;
    }

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

    public initFilter(property: string) {
        const pt = this.getPropertType(property);
        if (pt) {
            switch (pt.type) {
                case 'number':
                    this.applyFilter(new LayerFilter({ property, propertyType: pt, type: 'range', min: pt.min, max: pt.max } as LayerFilter));
                    break;
            }
        }
    }

    public initLayer(manager: MapDatasource) { }

    public moveLayer(beforeId?: string) { }

    public parsePopup(f?: Feature): string {
        if (!f) {
            return '';
        }
        if (this.style && this.style.popup) {
            const template = Handlebars.compile(this.style.popup);
            const res = template(f);
            return res ? res : 'empty title';
        } else {
            return this.createDefaultPopup(f);
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

    public removeLayer(map: CsMap) {
        // this._legends = [];
        // this._filters = {};
    }

    public removeLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer: boolean
    ) { }

    public setFilter(filter: any[]) {
        this.filter = filter;
        if (this.MapControl) {
            this.MapControl.setFilter(this.id, filter);
        }
    }

    public setLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer: boolean
    ) { }

    public setOpacity(value: number) { }

    public setPopupContent(value: string | ((f: FeatureEventDetails) => {})) {
        this.popupContent = value;
    }

    public updateFilters() {
        this._filters = undefined;
        if (this.filter && Array.isArray(this.filter)) {
            this.updateFilterArray(this.filter);
        }
        console.log(this._filters);
    }

    public updateLayer() { }

    public updateLegends() {
        const result: LayerLegend[] = [];
        if (this.paint) { result.concat(this.getStyleLegend('paint', this.paint)); }
        if (this.layout) { result.concat(this.getStyleLegend('layout', this.layout)); }
        this._legends = result;
    }

    // #endregion Public Methods (24)

    // #region Private Methods (3)

    private applyFilterArray(filter: any[], newFilter: LayerFilter) {
        if (Array.isArray(filter)) {
            if (filter.length === 3 && LayerFilter.operators.includes(filter[0])) {
                // const f = { operator: filter[0], property: filter[1], value: filter[2] } as LayerFilter;
                if (this._filters === undefined) { this._filters = {}; }
                // get prop
                const prop = filter[1];

                // find existing filter, or create one
                if (!this._filters.hasOwnProperty(prop)) {
                    const propType = this.getPropertType(prop);
                    if (propType) {
                        this._filters[prop] = new LayerFilter({ property: prop, propertyType: propType, type: propType.type === 'number' ? 'range' : 'value', min: propType.min, max: propType.max } as LayerFilter);
                    }
                }

                // update filter
                const f = this._filters[prop];
                switch (filter[0]) {
                    case '>':
                        f.min = filter[2];
                        break;
                    case '<':
                        f.max = filter[2];
                        break;
                    case '=':
                        f.value = filter[2];
                        break;
                }

            } else {
                for (const item of filter) {
                    this.updateFilterArray(item);
                }
            }
        } else {
            console.log(`Item: ${filter}`);
        }
    }

    private createDefaultPopup(f: Feature): string {
        if (!f.properties) { return ''; }
        let res = `<div class="default-popup"><div class="default-popup-feature">${f.properties.Name}</div>`;
        if (this._legends && this._legends.length > 0) {
            res += `<div class="default-popup-split"></div>`;
            for (const legend of this._legends) {
                if (legend.propertyInfo) {
                    res += `<span class="default-popup-property-title">${legend.propertyInfo.title}</span><span class="default-popup-property-value">${f.properties[legend.property]}</span>`;
                }
            }
        }
        res += `</div>`;
        return res;
    }

    private updateFilterArray(filter: any[]) {
        if (filter) {
            if (Array.isArray(filter)) {
                if (filter.length === 3 && LayerFilter.operators.includes(filter[0])) {
                    // const f = { operator: filter[0], property: filter[1], value: filter[2] } as LayerFilter;
                    if (this._filters === undefined) { this._filters = {}; }
                    // get prop
                    const prop = filter[1];

                    // find existing filter, or create one
                    if (!this._filters.hasOwnProperty(prop)) {
                        const propType = this.getPropertType(prop);
                        if (propType) {
                            this._filters[prop] = new LayerFilter({ property: prop, propertyType: propType, type: propType.type === 'number' ? 'range' : 'value', min: propType.min, max: propType.max } as LayerFilter);
                        }
                    }

                    // update filter
                    const f = this._filters[prop];
                    switch (filter[0]) {
                        case '>':
                            f.min = filter[2];
                            break;
                        case '<':
                            f.max = filter[2];
                            break;
                        case '=':
                            f.value = filter[2];
                            break;
                    }

                } else {
                    for (const item of filter) {
                        this.updateFilterArray(item);
                    }
                }
            } else {
                console.log(`Item: ${filter}`);
            }
        }
    }

    // #endregion Private Methods (3)
}
