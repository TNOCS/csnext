import { Get, Controller, Param, Post, Body, Query, Put, Delete, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { UseInterceptors, NestInterceptor, UploadedFile } from  '@nestjs/common';
import { diskStorage } from  'multer';

import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiParam,
    ApiResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfflineService } from './offline.service';

@ApiTags()
@Controller('offline')
export class OfflineController {
    constructor(private readonly offlineService: OfflineService) { }
   

    @ApiOperation({
        summary: 'Get offline website'        
    })
    @ApiResponse({
        status: 200,
        description: 'Returns all available files.',
        type: Buffer
    })
    @Get('/store')    
    public async file(@Query('url') url: string, @Res() response: Response )  {
        if (url.indexOf(',') !== -1) {
            url = url.split(',')[0];
        }
        const file = await this.offlineService.store(url);
        response.send(file);        
    }

    
    // @ApiOperation({
    //     summary: 'Add or update layer definition',
    //     description: 'Add or update layer definition'
    // })
    // @ApiParam({
    //     name: 'id',
    //     description: 'Specify the layer id for the layer you want to get.'
    // })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Returns new file definition',
    //     type: FileDefinition
    // })
    
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // public async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<FileDefinition | undefined> {
    //     return new Promise((resolve, reject) => {
    //         resolve(this.filesService.saveFile(file));                        
    //     })        
    // }    
 
}

