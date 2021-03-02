import { LayerDefinition, Connection } from "./.";
import { FeatureCollection } from './feature-collection';
import { FeatureType, FeatureTypes } from './feature-type';

/** Server Configuration File  */
export class ServerConfig {

    /** list of connections */
    public connections?: { [key: string]: Connection };

    /** List of available layers */
    public layers: LayerDefinition[] = [];
    public types?: FeatureType[] = [];
    public featureTypes: FeatureTypes = {};
    /** public url of server endpoint */
    public serverUrl?: string;
    /** root folder for this server config */
    public serverPath?: string;
    /** relative root folder for sources  */
    public sourcePath?: string;
    /** relative import folder for layers */
    public importPath?: string;
    /** interval for sending socket feature updates in ms */
    public socketFlushInterval?: number;

    constructor(init?: ServerConfig) {
        Object.assign(this, init);
    }
}