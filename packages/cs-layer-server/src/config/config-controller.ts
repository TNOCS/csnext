import { Res, Controller, Get, Logger } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  constructor() {}

  @Get('/')
  getLog() {
    Logger.log('Config requested', 'ConfigController')
    const config: any = {};
    for (const key of Object.keys(process.env)) {
      if (key.startsWith('VUE_')) {
        config[key] = process.env[key];
      }
    }

    return JSON.stringify(config);
  }
}
