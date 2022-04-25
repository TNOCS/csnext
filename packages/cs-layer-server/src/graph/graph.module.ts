import { forwardRef, Global, Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { DefaultWebSocketGateway } from '../websocket-gateway';
import { FilesService, LayersModule, OfflineService } from '../export';

@Module({
  controllers: [GraphController],
  providers: [GraphService, FilesService, OfflineService],
  imports: [LayersModule],
  exports: [GraphService],
})
export class GraphModule {}
