import { ApiProperty } from '@nestjs/swagger';
import { LayerStyle, ILayer, FeatureCollection } from './.';
import { LayerSource} from './layer-source';
import { LogSource } from './log-source';

/** Layer specification */
export class LogDefintion  {

    @ApiProperty()
    /** unique id of this log */
    public id!: string;

    @ApiProperty()
    /** log title */
    public title: string;

    @ApiProperty()
    /** log description */
    public description?: string;

    @ApiProperty({ type: [String] })
    /** list of tags associated with this log */
    public tags?: string[];

    @ApiProperty({default: 'geojson'})
    /** type of the original source used by this log, default json */
    public sourceType?: string;

    @ApiProperty()
    /** version (sematic) of this log */
    public version?: string;

    @ApiProperty()
    /** reference to the source of this log (relative to server) */
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
    /** log color  */
    public color?: string;

    @ApiProperty()
    public externalUrl?: string;

    @ApiProperty()
    public externalCacheDuration?: number;

    @ApiProperty()
    public disableFeatureList?: boolean;

    @ApiProperty()
    /** location of optional meta source containing featuretypes, propertytypes, etc. */
    public meta?: string;

    public featureTypes?: FeatureCollection;
    // public properties?: PropertyCollection
    public _logSource?: LogSource;
    public _localMeta?: string;

}

