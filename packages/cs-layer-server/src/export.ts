import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, SwaggerBaseConfig } from '@nestjs/swagger';
import { INestApplication, Type } from '@nestjs/common';
import { Module } from '@nestjs/core/injector/module';
export { LayerController } from './layers/layers.controller';
export { LayerSource} from './shared';
export { LayerService } from './layers/layers.service';
export { SourceController } from './sources/sources.controller';
export { FeatureController } from './features/features.controller';
// export { TilesController } from './tiles/tiles.controller';
export { DefaultWebSocketGateway } from './websocket-gateway';
import { WsAdapter } from '@nestjs/websockets';
import express from 'express';

export class NestServer {
  public server = express();
  public app!: INestApplication;
  public swaggerConfig!: SwaggerBaseConfig;  
  
  
  public bootstrap(moduleType: any, title: string, host?: string, port?: number, external?: string, swaggerConfig? : SwaggerBaseConfig): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.app = await NestFactory.create(moduleType, this.server, {
        cors: true
      });

      
            
      // get config from env settings
      if (!host) { host = process.env.LAYER_SERVER_HOST || 'localhost'; }
      if (!port) { port = parseInt(process.env.LAYER_SERVER_PORT || '4000'); }
      if (!external) { external = process.env.LAYER_SERVER_EXTERNAL || 'localhost:4000'; }

      if (swaggerConfig) {
        this.swaggerConfig = swaggerConfig;
      } else {
        this.swaggerConfig = new DocumentBuilder()
        .setTitle(title)
        .setDescription(title)
        .setHost(`${external}`)
        .setVersion('0.0.1')
        .addTag('layer')
        .build();
      }

      const document = SwaggerModule.createDocument(this.app, this.swaggerConfig);
      this.server.get('/swagger.json', (_req, res) => res.json(document));
      SwaggerModule.setup('api', this.app, document);

      await this.app.listen(port, host, () => {
        this.app.useWebSocketAdapter(new WsAdapter());      
        console.log(
          `Layer Server is listening on port ${port}.\nSwagger documentation is available at '${host}:${port}/api'.`
        );
        resolve(true);
      });    
    });
  }
}
