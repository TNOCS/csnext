import Component from 'vue-class-component';
import VueMarkdown from 'vue-markdown';
import Vue from 'vue';
import { IWidget } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
import { AppState } from '../../services/app-state';

@Component({
  name: 'md-widget',
  props: {
    widget: null
  },
  components: { VueMarkdown },
  template:
    '<VueMarkdown v-if="widget" :source="markdown" :emoji="widget.options.emoji" :linkify="widget.options.linkify" :breaks="widget.options.break" :html="widget.options.html"></VueMarkdown>'
} as any)
export class MdWidget extends Vue {
  /** access the original widget from configuration */
  public widget!: IWidget;

  public get markdown(): any {
    if (this.widget && this.widget.datasource) {
      return this.widget.content;
    } else if (this.widget && this.widget.data) {
      return this.widget.data;
    }
    return '';
  }
}
