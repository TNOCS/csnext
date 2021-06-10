import { FeatureType, GraphElement } from '../..';

export class FeatureTypeStat {
    public type!: FeatureType;
    public elementCount: number = 0;
    public elements: GraphElement[] = [];
    public includedCount: number = 0;
}