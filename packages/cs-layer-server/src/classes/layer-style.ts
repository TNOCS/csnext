import { ClusterSettings } from 'cluster';
import { CircleLayout, CirclePaint, FillLayout, FillPaint, LineLayout, LinePaint, SymbolLayout, SymbolPaint } from 'mapbox-gl';


// export class LayerStyle {
//     /*** feature types available in layer (fill, line, point, .etc)*/
//     public types?: string[];
//     public mapbox?: MapboxStyle;
//     public iconZoomLevel?: number;
//     public mapTitle?: string;
//     public title?: string;
//     public fill?: boolean;
//     public line?: boolean;
//     public popup?: string;
//     public pointCircle?: boolean;
//     public defaultLegendProperty?: string;
// }


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

export class LayerStyle implements ILayerStyle {
    public types?: string[];    
    public type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
    // public types?: string[];
    public iconZoomLevel?: number;
    public title?: string;
    public mapTitle?: string;
    public popup?: string;
    public pointCircle?: boolean;
    public icon?: string;
    public icons?: { [id: string]: string };
    public defaultLegendProperty?: string;
    public mapbox?: MapboxStyles;
    public opacity?: number = 50;
    public hoverOpacity?: number = 75;
    public showSymbol?: boolean;
    public clusterSettings?: ClusterSettings;
    public _opacity?: number;
    public _originalMapbox?: MapboxStyles;
}

export class MapboxStyles {
    public linePaint?: LinePaint;
    public lineLayout?: LineLayout;
    public symbolLayout?: SymbolLayout;
    public symbolPaint?: SymbolPaint;
    public fillPaint?: FillPaint;
    public fillLayout?: FillLayout;
    public circlePaint?: CirclePaint;
    public circleLayout?: CircleLayout;

    public constructor(styles?: MapboxStyles) {
        if (styles) {
            Object.assign(this, styles);
        }
    }
}
