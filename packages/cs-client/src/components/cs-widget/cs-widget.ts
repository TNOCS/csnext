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

  constructor() {
    super();
  }

  get computedOptions() {
    if (!this.widget) { return null; }
    if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
      return this.widget._dashboard.defaultWidgetOptions;
    }
    return this.widget.options;
  }

  public created() {
    if (this.widget && !this.widget.options) { this.widget.options = {}; }
  }

}
