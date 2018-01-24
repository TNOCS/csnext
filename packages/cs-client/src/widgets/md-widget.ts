import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import { WidgetBase } from '../';

@Component({
  name: 'md-widget',
  template: '<div>{{ widget.data }}</div>'
} as any)
export class MdWidget extends WidgetBase {

}
