import Component from 'vue-class-component';
import { WidgetBase } from '../widget-base';

@Component({
  name: 'md-widget',
  props: {
    widget: null
  },
  template:
    '<span>{{widget.data}}</span>'
} as any)
export class MdWidget extends WidgetBase {
  /** access the original widget from configuration */
}
