import { Get, Controller, Param, Post, Body, Query, Put, Delete } from '@nestjs/common';
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
  postFeature(@Body() body: Feature, @Param('sourceid') sourceid: string, @Param('featureid') featureid?: string): Promise<Feature | undefined> {    
      return this.layerService.updateFeature(sourceid, body, featureid);
  }

  @ApiOperation({
    title: 'Delete feature',
    description: 'Delete feature'
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
    description: 'Returns true if succeeded',
    type: Boolean
  })
  @Delete(':sourceid/:featureid')
  deleteFeature(@Param('sourceid') sourceid: string, @Param('featureid') featureid: string): Promise<boolean> {    
      return this.layerService.deleteFeature(sourceid, featureid);
  }
}
