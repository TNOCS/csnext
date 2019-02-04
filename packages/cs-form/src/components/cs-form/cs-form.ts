import { Watch, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    guidGenerator,
    IFormOptions,
    IFormObject,
    IFormFieldOptions
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form.css';
import 'reflect-metadata';
import { CsFormField } from '../..';

export class FieldGroup {
    public id!: string;
    public fields: IFormFieldOptions[] = [];
    public class: string = '';
}

@Component({
    name: 'cs-form',
    template: require('./cs-form.html'),
    components: { 'cs-form-field': CsFormField},
    props: {
        widget: null,
        data: null,
        formdef: null
    } as any
})
export class CsForm extends Vue {
    /** access the original widget from configuration */

    public timeline: any;
    initalized = false;
    public minimize = false;
    public showMenu = false;
    public showFilterMenu = false;
    public fieldGroups: FieldGroup[] = [];
    public data?: IFormObject;   
    public formdef?: IFormOptions; 
    public panel = [true];

    public get formObject() : IFormObject | undefined {        
        if (this.data) return this.data;
        if (this.widget && this.widget.data) return this.widget.data;        
        return undefined;
    }

    @Prop()
    public widget!: IWidget;    

    public saveForm() {
        if (this.formObject && this.formObject.save && typeof this.formObject.save === 'function') {
            this.formObject.save().then(res => {
                console.log(this.widget.data);
                console.log('Save confirmed');
            })
        }
        console.log('Saving form');
    }

    public initGroups() {
        this.fieldGroups = [];

        if (!this.Form || !this.Form.fields) {
            return;
        } 
        this.Form.fields.map(f => {            
            if (!f.group) {
                const newGroup = new FieldGroup();
                newGroup.id = f._key + '-group';
                newGroup.fields.push(f);
                this.fieldGroups.push(newGroup);
            } else {
                const group = this.fieldGroups.find(
                    field => f.group === field.id
                );
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
                case 1:
                    fg.class = 'md12';
                    break;
                case 2:
                    fg.class = 'md6';
                    break;
                case 3:
                    fg.class = 'md4';
                    break;
                case 4:
                    fg.class = 'md3';
                    break;
            }
        });
    }

    public get Target(): any {
        return this.formObject;
    }

    public get Form(): IFormOptions {
        if (this.formdef) {
            return this.formdef;            
        }
        if (this.formObject && this.formObject._form) {
            return this.formObject._form;
        }
        return { title: ''};
    }

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
