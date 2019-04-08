import { ILogItem } from './log-item';
import { AppState } from '../..';
import { LogDataSource } from './log-datasource';
import { Topics } from '@csnext/cs-core';

export class LogManager {
    public items: ILogItem[] = [];
    public source: LogDataSource | undefined;

    public init(sourceId: string, state: AppState): Promise<ILogItem[]> {
        return new Promise((resolve, reject) => {
            state.loadDatasource<LogDataSource>(sourceId)
                .then(r => {
                    this.source = r;
                    this.items = this.items.concat(r.items);
                    r.events.subscribe(Topics.LOG_TOPIC, (a: string, logItem: ILogItem) => {
                        if (a === Topics.LOG_ITEM_ADDED) {
                            this.items.push(logItem);
                        }
                    });
                    resolve(this.items);
                })
                .catch(e => {
                    reject();
                    console.log(
                        `Error loading logsource ${sourceId}`
                    );
                });
        });
    }
}
