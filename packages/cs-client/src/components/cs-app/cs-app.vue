<template>
 <v-app v-resize="onResize" v-if="$cs.isInitialized" :dark="$cs.project.theme.dark" :light="!$cs.project.theme.dark" @keydown.esc="$cs.closeRightSidebar()">
    <input class="input-file" ref="uploader" type="file" @change="
        filesChange($event.target.name, $event.target.files);        
      " accept="*.*" />

    <cs-header :leftSidebar="leftSidebar" :rightSidebar="rightSidebar" v-if="$cs.project.navigation.style !== 'bottom'"></cs-header>

    <!-- side bars -->
    <cs-sidebar v-if="leftSidebar.visible" id="left-sidebar" class="sidebar" :sideBar="leftSidebar"></cs-sidebar>
    <cs-sidebar v-if="rightSidebar.visible" id="right-sidebar" class="sidebar" :sideBar="rightSidebar"></cs-sidebar>

    <!-- dialogs -->
    <v-dialog v-model="dialog.visible" :fullscreen="dialog.fullscreen" no-click-animation :persistent="dialog.persistent" @keydown.esc="dialog=false" :width="dialog.width" @click:outside="closeDialog()">
        <v-card>
            <cs-widget class="dialog-widget" v-if="dialog.widget" :widget="dialog.widget"></cs-widget>
            <div v-else>
                <v-card-title class="headline" primary-title>
                    {{ dialog.title }}
                </v-card-title>
                <v-card-text>
                    <component v-if="dialog.component" :is="dialog.component" :data="dialog.data"></component>
                    <div v-if="dialog.textInput">
                        <v-text-field v-model="dialog.input" :placeholder="dialog.placeholder" required autofocus :label="dialog.text" @keydown.enter="actionCallback(dialog.input)"></v-text-field>
                        <v-layout>
                            <v-btn class="error" @click="actionCallback(undefined)">{{ $cs.Translate('CANCEL')}}</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="primary" @click="actionCallback(dialog.input)">{{ $cs.Translate('OK')}}</v-btn>
                        </v-layout>

                    </div>
                    <div v-else>
                        <span v-if="dialog.text" v-html="dialog.text"></span>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="dialog.actions && dialog.actions.length>0">
                    <v-spacer></v-spacer>
                    <v-btn v-for="action in dialog.actions" :key="action" text @click="actionCallback(action)">
                        {{ action }}
                    </v-btn>
                </v-card-actions>
                <div style="flex: 1 1 auto;"></div>
            </div>
        </v-card>
    </v-dialog>

    <!-- content -->
    <v-main fluid class="" v-bind:class="{ 'floating': $cs.isFloatingHeader }" v-touch="{left: () => swipe('Left'),right: () => swipe('Right')}">
        <router-view :key="$route.path"> </router-view>
    </v-main>

    <!-- mobile navigation -->
    <v-bottom-navigation app router v-if="$cs.isBottomNavigation" :value="true">
        <v-btn v-for="dashboard in $cs.project.dashboards" :key="dashboard.id" color="teal" text @click="openMobileDashboard(dashboard)">
            <span>{{ dashboard.title }}</span>
            <v-icon>{{ dashboard.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
    <!-- footer -->
    <cs-footer v-if="footer.visible" :footer="footer"></cs-footer>

    <!-- snackbar -->
    <v-snackbar :timeout="lastNotification.timeout" :top="true" :multi-line="true" :color="lastNotification.color" v-model="lastNotification._visible">
        <v-layout>
            <v-icon v-if="lastNotification.icon">{{lastNotification.icon}}</v-icon>
            <span class="notification-title">
        {{ $cs.Translate(lastNotification.title) }}
      </span>
            <v-btn text @click="clickNotification()">
                {{ $cs.Translate(lastNotification.buttonText) }}</v-btn>
        </v-layout>
    </v-snackbar>
    <v-snackbars :messages.sync="$cs.notifications" bottom right>
        <template v-slot:default="{ message }">
            <v-layout><v-icon class="notification-icon" v-if="message.icon">{{ message.icon }}</v-icon><h3 class="mb-2">{{ message.title}}</h3></v-layout>
            {{ message.text }}
          </template>
        <template v-slot:action="{ close, message }">
            <div
              style="width: 76px"
              class="text-center"              
            >
              <!-- <v-progress-circular
                indeterminate
                :width="2"
                :size="25"
              ></v-progress-circular> -->
            </div>
            <v-btn icon @click="close()"><v-icon>mdi-close</v-icon></v-btn>
          </template>
    </v-snackbars>
</v-app>

</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify, { UserVuetifyPreset } from 'vuetify';
import vuetifyEN from 'vuetify/es5/locale/en';
import vuetifyNL from 'vuetify/es5/locale/nl';
import Component from 'vue-class-component';
import VueRouter, { Route } from 'vue-router';

import VSnackbars from "v-snackbars";
import {
  IDashboard,
  INotification,
  ISidebarOptions,
  IFooterOptions,
  IDialog,
  MessageBusManager,
  Topics,
  SyncStore
} from '@csnext/cs-core';
import { Ref, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsSettings } from '../../';

import { CsSidebar } from '../cs-sidebar/cs-sidebar';
import { CsFooter } from '../cs-footer/cs-footer';

// tslint:disable-next-line:no-var-requires
const en = require('./../../assets/translations/en.json');
// tslint:disable-next-line:no-var-requires
const nl = require('./../../assets/translations/nl.json');
import 'vuetify/dist/vuetify.min.css';
import { CsHeader } from '../cs-header/cs-header';

import './../../assets/fonts/fonts.css';



Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'nl',
  messages: { 'en': {}, 'nl': {} } as VueI18n.LocaleMessages,  // set locale messages
  silentTranslationWarn: true
});

