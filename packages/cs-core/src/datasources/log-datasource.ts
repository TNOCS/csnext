import { IDatasource, MessageBusService } from '..';

export class LogDataSource implements IDatasource {
  public start?: number;
  public end?: number;
  public focusTime?: number;
  public id = 'logdatasource';

  public events = new MessageBusService();
  public execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<LogDataSource> {
    return new Promise<LogDataSource>((resolve, reject) => {
      resolve(this);
    });
  }
}
