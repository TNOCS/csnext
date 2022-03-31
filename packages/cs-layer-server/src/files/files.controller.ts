import { Get, Controller, Param, Logger, Post, Query, Header, Res } from '@nestjs/common';
import { FileDefinitionList, FileDefinition } from './../classes/file';
import { FilesService } from './files.service';
import { Response } from 'express';
import { UseInterceptors, UploadedFile } from  '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags()
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Get('/image')
    @Header('Content-Type', 'image/svg+xml')
    public async imageHash(@Query('url') url: string, @Res() response: Response )  {        
        const id = FilesService.getFileId(url);
        const file = await this.filesService.getFile(id, url);
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
    public async file(@Param('id') id: string, @Query('url') url: string, @Res() response: Response )  {
        if (url) {
            Logger.log(url);
            id = FilesService.getFileId(url);
        }
        try {
        const file = await this.filesService.getFile(id);        
        if (id.endsWith('.svg')) {
            response.type('image/svg+xml')
        } else if (id.endsWith('.png')) {
            response.type('image/png') 
        } else if (id.endsWith('.pdf')) {
            response.type('application/pdf')
        }        
        response.send(file);        
    } catch(e) {
        response.send(undefined);
    }
    }

    
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<FileDefinition | undefined> {
        return new Promise((resolve, reject) => {
            resolve(this.filesService.saveFile(file));                        
        })        
    }    
 
}

