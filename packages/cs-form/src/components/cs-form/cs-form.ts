import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { IWidget, guidGenerator, IFormOptions, IFormFieldOptions } from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form.css';
import 'reflect-metadata';

export class FieldGroup {
    public id!: string;
    public fields: IFormFieldOptions[] = [];
    public class: string = '';
  }

// import 'https://unpkg.com/timeline-plus/dist/timeline.js';
// import 'https://unpkg.com/timeline-plus/dist/timeline.css';

@Component({
    template: require('./cs-form.html')
})
export class CsForm extends Vue {
    /** access the original widget from configuration */

    public timeline: any;
    initalized = false;
    public minimize = false;
    public showMenu = false;
    public showFilterMenu = false;
    public fieldGroups: FieldGroup[] = [];

    @Prop()
    public widget!: IWidget;

    constructor() {
        super();
        console.log('hi');        
    }

    
  public initGroups() {
    this.fieldGroups = [];

    if (!this.Form || !this.Form.fields) { return; }
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
    return this.widget.data;
  }

  public get Form(): IFormOptions {
    return this.widget.data._form;
  }

    @Watch('widget.content')
    dataLoaded() {}

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public mounted() {
        this.initGroups();
        
    }

    public destroyed() {}
}
