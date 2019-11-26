import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IWidget,
  IMenu,
  MessageBusService,
  MessageBusHandle,
  guidGenerator,
  WidgetOptions
} from '@csnext/cs-core';
import resize from 'vue-resize-directive';
import './cs-widget.css';
import { AppState } from '../..';
import { CsToolbarMenus } from '../cs-toolbar-menus/cs-toolbar-menus';

@Component({
  name: 'cs-widget',
  template: require('./cs-widget.html'),
  directives: { resize },
  components: {
    'cs-toolbar-menus': CsToolbarMenus
  },
  props: {
    widget: null
  }
} as any)
export class CsWidget extends Vue {

  public get options(): WidgetOptions {
    if (this._options) { return this._options; }
    if (!this.widget) { return {}; }
    if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
      this._options = { ...this.widget._dashboard.defaultWidgetOptions, ...this.widget.options };
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
  private loadingDataSource = false;
  public widget?: IWidget;
  public mouseOver = false;
  public app = AppState.Instance;

  public $refs!: {
    widget: Vue;
    component: Vue;
  };
  // tslint:disable-next-line:variable-name
  private _options?: WidgetOptions = {};
  private activeWidget?: IWidget;

  private dsHandle?: MessageBusHandle;

  constructor() {
    super();
    this.initWidget();
  }

  public getComponent() {
    if (this.activeWidget) {
      return this.activeWidget.component;
    } else if (this.widget) {
      return this.widget.component;
    }
  }

  public updateSize(trigger = true) {
    if (!this.widget || !this.widget.events) {
      return;
    }
    if (this.$refs.widget && this.$refs.component) {
      this.widget._size = {
        width: this.$refs.widget.$el.clientWidth,
        height: this.$refs.widget.$el.clientHeight,
        componentWidth: this.$refs.component.$el.clientWidth,
        componentHeight: this.$refs.component.$el.clientHeight
      };
    }
    if (trigger) {
      this.widget.events.publish('resize', 'changed', this.widget._size);
    }
  }

  public onResize() {
    this.updateSize();
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
    if (!this.widget.options.menus.find(m => m.id === menu.id)) {
      this.widget.options.menus.push(menu);
    }
  }

  public checkWidgetId(widget: IWidget) {
    if (widget && !widget.id) {
      widget.id = 'widget-' + guidGenerator();
    }
  }

  public setActiveWidget(widget: IWidget) {
    // Vue.set(this, 'activeWidget', widget);
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
    this.checkWidgetId(this.widget);

    if (this.widget.widgets && this.widget.widgets.length > 0) {
      this.activeWidget = this.widget.widgets[0];
      const toggleMenu: IMenu = {
        id: guidGenerator(),
        title: this.activeWidget.title,
        items: [],
        outlined: true
      };
      for (const w of this.widget.widgets) {
        toggleMenu.items!.push({
          id: guidGenerator(),
          title: this.$cs.Translate(w.title || ''),
          action: () => {
            this.setActiveWidget(w);
            this.$forceUpdate();
          }
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
          this.$cs.CloseRightSidebarWidget(this.widget!.id!);
        }
      });
    }

    // check for close button
    if (this.widget.options.hideSidebarButton) {
      this.widget.options.menus!.push({
        id: 'close',
        icon: 'close',
        toolTip: 'CLOSE',
        action: () => {
          this.$cs.CloseRightSidebar();
          // this.$cs.CloseRightSidebarWidget(this.widget!.id!);
        }
      });
    }

    this.widget._initalized = true;
  }

  private checkWidgetContent() {
    if (!this.widget) { return; }
    if (this.widget.datasource !== undefined) {
      if (this.widget.content) {
        this.setWidgetContent(this.widget, this.widget.content);
      } else if (!this.loadingDataSource) {
        this.loadingDataSource = true;
        this.$cs.loadDatasource(this.widget.datasource).then(d => {
          this.loadingDataSource = false;
          this.setWidgetContent(this.widget!, d);

        });
      }
      else if (this.widget._dashboard && this.widget._dashboard.content) {
        this.setWidgetContent(this.widget, this.widget._dashboard.content);
      }
    }
  }

  public setWidgetContent(widget: IWidget, content: any) {
    Vue.set(widget, 'content', content);
    if (this.$refs.component !== undefined) {
      if ((this.$refs.component as any).contentLoaded) {
        (this.$refs.component as any).contentLoaded(content);
      }
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

      this.dsHandle = this.$cs.bus.subscribe(
        'ds-' + this.widget.datasource,
        (a: string, d: any) => {
          if (a === 'updated') {
            this.widget!.content = d;
          }
        }
      );
    }

    if (this.widget.options.canEdit) {
      this.addMenuItem({
        id: 'edit',
        icon: 'mode_edit',
        title: 'edit',
        type: 'icon',
        action: () => {
          if (
            this.widget &&
            this.widget.editorWidget &&
            this.$cs.project.rightSidebar
          ) {
            const editor = this.widget.editorWidget;
            editor.data = {
              data: this.widget.data,
              widget: this.widget,
              widgetoptions: this.widget.options,
              manager:
                this.widget._dashboard && this.widget._dashboard._manager
                  ? this.widget._dashboard._manager
                  : null
            };
            this.$cs.bus.publish('right-sidebar', 'open-widget', editor);
          }
        }
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
            if (
              this.widget._dashboard._manager &&
              this.widget._dashboard._manager.removeWidget
            ) {
              this.widget._dashboard._manager.removeWidget(this.widget);
            }
          }
        }
      });
    }
  }

  public beforeDestroy() {
    if (this.dsHandle) {
      this.$cs.bus.unsubscribe(this.dsHandle);
    }
  }

  public mounted() {
    this.updateSize(false);
    if (!this.widget) { return; }
    if (!this.widget.component) { return; }
    // check if no datasource is defined
    if (this.widget.datasource || (this.widget._dashboard && this.widget._dashboard.datasource)) {
      this.checkWidgetContent();
    } else if ((this.$refs.component as any).contentLoaded) {
      this.setWidgetContent(this.widget, undefined);
      // call contentloaded for empty datasources
      // (this.$refs.component as any).contentLoaded(undefined);
    }
  }

  public triggerMenuAction(menu: IMenu) {
    if (menu.action) {
      menu.action(menu);
    }
  }

  public mouseEnter() {
    this.mouseOver = true;
  }

  public mouseLeave() {
    this.mouseOver = false;
  }

}
