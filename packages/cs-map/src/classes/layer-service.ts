interface IStartStopService {
    Start: () => void;
    Stop: () => void;
}

export abstract class LayerServiceBase implements IStartStopService {
    public id!: string;
    public title?: string;
    
    public Start() {
        throw "Not yet implemented";
    }

    public Stop() {
        throw "Not yet implemented";
    }
}