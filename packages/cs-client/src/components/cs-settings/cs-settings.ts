import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger, WidgetBase } from '../../';
import { IWidget, IFormOptions } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
import 'reflect-metadata';

@Component({
  name: 'cs-settings',
  template: require('./cs-settings.html'),
  components: {}
} as any)
export class CsSettings extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;

  public get Form(): IFormOptions {
    return this.Widget.data.obj._form;
  }

  public get Widget(): IWidget {
    return (this.$parent as WidgetBase).widget;
  }

  @Watch('widget')
  public dataChanged(d: any) {
    console.log(d);
  }

}
