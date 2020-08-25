import { Get, Controller, Param, Post, Body, Put, Optional, Query } from '@nestjs/common';
import { LayerSource } from '../classes';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';

import { LayerService } from '../layers/layers.service';

@ApiTags()
@Controller('sources')
export class SourceController {
  constructor(private readonly layerService: LayerService) { }

  @ApiOperation({
    summary: 'Get layer source',
    description: 'Returns single layer source by id'
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the layer id for the layer you want to get'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns layer source',
    type: LayerSource
  })
  @Get(':id')
  public async getLayerSource(
    @Param('id') id: string,
    @Query('bbox') bbox?: string,
    @Query('filter') filter?: string,
    @Query('types') types?: string,
  ): Promise<LayerSource | undefined> {
    const res = await this.layerService.getLayerSourceById(id, { filter, types: types?.split(','), bbox: bbox?.split(',').map(v => parseFloat(v)) });    
    return res;
  }

  @Put(':id')
  public async putLayerSource(
    @Param('id') id: string,
    @Body() body: LayerSource
  ): Promise<boolean> {
    return await this.layerService.putLayerSourceById(id, body);
  }
}
