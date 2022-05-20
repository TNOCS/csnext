import { Get, Controller, Post, Body, Logger } from '@nestjs/common';
import { FeatureType, FeatureTypes } from '@csnext/cs-data';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { LayerService } from '../layers/layers.service';

@ApiTags()
@Controller('types')
export class TypesController {
  constructor(private readonly layerService: LayerService) {}

  @ApiOperation({
    summary: 'Get available feature types',
    description: 'Returns all available feature types',
  })
  @ApiResponse({
    status: 200,
    description: 'List ofall FeatureType definitions',
  })
  @Get()
  public featuretypes(): FeatureTypes {
    return this.layerService.getTypes();
  }

  @ApiOperation({
    summary: 'Get available feature types',
    description: 'Returns all available feature types',
  })
  @ApiResponse({
    status: 200,
    description: 'List ofall FeatureType definitions',
  })
  @Get()
  public dataModel(): FeatureTypes {
    return this.layerService.getTypes();
  }

  @ApiOperation({
    summary: 'Reload datamodel',
    description: 'Reloads datamodel from storage',
  })
  @ApiResponse({
    status: 200,
    description: 'None',
  })
  @Get('/reload')
  public reload(): Promise<boolean> {
    return this.layerService.reloadTypes();
  }

  @ApiOperation({
    summary: 'Get available feature types with their base types merged',
    description: 'Returns all available feature types',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all FeatureType definitions',
  })
  @Get('/merged')
  public featuretypesMerged(): FeatureTypes {
    return FeatureType.mergeFeatureTypes(this.layerService.getTypes());
  }

  @ApiOperation({
    summary: 'Add or update feature type',
    description: 'Add or update feature type',
  })
  @ApiParam({
    name: 'sourceid',
    required: true,
    description: 'Specify the layer/source id for the layer you want to update',
  })
  @ApiParam({
    name: 'featureid',
    required: true,
    description: 'Specify the feature id for the layer you want to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns added feature',
    type: FeatureType,
  })
  @Post()
  public postFeatureType(
    @Body() body: FeatureType | FeatureTypes
  ): Promise<FeatureType | FeatureTypes | undefined> {
    if (body.hasOwnProperty('type')) {
      Logger.log(`Saving featuretype ${body.type}`);
      return this.layerService.updateFeatureType(body);
    } else {
      Logger.log(`Saving featuretypes`);
      return this.layerService.updateFeatureTypes(body as FeatureTypes);
    }
  }
}
