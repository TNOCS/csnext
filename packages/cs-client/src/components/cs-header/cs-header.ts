import Vue from 'vue';
import Component from 'vue-class-component';
import {
  ISidebarOptions,
  IHeaderOptions,
  IMenu,
  IDashboard,
  MessageBusHandle
} from '@csnext/cs-core';
import { Prop } from 'vue-property-decorator';
import { AppState, CsApp, CsLanguageSwitch, CsSettings } from '../../';
import './cs-header.css';
@Component({
  name: 'cs-header',
  template: require('./cs-header.html')
} as any)
export class CsHeader extends Vue {
  public allMenus: IMenu[] = [];

  @Prop() public header?: IHeaderOptions;
  @Prop() public leftSidebar?: ISidebarOptions;
  @Prop() public rightSidebar?: ISidebarOptions;

  private busHandlers: { [key: string]: MessageBusHandle } = {};
  private loadingMenuIcon?: IMenu;

  public InitMenus() {
    if (!this.$cs.project.menus) {
      this.$cs.project.menus = [];
    }
    if (this.$cs.project.header && this.$cs.project.header.showLoadingIcon) {
      this.loadingMenuIcon = {
        id: CsApp.LOADING_MENU_ID,
        icon: 'autorenew',
        title: 'LOADING',
        toolTip: 'LOADING',
        enabled: true,
        visible: false
      };
      this.$cs.project.menus.push(this.loadingMenuIcon);
    }
    if (
      this.$cs.project.languages &&
      this.$cs.project.languages.showLanguageSwitchMenu
    ) {
      if (
        !this.$cs.project.menus.find(
          menu => menu.id === CsApp.LANGUAGE_SWITCH_ID
        )
      ) {
        this.$cs.project.menus.push({
          id: CsApp.LANGUAGE_SWITCH_ID,
          icon: 'translate',
          title: 'LANGUAGE',
          toolTip: 'LANGUAGE_SETTINGS',
          enabled: true,
          visible: true,
          component: CsLanguageSwitch, 
          buttonClass: 'sidebar-header-button'
        } as IMenu);
      }
    }
    // create edit dashboard button
    if (!this.$cs.project.menus.find(m => m.id === CsApp.DASHBOARD_EDIT_ID)) {
      this.$cs.project.menus.push({
        id: CsApp.DASHBOARD_EDIT_ID,
        icon: 'mode_edit',
        title: 'Edit Dashboard',
        enabled: false,
        visible: false,
        action: m => {
          // notify dashboard manager that edit was started
          if (this.$cs.activeDashboard) {
            // if there is a manager with own editdashboard implementation use that
            if (
              this.$cs.activeDashboard._manager &&
              this.$cs.activeDashboard._manager.editDashboard
            ) {
              this.$cs.activeDashboard._manager.editDashboard(
                this.$cs.activeDashboard
              );
            } else {
              if (this.$cs.project.rightSidebar) {
                // let s = Vue.component('test', { template: '<h1>editor</h1>'});
                // this.$cs.OpenRightSidebarWidget({component: MdWidget, data: 'editor'} as IWidget, { });
                AppState.Instance.OpenRightSidebarWidget({
                  component: CsSettings,
                  data: { obj: this.$cs.activeDashboard.options }
                });
              }
            }
          }
          // }
        }
      });
    }

    this.allMenus = this.$cs.project.menus;
    if (this.$cs.activeDashboard && this.$cs.activeDashboard.menus) {
      this.allMenus = [...this.allMenus, ...this.$cs.activeDashboard.menus];
    }
  }

  public openRightSidebar(key: string) {
    this.$cs.ToggleRightSidebar(key);
  }

  public openDashboard(dashboard: IDashboard) {
    if (dashboard) {
      if (dashboard.url) {
        // window.location.replace(dashboard.url);
        window.open(dashboard.url, '_blank');
      } else if (dashboard.pathLink) {
        this.$router.push(dashboard.pathLink).catch(err => {});
      }
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

  public beforeDestroy() {
    // remove all bus handlers
    for (const handlers in this.busHandlers) {
      if (this.busHandlers.hasOwnProperty(handlers)) {
        const element = this.busHandlers[handlers];
        this.$cs.bus.unsubscribe(element);
      }
    }
  }

  public created() {
    // listen to dashboard init events
    this.busHandlers['dashboard'] = this.$cs.bus.subscribe(
      AppState.DASHBOARD_MAIN,
      (action: string, dashboard: IDashboard) => {
        this.InitMenus();
        // this.InitTitleWidget();
      }
    );
    // menu list changed (e.g. if dashboard menu was updated)
    this.busHandlers['menu'] = this.$cs.bus.subscribe('menus', (action: string) => {
      this.InitMenus();
    });

    if (this.$cs.project.header && this.$cs.project.header.showLoadingIcon) {
      this.busHandlers['loader'] = this.$cs.bus.subscribe(AppState.LOADERS, (action: string) => {
        if (this.loadingMenuIcon) {
          this.loadingMenuIcon.visible = Object.keys(this.$cs.GetLoaders()).length > 0;
        }
      })
    }
  }
}
