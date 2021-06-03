import { FeatureType, GraphElement } from "@csnext/cs-data";
// import { ObservationType } from "./document/observation-type";

export class FeatureTypeStat {
    public type!: FeatureType;
    public elementCount: number = 0;
    public elements: GraphElement[] = [];
    public includedCount: number = 0;
}