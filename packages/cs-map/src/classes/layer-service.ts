import { LayerSelectionOptions, ILayerServiceOptions, ILayerAction, IMapLayer, MapLayers } from '../.';

export interface ILayerService {
    id: string;
    title?: string;
    options?: ILayerServiceOptions;
    getLayerActions?(layer: IMapLayer): ILayerAction[];
    updateLayer?(layer: IMapLayer);
}

export interface IStartStopService extends ILayerService {
    type: string;
    Start?: (manager: MapLayers) => void;
    Stop?: (manager: MapLayers) => void;    
    getInstance?: (init?: Partial<any>) => IStartStopService;
}

export abstract class LayerServiceBase implements ILayerService, IStartStopService {
    public id!: string;
    public title?: string;
    public type!: string;
    public options?: ILayerServiceOptions;
    
    public async Start() {
        
    }

    public async Stop() {
        
    }
}