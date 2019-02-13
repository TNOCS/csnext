import { ApiModelProperty } from "@nestjs/swagger";

/** actual layer source (content) for a layer */
export class LayerSource implements GeoJSON.FeatureCollection {
    @ApiModelProperty({ required: true})
    public type : 'FeatureCollection' = 'FeatureCollection';
    @ApiModelProperty()
    public features!: any;
    @ApiModelProperty()
    bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
    @ApiModelProperty({ required: true})
    public id!: string;

    public _localFile?: string;
    public _tiles: any;
}