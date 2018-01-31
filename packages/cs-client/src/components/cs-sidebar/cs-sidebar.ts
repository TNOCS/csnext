import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router/types/router';
import { Dashboard, INotification, ThemeColors, ISidebarOptions } from '@csnext/cs-core';
import { Watch, Prop } from 'vue-property-decorator';
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
