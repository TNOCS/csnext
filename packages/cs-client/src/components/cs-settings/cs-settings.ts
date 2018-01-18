import { Dashboard } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRouter from 'vue-router';
import { AppState, Logger, CsDashboard } from '../../';
import { RouteConfig } from 'vue-router/types/router';
import { Watch } from 'vue-property-decorator';
import Vuetify from 'vuetify';

@Component({
  name: 'cs-settings',
  template: require('./cs-settings.html'),
  components: {}
} as any)

export class CsSettings extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;
}
