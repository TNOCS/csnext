export interface ISource {
    /** id of this layer */
    id?: string;
    title?: string;
    type?:
        | 'vector'
        | 'raster'
        | 'raster-dem'
        | 'geojson'
        | 'image'
        | 'video';
    url?: string;
    tileSize?: number;
}