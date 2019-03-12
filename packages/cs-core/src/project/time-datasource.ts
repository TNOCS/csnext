import { IDatasource, MessageBusService} from '..';

export class TimeDataSource implements IDatasource {
  public start?: number;
  public end?: number;
  public id = 'timedatasource';

  public events = new MessageBusService();
  source?: string;
  data?: any;
  options?: any;
  // load directly from start
  instant?: boolean;
  isLoading?: boolean;
  loaded?: boolean;
  // tslint:disable-next-line:ban-types
  requestQueue?: Array<{ resolve: Function; reject: Function }>;
  execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<any>;
}
