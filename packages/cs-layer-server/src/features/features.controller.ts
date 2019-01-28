import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import { LayerService } from '../layers/layers.service';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam,
  ApiResponse,
  ApiImplicitBody
} from '@nestjs/swagger';
import { Feature } from 'geojson';
import { LayerDefinition } from '../classes';

@ApiUseTags()
@Controller('features')
export class FeatureController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    title: 'Add or update feature',
    description: 'Add or update feature'
  })
  @ApiImplicitParam({
    name: 'sourceid',
    required: true,
    description: 'Specify the layer/source id for the layer you want to update'
  })
  @ApiImplicitParam({
    name: 'featureid',
    required: true,
    description: 'Specify the feature id for the layer you want to update'
  })
 
  @ApiResponse({
    status: 200,
    description: 'Returns added feature',
    type: LayerDefinition
  })
  @Post(':sourceid/:featureid')
  postFeature(@Body() body: Feature): Feature {
    return body;
  }
}
