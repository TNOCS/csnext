import { LayerSource } from "./layer-source";
import { ServerConfig, LayerMeta } from ".";
import { Layer } from "mapbox-gl";
import { LayerDefinition } from './layer-definition';
import { QueryOptions } from './query-options';

export interface ILoadResult {
    source: LayerSource;
    updated: boolean;
    meta?: LayerMeta;

}

export class Connection {
    public user?: string;
    public host?: string;
    public database?: string;
    public password?: string;
    public port?: number;    
}

/** plugin for starting/using different sources */
export interface ISourcePlugin {
    id: string;
    init?() : Promise<boolean>;  
    /** import function for converting different formats to geojson */  
    import?(file: string) : Promise<LayerSource | undefined>;
    load?(file: string, meta?: string) : Promise<ILoadResult>;
    query?(connection: Connection, query: string, options: QueryOptions) : Promise<ILoadResult>;
    createEmpty?(folder: string, def: LayerDefinition) : Promise<{ def: LayerDefinition, source: LayerSource}>;
    saveMeta?(def: LayerDefinition);
}

export interface ISourcePluginOptions {
    [key: string]: any;
}

export interface ISourcePluginType {
    /** extension id */
    id: string;
    /** extension options */
    options?: ISourcePluginOptions;
    /** list of supported file extensions */
    fileExtensions?: string[];

    /** supported loading source type (e.g. geojson) */
    source?: string;

    /** method to invoke actual plugin instance */
    getInstance?: (init?: Partial<any>) => ISourcePlugin;
}
