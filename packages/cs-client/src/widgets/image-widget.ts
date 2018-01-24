import Component from 'vue-class-component';
import { WidgetBase } from '../index';

@Component({
  name: 'image-widget',
  template: '<img :src="widget.data.src" style="width:100%;height: 100%"></img>'
} as any)
export class ImageWidget extends WidgetBase {
}
