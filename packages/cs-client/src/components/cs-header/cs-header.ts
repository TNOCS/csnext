import Vue from "vue";
import Component from "vue-class-component";
import {
  ISidebarOptions,
  IHeaderOptions,
  IMenu,
  IDashboard,
  MessageBusManager,
  Loader,
} from "@csnext/cs-core";
import { Prop, Watch } from "vue-property-decorator";
import { AppState, CsLanguageSwitch, Constants } from "../../";
import CsApp from "../cs-app/cs-app.vue";
import { CsToolbarMenus } from "../cs-toolbar-menus/cs-toolbar-menus";
import "./cs-header.css";
@Component({
  name: "cs-header",
  template: require("./cs-header.html"),
  components: {
    "cs-toolbar-menus": CsToolbarMenus,
  },
} as any)
export class CsHeader extends Vue {
  public allMenus: IMenu[] = [];

  @Prop() public header?: IHeaderOptions;
  @Prop() public leftSidebar?: ISidebarOptions;
  @Prop() public rightSidebar?: ISidebarOptions;

  private busManager: MessageBusManager = new MessageBusManager();
  private loadingMenuIcon?: IMenu;
  private languageSwitchMenu?: IMenu;
  private headerHovering: boolean = false;
  private visibleSidebars: { [key: string]: IDashboard } | undefined = {};

  @Watch("rightSidebar.sidebars")
  public updateVisibleSidebars() {
    Vue.set(this, "visibleSidebars", $cs.visibleSidebars);
  }

  @Watch("$cs.project.menus")
  public InitMenus() {
    if (!AppState.Instance.project.menus) {
      AppState.Instance.project.menus = [];
    }
    if (AppState.Instance.project.header && AppState.Instance.project.header.showLoadingIcon) {
      this.loadingMenuIcon = {
        id: Constants.LOADING_MENU_ID,
        icon: "autorenew",
        title: "LOADING",
        toolTip: "LOADING",
        hide: true,
      };
      AppState.Instance.addMenu(this.loadingMenuIcon);
    }
    if (
      AppState.Instance.project.languages &&
      AppState.Instance.project.languages.showLanguageSwitchMenu
    ) {
      if (
        !AppState.Instance.project.menus.find(
          (menu) => menu.id === Constants.LANGUAGE_SWITCH_ID
        )
      ) {
        this.languageSwitchMenu = {
          id: Constants.LANGUAGE_SWITCH_ID,
          icon: "translate",
          title: "LANGUAGE",
          type: "icon",
          toolTip: "LANGUAGE_SETTINGS",
          component: CsLanguageSwitch,
          buttonClass: "sidebar-header-button",
        };
        AppState.Instance.addMenu(this.languageSwitchMenu);
      }
    }

    // this.allMenus = AppState.Instance.project.menus;
    if (AppState.Instance.activeDashboard && AppState.Instance.activeDashboard.menus) {
      for (const menu of AppState.Instance.activeDashboard.menus) {
        if (!menu._dashboard) {
          menu._dashboard = AppState.Instance.activeDashboard;
        }
      }
      Vue.set(this, "allMenus", [
        ...AppState.Instance.project.menus,
        ...AppState.Instance.activeDashboard.menus,
      ]);
    } else {
      Vue.set(this, "allMenus", AppState.Instance.project.menus);
    }
  }

  public openRightSidebar(key: string) {
    AppState.Instance.toggleRightSidebar(key);
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
        window.open(dashboard.url, "_blank");
      } else if (dashboard.pathLink) {
        this.$router.push(dashboard.pathLink).catch((err) => {
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
    this.InitMenus();
    this.updateVisibleSidebars();
    this.busManager.subscribe(AppState.Instance.bus, AppState.RIGHTSIDEBAR, (a: string) => {
      if (a === AppState.RIGHTSIDEBAR_BADGES_CHANGED) {
        this.$forceUpdate();
      }
    });
    // listen to dashboard init events
    this.busManager.subscribe(AppState.Instance.bus, AppState.DASHBOARD_MAIN, () => {
      this.InitMenus();
      this.updateVisibleSidebars();
      // this.InitTitleWidget();
    });
    // menu list changed (e.g. if dashboard menu was updated)
    this.busManager.subscribe(AppState.Instance.bus, "menus", () => {
      this.InitMenus();
    });

    if (AppState.Instance.project.header) {
      this.busManager.subscribe(
        AppState.Instance.bus,
        Loader.LOADERS,
        (a: string, loader: any) => {
          if (a === Loader.LOADER_ADDED && loader.notification) {
            $cs.triggerNotification({ title: loader.title, id: loader.id });
          }
          if (a === Loader.LOADER_REMOVED && loader.notification && loader.id) {
            $cs.removeNotification(loader.id);
          }
          if (this.loadingMenuIcon) {
            this.loadingMenuIcon.hide =
              Object.keys(AppState.Instance.loader.getLoaders()).length === 0;
          }
        }
      );
    }
  }
}
