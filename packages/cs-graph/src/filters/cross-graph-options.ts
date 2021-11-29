import { ChartOptions } from "@csnext/cs-crossfilter";

export interface CrossGraphOptions {
    showMap?: boolean
    showTimeline?: boolean;
    mappingConfig?: { [id: string]: string[] };
    charts?: ChartOptions[];
    baseFeatureType?: string;
}
