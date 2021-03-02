import { ILayerServiceOptions } from '..';
export class LayerServerServiceOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
    public activeLayers?: string[];
    public openFeatureDetails?: boolean;
    public loadFeatureTypes?: boolean;
    public setSourceUrl?: boolean;
}
