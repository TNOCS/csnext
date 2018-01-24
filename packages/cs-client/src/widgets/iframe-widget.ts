import Component from 'vue-class-component';
import { WidgetBase } from '../';

@Component({
    name: 'iframe-widget',
    template: '<iframe :src="widget.data.url" width="100%" height="100%" frameborder="0"></iframe>'
} as any)
export class IframeWidget extends WidgetBase {
}