Vue.use(Vuetify);

const router = AppState.Instance.router; // new VueRouter({ routes: [] });

@Component({
  name: 'cs-app',
  router,
  i18n,
  vuetify: new Vuetify({}),
  components: {
    'cs-sidebar': CsSidebar,
    'cs-footer': CsFooter,
    'cs-header': CsHeader,    
    "v-snackbars": VSnackbars
  }
} as any)
export default class CsApp extends Vue {
  
  public app = AppState.Instance;  

  public settingsDialog = false;
  public active = null;
  public leftSidebar: ISidebarOptions = {};
  public rightSidebar: ISidebarOptions = {};
  public footer: IFooterOptions = {};
  public dialog: IDialog = { visible: false };
  // notification properties
  public lastNotification: INotification = { _visible: false } as INotification;
  public showNotifications = false;
  public unReadNotifications: INotification[] = [];
  public isLoading: boolean = true;
  private busManager = new MessageBusManager();
  public dialogInput: string = '';
  private fileUploadCallback?: Function; 
  @Ref()
  public uploader!: HTMLElement;

  constructor() {
    super();        
    this.$cs.vuetify = this.$vuetify;
    this.$cs.router = router;
    this.$cs.i18n = i18n;
    this.$cs.i18n.mergeLocaleMessage('en', { '$vuetify': vuetifyEN });
    this.$cs.i18n.mergeLocaleMessage('nl', { '$vuetify': vuetifyNL });
    this.$cs.i18n.mergeLocaleMessage('en', (en as any).default ? (en as any).default : en);
    this.$cs.i18n.mergeLocaleMessage('nl', (nl as any).default ? (nl as any).default : nl);
    this.InitNavigation();
    if (router) {
      router.beforeResolve((to, from, next) => {
        this.parseQueryState(to);
        next();
      });
    }

    this.busManager.subscribe(this.$cs.bus, 'right-sidebar', (action: string, data: any) => {
      switch (action) {
        case 'open-widget':
          if (
            this.$cs.project.rightSidebar &&
            this.$cs.project.rightSidebar.dashboard &&
            this.$cs.project.rightSidebar.dashboard.widgets
          ) {
            while (this.$cs.project.rightSidebar.dashboard.widgets.length > 0) {
              this.$cs.project.rightSidebar.dashboard.widgets.pop();
            }
            this.$cs.project.rightSidebar.dashboard.widgets.push(data);
            this.$cs.project.rightSidebar.open = true;
          }
          break;
      }
    });
    this.busManager.subscribe(this.$cs.bus, 'widget', (action: string) => {
      switch (action) {
        case 'edit':
          if (this.$cs.project.leftSidebar) {
            this.$cs.project.leftSidebar.component = CsSettings;
            this.$cs.openLeftSidebar();
            // this.$set(this.$cs.project.rightSidebar, 'component', CsSettings);
            
          }
          break;
      }
    });
  }
  parseQueryState(to: Route) {
    if (to.query) {
      for (const key in to.query) {
        if (Object.prototype.hasOwnProperty.call(to.query, key)) {
          if (key.startsWith('sg-')) {
            $cs.setState('global', key.substring(3, key.length), to.query[key]);
          }          
        }
      }     
    }    
  }

