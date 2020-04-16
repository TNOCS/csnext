import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger, WidgetBase } from '../../';
import { IWidget, IFormOptions, IFormFieldOptions } from '@csnext/cs-core';
import { Watch } from 'vue-property-decorator';
// import 'reflect-metadata';

export class FieldGroup {
  public id!: string;
  public fields: IFormFieldOptions[] = [];
  public class: string = '';
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  name: 'cs-settings',
  template: require('./cs-settings.html'),
  components: {}
} as any)
export class CsSettings extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;
  public fieldGroups: FieldGroup[] = [];

  public initGroups() {
    this.fieldGroups = [];
    if (!this.Form.fields) { return; }
    this.Form.fields.map(f => {
      if (!f.group) {
        const newGroup = new FieldGroup();
        newGroup.id = f._key + '-group';
        newGroup.fields.push(f);
        this.fieldGroups.push(newGroup);
      } else {
        const group = this.fieldGroups.find(field => f.group === field.id);
        if (group) {
          group.fields.push(f);
        } else {
          const newGroup = new FieldGroup();
          newGroup.id = f.group;
          newGroup.fields.push(f);
          this.fieldGroups.push(newGroup);
        }
      }
    });
    this.fieldGroups.map(fg => {
      switch (fg.fields.length) {
        case 1: fg.class = 'md12'; break;
        case 2: fg.class = 'md6'; break;
        case 3: fg.class = 'md4'; break;
        case 4: fg.class = 'md3'; break;
      }
    });
  }

  public get Target(): any {
    return this.Widget.data.obj;
  }

  public get Form(): IFormOptions {
    return this.Widget.data.obj._form;
  }

  public get Widget(): IWidget {
    return (this.$parent as WidgetBase).widget;
  }

  public created() {
    this.initGroups();
  }
}
