import { IMapLayer } from './imap-layer';

export interface ILayerAction {
    title: string;
    layer?: IMapLayer;
    action(layer: IMapLayer);
}
