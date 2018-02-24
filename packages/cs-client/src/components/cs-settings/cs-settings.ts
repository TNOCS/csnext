import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger } from '../../';

@Component({
  name: 'cs-settings',
  template: require('./cs-settings.html'),
  components: {}
} as any)
export class CsSettings extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;

  constructor() {
    super();
    alert();
  }
}