  public beforeDestroy() {
    this.busManager.stop();
    document.removeEventListener('backbutton', this.backButtonPressed);
  }

  public filesChange(fieldName: string, fileList: any[]) {
    if (this.fileUploadCallback) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData

      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append("file", fileList[x], fileList[x].name);
      });

      this.fileUploadCallback(formData);
    }
    
    this.isLoading = true;    
    // $cs.triggerNotification({
    //   title: $cs.Translate("PDF_IMPORT_STARTED"),
    //   color: "green",
    // });
    
  }

  @Watch('app.project.dashboards')
  public projectChanged() {
    this.InitNavigation();
    this.InitTheme();
    // this.InitMenus();
  }

  @Watch('app.project.theme.dark')
  public themeChanged() {
    this.$vuetify.theme.dark = this.app.project.theme ? (this.app.project.theme.dark === true) : false;
  }

  @Watch('app.project.rightSidebar.sidebars')
  /** register keyboard shortcuts for sidebars */
  public rightSidebarsChanged(n: any) {
    for (const key in n) {
      if (n.hasOwnProperty(key)) {
        const sidebar = n[key] as IDashboard;
        if (sidebar && sidebar.options && sidebar.options.shortcut) {
          const sc = sidebar.options.shortcut;
          if (!sc.id) { sc.id = 'sidebar-' + key; }
          sc._callback = () => {
            AppState.Instance.openRightSidebarKey(key);
          };
          AppState.Instance.keyboard.register(sc);
        }

      }
    }
  }

  @Watch('app.project.notifications', { deep: true })
  public noticationsUpdated() {
    this.UpdateNotifications();
  }

  @Watch('app.project.rightSidebar.dashboard')
  public rightSidebarChanged(n: IDashboard) {
    if (!this.rightSidebar) {
      return;
    }
    this.rightSidebar.dashboard = n;
  }

  public closeDialog() {
    if (this.dialog.widget?._component) {
      (this.dialog.widget._component as Vue).$destroy();
      delete this.dialog.widget;
    }
  }

  public onResize() {
    this.$cs.windowSize = { x: window.innerWidth, y: window.innerHeight };    
  }

  public InitTheme() {
    if (this.$cs.project && this.$cs.project.theme) {
      if (this.$cs.project.theme.lightColors) {
        this.$vuetify.theme.themes.light = { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.lightColors };
      } else {
        this.$vuetify.theme.themes.light = { ...this.$vuetify.theme.themes.light, ...this.$cs.project.theme.colors };
      }
      if (this.$cs.project.theme.darkColors) {
        this.$vuetify.theme.themes.dark = { ...this.$vuetify.theme.themes.dark, ...this.$cs.project.theme.darkColors };
      }
    }
  }

  
  public getAdjacentDashboard(
    direction: string,
    active: IDashboard,
    dashboards?: IDashboard[]
  ): IDashboard {
    if (!dashboards) {
      return active;
    }
    let index = dashboards.indexOf(active);
    switch (direction) {
      case 'Left':
        index += 1;
        if (index >= dashboards.length) {
          index = 0;
        }
        break;
      case 'Right':
        index -= 1;
        if (index < 0) {
          index = dashboards.length - 1;
        }
        break;
    }
    return dashboards[index];
  }

  // swipe gesture
  public swipe(direction: string) {
    if (
      !this.$cs.activeDashboard ||
      !this.$cs.activeDashboard.options ||
      !this.$cs.activeDashboard.options.touchGesturesEnabled
    ) {
      return;
    }
    const d = this.$cs.activeDashboard;
    const adjacent = this.getAdjacentDashboard(
      direction,
      this.$cs.activeDashboard,
      d.parent && d.parent.dashboards
        ? d.parent.dashboards
        : this.$cs.project.dashboards
    );
    if (adjacent) {
      this.SelectDashboard(adjacent);
    }
  }

  public backButtonPressed() {
    if ($cs.isMobile && $cs.project.rightSidebar && $cs.project.rightSidebar.open) {
      $cs.closeRightSidebar();
    }
  }

  public onDeviceReady() {
    // alert('device ready');
  }

  public mounted() {
    this.isLoading = false;    
    document.addEventListener('deviceready', this.onDeviceReady, false);
    setTimeout(() => {
      document.addEventListener('backbutton', this.backButtonPressed, false);
    }, 1000);    
  }

  

  // Make sure all dashboards are available as routes
  public InitNavigation() {
    if (!this.$cs || !this.$cs.project || !this.$cs.project.dashboards) {
      return;
    }

    // create routes for dashboards
    for (const d of this.$cs.project.dashboards) {
      $cs.addDashboardRoute(d);
    }
    Logger.info('navigation', 'navigation initialized');
  }

  // tslint:disable-next-line:no-empty
  public selectBreadCrumb() { }

  public SelectDashboard(d: IDashboard) {
    Logger.info('SelectDashboard', d.pathLink);
    if (router && d.pathLink && !d.dashboards) {
      router.push(d.pathLink).catch((e) => { console.log(e); });
    }
  }

  public OpenSettings() {
    this.settingsDialog = true;
  }

  public UpdateSideBars(d: IDashboard) {
    Vue.nextTick(() => {
      // update left sidebar
      if (d.leftSidebar) {
        this.leftSidebar = d.leftSidebar;
        this.leftSidebar.visible = true;
      } else if (this.$cs.project.leftSidebar) {
        this.leftSidebar = this.$cs.project.leftSidebar;
        this.leftSidebar.visible = true;
      } else {
        this.leftSidebar = {};
      }

      if (d.rightSidebar) {
        this.rightSidebar = d.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
      }
      else if (this.$cs.project.rightSidebar) {
        this.rightSidebar = this.$cs.project.rightSidebar;
        this.rightSidebar.visible = true;
        this.rightSidebar.right = true;
      } else {
        this.rightSidebar = {};
      }
    });
  }

  public updateFooter(d: IDashboard) {
    if (d.footer) {
      this.footer = d.footer;
      if (!this.footer.hasOwnProperty('visible')) {
        this.footer.visible = true;
      }
      // Vue.set(this, 'rightSidebar', d.rightSidebar);
    } else if (this.$cs.project.footer) {
      this.footer = this.$cs.project.footer;
      // Vue.set(this, 'rightSidebar', this.$cs.project.rightSidebar);
    } else {
      this.footer = {};
    }
  }

  public saveDialogInput() {

  }

  public actionCallback(action: string) {
    if (this.dialog && this.dialog.actionCallback) {
      this.dialog.visible = false;
      if (this.dialog.textInput) {
        this.dialog.textInput = undefined;
      }
      this.dialog.actionCallback(action);
    }
  }

  public created() {
    this.onResize();
    this.InitNotifications();
    window.addEventListener("resize", this.onResize);        

    this.busManager.subscribe(this.$cs.bus, AppState.DIALOG, (action: string, dialog: IDialog) => {
      switch (action) {
        case AppState.DIALOG_ADDED:
          const emptyDialog = {component: undefined, actions: undefined, persistent: false, actionCallback: undefined, widget: undefined } as IDialog;
          this.dialog = Object.assign(this.dialog, emptyDialog, dialog);          
          this.dialog.visible = true;          
          break;
        case AppState.DIALOG_CLOSED:                              
          this.dialog.visible = false;
          this.dialog.widget = undefined;
          break;

      }
    });

    // listen to dashboard init events
    this.busManager.subscribe(this.$cs.bus,
      AppState.DASHBOARD_MAIN,
      (action: string, dashboard: IDashboard) => {
        this.UpdateSideBars(dashboard);
        this.updateFooter(dashboard);
      }
    );

    this.busManager.subscribe(this.$cs.bus,
      AppState.FILE_UPLOAD,
      (action: string, data) => {
        this.fileUploadCallback = data.callback;
        this.uploader.click();
      }      
    );

    if (this.$cs.activeDashboard) {
      this.UpdateSideBars(this.$cs.activeDashboard);
      this.updateFooter(this.$cs.activeDashboard);
    }

    
  }

  public SelectNotification(notification: INotification) {
    notification.isRead = true;
    this.UpdateNotifications();
    if (notification.clickCallback) {
      notification.clickCallback();
    }
  }

  /** Update list of unread notification  */
  public UpdateNotifications() {
    if (
      !this.$cs.project.notifications ||
      !this.$cs.project.notifications.items
    ) {
      return;
    }
    this.$set(
      this,
      'unReadNotifications',
      this.$cs.project.notifications.items.filter(not => !not.isRead)
    );
  }

  public clickNotification() {
    if (this.lastNotification.clickCallback) {
      this.lastNotification.clickCallback();
    }
    this.closeNotification();
  }

  public closeNotification() {
    if (this.lastNotification) {
      this.lastNotification = { _visible: false } as INotification;
    }
    this.UpdateNotifications();
  }

  public openMobileDashboard(dashboard: IDashboard) {
    if (dashboard) {
      if (dashboard === $cs.activeDashboard) {
        dashboard.events?.publish(Topics.DASHBOARD, Topics.DASHBOARD_RELOAD, dashboard);
      } else
        if (dashboard.url) {
          // window.location.replace(dashboard.url);
          window.open(dashboard.url, '_blank');
        } else if (dashboard.pathLink) {
          this.$router.push(dashboard.pathLink).then(e => {

          }).catch(err => {
            if (err.name = 'NavigationDuplicated') {

            }

            // console.log(err);
          });
        }
    }
  }

  public InitNotifications() {
    if (this.$cs.bus) {

      // snackbars
      $cs.notifications = [];

      this.busManager.subscribe(this.$cs.bus,
        AppState.NOTIFICATION,
        (action: string, notification: INotification) => {
          if (action === AppState.NOTIFICATION_ADDED) {            
            if (this.lastNotification.clickCallback) {
              // Call callback of previous notification before closing it
              // this.lastNotification.clickCallback();
            }
            // this.lastNotification = notification;
            $cs.notifications.push(notification);
            this.UpdateNotifications();
          } else if (action === AppState.NOTIFICATION_CLEARED) {
            if (this.lastNotification && this.lastNotification.clickCallback) {
              // Call callback of previous notification before closing it
              this.lastNotification.clickCallback(true);
            }
            this.closeNotification();
          }
        }
      );
    }
  }

}


