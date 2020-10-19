import { CirclePaint } from 'mapbox-gl';
import { MapboxStyles, ILayerStyle } from './mapbox-styles';

export type ClusterSettings = {
    cluster?: number | boolean;

    clusterRadius?: number;

    clusterMaxZoom?: number;

    clusterProperties?: object;

    paint?: CirclePaint;
}

export class LayerStyle implements ILayerStyle {
    public types?: string[];
    public type?: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
    public iconZoomLevel?: number;
    public title?: string;
    public mapTitle?: string;
    public popup?: string;
    public fill?: boolean;
    public line?: boolean;
    public pointCircle?: boolean;
    public showSymbol?: boolean;
    public hoverOpacity?: number = 75;
    public opacity?: number;
    public clusterSettings?: ClusterSettings;
    public icon?: string;
    public icons?: { [id: string]: string };
    public mapbox?: MapboxStyles;
}
