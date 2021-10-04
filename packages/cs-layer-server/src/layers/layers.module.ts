import { Global, Module } from '@nestjs/common';
import { LayerController } from './layers.controller';
import { LayerService } from './layers.service';
import { DefaultWebSocketGateway  } from '../websocket-gateway';
import { FeatureController, SourceController, TypesController } from '../export';

@Module({
  controllers: [LayerController, FeatureController, SourceController, TypesController ],
  providers: [LayerService],
  imports: [LayerService],
  exports: [LayerService]
})
export class LayersModule {}