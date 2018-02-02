import Vue from 'vue';
import Component from 'vue-class-component';
import { ISidebarOptions } from '@csnext/cs-core';
import { Prop } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import './cs-sidebar.css';

@Component({
  name: 'cs-sidebar',
  template: require('./cs-sidebar.html')
} as any)
export class CsSidebar extends Vue {
  public app = AppState.Instance;

  @Prop()
  public sideBar?: ISidebarOptions;

}
