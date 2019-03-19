import { ApiModelProperty } from '@nestjs/swagger';
import { LayerStyle, ILayer, FeatureCollection, ISource } from '../shared';
import { LayerSource} from './layer-source';
import { LogSource } from './log-source';

/** Layer specification */
export class LogDefintion  {

    @ApiModelProperty()
    /** unique id of this log */
    public id!: string;

    @ApiModelProperty()
    /** log title */
    public title: string;  

    @ApiModelProperty()
    /** log description */
    public description?: string;    

    @ApiModelProperty({ type: [String] })
    /** list of tags associated with this log */
    public tags?: string[];

    @ApiModelProperty({default:'geojson'})
    /** type of the original source used by this log, default json */
    public sourceType?: string;

    @ApiModelProperty()
    /** version (sematic) of this log */
    public version?: string;

    @ApiModelProperty()
    /** reference to the source of this log (relative to server) */
    public source?: string;
    
    @ApiModelProperty()
    /** external url to access the source */
    public sourceUrl?: string;

    @ApiModelProperty()
    /** if editable, layer and features can be updated by client */
    public isEditable?: boolean;

    @ApiModelProperty()
    /** if live, layer and features can be updated/pushed by server */
    public isLive?: boolean;

    @ApiModelProperty()
    /** if query needs connection, reference to connection key */
    public connectionId?: string;

    @ApiModelProperty()
    /** if query needs sql string, this is the default query string */
    public query?: string;
    
    @ApiModelProperty()
    /** log color  */
    public color?: string;    

    @ApiModelProperty()
    public externalUrl?: string;

    @ApiModelProperty()
    public externalCacheDuration?: number;

    @ApiModelProperty()
    public disableFeatureList?: boolean;

    @ApiModelProperty()
    /** location of optional meta source containing featuretypes, propertytypes, etc. */
    public meta?: string;

    public featureTypes?: FeatureCollection;
    // public properties?: PropertyCollection    
    public _logSource?: LogSource;
    public _localMeta?: string;
    
}

