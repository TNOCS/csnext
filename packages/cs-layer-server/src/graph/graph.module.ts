import { Global, Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { DefaultWebSocketGateway  } from '../websocket-gateway';
import { FeatureController, SourceController, TypesController } from '../export';

@Module({
  controllers: [GraphController],
  providers: [GraphService],
  imports: [GraphService],
  exports: [GraphService]
})
export class GraphModule {}