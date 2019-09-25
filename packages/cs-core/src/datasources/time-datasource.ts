import { IDatasource, MessageBusService, Topics } from '..';

export class TimeDataSource implements IDatasource {
  public start?: number;
  public end?: number;
  public focusTime?: number;
  public id = 'timedatasource';

  public events = new MessageBusService();

  public setTimeRange(start: number, end: number) {
    this.events.publish(Topics.TIME_TOPIC, Topics.SET_TIME_RANGE, { start: start, end: end });
  }

  public setFocusTime(time: number) {
    this.events.publish(Topics.TIME_TOPIC, Topics.SET_FOCUS_TIME, time);
  }

  public execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<TimeDataSource> {
    return new Promise<TimeDataSource>((resolve, reject) => {
      resolve(this);
    });
  }
}
