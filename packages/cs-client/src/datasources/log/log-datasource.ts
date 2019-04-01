import { IDatasource, MessageBusService, Topics } from '@csnext/cs-core';
import { ILogItem } from '../..';

export class LogDataSource implements IDatasource {
  public id = 'logdatasource';
  public items: ILogItem[] = [];
  public events = new MessageBusService();

  constructor(public logid?: string) {}

  public addItem(item: ILogItem) {
    this.items.push(item);
    this.events.publish(Topics.LOG_TOPIC, Topics.LOG_ITEM_ADDED, item);
  }

  public removeItemById(id: string) {
    const removedItem = this.items.find(li => li.id === id);
    if (removedItem) {
      this.items = this.items.filter(li => li.id !== id);
      this.events.publish(Topics.LOG_TOPIC, Topics.LOG_ITEM_ADDED, id);
    }
  }

  public removeItem(item: ILogItem) {
    if (item.id) {
      this.removeItemById(item.id);
    }
  }

  public execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<LogDataSource> {
    return new Promise<LogDataSource>((resolve, reject) => {
      if (this.logid) {
        console.log(`Loading ${this.logid}`);
      }
      resolve(this);
    });
  }
}
