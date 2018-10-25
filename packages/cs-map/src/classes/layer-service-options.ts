export interface ILayerServiceOptions {
    tags?: string[];
}

export abstract class LayerServiceOptions implements ILayerServiceOptions{
    public tags?: string[];
}