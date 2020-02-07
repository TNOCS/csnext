import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import { LayerDefinition } from '../classes';
import { LayerService } from './layers.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';
import { Feature } from 'geojson';

@ApiTags()
@Controller('layers')
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    summary: 'Get available layers definitions',
    description: 'Returns all available layer definitions'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all available layer definitions.',
    type: LayerDefinition
  })
  @Get()
  public layers(): LayerDefinition[] {
    const la = this.layerService.getLayers().map(l => {
      return { ...l, ...({ _layerSource: undefined } as LayerDefinition) };
    });
    return la;
  }

  @ApiOperation({
    summary: 'Get layer definition',
    description: 'Returns single layer definition by id'
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the layer id for the layer you want to get.'
  })
  @ApiQuery({
    name: 'source',
    description: 'Set true to include actual source',
    required: false,
    type: Boolean
  })
  @Get(':id')
  public async getLayer(
    @Param('id') id: string,
    @Query('source') source?: boolean
  ): Promise<LayerDefinition | undefined> {
    if (source && source.toString() === 'true') {
      return this.layerService.getLayerAndSourceById(id);
    } else {
      return {
        ...(await this.layerService.getLayerById(id)),
        ...({ _layerSource: undefined } as LayerDefinition)
      };
    }
  }

  @ApiOperation({
    summary: 'Add or update layer definition',
    description: 'Add or update layer definition'
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the layer id for the layer you want to get.'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns new layer definitions.',
    type: LayerDefinition
  })
  @Put(':id')
  public async triggerLayer(@Param('id') id: string, @Body() body: LayerDefinition): Promise<LayerDefinition | undefined> {
    return this.layerService.putLayerDefinitionById(id, body);
  }

  @ApiOperation({
    summary: 'Trigger external layer refresh',
    description: 'Trigger layer refresh'
  })
  @ApiParam({
    name: 'id',
    description: 'Specify the layer you want to refresh'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns true if succeeded.',
    type: Boolean
  })

  @Get('/triggerRefresh/:id')
  public async triggerRefresh(@Param('id') id: string): Promise<Boolean> {
    return this.layerService.triggerLayerRefresh(id);
  }
}
