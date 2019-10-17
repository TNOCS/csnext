import Vue from 'vue';
import Component from 'vue-class-component';
import {
  ISidebarOptions,
  IHeaderOptions,
  IMenu,
  IDashboard,
  MessageBusManager
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

  private busManager: MessageBusManager = new MessageBusManager();
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
        hide: true
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
          component: CsLanguageSwitch,
          buttonClass: 'sidebar-header-button'
        } as IMenu);
      }
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
        this.$router.push(dashboard.pathLink).catch(err => {
          console.log(err);
        });
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
    this.busManager.stop();
  }

  public created() {
    // listen to dashboard init events
    this.busManager.subscribe(this.$cs.bus, AppState.DASHBOARD_MAIN,
      () => {
        this.InitMenus();
        // this.InitTitleWidget();
      }
    );
    // menu list changed (e.g. if dashboard menu was updated)
    this.busManager.subscribe(this.$cs.bus, 'menus', () => {
      this.InitMenus();
    });

    if (this.$cs.project.header && this.$cs.project.header.showLoadingIcon) {
      this.busManager.subscribe(this.$cs.bus, AppState.LOADERS, () => {
        if (this.loadingMenuIcon) {
          this.loadingMenuIcon.hide = Object.keys(this.$cs.GetLoaders()).length === 0;
        }
      });
    }
  }
}
