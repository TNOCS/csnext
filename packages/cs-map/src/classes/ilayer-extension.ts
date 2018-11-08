import {IMapLayer} from './imap-layer';

export interface ILayerExtensionOptions {
    [key: string]: any;
}

export interface ILayerExtensionType {
    /** extension id */
    id: string;
    /** extension options */
    options?: ILayerExtensionOptions;
    getInstance?: (init?: Partial<any>) => ILayerExtension;
}

export interface ILayerExtension extends ILayerExtensionType {
    start(layer: IMapLayer);
    stop();
}
