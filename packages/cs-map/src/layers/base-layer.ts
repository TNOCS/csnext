import { MessageBusService } from '@csnext/cs-core';
import { LayerSource, MapLayers, IMapLayer, LayerStyle, FeatureType } from './../.';
import { CsMap } from './..';
import mapboxgl from 'mapbox-gl';
import { ILayerAction } from '../classes/ilayer-action';
import {
    ILayerExtension,
    ILayerExtensionType
} from '../classes/ilayer-extension';
import { MessageBusHandle } from '@csnext/cs-core';
import { Feature } from 'geojson';
import { FeatureEventDetails } from '../components/cs-map/cs-map';
import Handlebars from 'handlebars';

export class BaseLayer implements IMapLayer {
    getBounds() {}

    public _source?: LayerSource;
    public _initialized? = false;
    public typeId?: string = 'geojson';
    public id?: string;
    // public type?: 'symbol' | 'raster' | 'line' | 'fill' | 'circle';
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
    public _parent?: IMapLayer;
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
    public _opacity?: number;
    public featureTypes?: {[key:string]: FeatureType};
    addLayer(map: CsMap) {}

    initLayer(manager: MapLayers) {}
    setOpacity(value: number) {}
    getLayerActions(): ILayerAction[] {
        return [];
    }
    removeLayer(map: CsMap) {}
    moveLayer(beforeId?: string) {}

    _showMenu?: boolean | undefined;
    _showMore?: boolean | undefined;
    _featureEventHandle?: MessageBusHandle;

    constructor(init?: Partial<IMapLayer>) {
        Object.assign(this, init);
        // this.events = new MessageBusService();
    }

    public static getFeatureFromEventDetails(e: FeatureEventDetails) : Feature | undefined {
        if (e.features.length > 0) {
            return e.features[0];
        }
        return undefined;
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

    public parsePopup(f?: Feature) {
        if (this.style && this.style.popup && f) {
            const template = Handlebars.compile(this.style.popup);
            return template(f);
        } else {
            return `<h2>${this.title}</h2>`;
        }
    }

    public parseTitle(f?: Feature) {
        if (this.style && this.style.title && f) {
            const template = Handlebars.compile(this.style.title);
            return template(f);
        } else {
            return `${this.title}`;
        }
    }
}
