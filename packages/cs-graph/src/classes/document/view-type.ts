import { FeatureType } from '@csnext/cs-data';

export class EntityType {
    public id!: string;
    public title!: string;
    public color!: string;    
    public _selected?: boolean = true;
    public count?: number;
    public _featureType?: FeatureType;
}