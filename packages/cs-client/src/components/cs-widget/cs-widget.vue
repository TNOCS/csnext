<template>
  <v-card
    v-if="!widget.dashboard"
    :elevation="options.elevation"
    :flat="options.flat"
    :outlined="options.outlined"
    :disabled="options.disabled"
    :tile="options.tile"
    :color="options.backgroundColor"
    :raised="options.raised"
    v-resize:debounce.1000="onResize"
    v-resize.initial="onResizeStart"
    @mouseenter="mouseEnter()"
    v-show="options && !options.hide"
    @mouseleave="mouseLeave()"
    class="widget-container"
    :class="[options.class]"
    :style="{ margin: options.margin + 'px' }"
    ref="widget"
  >
    <v-toolbar
      v-if="options.showToolbar && options.toolbarOptions"
      shrink
      class="dashboard-toolbar-flex widget-toolbar"
      :absolute="options.toolbarOptions.absolute"
      :prominent="options.toolbarOptions.prominent"
      :color="options.toolbarOptions.backgroundColor"
      :elevation="options.toolbarOptions.elevation"
      :dense="options.toolbarOptions.dense"
      :outlined="options.toolbarOptions.outlined"
      :collapse="options.toolbarOptions.collapse"
      :flat="options.toolbarOptions.flat"
    >
      <v-icon v-if="options.icon && !options.toolbarOptions.hideIcon" class="pr-3">{{ options.icon }}</v-icon>
      <v-toolbar-title v-if="!options.toolbarOptions || !options.toolbarOptions.hideTitle">{{ $cs.Translate(options.title) }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <cs-toolbar-menus
        v-if="!options.hideMenu"
        :searchProperty="options.searchProperty"
        :menus.sync="options.menus"
        :owner="widget"
      ></cs-toolbar-menus>
    </v-toolbar>

    <component
      grow
      class="dashboard-toolbar-flex widget-default"
      :is="getComponent()"
      :widget="widget"
      :style="widgetStyles()"
      ref="component"
    ></component>
  </v-card>
  <cs-dashboard
    v-else
    class="widget-container"
    :class="[options.class]"
    :style="{ margin: options.margin + 'px' }"
    :dashboard="widget.dashboard"
  ></cs-dashboard>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IMenu, MessageBusService, MessageBusHandle, WidgetOptions, Topics, idGenerator } from '@csnext/cs-core';
import resize from 'vue-resize-directive';

import { AppState } from '../..';
import { CsToolbarMenus } from '../cs-toolbar-menus/cs-toolbar-menus';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'cs-widget',
  directives: { resize },
  components: {
    'cs-toolbar-menus': CsToolbarMenus,
  },
} as any)
export default class CsWidget extends Vue {

  // tslint:disable-next-line:variable-name
  public $refs!: {
    widget: Vue;
    component: Vue;
  };
  public app = AppState.Instance;
  public mouseOver = false;
  @Prop({ default: null })
  public widget?: IWidget;

  private _options?: WidgetOptions = {};
  private activeWidget?: IWidget;
  private dsHandle?: MessageBusHandle;
  private loadingDataSource = false;

  constructor() {
    super();
    this.initWidget();
  }