</script>

<style lang="css" scoped>
.cstabs {
    margin-top: 0px;
}

html {
    /* overflow-y: hidden !important; */
}

.v-toolbar--clipped {
    z-index: 4 !important;
}

.cs-navigation-tabbar {
    margin-left: 20px;
}

.cs-navigation-tabbar .v-tabs__div {
    font-size: 20px;
    font-weight: 800;
}

.cs-navigation-tabbar .tabs__bar {
    /* background-color: transparent !important; */
}

.input-file {
    position: fixed;
    top: -100em;
}

.notification-icon {
    margin-right: 3px;
    margin-top: -3px;
}


.dialog-widget {
    height: 100%;
    width: 100%;
}

.menu {
    background-color: red;
}

.app-menu {
    color: red !important;
    /** margin-left:5px; */
}

.notification-title {
    align-self: center;
    margin-left: 10px;
}

.sidebar {
    /* z-index:200 !important; */
}

.right-sidebar-title {
    margin-right: 10px;
}



.floating {
    margin-top: -64px !important;
}

.leftsidebar-pin {
    float: right;
    margin: 4px;
}

.leftsidebar-minify {
    position: absolute;
    right: 4px;
    bottom: 5px;
    z-index: 300;
}

.content--wrap {
    height: 100%;
}

.app-project-logo {
    height: 40px;
    margin: 4px;
}

.invert-logo {
    filter: invert(1);
}

.content {
    height: 100%;
    padding: 0;
}

.rightsidebar-toggle {
    width: 20px;
    height: 20px;
    position: absolute;
}
</style>