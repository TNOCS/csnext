import { Feature } from 'geojson';
export interface IFeatureAction {
    action: 'update' | 'delete';
    feature: Feature;
}
