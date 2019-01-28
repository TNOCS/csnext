import { ApiModelProperty } from '@nestjs/swagger';
import { LayerSource, LayerStyle, PropertyType, FeatureType } from './.';

/** Layer specification */
export class LayerDefinition {

    @ApiModelProperty()
    /** unique id of this layer */
    public id!: string;

    @ApiModelProperty()
    /** layer title */
    public title?: string;  

    @ApiModelProperty()
    /** layer description */
    public description?: string;    

    @ApiModelProperty()    
    public type?: string;

    @ApiModelProperty({ type: [String] })
    /** list of tags associated with this layer */
    public tags?: string[];

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
    /** if dynamic, layer and features can be updated */
    public isEditable?: boolean;

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
    public color?: string;    

    @ApiModelProperty()
    /** location of optional meta source containing featuretypes, propertytypes, etc. */
    public meta?: string;

    public style?: LayerStyle;
    public featureTypes?: {
        [key: string]: FeatureType;
    };
    public properties?: { [key: string]: PropertyType}    
    public _layerSource?: LayerSource;    
    
}

