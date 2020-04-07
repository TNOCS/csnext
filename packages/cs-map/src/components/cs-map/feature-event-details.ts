import { LngLat } from 'mapbox-gl';
import { Feature } from 'geojson';
import { IMapLayer } from '../../classes/imap-layer';

// tslint:disable-next-line: interface-name
export interface FeatureEventDetails {
    context: any;
    features: mapboxgl.MapboxGeoJSONFeature[];
    feature?: mapboxgl.MapboxGeoJSONFeature;
    lngLat: LngLat;
    layer?: IMapLayer;
}
