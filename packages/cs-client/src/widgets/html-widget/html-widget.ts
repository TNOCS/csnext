import Component from 'vue-class-component';
import { WidgetBase } from '../widget-base';

@Component({
  name: 'html-widget',
  props: {
    widget: null
  },
  template:
    '<span>{{widget.data}}</span>'
} as any)
export class HtmlWidget extends WidgetBase {
  /** access the original widget from configuration */
}
