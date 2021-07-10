import { FeatureType } from '@csnext/cs-data';

export class Observation {
    public type?: string;
    public properties?: any[];
    public relations?: any[];
    public sentence?: string;
    public _featureType?: FeatureType;
}