import { LngLat } from 'mapbox-gl';
import { Feature } from 'geojson';
import { IMapLayer } from '../../classes/imap-layer';

// tslint:disable-next-line: interface-name
export interface FeatureEventDetails {
    context: any;
    features: Feature[];
    feature?: Feature;
    lngLat: LngLat;
    layer?: IMapLayer;
}
