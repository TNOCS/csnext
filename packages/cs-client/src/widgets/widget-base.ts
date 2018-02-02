import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import { Logger } from '../';

@Component({
  name: 'widget-base',
  props: {
    widget: null
  }
} as any)
export class WidgetBase extends Vue {

  /** access the original widget from configuration */
  public widget?: IWidget;

  public beforeMount() {
    if (!this.widget) { return; }
    Logger.info('widget', 'init widget - ' + this.widget.id);
  }
}
