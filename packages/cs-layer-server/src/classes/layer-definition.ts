import { ApiModelProperty } from '@nestjs/swagger';
import { LayerStyle, ILayer, FeatureCollection, ISource } from '../shared';
import { LayerSource} from './layer-source';

/** Layer specification */
export class LayerDefinition implements ILayer {

    @ApiModelProperty()
    /** unique id of this layer */
    public id!: string;

    @ApiModelProperty()
    /** layer title */
    public title: string;  

    @ApiModelProperty()
    /** layer description */
    public description: string;    

    @ApiModelProperty({ type: [String] })
    /** list of tags associated with this layer */
    public tags: string[];

    @ApiModelProperty({default:'geojson'})
    /** type of the original source used by this layer, default geojson */
    public sourceType?: string;

    @ApiModelProperty()
    /** version (sematic) of this layer */
    public version?: string;

    @ApiModelProperty()
    /** reference to the source of this layer (relative to server) */
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
    public tileSupport?: string;
    
    @ApiModelProperty()
    /** layer color  */
    public color: string;    

    @ApiModelProperty()
    public externalUrl: string;

    @ApiModelProperty()
    public externalCacheDuration: number;

    @ApiModelProperty()
    public disableFeatureList: boolean;

    @ApiModelProperty()
    /** location of optional meta source containing featuretypes, propertytypes, etc. */
    public meta?: string;

    public style?: LayerStyle;
    public featureTypes?: FeatureCollection;
    // public properties?: PropertyCollection    
    public _layerSource?: LayerSource;
    public _localMeta?: string;
    
}

