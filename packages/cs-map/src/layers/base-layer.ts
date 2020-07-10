import { MessageBusService, Form, FormField, MessageBusManager, guidGenerator, MessageBusHandle, IWidget } from '@csnext/cs-core';
import {
    MapDatasource,
    IMapLayer,
    LayerStyle,
    ILayerService,
    FeatureEventDetails
} from './../.';
import { PropertyType, FeatureType, DataSource, DataSet, FeatureTypes } from '@csnext/cs-data';
import { CsMap } from './..';
import mapboxgl, { Layout, MapboxGeoJSONFeature } from 'mapbox-gl';
import { ILayerAction } from '../classes/ilayer-action';
import { ILayerExtension, ILayerExtensionType } from '../classes/ilayer-extension';
import { Feature, GeoJsonProperties } from 'geojson';
// import Handlebars from 'handlebars';
import { LayerLegend } from '../classes/layer-legend';
// import HandlebarsIntl from 'handlebars-intl';
import { LayerFilter } from '../classes/layer-filter';
import { PropertyDetails } from '../components/feature-details/property-details';

// HandlebarsIntl.registerWith(Handlebars);

@Form({ title: 'Layer' })
export class BaseLayer implements IMapLayer {

    // #region Public Static Methods (1)

    public static getFeatureFromEventDetails(
        e: FeatureEventDetails
    ): MapboxGeoJSONFeature | undefined {
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
    public _featureEventHandle?: MessageBusHandle;
    public _initialized?= false;
    /** list of active layers */
    public _legends?: LayerLegend[];
    public _manager?: MapDatasource;
    public _parent?: IMapLayer;
    public _service?: ILayerService;
    public _showMenu?: boolean | undefined;
    public _showMore?: boolean | undefined;
    // tslint:disable-next-line: variable-name
    public _source?: DataSource;
    @FormField({ title: 'Color', type: 'string' })
    public color: string = 'blue';
    /** if multiple feature types are avaible, this is the default feature type key  */
    public defaultFeatureType?: string;
    @FormField({ title: 'Description', type: 'string' })
    public description: string = '';
    @FormField({ title: 'Disable Feature List', type: 'checkbox' })
    public disableFeatureList?: boolean;
    public extensions?: ILayerExtensionType[];
    public supportLayers: string[] = [];
    public selectedFeature?: mapboxgl.MapboxGeoJSONFeature;
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
    @FormField({ title: 'Open Feature Details', type: 'checkbox' })
    public openFeatureDetails?: boolean;
    public parentId?: string;
    public popupContent?: string | Function | undefined;
    public popupInfoWidget?: IWidget;
    public source?: string | DataSource;
    public state?: 'hidden' | 'loading' | 'visible';
    public enabled?: boolean;
    public style?: LayerStyle;
    @FormField({ title: 'Tags', type: 'chips' })
    public tags: string[] = [];
    // public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';
    @FormField({ title: 'Title', type: 'string', group: 'edit' })
    public title: string = '';
    public typeId?: string = 'geojson';
    public featureTypes?: FeatureTypes;

    constructor(init?: Partial<IMapLayer>) {
        if (init) {
            Object.assign(this, init);
        }
        if (init && init.style) {
            Object.assign(this.style, init.style);
        }
        this._events = new MessageBusService();
    }

    public get Map(): CsMap | undefined {
        if (this._manager && this._manager.MapWidget) {
            return this._manager.MapWidget;
        }
    }

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

    public addLayer(map: CsMap) { }

    public getFeature(id: string | number): Feature | undefined {
        if (this._source && this._source._data && this._source._data.features) {
            const result = this._source._data.features.find(f => f.id && f.id.toString() === id.toString());
            if (result) {
                return result;
            }
        }
    }

    public getFeatureType(): FeatureType | undefined {
        return undefined;

    }

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
                    case '>=':
                        f[2] = filter.min;
                        found = true;
                        break;
                    case '<=':
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
                    this.filter.push(['>=', filter.property, filter.min]);
                    this.filter.push(['<=', filter.property, filter.max]);
                    break;
                case 'value':
                    this.filter.push(['=', filter.property, filter.value]);
                    break;
            }
        }
        this.setFilter(this.filter);
    }

    // tslint:disable-next-line: no-empty
    public getBounds() { }

    public getLayerActions(): ILayerAction[] {
        const res: ILayerAction[] = [];
        if (this.enabled) {
            res.push({
                title: 'Zoom to',
                layer: this,
                action: () => {
                    if (this._manager) {
                        this._manager.zoomLayer(this);
                    }
                }
            });
            res.push({
                title: 'Hide',
                layer: this,
                action: () => {
                    if (this._manager) {
                        this._manager.hideLayer(this);
                    }
                }
            });
            res.push({
                title: 'Refresh',
                layer: this,
                action: () => {
                    if (this._manager) {
                        this._manager.refreshLayer(this);
                    }
                }
            });
            if (!this.disableFeatureList) {
                res.push({
                    title: 'Show features',
                    layer: this,
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
                layer: this,
                action: () => {
                    if (this._manager) {
                        this._manager.showLayer(this);
                    }
                }
            });
        }
        return res;
    }

    public getStyleLegend(styleKey: string, style?: any): LayerLegend[] {
        if (!style) { return []; }
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
        if (!this._source) { return; }
        const pt = this._source.getPropertType(property);
        if (pt) {
            switch (pt.type) {
                case 'number':
                    this.applyFilter(new LayerFilter({ property, propertyType: pt, type: 'range', min: pt.min, max: pt.max } as LayerFilter));
                    break;
            }
        }
    }

    public initLayer(manager: MapDatasource): Promise<IMapLayer> {
        return new Promise(async (resolve, reject) => {
            if (this.id === undefined) {
                this.id = guidGenerator();
            }
            resolve(this);
        });
    }

    public moveLayer(beforeId?: string) { }

    private interpolatePopup(template: string, params: Object) {
        const names = Object.keys(params);
        const vals = Object.values(params);
        return new Function(...names, `return \`${template}\`;`)(...vals);
    }

    public parsePopup(f?: mapboxgl.MapboxGeoJSONFeature): string {
        if (!f || !f.id || !this.MapControl) {
            return '';
        }
        if (this.style && this.style.popup) {
            const state = this.MapControl.getFeatureState(f);
            if (true || !state.hasOwnProperty('popup')) { // always update as properties might be updated
                state.popup = this.interpolatePopup(this.style.popup, f.properties as Object);
                this.MapControl.setFeatureState(f, state);
            }
            return state.popup;
        } else {
            if (this.style && this._source && this._source._featureType) {
                return this.createDefaultPopup(f, this.style, this._source._featureType);
            } else {
                return '';
            }
        }
    }

    public parseTitle(f?: mapboxgl.MapboxGeoJSONFeature): string {
        if (this.MapControl && this.style && this.style.title && f && f.properties) {
            return f.properties[this.style.title];        
        } else {
            return `${this.title}`;
        }
    }

    public removeLayer(map: CsMap) {
        if (!this.MapControl) { return; }        
        if (this.supportLayers && this.supportLayers.length > 0) {
            for (const layer of this.supportLayers) {
                this.MapControl.removeLayer(layer);
            }
            this.supportLayers = [];
        }
    }

    public addSupportLayer(layer: mapboxgl.Layer) {
        if (this.MapControl && layer.id) {
            this.MapControl.addLayer(layer);
            this.supportLayers.push(layer.id);
        }
    }

    public removeLegend(
        property: PropertyDetails | PropertyType | string,
        refreshLayer: boolean
    ) { }

    public setFilter(filter: any[]) {
        this.filter = filter;
        if (this.MapControl) {
            this.MapControl.setFilter(this.id, filter);

            if (this.supportLayers && this.supportLayers.length > 0) {
                for (const layer of this.supportLayers) {
                    this.MapControl.setFilter(layer, filter);
                }
            }
        }
    }

    public removeFilter(filter: LayerFilter) {
        if (!this.filter) {
            this.filter = ['all'];
        }
        // find prop
        const res: any[] = [];
        for (const item of this.filter) {
            if (item === 'all' || (Array.isArray(item) && LayerFilter.operators.includes(item[0]) && item[1] !== filter.property)) {
                res.push(item);
            }
        }
        this.filter = res;
        this.setFilter(this.filter);
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
    }

    public updateGeojson(data: DataSet) {
        if (this._manager && this._source && this._source.id) {
            this._source._data = data;
            this._manager.updateSource(this._source);
        }
    }

    public updateLayer() { }

    public updateLegends() {
        const result: LayerLegend[] = [];
        // if (this.paint) { result.concat(this.getStyleLegend('paint', this.paint)); }
        // if (this.layout) { result.concat(this.getStyleLegend('layout', this.layout)); }
        this._legends = result;
    }

    // #endregion Public Methods (24)

    // #region Private Methods (3)
    private createDefaultPopup(f: Feature, style: LayerStyle, ft: FeatureType): string {
        if (!f.properties || !style.title) { return ''; }
        let res = `<div class="default-popup"><div class="default-popup-feature">${f.properties[style.title]}</div>`;
        if (this._legends && this._legends.length > 0) {
            res += `<div class="default-popup-split"></div>`;
            for (const legend of this._legends) {
                if (legend.propertyInfo) {
                    res += `<span class="default-popup-property-title">${legend.propertyInfo.title}</span><span class="default-popup-property-value">${f.properties[legend.property]} ${legend.propertyInfo.unit}</span>`;
                }
            }
        }
        res += `</div>`;
        return res;
    }

    private updateFilterArray(filter: any[]) {
        if (filter && this._source) {
            if (Array.isArray(filter)) {
                if (filter.length === 3 && LayerFilter.operators.includes(filter[0])) {
                    // const f = { operator: filter[0], property: filter[1], value: filter[2] } as LayerFilter;
                    if (this._filters === undefined) { this._filters = {}; }
                    // get prop
                    const prop = filter[1];

                    // find existing filter, or create one
                    if (!this._filters.hasOwnProperty(prop)) {
                        const propType = this._source.getPropertType(prop);
                        if (propType) {
                            this._filters[prop] = new LayerFilter({ property: prop, propertyType: propType, type: propType.type === 'number' ? 'range' : 'value', min: propType.min, max: propType.max } as LayerFilter);
                        }
                    }

                    // update filter
                    const f = this._filters[prop];
                    switch (filter[0]) {
                        case '>=':
                            f.min = filter[2];
                            break;
                        case '<=':
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
                // console.log(`Item: ${filter}`);
            }
        }
    }

    // #endregion Private Methods (3)
}
