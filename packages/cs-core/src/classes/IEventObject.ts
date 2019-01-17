import { MessageBusService } from '..';
export interface IEventObject {
  /** Event bus for publish/subscribe events in application */
  events: MessageBusService;
}
