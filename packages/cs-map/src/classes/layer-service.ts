import { LayerSelectionOptions, ILayerServiceOptions } from '../.';

export interface ILayerService {
    id: string;
    title?: string;
    options?: ILayerServiceOptions
}

export interface IStartStopService extends ILayerService {
    type: string;
    Start?: () => void;
    Stop?: () => void;    
    getInstance?: (init?: Partial<any>) => IStartStopService;
}

export abstract class LayerServiceBase implements ILayerService, IStartStopService {
    public id!: string;
    public title?: string;
    public type!: string;
    public options?: ILayerServiceOptions;
    
    public Start() {
        
    }

    public Stop() {
        
    }
}