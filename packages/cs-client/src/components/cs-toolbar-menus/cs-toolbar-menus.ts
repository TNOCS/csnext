import Vue from 'vue';
import Component from 'vue-class-component';
import './cs-toolbar-menus.css';
import { Prop } from 'vue-property-decorator';
import { IMenu } from '@csnext/cs-core';

@Component({
  name: 'cs-toolbar-menus',
  template: require('./cs-toolbar-menus.html')
} as any)
export class CsToolbarMenus extends Vue {
  @Prop()
  public menus?: IMenu[]

  public triggerMenuAction(menu: IMenu) {
    if (menu.action) {
      menu.action(menu);
    }
  }

  mounted() {
    
  }

}
