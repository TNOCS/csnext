import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { DefaultWebSocketGateway } from '../websocket-gateway';
import { LogDefintion, LogSource, ILogItem } from '../classes';

@Injectable()
export class LogService {
    public logs: { [id: string]: LogDefintion } = {};

    constructor(
        @Inject('DefaultWebSocketGateway')
        private readonly socket: DefaultWebSocketGateway
    ) { }

    public triggerLogRefresh(id: string): boolean | PromiseLike<boolean> {
        throw new Error('Method not implemented.');
    }
    public putLogDefinitionById(
        id: string,
        body: import('../classes/log-definition').LogDefintion
    ):
        | import('../classes/log-definition').LogDefintion
        | PromiseLike<import('../classes/log-definition').LogDefintion> {
        throw new Error('Method not implemented.');
    }
    public getLogById(id: string): LogDefintion {
        if (this.logs.hasOwnProperty(id)) {
            const res = this.logs[id];
            if (res._logSource === undefined) {
                res._logSource = { id, items: [], type: 'LogCollection' };
            }
            return this.logs[id];
        } else {
            return this.createLog(id);
        }
    }

    public addLogItem(id: string, logItem: ILogItem) {
        const logDef = this.getLogById(id);
        logDef._logSource.items.push(logItem);
        if (this.socket && this.socket.server) {
            this.socket.server.emit(
                'logs/' + id + '/logitems',
                {
                    action: 'update',
                    log: logItem
                }
            );
        }
    }

    public createLog(id: string) {
        if (this.logs.hasOwnProperty(id)) {
            return this.logs[id];
        }
        const logDef: LogDefintion = {
            id,
            title: id,
            _logSource: { id, items: [], type: 'LogCollection' }
        };
        this.logs[id] = logDef;
        return logDef;
    }

    public getLogAndSourceById(id: string): LogDefintion {
        if (this.logs.hasOwnProperty(id)) {
            return this.logs[id];
        }
    }

    public getLogs(): { [key: string]: LogDefintion } {
        return this.logs;
    }
}
