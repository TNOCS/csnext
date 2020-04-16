import { ILayerServiceOptions } from '..';
export class LayerServerOptions implements ILayerServiceOptions {
    public url?: string;
    public tags?: string[];
}
