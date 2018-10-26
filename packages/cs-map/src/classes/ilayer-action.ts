import { IMapLayer } from './imap-layer';

export interface ILayerAction {
    title: string;
    action(layer: IMapLayer);
}
