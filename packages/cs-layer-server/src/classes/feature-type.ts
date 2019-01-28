import { PropertyType } from ".";

export declare class FeatureType {
    mode?: string;
    notification?: string;
    icon?: string;
    properties?: {
        [key: string]: string | PropertyType;
    };
}