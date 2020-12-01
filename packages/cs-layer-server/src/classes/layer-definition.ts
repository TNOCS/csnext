import { ApiProperty } from '@nestjs/swagger';
import { ILayer, LayerStyle } from '.';
import { FeatureCollection } from './feature-collection';
import { LayerSource} from './layer-source';

/** Layer specification */
export class LayerDefinition implements ILayer {

    @ApiProperty()
    /** unique id of this layer */
    public id!: string;

    @ApiProperty()
    /** layer title */
    public title: string;

    @ApiProperty()
    /** layer description */
    public description?: string;

    @ApiProperty({ type: [String] })
    /** list of tags associated with this layer */
    public tags?: string[];

    @ApiProperty({default: 'geojson'})
    /** type of the original source used by this layer, default geojson */
    public sourceType?: string;

    @ApiProperty()
    /** version (sematic) of this layer */
    public version?: string;

    @ApiProperty()
    /** reference to the source of this layer (relative to server) */
    public source?: string;

    @ApiProperty()
    /** external url to access the source */
    public sourceUrl?: string;

    @ApiProperty()
    /** if editable, layer and features can be updated by client */
    public isEditable?: boolean;

    @ApiProperty()
    /** if live, layer and features can be updated/pushed by server */
    public isLive?: boolean;

    @ApiProperty()
    /** if query needs connection, reference to connection key */
    public connectionId?: string;

    @ApiProperty()
    /** if query needs sql string, this is the default query string */
    public query?: string;

    @ApiProperty()
    public tileSupport?: string;

    @ApiProperty()
    /** layer color  */
    public color: string;

    @ApiProperty()
    /** link to external layer location */
    public externalUrl: string;

    @ApiProperty()
    public externalCacheDuration: number;

    @ApiProperty()
    public disableFeatureList: boolean;

    @ApiProperty()
    /** location of optional meta source containing featuretypes, propertytypes, etc. */
    public meta?: string;
    public disableCache?: boolean;

    public type?: string;

    public style?: LayerStyle;
    public featureTypes?: FeatureCollection;
    // public properties?: PropertyCollection
    public _layerSource?: LayerSource;
    public _localMeta?: string;
}