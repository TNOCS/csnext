import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerModule,
    SwaggerDocumentOptions
} from '@nestjs/swagger';
import compression from 'compression';
import { INestApplication, Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
export { LayerController } from './layers/layers.controller';
export { LayerSource } from './shared';
export { LayerService } from './layers/layers.service';
export { EnvController } from './env/env.controller';

export { SourceController } from './sources/sources.controller';
export { FeatureController } from './features/features.controller';
export { LogService } from './logs/log-service';
export { LogController } from './logs/log-controller';
export * from './classes/layer-definition';
export * from './classes/mapbox-style';
export * from './classes/layer-source';
export * from './classes/layer-meta';
export * from './classes/layer-style';
export * from './classes/log-definition';
export * from './classes/log-item';
export * from './classes/log-source';
export * from './log-items/log-items-controller';
// export { TilesController } from './tiles/tiles.controller';
export { DefaultWebSocketGateway } from './websocket-gateway';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';

export class ServerConfig {
    public staticFolder?: string;
    public staticPath?: string;
    public hbsViewFolder?: string;
    public assetsPath?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class NestServer {
    // public server: express.Express = express();
    public app!: NestExpressApplication;
    public swaggerConfig!: any;
    public config?: ServerConfig;

    public bootstrap(
        moduleType: any,
        title: string,
        host?: string,
        port?: number,
        external?: string,
        swaggerConfig?: any,
        globalPrefix?: string
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            // this.app = await NestFactory.create(moduleType);
            this.app = await NestFactory.create<NestExpressApplication>(moduleType, { cors: true /* enable preflight cors */ });
            // // get config from env settings
            if (!host) {
                host = process.env.LAYER_SERVER_HOST || 'localhost';
            }
            if (!port) {
                port = parseInt(process.env.LAYER_SERVER_PORT || '3009', 0);
            }
            if (!external) {
                external =
                    process.env.LAYER_SERVER_EXTERNAL || 'localhost:3009';
            }
            if (swaggerConfig) {
                this.swaggerConfig = swaggerConfig;
            } else {
                this.swaggerConfig = new DocumentBuilder()
                    .setTitle(title)
                    .setDescription(title)                
                    .setVersion('0.0.1')
                    .addTag('layer')
                    .build();
            }
            if (globalPrefix) {
                this.app.setGlobalPrefix(globalPrefix);
                Logger.log(`SetGlobalPrefix '${globalPrefix}`);
            }

            // this.server.use('/dashboard', express.static(path.join(__dirname, '/dashboard')));
            // this.server.get('/swagger.json', (_req, res) => res.json(document));

            const document = SwaggerModule.createDocument(
                this.app,
                this.swaggerConfig
            );

            SwaggerModule.setup('api', this.app, document);
            this.app.enableCors({ origin: true });
            this.app.use(compression());
            if (this.config && this.config.staticFolder) {

                if (this.config.staticPath) {
                    const publicDirectory: string = this.config.staticFolder;                    
                    this.app.use(this.config.staticPath, express.static(publicDirectory));
                    Logger.log(`Static hosting is available at '${host}:${port}${this.config.staticPath}'.`);
                }

                if (this.config.assetsPath) {
                    const publicDirectory: string = path.join(this.config.staticFolder, this.config.assetsPath);
                    this.app.use(this.config.assetsPath, express.static(publicDirectory));
                }

                if (this.config.hbsViewFolder) {
                    const indexDirectory: string = path.join(this.config.staticFolder, this.config.hbsViewFolder);
                    this.app.setBaseViewsDir(indexDirectory);
                    this.app.setViewEngine('html');
                    this.app.engine('html', require('hbs').__express);
                }
                Logger.log(`Static hosting is available at '${host}:${port}${this.config.staticPath}'.`);
            }

            await this.app.listen(port, host, () => {
                this.app.useWebSocketAdapter(new WsAdapter());

                // this.app.useStaticAssets(join(__dirname, '..', 'dashboard'));
                Logger.log(`Server is listening on port ${port}.`);
                Logger.log(`Swagger documentation is available at '${host}:${port}/api'.`);
                resolve(true);
            });
        });
    }
}
