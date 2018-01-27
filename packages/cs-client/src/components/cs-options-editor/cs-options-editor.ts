import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger } from '../../';

@Component({
  name: 'cs-options-editor',
  template: require('./cs-options-editor.html'),
  components: {}
} as any)
export class CsOptionsEditor extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;
}
