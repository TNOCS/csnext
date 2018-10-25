import { LayerServiceBase, LayerServiceOptions, ILayerServiceOptions, ILayerService, IStartStopService } from '..';

export class LayerServerOptions implements ILayerServiceOptions {
    public url?: string;
}

export class LayerServer implements ILayerService, IStartStopService {
    id!: string;
    title?: string | undefined;

    public options?: LayerServerOptions;
    public type = 'layer-server';

    public getInstance(init?: Partial<ILayerService>) : IStartStopService {
        let result = new LayerServer(init);        
        return result;
    }

    constructor(init?: Partial<LayerServer>) {
        Object.assign(this, init);
    }

    Start() {
        console.log('Start service');
    }

    Stop() {
        console.log('Stop service');
    }

}