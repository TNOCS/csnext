import { Get, Controller, Param, Post, Body, Query, Put, Delete, Header } from '@nestjs/common';
import { FileDefinitionList, FileDefinition } from './../classes/file';
import { FilesService } from './files.service';
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
    @Get()
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
    @Header('Content-Type', 'application/image')
    public file(@Param('id') id: string): Promise<Buffer | undefined> {
        return this.filesService.getFile(id);        
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

