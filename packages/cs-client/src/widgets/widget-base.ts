import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IMessageBusService, IMessageBusCallback, MessageBusManager, IMenu } from '@csnext/cs-core';
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

  public addMenuItem(menu: IMenu) {
    if (!this.widget.options) {
      this.widget.options = {};
    }
    if (!this.widget.options.menus) {
      this.widget.options.menus = [];
    }

    if (this.widget.options.menus.findIndex(i => i.id === menu.id) === -1) {
      this.widget.options.menus.push(menu);
    }

  }



}