  public get options(): WidgetOptions {
    if (this._options) {
      return this._options;
    }
    if (!this.widget) {
      return {};
    }
    if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
      const toolbarOptions = {
        ...this.widget._dashboard.defaultWidgetOptions.toolbarOptions,
        ...this.widget.options?.toolbarOptions,
      };
      this._options = {
        ...this.widget._dashboard.defaultWidgetOptions,
        ...this.widget.options,
        ...{ toolbarOptions: toolbarOptions },
      };
    } else if (this.widget.options) {
      this._options = this.widget.options;
    } else {
      this._options = {};
    }
    return this._options;
  }

  public get widgetBorder(): string | undefined {
    if (!this.widget) {
      return;
    }
    return this.options.widgetBorder;
  }

  public addMenuItem(menu: IMenu) {
    if (!this.widget || !this.widget.options) {
      return;
    }
    if (this.widget && !this.widget.events) {
      this.widget.events = new MessageBusService();
    }
    if (!this.widget.options.menus) {
      this.widget.options.menus = [];
    }
    if (!this.widget.options.menus.find((m) => m.id === menu.id)) {
      this.widget.options.menus.push(menu);
    }
  }

  public beforeDestroy() {
    if (this.dsHandle) {
      this.$cs.bus.unsubscribe(this.dsHandle);
    }
  }

  public created() {
    if (!this.widget) {
      return;
    }

    if (!this.widget.options) {
      this.widget.options = {};
    }

    this.widget._component = this.$refs.component;
    if (this.widget && this.widget.datasource) {
      this.dsHandle = this.$cs.bus.subscribe('ds-' + this.widget.datasource, (a: string, d: any) => {
        if (a === 'updated') {
          this.widget!.content = d;
        }
      });
    }

    if (this.widget.options.canEdit) {
      this.addMenuItem({
        id: 'edit',
        icon: 'mode_edit',
        title: 'edit',
        type: 'icon',
        action: () => {
          if (this.widget && this.widget.editorWidget && this.$cs.project.rightSidebar) {
            const editor = this.widget.editorWidget;
            editor.data = {
              data: this.widget.data,
              widget: this.widget,
              widgetoptions: this.widget.options,
              manager: this.widget._dashboard && this.widget._dashboard._manager ? this.widget._dashboard._manager : null,
            };
            this.$cs.bus.publish('right-sidebar', 'open-widget', editor);
          }
        },
      });
    }

    if (this.widget.options.canRemove) {
      this.addMenuItem({
        id: 'remove',
        icon: 'delete',
        type: 'icon',
        title: 'remove',
        action: () => {
          if (this.widget && this.widget._dashboard) {
            if (this.widget._dashboard._manager && this.widget._dashboard._manager.removeWidget) {
              this.widget._dashboard._manager.removeWidget(this.widget);
            }
          }
        },
      });
    }
  }

  public getComponent() {
    if (this.activeWidget) {
      return this.activeWidget.component;
    } else if (this.widget) {
      return this.widget.component;
    }
  }

  public initWidget() {
    if (!this.widget) {
      return;
    }
    if (this.widget._initalized) {
      return;
    }

    if (!this.widget.events) {
      this.widget.events = new MessageBusService();
    }
    if (!this.widget.options) {
      this.widget.options = {};
    }

    if (!this.widget.options.toolbarOptions) {
      this.widget.options.toolbarOptions = {};
    }

    if (!this.widget.data) {
      this.widget.data = {};
    }

    if (!this.widget.options.menus) {
      Vue.set(this.widget.options, 'menus', []);
    }
    this.widget._project = this.$cs.project;
    $cs.checkWidgetId(this.widget);

    if (this.widget.widgets && this.widget.widgets.length > 0) {
      this.activeWidget = this.widget.widgets[0];
      const toggleMenu: IMenu = {
        id: idGenerator(),
        title: this.activeWidget.title,
        items: [],
        outlined: true,
      };
      for (const w of this.widget.widgets) {
        toggleMenu.items!.push({
          id: idGenerator(),
          title: this.$cs.Translate(w.title || ''),
          action: () => {
            this.setActiveWidget(w);
            this.$forceUpdate();
          },
        });
      }
      this.widget.options.menus!.push(toggleMenu);
    } else {
      this.setActiveWidget(this.widget);
      // this.activeWidget = this.widget;
    }

    // check for close button
    if (this.widget.options.closeSidebarButton) {
      this.widget.options.menus!.push({
        id: 'close',
        icon: 'close',
        toolTip: 'CLOSE',
        action: () => {
          this.$cs.closeRightSidebarWidget(this.widget!.id!);
        },
      });
    }

    // check for close button
    if (this.widget.options.hideSidebarButton) {
      this.widget.options.menus!.push({
        id: 'close',
        icon: 'close',
        toolTip: 'CLOSE',
        action: () => {
          this.$cs.closeRightSidebar();
          // this.$cs.CloseRightSidebarWidget(this.widget!.id!);
        },
      });
    }

    this.widget._initalized = true;
  }

  public mounted() {
    this.updateSize(false);
    if (!this.widget) {
      return;
    }
    if (!this.widget.component) {
      return;
    }
    // check if datasource is defined
    if (this.widget.datasource || (this.widget._dashboard && this.widget._dashboard.datasource)) {
      this.checkWidgetContent();
    } else if ((this.$refs.component as any).contentLoaded) {
      this.setWidgetContent(this.widget, undefined);
      // call contentloaded for empty datasources
      // (this.$refs.component as any).contentLoaded(undefined);
    }
  }

  public mouseEnter() {
    this.mouseOver = true;
  }

  public mouseLeave() {
    this.mouseOver = false;
  }

  public onResize() {
    this.updateSize();
  }

  public onResizeStart() {
    this.updateSize(true, true);
  }

  public setActiveWidget(widget: IWidget) {
    // Vue.set(this, 'activeWidget', widget);
  }

  public setWidgetContent(widget: IWidget, content: any) {
    if (this.widget?.content !== content) {
      Vue.set(widget, 'content', content);
      if (this.$refs.component !== undefined) {
        if ((this.$refs.component as any).contentLoaded) {
          (this.$refs.component as any).contentLoaded(content);
        }
      }
    }
  }

  public triggerMenuAction(menu: IMenu) {
    if (menu.action) {
      menu.action(menu);
    }
  }

  public updateSize(trigger = true, started = false) {
    if (!this.widget || !this.widget.events) {
      return;
    }
    if (this.$refs.widget && this.$refs.component) {
      this.widget._size = {
        width: this.$refs.widget.$el.clientWidth,
        height: this.$refs.widget.$el.clientHeight,
        componentWidth: this.$refs.component.$el.clientWidth,
        componentHeight: this.$refs.component.$el.clientHeight,
      };
    }

    if (!started && typeof this.widget?._component?.resize === 'function') {
      this.widget._component.resize(this.widget._size);
    }

    if (started && typeof this.widget?._component?.resizeStart === 'function') {
      this.widget._component.resizeStart(this.widget._size);
    }

    if (trigger) {
      this.widget.events.publish(Topics.RESIZE, started ? Topics.RESIZE_STARTED : Topics.RESIZE_CHANGED, this.widget._size);
    }
  }

  public widgetStyles(): any {
    const res: any = {};
    const opt = this.options;
    if (opt.height) {
      res['max-height'] = opt.height + 'px';
    }
    if (this.options && this.options.showToolbar) {
      res.height = 'calc(100% - 30px)';
    }
    return res;
  }

  private checkWidgetContent() {
    if (!this.widget) {
      return;
    }
    if (this.widget.datasource !== undefined) {
      if (this.widget.content) {
        this.setWidgetContent(this.widget, this.widget.content);
      } else if (!this.loadingDataSource) {
        this.loadingDataSource = true;
        $cs.loadDatasource(this.widget.datasource).then((d) => {
          this.loadingDataSource = false;
          this.setWidgetContent(this.widget!, d);
        });
      } else if (this.widget._dashboard && this.widget._dashboard.content) {
        this.setWidgetContent(this.widget, this.widget._dashboard.content);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.widget-default {
  height: 100%;
  width: 100%;
  background: transparent;
}

.widget-container {
  height: 100%;
}

.widget-toolbar {
  height: 40px !important;
}

.widget-buttons-container {
  position: absolute !important;
  right: 10px;
  top: 3px;
  z-index: 1000;
}

.widget-button {
  /* margin:0 !important; */
  /* width:18px !important;
  height:18px !important; */
}

.widget-button-icon {
  width: 16px !important;
  height: 16px !important;
}

/* Borders */

.widget-border-shadow {
  margin: 2px;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
  height: calc(100% - 4px);
}

.widget-border-line {
  border-style: solid;
  border-width: 1px;
  border-color: black;
}
</style>
