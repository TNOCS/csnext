import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, IWidget, IWidgetOptions } from '@csnext/cs-core';
import { Watch, Prop } from 'vue-property-decorator';
import './cswidget.css';

@Component({
  name: 'cswidget',
  template: require('./cswidget.html'),
  props: {
    widget: null
  }
} as any)
// tslint:disable-next-line:class-name
export class cswidget extends Vue {

  public widget?: IWidget;

  get computedOptions() {
    if (!this.widget) { return null; }
    if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
      return this.widget._dashboard.defaultWidgetOptions;
    }
    return this.widget.options;
  }
}
