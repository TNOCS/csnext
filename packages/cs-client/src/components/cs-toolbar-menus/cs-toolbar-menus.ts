import Vue from 'vue';
import Component from 'vue-class-component';
import './cs-toolbar-menus.css';
import { Prop } from 'vue-property-decorator';
import { IMenu, IWidget } from '@csnext/cs-core';

@Component({
  name: 'cs-toolbar-menus',
  template: require('./cs-toolbar-menus.html')
} as any)
export class CsToolbarMenus extends Vue {

  public searchFocus = false;

  @Prop()
  public searchProperty?: string;

  public get searchEnabled(): boolean {
    return this.searchProperty !== undefined && this.searchProperty.length > 0
  }

  @Prop()
  public menus?: IMenu[];

  @Prop()
  public owner?: IWidget;

  public get search(): string {
    if (this.searchProperty && this.owner) {
      return this.owner[this.searchProperty];
    }
    return '';
  }

  public set search(v: string) {
    if (this.searchProperty && this.owner) {
      this.owner[this.searchProperty] = v;
    }

  }

  public triggerMenuAction(menu: IMenu) {
    if (menu.action) {            
      menu.action(menu, menu._dashboard);
    }
    if (menu.method && this.owner?._component && typeof (this.owner._component[menu.method] === 'function')) {
      this.owner._component[menu.method](menu);
    }
  }

}
