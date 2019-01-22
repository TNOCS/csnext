export class LayerStyle {
    /** feature types available in layer (fill, line, point, .etc)*/
    public types? : string[];
    public iconZoomLevel?: number;
    public title? : string;
    public mapTitle?: string;
    public popup? : string;
    public fill?: boolean;
    public line?: boolean;
    public pointCircle?: boolean;
    public icon?: string;
    public icons?: { [id:string]: string}
}