import { Get, Controller, Param, Post, Body, Query, Put } from '@nestjs/common';
import {
    ApiUseTags,
    ApiOperation,
    ApiImplicitQuery,
    ApiImplicitParam,
    ApiResponse
} from '@nestjs/swagger';
import { LogDefintion } from '../classes/log-definition';
import { LogService, ILogItem } from '../export';

@ApiUseTags()
@Controller('logitems')
export class LogItemsController {
    constructor(private readonly logService: LogService) {}

    @ApiOperation({
        title: 'Add or update log item',
        description: 'Add or update log item'
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
    async addLogItem(
        @Param('id') log: string,
        @Body() body: ILogItem
    ): Promise<boolean | undefined> {
        this.logService.addLogItem(log, body);
        return true;
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
