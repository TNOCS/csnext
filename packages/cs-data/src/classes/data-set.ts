import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { DataCollection } from '..';

// tslint:disable-next-line: max-classes-per-file
export class DataSet implements DataCollection {
    public type: 'FeatureCollection' | 'Table' = 'FeatureCollection';
    public features: Array<Feature<Geometry, GeoJsonProperties>> = [];
    public bbox?: [number, number, number, number] | [number, number, number, number, number, number];
    public data?: any[];
}
