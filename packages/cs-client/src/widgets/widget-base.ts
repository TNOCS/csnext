import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IMessageBusService, MessageBusHandle, IMessageBusCallback } from '@csnext/cs-core';
import { Logger } from '../';

export class MessageBusManager {

  public busHandlers: { [key: string]: { bus: IMessageBusService, handle: MessageBusHandle } } = {};

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
    if (!bus) { return; }
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

@Component({
  name: 'widget-base',
  props: {
    widget: null
  }
} as any)
export class WidgetBase extends Vue {

  /** access the original widget from configuration */
  public widget!: IWidget;
  public busManager = new MessageBusManager();

  constructor() {
    super();
  }

  public beforeMount() {
    if (!this.widget) { return; }
    Logger.info('widget', 'init widget - ' + this.widget.id);
    this.busManager.start();
  }

  public beforeDestroy() {
    this.busManager.stop();
  }



}
