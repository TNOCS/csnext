import { NestFactory } from '@nestjs/core';
// import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const packageInfo = require('./package.json');
// import express = require('express');

// async function bootstrap() {

//   const server = express();
//   const app = await NestFactory.create(ApplicationModule, server, { cors: true });
  
//   const host = process.env.LAYER_SERVER_HOST || 'localhost';
//   const port = process.env.LAYER_SERVER_PORT || 4000;
//   const external = process.env.LAYER_SERVER_EXTERNAL || 'localhost:4000';

//   const options = new DocumentBuilder()
//     .setTitle('Layer Server')
//     .setDescription('Layer Server')
//     .setHost(`${external}`)    
//     .setVersion('0.0.1')
//     .addTag('layer')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   server.get('/swagger.json', (_req, res) => res.json(document));
//   SwaggerModule.setup('api', app, document);
  
//   await app.listen(port, host, () => {
//     console.log(
//       `Layer Server is listening on port ${port}.\nSwagger documentation is available at '${host}:${port}/api'.`,
//     );
//   });
// }
// bootstrap();

