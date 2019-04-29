import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import {
    ApiUseTags,
    ApiOperation,
    ApiImplicitQuery,
    ApiImplicitParam,
    ApiResponse
} from '@nestjs/swagger';
import { LogService } from './log-service';
import { LogDefintion } from '../classes/log-definition';

@ApiUseTags()
@Controller('logs')
export class LogController {
    constructor(private readonly logService: LogService) {}

    @ApiOperation({
        title: 'Get available log definitions',
        description: 'Returns all available log definitions'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns all available log definitions.',
        type: LogDefintion
    })
    @Get()
    logs(): { [id: string]: LogDefintion } {
        let result: { [id: string]: LogDefintion } = {};
        const logs = this.logService.getLogs();
        for (const lid in logs) {
            if (logs.hasOwnProperty(lid)) {
                const element = logs[lid];
                result[lid] = {
                    ...element,
                    ...{ _logSource: undefined } as LogDefintion
                };
            }
        }
        return result;
    }

    @ApiOperation({
        title: 'Get log definition',
        description: 'Returns single log definition by id'
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'Specify the log id for the log you want to get.'
    })
    @ApiImplicitQuery({
        name: 'source',
        description: 'Set true to include actual source',        
        required: false,
        type: Boolean
    })
    @Get(':id')
    async getLog(
        @Param('id') id: string,
        @Query('source') source = true
    ): Promise<LogDefintion | undefined> {
        if (source && source.toString() === 'true') {
            return this.logService.getLogAndSourceById(id);
        } else {
            if (source && source.toString() === 'true') {
              return await this.logService.getLogById(id) 
            } else 
            return {
                ...(await this.logService.getLogById(id)),
                ...({ _logSource: undefined } as LogDefintion)
            };
        }
    }

    @ApiOperation({
        title: 'Add or update log definition',
        description: 'Add or update log definition'
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'Specify the log id for the log you want to get.'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns new log definitions.',
        type: LogDefintion
    })
    @Put(':id')
    async triggerLog(
        @Param('id') id: string,
        @Body() body: LogDefintion
    ): Promise<LogDefintion | undefined> {
        return this.logService.putLogDefinitionById(id, body);
    }

    @ApiOperation({
        title: 'Trigger external log refresh',
        description: 'Trigger log refresh'
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'Specify the log you want to refresh'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns true if succeeded.',
        type: Boolean
    })
    @Get('/triggerRefresh/:id')
    async triggerRefresh(@Param('id') id: string): Promise<Boolean> {
        return this.logService.triggerLogRefresh(id);
    }
}
