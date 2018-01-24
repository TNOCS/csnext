import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, IWidget, IWidgetOptions } from '@csnext/cs-core';
import { Watch, Prop } from 'vue-property-decorator';
import './cs-widget.css';

@Component({
  name: 'cs-widget',
  template: require('./cs-widget.html'),
  props: {
    widget: null
  }
} as any)

export class CsWidget extends Vue {

  public widget?: IWidget;

  public created() {
    if (!this.widget) { return; }
    if (this.widget && !this.widget.options) { this.widget.options = {}; }
  }
}
