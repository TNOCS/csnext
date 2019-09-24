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
import { Prop } from 'vue-property-decorator';



@Component({
  name: 'cs-widget',
  template: require('./cs-widget.html'),
  directives: { resize },
  props: {
    widget: null
  }
} as any)
export class CsWidget extends Vue {
  public widget?: IWidget;
  public mouseOver = false;
  public app = AppState.Instance;
  private _options?: WidgetOptions;

  public get options(): WidgetOptions {
    if (this._options) return this._options;
    if (!this.widget) return {};
    if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
      this._options = { ...this.widget._dashboard.defaultWidgetOptions, ...this.widget.options };
    } else if (this.widget.options) {
      this._options = this.widget.options;
    } else {
      this._options = {};
    }
    return this._options;
  };

  public $refs!: {
    widget: HTMLElement;
    component: HTMLElement;
  };

  private dsHandle?: MessageBusHandle;

  constructor() {
    super();
    this.initWidget();
  }



  public updateSize(trigger = true) {
    if (!this.widget || !this.widget.events) {
      return;
    }
    if (this.$refs.widget) {
      this.widget._size = {
        width: this.$refs.widget.clientWidth,
        height: this.$refs.widget.clientHeight,
        componentWidth: this.$refs.component.clientWidth,
        componentHeight: this.$refs.component.clientHeight
      };
    }
    if (trigger) {
      this.widget.events.publish('resize', 'changed', this.widget._size);
    }
  }

  public onResize() {
    this.updateSize();
  }

  public get widgetBorder(): string | undefined {
    if (!this.widget) {
      return;
    }
    return this.options.widgetBorder;

    // if (this.widget.options && this.widget.options.widgetBorder) {
    //   return this.widget.options.widgetBorder;
    // } else if (
    //   this.widget._dashboard &&
    //   this.widget._dashboard.defaultWidgetOptions &&
    //   this.widget._dashboard.defaultWidgetOptions.widgetBorder
    // ) {
    //   return this.widget._dashboard.defaultWidgetOptions.widgetBorder;
    // }
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

    // if (
    //   this.widget &&
    //   this.widget._dashboard &&
    //   this.widget._dashboard.defaultWidgetOptions
    // ) {
    //   const opt = this.widget._dashboard.defaultWidgetOptions;
    //   if (opt.height) {
    //     res['max-height'] = opt.height + 'px';
    //   }
    //   if (this.widget.options && this.widget.options.showToolbar) {
    //     res.height = 'calc(100% - 30px)';
    //   }
    // }
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




    if (!this.widget.data) {
      this.widget.data = {};
    }
    this.widget._project = this.$cs.project;
    this.checkWidgetId(this.widget);
    if (this.widget.datasource !== undefined) {
      this.$cs.loadDatasource(this.widget.datasource).then(d => {
        if (this.widget) {
          this.setWidgetContent(this.widget, d);
        }
      });
    } else if (this.widget._dashboard && this.widget._dashboard.content) {
      this.setWidgetContent(this.widget, this.widget._dashboard.content);
    }
    this.widget._initalized = true;
  }

  public setWidgetContent(widget: IWidget, content: any) {
    Vue.set(widget, 'content', content);
    // if (widget._component && widget._component.dataLoaded) {
    //   widget.component.dataLoaded(content);
    // }
  }

  public created() {
    if (!this.widget) {
      return;
    }

    if (!this.widget.options) {
      this.widget.options = {};
    }

    this.widget._component = this.widget.component;
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
        visible: true,
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
        title: 'remove',
        visible: true,
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

  private checkDefaultWidgetOptions(widget: IWidget) {
    if (
      !widget.options ||
      !widget._dashboard ||
      !widget._dashboard.defaultWidgetOptions
    ) {
      return;
    }
    if (widget._dashboard && widget._dashboard.defaultWidgetOptions) {
      for (const key in widget._dashboard.defaultWidgetOptions) {
        if (!widget.options.hasOwnProperty(key)) {
          widget.options[key] = widget._dashboard.defaultWidgetOptions[key];
        }
      }
    }
  }
}
