import { MapboxStyle } from '../export';

export class LayerStyle {
    /*** feature types available in layer (fill, line, point, .etc)*/
    public types?: string[];
    public mapbox?: MapboxStyle;
    public iconZoomLevel?: number;
    public mapTitle?: string;
    public title?: string;
    public fill?: boolean;
    public line?: boolean;
    public popup?: string;
    public pointCircle?: boolean;
    public defaultLegendProperty?: string;
}
