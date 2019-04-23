import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { DefaultWebSocketGateway } from '../websocket-gateway';
import { LogDefintion, LogSource, ILogItem } from '../classes';

@Injectable()
export class LogService {
    public logs: { [id: string]: LogDefintion } = {};

    triggerLogRefresh(id: string): Boolean | PromiseLike<Boolean> {
        throw new Error('Method not implemented.');
    }
    putLogDefinitionById(
        id: string,
        body: import('../classes/log-definition').LogDefintion
    ):
        | import('../classes/log-definition').LogDefintion
        | PromiseLike<import('../classes/log-definition').LogDefintion> {
        throw new Error('Method not implemented.');
    }
    getLogById(id: string): LogDefintion {
        if (this.logs.hasOwnProperty(id)) {
            let res = this.logs[id];
            if (res._logSource === undefined) {
                res._logSource = { id: id, items: [], type: 'LogCollection' };
            }
            return this.logs[id];
        } else {
            return this.createLog(id);
        }
    }

    addLogItem(id: string, logItem: ILogItem) {
        let logDef = this.getLogById(id);
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

    createLog(id: string) {
        if (this.logs.hasOwnProperty(id)) {
            return this.logs[id];
        }
        let logDef: LogDefintion = {
            id: id,
            title: id,
            _logSource: { id: id, items: [], type: 'LogCollection' }
        };
        this.logs[id] = logDef;
        return logDef;
    }

    getLogAndSourceById(id: string): LogDefintion {
        if (this.logs.hasOwnProperty(id)) {
            return this.logs[id];
        }
    }

    getLogs(): { [key: string]: LogDefintion } {
        return this.logs;
    }

    constructor(
        @Inject('DefaultWebSocketGateway')
        private readonly socket: DefaultWebSocketGateway
    ) { }
}
