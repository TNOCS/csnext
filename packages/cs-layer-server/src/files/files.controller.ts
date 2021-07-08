import { Get, Controller, Param, Post, Body, Query, Put, Delete, Header, Res } from '@nestjs/common';
import { FileDefinitionList, FileDefinition } from './../classes/file';
import { FilesService } from './files.service';
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

@ApiTags()
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @ApiOperation({
        summary: 'Get available files',
        description: 'Returns all available files'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns all available files.',
        type: FileDefinitionList
    })
    @Get('/')
    public files(): Promise<FileDefinitionList> {
        return this.filesService.getFiles();        
    }

    @ApiOperation({
        summary: 'Get available files',
        description: 'Returns all available files'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns all available files.',
        type: Buffer
    })
    @Get(':id')
    @Header('Content-Type', 'image/jpg')
    public async file(@Param('id') id: string, @Query('url') url: string, @Res() response: Response )  {
        if (url) {
            console.log(url);
            id = FilesService.getFileId(url);
        }
        const file = await this.filesService.getFile(id);
        response.send(file);        
    }

    @Get('/image')
    @Header('Content-Type', 'image/jpg')
    public async imageHash(@Query('url') url: string, @Res() response: Response )  {        
        const id = FilesService.getFileId(url);
        console.log(id);
        const file = await this.filesService.getFile(id);
        response.send(file);        
    }

    

    @ApiOperation({
        summary: 'Add or update layer definition',
        description: 'Add or update layer definition'
    })
    @ApiParam({
        name: 'id',
        description: 'Specify the layer id for the layer you want to get.'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns new file definition',
        type: FileDefinition
    })
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<FileDefinition | undefined> {
        return new Promise((resolve, reject) => {
            resolve(this.filesService.saveFile(file));                        
        })        
    }    
 
}

