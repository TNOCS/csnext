import { FilterGraphElement, GraphFilter } from "@csnext/cs-data"
import { MapOptions } from "@csnext/cs-map"

export class GraphMapOptions extends MapOptions {
    public filter?: string;    
    public preset?: string | FilterGraphElement;

}