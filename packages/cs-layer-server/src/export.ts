import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerModule,
    SwaggerBaseConfig
} from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
export { LayerController } from './layers/layers.controller';
export { LayerSource } from './shared';
export { LayerService } from './layers/layers.service';

export { SourceController } from './sources/sources.controller';
export { FeatureController } from './features/features.controller';
export { LogService } from './logs/log-service';
export { LogController} from './logs/log-controller';
export * from './classes/layer-definition';
export * from './classes/layer-source';
export * from './classes/layer-meta';
export * from './classes/layer-style';
export * from './classes/log-definition';
export * from './classes/log-item';
export * from './classes/log-source';
export * from './log-items/log-items-controller';
// export { TilesController } from './tiles/tiles.controller';
export { DefaultWebSocketGateway } from './websocket-gateway';

import express from 'express';

export class NestServer {
    public server: express.Express = express();
    public app!: INestApplication;
    public swaggerConfig!: SwaggerBaseConfig;

    public bootstrap(
        moduleType: any,
        title: string,
        host?: string,
        port?: number,
        external?: string,
        swaggerConfig?: SwaggerBaseConfig
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this.app = await NestFactory.create(moduleType);
            
            // // get config from env settings
            if (!host) {
                host = process.env.LAYER_SERVER_HOST || 'localhost';
            }
            if (!port) {
                port = parseInt(process.env.LAYER_SERVER_PORT || '4000');
            }
            if (!external) {
                external =
                    process.env.LAYER_SERVER_EXTERNAL || 'localhost:4000';
            }

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

            const document = SwaggerModule.createDocument(
                this.app,
                this.swaggerConfig
            );
            this.server.get('/swagger.json', (_req, res) => res.json(document));
            SwaggerModule.setup('api', this.app, document);
            this.app.enableCors({ origin: true});

            await this.app.listen(port, host, () => {
                this.app.useWebSocketAdapter(new WsAdapter());
                Logger.log(`Server is listening on port ${port}.`);
                Logger.log(`Swagger documentation is available at '${host}:${port}/api'.`);
                resolve(true);
            });
        });
    }
}
