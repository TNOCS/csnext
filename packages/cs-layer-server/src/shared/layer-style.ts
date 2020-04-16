import { MapboxStyles, ILayerStyle } from './mapbox-styles';

export class LayerStyle implements ILayerStyle {
    public types?: string[];
    public iconZoomLevel?: number;
    public title?: string;
    public mapTitle?: string;
    public popup?: string;
    public fill?: boolean;
    public line?: boolean;
    public pointCircle?: boolean;
    public icon?: string;
    public icons?: { [id: string]: string };
    public mapbox?: MapboxStyles;
}
