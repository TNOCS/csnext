export interface ILayerServiceOptions {
    tags?: string[];
    openFeatureDetails?: boolean;
}

export abstract class LayerServiceOptions implements ILayerServiceOptions{
    public tags?: string[];
    public openFeatureDetails?: boolean;
}