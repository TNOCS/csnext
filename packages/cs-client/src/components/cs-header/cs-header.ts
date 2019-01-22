import Vue from 'vue';
import Component from 'vue-class-component';
import {
  ISidebarOptions,
  IHeaderOptions,
  IMenu,
  IDashboard
} from '@csnext/cs-core';
import { Prop } from 'vue-property-decorator';
import { AppState, CsApp, CsLanguageSwitch, CsSettings } from '../../';
import './cs-header.css';
@Component({
  name: 'cs-header',
  template: require('./cs-header.html')
} as any)
export class CsHeader extends Vue {
  public app = AppState.Instance;
  public allMenus: IMenu[] = [];

  @Prop() public header?: IHeaderOptions;
  @Prop() public leftSidebar?: ISidebarOptions;
  @Prop() public rightSidebar?: ISidebarOptions;

  public InitMenus() {
    if (!this.app.project.menus) {
      this.app.project.menus = [];
    }
    if (
      this.app.project.languages &&
      this.app.project.languages.showLanguageSwitchMenu
    ) {
      if (
        !this.app.project.menus.find(
          menu => menu.id === CsApp.LANUAGE_SWITCH_ID
        )
      ) {
        this.app.project.menus.push({
          id: CsApp.LANUAGE_SWITCH_ID,
          icon: 'translate',
          title: 'LANGUAGE',
          toolTip: 'LANGUAGE_SETTINGS',
          enabled: true,
          visible: true,
          component: CsLanguageSwitch
        });
      }
    }
    // create edit dashboard button
    if (!this.app.project.menus.find(m => m.id === CsApp.DASHBOARD_EDIT_ID)) {
      this.app.project.menus.push({
        id: CsApp.DASHBOARD_EDIT_ID,
        icon: 'mode_edit',
        title: 'Edit Dashboard',
        enabled: false,
        visible: false,
        action: m => {
          // notify dashboard manager that edit was started
          if (this.app.activeDashboard) {
            // if there is a manager with own editdashboard implementation use that
            if (
              this.app.activeDashboard._manager &&
              this.app.activeDashboard._manager.editDashboard
            ) {
              this.app.activeDashboard._manager.editDashboard(
                this.app.activeDashboard
              );
            } else {
              if (this.app.project.rightSidebar) {
                // let s = Vue.component('test', { template: '<h1>editor</h1>'});
                // this.app.OpenRightSidebarWidget({component: MdWidget, data: 'editor'} as IWidget, { });
                AppState.Instance.OpenRightSidebarWidget({
                  component: CsSettings,
                  data: { obj: this.app.activeDashboard.options }
                });
              }
            }
          }
          // }
        }
      });
    }

    this.allMenus = this.app.project.menus;
    if (this.app.activeDashboard && this.app.activeDashboard.menus) {
      this.allMenus = [...this.allMenus, ...this.app.activeDashboard.menus];
    }
  }

  public toggleMenu(menu: IMenu) {
    menu.toggleState = menu.toggleState ? !menu.toggleState : true;
    this.activateMenu(menu);
  }

  // menu button was clicked
  public activateMenu(menu: IMenu) {
    if (menu.action) {
      menu.action(menu);
    }
  }

  public created() {
    // listen to dashboard init events
    this.app.bus.subscribe(
      'dashboard.main',
      (action: string, dashboard: IDashboard) => {
        this.InitMenus();
        // this.InitTitleWidget();
      }
    );
    // menu list changed (e.g. if dashboard menu was updated)
    this.app.bus.subscribe('menus', (action: string) => {
      this.InitMenus();
    });
  }
}
