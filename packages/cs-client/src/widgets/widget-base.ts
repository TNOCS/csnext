import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import { Logger } from '../';

@Component({
  name: 'dashboard',
  props: {
    widget: null
  }
} as any)
export class WidgetBase extends Vue {

  /** access the original widget from configuration */
  public widget?: IWidget;

  protected L = Logger.Instance;

  public beforeMount() {
    if (!this.widget) { return; }
    this.L.info('widget', 'init widget - ' + this.widget.id);
  }
}
