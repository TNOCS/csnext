import Vue from 'vue';
import Component from 'vue-class-component';
import './cs-toolbar-menus.css';
import { Prop, Watch, PropSync } from 'vue-property-decorator';
import { IMenu } from '@csnext/cs-core';

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
  public owner?: any;

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
      menu.action(menu);
    }
    if (menu.method && this.owner && typeof (this.owner[menu.method] === 'function')) {
      this.owner[menu.method](menu);
    }
  }

  public mounted() {
    console.log('owner');
    console.log(this.owner);
  }
}
