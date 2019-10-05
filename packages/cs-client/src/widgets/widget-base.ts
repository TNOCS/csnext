import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IMessageBusService, IMessageBusCallback, MessageBusManager } from '@csnext/cs-core';
import { Logger } from '../';

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

  public subscribe(bus: IMessageBusService | undefined, topic: string, callback: IMessageBusCallback, id?: string) {
    this.busManager.subscribe(bus, topic, callback, id);
  }

  public beforeMount() {
    if (!this.widget) { return; }
    this.widget._component = this;
    Logger.info('widget', 'init widget - ' + this.widget.id);
    this.busManager.start();
  }

  public beforeDestroy() {
    this.busManager.stop();
  }



}
