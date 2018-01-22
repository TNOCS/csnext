import { IDatasource, IDatasourceProcessor, ProcessorActions } from '@csnext/cs-core';
export declare class Dimension {
    Label: string;
}
export declare class CrossFilterOptions {
    Dimensions: Dimension[];
}
/**
 */
export declare class CrossFilterProcessor implements IDatasourceProcessor {
    id: string;
    execute(ds: IDatasource, action?: ProcessorActions, data?: object): Promise<any>;
}
