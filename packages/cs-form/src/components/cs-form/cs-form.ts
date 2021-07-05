import { Prop, Watch, Emit } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    IFormOptions,
    IFormObject,
    IFormFieldOptions
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form.css';
import { CsFormField } from '../..';

export class FieldGroup {
    public id!: string;
    public fields: IFormFieldOptions[] = [];
    public class: string = '';
    public _visible: boolean = true;
}

@Component({
    name: 'cs-form',
    template: require('./cs-form.html'),
    components: { 'cs-form-field': CsFormField },
    props: {
        widget: null,
        data: null,
        formdef: null,
        formkey: null,
        field: null
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
    public sortedFieldGroups: FieldGroup[] = [];
    public data?: IFormObject;
    public formkey?: string;
    public formdef?: IFormOptions;
    public optionalFields?: FieldGroup[] = [];
    public panel = [0];
    public keys: { [key: string]: IFormObject } = {};
    /** specify a single field to show, others are hidden */
    public field?: string;

    public isKeyValueList(): boolean {
        return this.keys !== undefined && this.keys.length > 0;
    }

    public get formObject(): IFormObject | undefined {
        if (this.data) return this.data;
        if (this.widget && this.widget.data) return this.widget.data;
        console.log('Missing object');
        console.log(this);
        return undefined;
    }

    public set formObject(obj: IFormObject | undefined) {
        this.data = obj;
        this.init();
    }

    @Emit()
    private saved() {}

    @Watch('data')
    private dataChanged() {
        this.init();
        this.$forceUpdate();
    }

    @Watch('widget.content')
    @Watch('formdef')
    private datasourceChanged() {
        this.init();
        this.$forceUpdate();
    }

    @Prop()
    public widget!: IWidget;

    public saveForm() {
        if (
            this.formObject &&
            this.formObject.save &&
            typeof this.formObject.save === 'function'
        ) {
            this.data = this.formObject;

            let save = this.formObject.save(this.formObject);
            Promise.resolve(save).then((updated: any) => {
                if (updated) {
                    this.formObject = Object.assign(this.formObject, updated);
                }
                console.log('Save confirmed');
            });
        }
        this.saved();
    }

    public closeForm() {
        this.saveForm();
        this.$cs.clearRightSidebar();
        console.log('Closing form');
    }

    public fieldVisible(field: IFormFieldOptions) : boolean {        
        if (field.required) { return true; }
        if (field.optional) {
            
            if (!this.Target.hasOwnProperty(field._key)) {
                return false;
            }
        }
        if (!field.requirements) { return true; }

        for (const req of field.requirements) {
            if (!this.formObject || !req(this.formObject)) { return false; }            
        }
        return true;
    }

    public initGroups() {
        this.fieldGroups = [];

        if (!this.Form) {
            return;
        }

        // if (this.Form.keys && this.Form.keyValuesType) {
        //     const newGroup = new FieldGroup();
        //     newGroup.id = 'keys-group';
        //     this.fieldGroups.push(newGroup);
        //     this.keys = {};

        //     for (const key in this.formObject) {
        //         if (this.formObject.hasOwnProperty(key)) {
        //             const value = this.formObject[key];
        //             let field = this.Form.keyValuesType() as IFormObject;
        //             for (const key in value) {
        //                 if (value.hasOwnProperty(key)) {
        //                     const element = value[key];
        //                     field[key] = element;
        //                 }
        //             }
        //             if (field._form) {
        //                 // field._form.title = key;
        //                 this.keys[key] = field;
        //             }
        //             // this.Form.fields.push(this.Form.keyValuesType);
        //             console.log(field);
        //         }
        //     }
        // }

        if (!this.Form.fields) {
            return;
        }

        let optionalFieldGroup: FieldGroup = new FieldGroup();
        this.optionalFields = [optionalFieldGroup];


        this.Form.fields.map(f => {
            // show all fields, or optionally filter only specified field
            if (!this.field || this.field === f._key) {
                // if form supports optional items and target doesn't have property, add it to the optional list
                if (this.Form.optionalSupport && !f.required && f._key && f.title && !this.Target.hasOwnProperty(f._key)) {
                    optionalFieldGroup.fields.push(f);
                } else {
                if (f.type === 'keysobject') {
                }
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
            }
            }
        });
        this.fieldGroups.map(fg => {
            switch (fg.fields?.length) {
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
                case 5:
                case 6:
                    fg.class = 'md2';
                    break;
                default:
                    fg.class = 'md4';
                    break;
            }
        });

        this.sortFieldGroups();
    }

    public fieldTriggered(field: IFormFieldOptions) {
        if (this.Form.triggerCallback && this.Target) {
            this.Form.triggerCallback(this.Target, field);
        }
    }

    public fieldChanged(field: IFormFieldOptions) {
        this.saveForm();
    }

    public updateGroupVisibility(group: FieldGroup) {
        if (
            this.Form &&
            this.Form.groups &&
            this.Form.groups.hasOwnProperty(group.id)
        ) {
            if (typeof this.Form.groups[group.id].visible === 'function') {
                group._visible = this.Form.groups[group.id].visible!(
                    this.Target,
                    this.Form
                );
            }
        }
    }

    public sortFieldGroups() {
        if (this.fieldGroups && Array.isArray(this.fieldGroups)) {
            this.sortedFieldGroups = this.fieldGroups.sort((a, b) => {
                const maxWeightA = a.fields.reduce((prev, cur) => Math.max(prev, cur.sortWeight || 0), 0);
                const maxWeightB = b.fields.reduce((prev, cur) => Math.max(prev, cur.sortWeight || 0), 0);
                return maxWeightB - maxWeightA;
            })
        } else {
            this.sortedFieldGroups = this.fieldGroups || [];
        }
    }

    public updateAllGroupVisbility() {
        if (this.fieldGroups) {
            for (const group of this.fieldGroups) {
                this.updateGroupVisibility(group);
            }
        }
    }

    public addField(field: IFormFieldOptions) {
        if (field._key) {
            this.Target[field._key] = field.defaultValue || '';
            this.initGroups();
        }        
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
        return { title: '' };
    }

    public beforeMount() {
        if (!this.widget) {
            return;
        }
    }

    public init() {
        this.initGroups();
        this.updateAllGroupVisbility();
    }

    public mounted() {
        this.init();
    }

}
