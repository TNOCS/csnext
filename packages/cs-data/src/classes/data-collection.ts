import { FeatureCollection } from 'geojson';

// tslint:disable-next-line: interface-name
export interface DataCollection extends Omit<FeatureCollection, 'type'> {
    type: 'FeatureCollection' | 'Table';
    data?: any[];
}
