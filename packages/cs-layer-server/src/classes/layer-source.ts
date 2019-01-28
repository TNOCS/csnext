import { ApiModelProperty } from "@nestjs/swagger";
import GeoJSON from "geojson";

/** actual layer source (content) for a layer */
export class LayerSource {
    @ApiModelProperty({ required: true})
    public type : "FeatureCollection" = "FeatureCollection";
    @ApiModelProperty()
    public features!: any;
    @ApiModelProperty()
    bbox?: [number, number, number, number] | [number, number, number, number, number, number] | undefined;
    @ApiModelProperty({ required: true})
    public id!: string;

    public _localFile?: string;
    public _tiles: any;


}