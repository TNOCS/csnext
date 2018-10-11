import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import { WidgetBase } from '../../';
import VueMarkdown from 'vue-markdown';

@Component({
  name: 'md-widget',
  components: { VueMarkdown},
  template: '<VueMarkdown :source="widget.data" :emoji="widget.options.emoji" :linkify="widget.options.linkify" :breaks="widget.options.break" :html="widget.options.html"></VueMarkdown>'
} as any)
export class MdWidget extends WidgetBase {

    public mounted() {
  }

}
