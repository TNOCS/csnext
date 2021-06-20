import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerModule,
    OpenAPIObject
} from '@nestjs/swagger';
import compression from 'compression';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
// import { FeatureType } from '@csnext/cs-data';
export { LayerController } from './layers/layers.controller';
export { LayerSource } from './classes';
export { LayerService } from './layers/layers.service';
export { EnvController } from './env/env.controller';
// export { FeatureType } from '@csnext/cs-data';

export { SourceController } from './sources/sources.controller';
export { TypesController } from './types/types.controller';
export { FeatureController } from './features/features.controller';
export { LogService } from './logs/log-service';
export { LogController } from './logs/log-controller';
export * from './server/server-basic-auth-config';
export * from './classes/layer-definition';
export * from './classes/mapbox-style';
export * from './classes/layer-source';
// export * from './classes/feature-type';
// export * from './classes/feature-collection';
// export * from './classes/property-type';
export * from './classes/layer-meta';
export * from './classes/layer-style';
export * from './classes/log-definition';
export * from './classes/log-item';
export * from './classes/log-source';
export * from './classes/query-options';
export * from './log-items/log-items-controller';
export * from './classes/file';
export * from './files/files.service';
export * from './files/files.controller';
export * from './events/';
export * from './classes/file-server-options';

// export { TilesController } from './tiles/tiles.controller';
export { DefaultWebSocketGateway } from './websocket-gateway';
import { NestExpressApplication } from '@nestjs/platform-express';
import express, { json } from 'express';
import basicAuth from 'express-basic-auth';
import { ServerBasicAuthConfig } from './server/server-basic-auth-config';
import { ExpressPeerServer  } from 'peer';
import { IPeerOptions } from './classes/peer-options';
import { IFileServerOptions } from './classes/file-server-options';



export class ServerConfig {
    public staticFolder?: string;
    public staticPath?: string;
    public hbsViewFolder?: string;
    public assetsPath?: string;
    public openApi: boolean = true;
    public cors: boolean = true;
    public basicAuth?: ServerBasicAuthConfig;
    public peerOptions?: IPeerOptions;
    public fileServerOptions?: IFileServerOptions;
}

// tslint:disable-next-line: max-classes-per-file
export class NestServer {
    // public server: express.Express = express();
    public app!: NestExpressApplication;
    public swaggerConfig!: any;
    public config?: ServerConfig;
    public openAPI?: OpenAPIObject;
    public peerServer?: any;        

    public bootstrap(
        moduleType: any,
        title: string,
        host?: string,
        port?: number,
        external?: string,
        swaggerConfig?: any,
        globalPrefix?: string
    ): Promise<boolean> {
        return new Promise(async (resolve) => {            
            this.app = await NestFactory.create<NestExpressApplication>(moduleType, { cors: this.config.cors});
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

            if (globalPrefix) {
                this.app.setGlobalPrefix(globalPrefix);
                Logger.log(`SetGlobalPrefix '${globalPrefix}`);
            }

            if (this.config && this.config.basicAuth && this.config.basicAuth.enabled) {
                this.app.use(basicAuth({     
                    challenge: this.config.basicAuth.challenge,               
                    users: this.config.basicAuth.users
                }));
            }

            this.app.use(json({ limit: '50mb' }));
           
            if (this.config && this.config.cors) {
                this.app.enableCors({ origin: true });
            }

            if (this.config.peerOptions) {
                this.peerServer = ExpressPeerServer(this.app.getHttpServer(), this.config.peerOptions);
                this.app.use('/peerjs', this.peerServer);
            }
            this.app.use(compression());
            if (this.config && this.config.staticFolder) {

                if (this.config.staticPath) {
                    const publicDirectory: string = this.config.staticFolder;
                    this.app.use(this.config.staticPath, express.static(publicDirectory));
                    Logger.log(`Static hosting is available at '${host}:${port}${this.config.staticPath}'.`);
                    Logger.log(`Hosting static files from '${publicDirectory}'`);
                }

                if (this.config.assetsPath) {
                    const assetsDirectory: string = path.join(this.config.staticFolder, this.config.assetsPath);
                    this.app.use(this.config.assetsPath, express.static(assetsDirectory));
                    Logger.log(`Asset hosting is available at '${host}:${port}${this.config.assetsPath}'.`);
                    Logger.log(`Hosting static files from '${assetsDirectory}'`);
                }

                if (this.config.hbsViewFolder) {
                    const indexDirectory: string = path.join(this.config.staticFolder, this.config.hbsViewFolder);
                    this.app.setBaseViewsDir(indexDirectory);
                    this.app.setViewEngine('html');
                    this.app.engine('html', require('hbs').__express);
                }
                Logger.log(`Static hosting is available at '${host}:${port}${this.config.staticPath}'.`);
            }

            this.initOpenApi(swaggerConfig, title);

            await this.app.listen(port, host, () => {
                this.app.useWebSocketAdapter(new WsAdapter());

                

                // this.app.useStaticAssets(join(__dirname, '..', 'dashboard'));
                Logger.log(`Server is listening on port ${port}.`);
                Logger.log(`Swagger documentation is available at '${host}:${port}/api'.`);
                resolve(true);
            });
        });
    }

    private initOpenApi(swaggerConfig: any, title: string)
    {
        try {
            if (this.config && this.config.openApi)
            {
                if (swaggerConfig)
                {
                    this.swaggerConfig = swaggerConfig;
                } else
                {
                    this.swaggerConfig = new DocumentBuilder()
                        .setTitle(title)
                        .setDescription(title)
                        .setVersion('0.0.1')
                        .addTag('layer')
                        .build();
                }
                // console.log(JSON.stringify(this.swaggerConfig));
                this.openAPI = SwaggerModule.createDocument(
                    this.app,
                    this.swaggerConfig
                );

                SwaggerModule.setup('api', this.app, this.openAPI);
            }
        } catch(e) {
            Logger.error(`Error creating open api endpoint`)
        }
    }
}
