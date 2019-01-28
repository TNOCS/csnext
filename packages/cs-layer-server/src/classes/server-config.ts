import { LayerDefinition, Connection } from "./.";

/** Server Configuration File  */
export class ServerConfig {

    /** list of connections */
    public connections? : { [key:string]: Connection};
    
    /** List of available layers */
    public layers : LayerDefinition[] = [];        
    /** public url of server endpoint */
    public serverUrl? : string;
    /** root folder for this server config */
    public serverPath? : string;    
    /** relative root folder for sources  */
    public sourcePath? : string;
    /** relative import folder for layers */
    public importPath? : string;

    constructor (init? : ServerConfig) {
        Object.assign(this, init);
    }
}