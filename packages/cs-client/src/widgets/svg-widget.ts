import Component from 'vue-class-component';
import { WidgetBase } from '../';

@Component({
  name: 'svg-widget',
  template: '<img :src="widget.data.path"></img>'
} as any)
export class SvgWidget extends WidgetBase {

}
