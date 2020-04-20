import {
    Form,
    FormField,
    IFormOptions,
    IFormFieldOptions
} from '@csnext/cs-core';
import {
    LinePaint,
    LineLayout,
    SymbolLayout,
    SymbolPaint,
    FillPaint,
    FillLayout,
    CirclePaint,
    CircleLayout
} from 'mapbox-gl';

export interface ILayerStyle {
    type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
    iconZoomLevel?: number;
    title?: string;
    mapTitle?: string;
    popup?: string;
    fill?: boolean;
    line?: boolean;
    pointCircle?: boolean;
    icon?: string;
    icons?: { [id: string]: string };
    defaultLegendProperty?: string;
}

export const MapboxStopForm: IFormOptions = {
    title: 'Stop',
    fields: [
        {
            _index: 0,
            type: 'number',
            title: 'value',
            group: 'stop'
        },
        {
            _index: 1,
            type: 'string',
            title: 'color',
            group: 'stop'
        }
    ]
};

export const MapboxColorForm: IFormOptions = {
    title: 'Color',
    isPanel: false,
    fields: [
        {
            _key: 'property',
            type: 'string',
            title: 'property'
        },
        {
            _key: 'stops',
            type: 'array',
            title: 'color',
            arrayType: MapboxStopForm
        }
    ]
};

export const CirclePaintForm: IFormOptions = {
    title: 'Circle Layout',
    isPanel: true,
    fields: [
        {
            _key: 'circle-color',
            type: 'string',
            title: 'color',
            group: 'circle-color'
        },
        {
            _key: 'circle-opacity',
            type: 'number',
            title: 'opacity',
            min: 0,
            max: 1,
            group: 'circle-color'
        },
        {
            _key: 'circle-radius',
            type: 'number',
            min: 0,
            defaultValue: 10,
            title: 'radius',
            group: 'circle-color'
        },
        {
            _key: 'circle-stroke-width',
            type: 'number',
            min: 0,
            defaultValue: 1,
            title: 'stroke width',
            group: 'circle-stroke'
        },
        {
            _key: 'circle-stroke-color',
            type: 'string',
            defaultValue: '#000000',
            title: 'stroke color',
            group: 'circle-stroke'
        },
        {
            _key: 'circle-stroke-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'stroke opacity',
            group: 'circle-stroke'
        }

    ]
};

export const LineLayoutForm: IFormOptions = {
    title: 'Line Layout',
    isPanel: true,
    fields: [
        {
            _key: 'line-cap',
            type: 'selection',
            title: 'cap',
            options: ['butt', 'round', 'square'],
            defaultValue: 'butt'
        },
        {
            _key: 'line-join',
            type: 'selection',
            title: 'join',
            options: ['bevel', 'round', 'miter'],
            defaultValue: 'miter'
        },
        {
            _key: 'visibility',
            type: 'selection',
            title: 'visibility',
            options: ['visible', 'none'],
            defaultValue: 'visible'
        }
    ]
};

export const LinePaintForm: IFormOptions = {
    title: 'Line Paint',
    isPanel: true,
    fields: [
        {
            _key: 'line-color',
            type: 'string',
            title: 'color',
            group: 'line-color'
        },
        {
            _key: 'line-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'opacity',
            group: 'line-color'
        },
        {
            _key: 'line-width',
            type: 'number',
            title: 'width',
            group: 'line-width'
        },
        {
            _key: 'line-blur',
            type: 'number',
            title: 'blur',
            min: 0,
            group: 'line-width'
        }
    ]
};

export const FillPaintForm: IFormOptions = {
    title: 'Fill Paint',
    isPanel: true,
    fields: [
        {
            _key: 'fill-color',
            type: 'string',
            title: 'color',
            group: 'fill-color'
        },
        {
            _key: 'fill-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'opacity',
            group: 'fill-color'
        },
        {
            _key: 'line-color',
            type: 'string',
            title: 'color',
            group: 'line-color'
        },
        {
            _key: 'line-opacity',
            type: 'number',
            min: 0,
            max: 1,
            defaultValue: 1,
            title: 'opacity',
            group: 'line-color'
        },
        {
            _key: 'line-width',
            type: 'number',
            title: 'width',
            group: 'line-color'
        }
    ]
};

