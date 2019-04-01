import { IDatasource, MessageBusService } from '..';

export class TimeDataSource implements IDatasource {
  public start?: number;
  public end?: number;
  public focusTime?: number;
  public id = 'timedatasource';

  public events = new MessageBusService();
  public execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<TimeDataSource> {
    return new Promise<TimeDataSource>((resolve, reject) => {
      resolve(this);
    });
  }
}
