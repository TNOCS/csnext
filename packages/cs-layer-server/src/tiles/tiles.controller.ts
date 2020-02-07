// import { Get, Controller, Param, Body, Put } from "@nestjs/common";
// import { LayerSource } from "../classes";

// import {
//   ApiTags,
//   ApiOperation,
//   ApiParam,
//   ApiResponse
// } from "@nestjs/swagger";

// import { LayerService } from "../layers/layers.service";

// @ApiTags()
// @Controller("tiles")
// export class TilesController {
//   constructor(private readonly layerService: LayerService) {}

//   @ApiOperation({
//     title: "Get vector tiles",
//     description: "Returns vector tiles single for layer source by id"
//   })
//   @ApiParam({
//     name: "id",
//     description: "Specify the layer id for the layer you want to get"
//   })
//   @ApiParam({
//     name: "z",
//     description: "z"
//   })
//   @ApiParam({
//     name: "x",
//     description: "x"
//   })
//   @ApiParam({
//     name: "y",
//     description: "y"
//   })
//   @ApiResponse({
//     status: 200,
//     description: "Returns layer vector tile",
//     type: LayerSource
//   })
//   @Get(":id/:z/:x/:y")
//   async getLayerTile(
//     @Param("id") id: string,
//     @Param("z") z: number,
//     @Param("x") x: number,
//     @Param("y") y: number,
//   ): Promise<LayerSource | undefined> {
//     return await this.layerService.getLayerSourceById(id);
//   }

 
// }
