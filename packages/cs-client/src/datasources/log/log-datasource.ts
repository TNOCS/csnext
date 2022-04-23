import { IDatasource, MessageBusService, Topics } from '@csnext/cs-core';
import { ILogItem } from '../..';
import Axios from 'axios';
import { AppState } from '../../services/app-state';
import { Socket } from 'socket.io-client';

export class LogDataSource implements IDatasource {
  public id = 'logdatasource';
  public items: ILogItem[] = [];
  public bus = new MessageBusService();

  public get socket(): Socket | undefined {
    return AppState.Instance.socket;
  }

  constructor(public logurl?: string, public logid?: string) { }

  public addItem(item: ILogItem) {
    this.items.push(item);
    this.bus.publish(Topics.LOG_TOPIC, Topics.LOG_ITEM_ADDED, item);
  }

  public updateItem(item: ILogItem) {
    // this.items.push(item);
    this.bus.publish(Topics.LOG_TOPIC, Topics.LOG_ITEM_UPDATED, item);
  }

  public selectItemId(id: string) {
    
  }

  public removeItemById(id: string) {
    const removedItem = this.items.find(li => li.id === id);
    if (removedItem) {
      this.items = this.items.filter(li => li.id !== id);
      this.bus.publish(Topics.LOG_TOPIC, Topics.LOG_ITEM_ADDED, id);
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
        Axios.get<any>(this.logurl + this.logid).then(r => {          
          if (r.data && r.data._logSource && r.data._logSource.items) {
            this.items = r.data._logSource.items;
            if (this.socket) {
              this.socket.on('logs/' + this.logid + '/logitems', (d: { action: string, log: ILogItem }) => {
                switch (d.action) {
                  case 'update':
                    this.addItem(d.log);
                }
              });
            }
            resolve(this);
          }
        }).catch(e => {
          // console.log(e);
        });
      }
    });
  }
}
