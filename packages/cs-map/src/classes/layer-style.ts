export class LayerStyle {
    /** feature types available in layer (fill, line, point, .etc)*/
    public types? : string[];
    public iconZoomLevel?: number;
    public title? : string;
    public popup? : string;
    public fill?: boolean;
    public pointCircle?: boolean;
}