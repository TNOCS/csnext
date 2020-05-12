import { ApiProperty } from '@nestjs/swagger';
import { Feature } from 'geojson';

/** actual layer source (content) for a layer */
export class LayerSource implements GeoJSON.FeatureCollection {
    @ApiProperty({ required: true})
    public type: 'FeatureCollection' = 'FeatureCollection';
    @ApiProperty()
    public features!: Feature[];
    @ApiProperty()
    public bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
    @ApiProperty({ required: true})
    public id!: string;

    public _localFile?: string;
    public _promoteId?: string;
    public _tiles: any;
    public _socketQueue: {[key: string]: any} = {};
}
