import { Controller, Param, Post, Body, Delete } from '@nestjs/common';
import { LayerService } from '../layers/layers.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse} from '@nestjs/swagger';
import { Feature } from 'geojson';
import { LayerDefinition } from '../classes';

@ApiTags()
@Controller('features')
export class FeatureController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    summary: 'Add or update feature',
    description: 'Add or update feature'
  })
  @ApiParam({
    name: 'sourceid',
    required: true,
    description: 'Specify the layer/source id for the layer you want to update'
  })
  @ApiParam({
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
  public postFeature(@Body() body: Feature, @Param('sourceid') sourceid: string, @Param('featureid') featureid?: string): Promise<Feature | undefined> {
      return this.layerService.updateFeature(sourceid, body, featureid);
  }

  @ApiOperation({
    summary: 'Delete feature',
    description: 'Delete feature'
  })
  @ApiParam({
    name: 'sourceid',
    required: true,
    description: 'Specify the layer/source id for the layer you want to update'
  })
  @ApiParam({
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
  public deleteFeature(@Param('sourceid') sourceid: string, @Param('featureid') featureid: string): Promise<boolean> {
      return this.layerService.deleteFeature(sourceid, featureid);
  }
}
