import {Get, Controller, Param, Post, Body} from '@nestjs/common';

@Controller()
export class AppController {

  @Get('swagger.json')
  openApi(): string {
    return '';
  }
  // @Get()
  // root(): string {
  //   return 'Hello, Layer Server!';
  // }
  
  // @Get('version')
  // version(): string {
  //   return 'v0.0.1';
  // }

}