export const SymbolLayoutForm: IFormOptions = {
    title: 'Symbol Layout',
    isPanel: true,
    fields: [
        {
            _key: 'icon-allow-overlap',
            type: 'checkbox',
            title: 'icon allow overlap',
            group: 'overlap'
        },
        {
            _key: 'text-allow-overlap',
            type: 'checkbox',
            title: 'text allow overlap',
            group: 'overlap'
        },
        {
            _key: 'icon-ignore-placement',
            type: 'checkbox',
            title: 'icon ignore placement',
            group: 'placement'
        },
        {
            _key: 'text-ignore-placement',
            type: 'checkbox',
            title: 'text ignore placement',
            group: 'placement'
        },
        {
            _key: 'icon-rotation-alignment',
            type: 'selection',
            title: 'icon rotation alignment',
            options: ['auto', 'map', 'viewport'],
            defaultValue: 'auto'
        },
        {
            _key: 'icon-size',
            type: 'number',
            title: 'icon size',
            group: 'icon'
        },
        {
            _key: 'icon-optional',
            type: 'checkbox',
            title: 'icon optional',
            group: 'icon'
        },
        {
            _key: 'icon-text-fit',
            type: 'selection',
            title: 'icon text fit',
            options: ['none', 'width', 'height', 'both'],
            defaultValue: 'none',
            group: 'text'
        },
        {
            _key: 'text-size',
            type: 'number',
            title: 'text size',
            group: 'text-size'
        },
        {
            _key: 'text-max-width',
            type: 'number',
            title: 'text max width',
            group: 'text-size',
            defaultValue: 10
        },
        {
            _key: 'text-line-height',
            type: 'number',
            title: 'text line height',
            defaultValue: 1.2,
            group: 'text-size'
        },
        {
            _key: 'icon-rotate',
            type: 'number',
            title: 'icon rotate',
            group: 'icon-padding'
        },
        {
            _key: 'icon-padding',
            type: 'number',
            title: 'icon padding',
            group: 'icon-padding'
        },
        {
            _key: 'icon-anchor',
            type: 'selection',
            title: 'icon anchor',
            options: [
                'center',
                'left',
                'right',
                'top',
                'bottom',
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right'
            ],
            group: 'icon-padding'
        }
    ]
};

export const SymbolPaintForm: IFormOptions = {
    title: 'Symbol Paint',
    isPanel: true,
    fields: [
        {
            _key: 'icon-color',
            type: 'string',
            defaultValue: '#000000',
            title: 'icon color',
            group: 'color'
        },
        {
            _key: 'icon-opacity',
            type: 'number',
            title: 'icon opacity',
            group: 'color'
        },
        {
            _key: 'icon-halo-color',
            type: 'string',
            title: 'icon halo color',
            group: 'halo'
        },
        {
            _key: 'icon-halo-width',
            type: 'number',
            title: 'icon halo width',
            group: 'halo'
        },
        {
            _key: 'text-color',
            type: 'string',
            title: 'text color',
            defaultValue: '#000000',
            group: 'color'
        },
        {
            _key: 'text-opacity',
            type: 'number',
            title: 'text opacity',
            group: 'text'
        }
    ]
};
@Form({ title: 'Mapbox Styles' })
export class MapboxStyles {
    @FormField({ title: 'Line Paint', type: 'object', form: LinePaintForm })
    public linePaint?: LinePaint;
    @FormField({ title: 'Line Layout', type: 'object', form: LineLayoutForm })
    public lineLayout?: LineLayout;
    @FormField({
        title: 'Symbol Layout',
        type: 'object',
        form: SymbolLayoutForm
    })
    public symbolLayout?: SymbolLayout;
    @FormField({ title: 'Symbol Paint', type: 'object', form: SymbolPaintForm })
    public symbolPaint?: SymbolPaint;
    @FormField({ title: 'Circle Paint', type: 'object', form: FillPaintForm })
    public fillPaint?: FillPaint;
    public fillLayout?: FillLayout;
    @FormField({ title: 'Circle Paint', type: 'object', form: CirclePaintForm })
    public circlePaint?: CirclePaint;
    public circleLayout?: CircleLayout;

    public constructor(styles?: MapboxStyles) {
        if (styles) {
            Object.assign(this, styles);
        }
    }
}

// tslint:disable-next-line: max-classes-per-file
@Form({ title: 'Layer Style' })
export class LayerStyle implements ILayerStyle {

    public type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
    // public types?: string[];
    public iconZoomLevel?: number;
    @FormField({ title: 'Feature title', type: 'string' })
    public title?: string;
    @FormField({ title: 'Map title', type: 'string' })
    public mapTitle?: string;
    @FormField({ title: 'Map Popup text', type: 'string' })
    public popup?: string;
    // @FormField({ title: 'Use Fill', type: 'checkbox', group: 'layout' })
    // public fill?: boolean;
    // @FormField({ title: 'Use Line', type: 'checkbox', group: 'layout' })
    // public line?: boolean;
    @FormField({ title: 'Use Point', type: 'checkbox', group: 'layout' })
    public pointCircle?: boolean;
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    public icons?: { [id: string]: string };
    @FormField({ title: 'Default layer property', type: 'string' })
    public defaultLegendProperty?: string;
    @FormField({ title: 'Styles', type: 'object' })
    public mapbox?: MapboxStyles;
    @FormField({ title: 'Opacity', type: 'number', min: 0, max: 100, step: 1 })
    public opacity?: number = 50;
    @FormField({ title: 'Hover Opacity', type: 'number', min: 0, max: 100, step: 1 })
    public hoverOpacity?: number = 75;
    public showSymbol?: boolean;
    public _opacity?: number;
    public _originalMapbox?: MapboxStyles;
}
