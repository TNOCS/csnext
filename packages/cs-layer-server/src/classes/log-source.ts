import { ApiProperty } from '@nestjs/swagger';
import { ILogItem } from './log-item';

/** actual log source (content) for a log */
export class LogSource {
    @ApiProperty({ required: true })
    public id!: string;
    @ApiProperty({ required: true })
    public type: 'LogCollection' = 'LogCollection';
    @ApiProperty()
    public items!: ILogItem[];

    public _localFile?: string;
}
