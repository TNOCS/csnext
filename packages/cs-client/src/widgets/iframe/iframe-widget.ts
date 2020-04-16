import Component from 'vue-class-component';
import { WidgetBase } from '../..';
import { IWidget } from '@csnext/cs-core';

@Component({
  name: 'iframe-widget',
  template:
    '<iframe :src="widget.data.url" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>',
  props: {
    widget: null
  }
} as any)
export class IframeWidget extends WidgetBase {

     /** access the original widget from configuration */
  public widget!: IWidget;
}
