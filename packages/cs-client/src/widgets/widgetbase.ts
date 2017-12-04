import { Widget } from '@csnext/cs-core';
import { AppState, Logger, guidGenerator } from '../index';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'dashboard',
  props: {
    widget: null
  }
} as any)
export class WidgetBase extends Vue {

  public widget: Widget;

  protected L = Logger.Instance;

  public beforeMount() {
    this.L.info('widget', 'init widget - ' + this.widget.id);
  }
}
