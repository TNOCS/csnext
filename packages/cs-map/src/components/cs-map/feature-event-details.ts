import { LngLat } from 'mapbox-gl';
import { Feature } from 'geojson';

// tslint:disable-next-line: interface-name
export interface FeatureEventDetails {
    context: any;
    features: Feature[];
    feature?: Feature;
    lngLat: LngLat;
}
