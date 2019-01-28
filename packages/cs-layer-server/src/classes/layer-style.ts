export class LayerStyle {
    /** feature types available in layer (fill, line, point, .etc)*/
    public types? : string[];
    public mapbox?: MapboxStyle;
    public iconZoomLevel?: number;
    public mapTitle?: string;
    public title? : string;
    public fill?: boolean;
    public line?: boolean;
    public popup?: string;
    public pointCircle?: boolean;
}

export class MapboxStyle {
    public fillPaint: any;
    public linePaint: any;
    public symbolPaint: any;
    public circlePaint: any;
    public fillLayout: any;
    public lineLayout: any;
    public symbolLayout: any;
    public circleLayout: any;
}