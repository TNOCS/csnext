import Vue from 'vue';
import Component from 'vue-class-component';
import {
  ISidebarOptions,
  IHeaderOptions,
  IMenu,
  IDashboard,
  MessageBusManager,
  Loader
} from '@csnext/cs-core';
import { Prop, Watch } from 'vue-property-decorator';
import { AppState, CsApp, CsLanguageSwitch, CsSettings } from '../../';
import { CsToolbarMenus } from '../cs-toolbar-menus/cs-toolbar-menus';
import './cs-header.css';
@Component({
  name: 'cs-header',
  template: require('./cs-header.html'),
  components: {
    'cs-toolbar-menus': CsToolbarMenus
  }
} as any)
export class CsHeader extends Vue {
  public allMenus: IMenu[] = [];

  @Prop() public header?: IHeaderOptions;
  @Prop() public leftSidebar?: ISidebarOptions;
  @Prop() public rightSidebar?: ISidebarOptions;

  private busManager: MessageBusManager = new MessageBusManager();
  private loadingMenuIcon?: IMenu;
  private languageSwitchMenu?: IMenu;
  private visibleSidebars: { [key: string]: IDashboard } | undefined = {};

  @Watch('rightSidebar.sidebars')
  public updateVisibleSidebars() {
    console.log('Adding sidebar');
    // console.log(this.$cs.visibleSidebars);
    // console.log(this.$cs)
    console.log($cs.project!.rightSidebar!.sidebars);
    console.log($cs.visibleSidebars);
    Vue.set(this, 'visibleSidebars', $cs.visibleSidebars);
  }

  @Watch('$cs.project.menus')
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
        hide: true
      };
      this.$cs.addMenu(this.loadingMenuIcon);
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
        this.languageSwitchMenu = {
          id: CsApp.LANGUAGE_SWITCH_ID,
          icon: 'translate',
          title: 'LANGUAGE',
          type: 'icon',
          toolTip: 'LANGUAGE_SETTINGS',
          color: 'red',
          component: CsLanguageSwitch,
          buttonClass: 'sidebar-header-button'
        };
        this.$cs.addMenu(this.languageSwitchMenu);
      }
    }

    // this.allMenus = this.$cs.project.menus;
    if (this.$cs.activeDashboard && this.$cs.activeDashboard.menus) {

      for (const menu of this.$cs.activeDashboard.menus) {
        if (!menu._dashboard) { menu._dashboard = this.$cs.activeDashboard; }
      }

      Vue.set(this, 'allMenus', [...this.$cs.project.menus, ...this.$cs.activeDashboard.menus]);
      // this.allMenus = ;
    } else {
      Vue.set(this, 'allMenus', this.$cs.project.menus);
    }
  }

  public openRightSidebar(key: string) {
    this.$cs.toggleRightSidebar(key);
  }

  public toggleRightSidebar() {
    if (this.rightSidebar?.open) {
      $cs.closeRightSidebar();
    } else {
      $cs.openRightSidebar();
    }    
  }

  public openDashboard(dashboard: IDashboard) {
    if (dashboard) {
      if (dashboard.url) {
        // window.location.replace(dashboard.url);
        window.open(dashboard.url, '_blank');
      } else if (dashboard.pathLink) {
        this.$router.push(dashboard.pathLink).catch(err => {
          // console.log(err);
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

  public mounted() {
    this.updateVisibleSidebars();
    // listen to dashboard init events
    this.busManager.subscribe(this.$cs.bus, AppState.DASHBOARD_MAIN,
      () => {
        this.InitMenus();
        this.updateVisibleSidebars();
        // this.InitTitleWidget();
      }
    );
    // menu list changed (e.g. if dashboard menu was updated)
    this.busManager.subscribe(this.$cs.bus, 'menus', () => {
      this.InitMenus();
    });

    if (this.$cs.project.header) {
      this.busManager.subscribe(this.$cs.bus, Loader.LOADERS, (a: string, loader: any) => {
        if (a === Loader.LOADER_ADDED && loader.notification) {
          $cs.triggerNotification({title: loader.title, id: loader.id})
        }
        if (a === Loader.LOADER_REMOVED && loader.notification && loader.id) {
          $cs.removeNotification(loader.id);
        }
        if (this.loadingMenuIcon) {
          this.loadingMenuIcon.hide = Object.keys(this.$cs.loader.getLoaders()).length === 0;
        }
      });
    }
  }
}
