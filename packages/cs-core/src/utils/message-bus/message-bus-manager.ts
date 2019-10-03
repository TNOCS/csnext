import { IMessageBusService, MessageBusHandle, IMessageBusCallback } from '../..';

/** Helper class to manage message bus subscriptions/handles. Is used by Widget and Dashboard managers */
export class MessageBusManager {
  public busHandlers: {
    [key: string]: {
      bus: IMessageBusService;
      handle: MessageBusHandle;
    };
  } = {};
  public start() {
      
  }
  public stop() {
    for (const id in this.busHandlers) {
      if (this.busHandlers.hasOwnProperty(id)) {
        const subscription = this.busHandlers[id];
        if (subscription.bus && subscription.handle) {
          subscription.bus.unsubscribe(subscription.handle);
        }
      }
    }
  }
  public subscribe(bus: IMessageBusService | undefined, topic: string, callback: IMessageBusCallback, id?: string) {
    if (!bus) {
      return;
    }
    // if id not specified, create bus-topic specific id
    if (id === undefined) {
      id = `${bus.id}-${topic}`;
    }
    // allow only one handler instance with a single id
    if (!this.busHandlers.hasOwnProperty(id)) {
      // subscribe and register handler
      this.busHandlers[id] = { bus: bus, handle: bus.subscribe(topic, callback) };
    }
  }
}
