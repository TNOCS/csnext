import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import { LayerDefinition } from '../classes';
import { LayerService } from './layers.service';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam,
  ApiResponse
} from '@nestjs/swagger';
import { Feature } from 'geojson';

@ApiUseTags()
@Controller('layers')
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    title: 'Get available layers definitions',
    description: 'Returns all available layer definitions'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all available layer definitions.',
    type: LayerDefinition
  })
  @Get()
  layers(): LayerDefinition[] {
    let la = this.layerService.getLayers().map(l => {
      return { ...l, ...({ _layerSource: undefined } as LayerDefinition) };
    });
    return la;
  }

  @ApiOperation({
    title: 'Get layer definition',
    description: 'Returns single layer definition by id'
  })
  @ApiImplicitParam({
    name: 'id',
    description: 'Specify the layer id for the layer you want to get.'
  })
  @ApiImplicitQuery({
    name: 'source',
    description: 'Set true to include actual source',
    required: false,
    type: Boolean
  })
  @Get(':id')
  async getLayer(
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
    title: 'Add or update layer definition',
    description: 'Add or update layer definition'
  })
  @ApiImplicitParam({
    name: 'id',
    description: 'Specify the layer id for the layer you want to get.'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns new layer definitions.',
    type: LayerDefinition
  })
  @Put(':id')
  async putLayer(@Param('id') id: string, @Body() body: LayerDefinition): Promise<LayerDefinition | undefined> {
    return this.layerService.putLayerDefinitionById(id, body);    
  }
}
