import { MessageBusService } from '../utils/message-bus/message-bus-service';

export interface IDatasource {
  id?: string;
  source?: string;
  data?: any;
  options?: any;
  // load directly from start
  instant?: boolean;
  isLoading?: boolean;
  loaded?: boolean;
  events?: MessageBusService;
  // tslint:disable-next-line:ban-types
  requestQueue?: Array<{ resolve: Function; reject: Function }>;
  execute?(
    datasources?: { [id: string]: IDatasource },
    data?: any
  ): Promise<any>;
  // {(value: any) => void, (reason?: any) => void }
  // | PromiseLike<object> | undefined
}