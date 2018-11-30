import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IWidget,
  IMenu,
  MessageBusService,
  MessageBusHandle
} from '@csnext/cs-core';
import resize from 'vue-resize-directive';
import './cs-widget.css';
import { AppState } from '../..';

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
  private dsHandle?: MessageBusHandle;
  public $refs!: {
    widget: HTMLElement;
  };

  public updateSize() {
    if (!this.widget || !this.widget.events) {
      return;
    }
    if (this.$refs.widget) {
      this.widget._size = {
        width: this.$refs.widget.clientWidth,
        height: this.$refs.widget.clientHeight
      };
    }
    this.widget.events.publish('resize', 'changed', this.widget._size);
  }

  public onResize() {
    this.updateSize();
  }

  public get widgetBorder(): string | undefined {
    if (!this.widget) {
      return;
    }

    if (this.widget.options && this.widget.options.widgetBorder) {
      return this.widget.options.widgetBorder;
    } else if (
      this.widget._dashboard &&
      this.widget._dashboard.defaultWidgetOptions &&
      this.widget._dashboard.defaultWidgetOptions.widgetBorder
    ) {
      return this.widget._dashboard.defaultWidgetOptions.widgetBorder;
    }
  }

  public widgetStyles(): any {
    const res: any = {};
    if (
      this.widget &&
      this.widget._dashboard &&
      this.widget._dashboard.defaultWidgetOptions
    ) {
      const opt = this.widget._dashboard.defaultWidgetOptions;
      if (opt.height) {
        res['max-height'] = opt.height + 'px';
      }
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

  public created() {
    if (!this.widget || !this.widget.options) {
      return;
    }
    if (this.widget.datasource) {
      this.dsHandle = AppState.Instance.bus.subscribe(
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
            this.app.project.rightSidebar
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
            this.app.bus.publish('right-sidebar', 'open-widget', editor);
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
