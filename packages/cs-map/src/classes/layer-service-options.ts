export interface ILayerServiceOptions {
    tags?: string[];
    openFeatureDetails?: boolean;
    setSourceUrl?: boolean;
}

export abstract class LayerServiceOptions implements ILayerServiceOptions{
    public tags?: string[];
    public openFeatureDetails?: boolean;
    public setSourceUrl?: boolean;
}