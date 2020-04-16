import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiParam,
    ApiResponse
} from '@nestjs/swagger';
import { LogDefintion } from '../classes/log-definition';
import { LogService, ILogItem } from '../export';

@ApiTags()
@Controller('logitems')
export class LogItemsController {
    constructor(private readonly logService: LogService) {}

    @ApiOperation({
        summary: 'Add or update log item',
        description: 'Add or update log item'
    })
    @ApiParam({
        name: 'id',
        description: 'Specify the log id for the log you want to get.'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns new log definitions.',
        type: LogDefintion
    })
    @Put(':id')
    public async addLogItem(
        @Param('id') log: string,
        @Body() body: ILogItem
    ): Promise<boolean | undefined> {
        this.logService.addLogItem(log, body);
        return true;
    }

    @ApiOperation({
        summary: 'Trigger external log refresh',
        description: 'Trigger log refresh'
    })
    @ApiParam({
        name: 'id',
        description: 'Specify the log you want to refresh'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns true if succeeded.',
        type: Boolean
    })
    @Get('/triggerRefresh/:id')
    public async triggerRefresh(@Param('id') id: string): Promise<boolean> {
        return this.logService.triggerLogRefresh(id);
    }
}
