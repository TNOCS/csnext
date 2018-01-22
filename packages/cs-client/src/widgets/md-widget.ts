import { IWidget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from '../index';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'md-widget',
  template: '<div>{{ widget.data }}</div>'
} as any)

export class MdWidget extends WidgetBase {
  constructor() {
    super();
  }

}
