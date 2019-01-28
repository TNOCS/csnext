import { Get, Controller, Param, Post, Body, Put } from "@nestjs/common";
import { LayerSource } from "../classes";

import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitParam,
  ApiResponse
} from "@nestjs/swagger";

import { LayerService } from "../layers/layers.service";

@ApiUseTags()
@Controller("sources")
export class SourceController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    title: "Get layer source",
    description: "Returns single layer source by id"
  })
  @ApiImplicitParam({
    name: "id",
    description: "Specify the layer id for the layer you want to get"
  })
  @ApiResponse({
    status: 200,
    description: "Returns layer source",
    type: LayerSource
  })
  @Get(":id")
  async getLayerSource(
    @Param("id") id: string
  ): Promise<LayerSource | undefined> {
    return await this.layerService.getLayerSourceById(id);
  }

  @Put(":id")
  async putLayerSource(
    @Param("id") id: string,
    @Body() body: LayerSource
  ): Promise<boolean> {
    console.log(id);
    return await this.layerService.putLayerSourceById(id, body);
  }
}
