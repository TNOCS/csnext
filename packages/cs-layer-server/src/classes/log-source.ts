import { ApiModelProperty } from '@nestjs/swagger';
import { ILogItem } from './log-item';

/** actual log source (content) for a log */
export class LogSource {
    @ApiModelProperty({ required: true })
    public id!: string;
    @ApiModelProperty({ required: true })
    public type: 'LogCollection' = 'LogCollection';
    @ApiModelProperty()
    public items!: ILogItem[];

    public _localFile?: string;
}
