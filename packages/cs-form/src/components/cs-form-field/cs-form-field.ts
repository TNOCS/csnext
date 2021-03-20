import Vue from 'vue';
import {
    IFormFieldOptions, IFormObject
} from '@csnext/cs-core';
import '@csnext/cs-client';
import Component from 'vue-class-component';
import './cs-form-field.css';
import { CsForm } from '../..';
const debounce = require('lodash.debounce');

import { Emit, Prop } from 'vue-property-decorator';
import format from 'date-fns/format';
@Component({
    name: 'cs-formfield',
    template: require('./cs-form-field.html'),
    components: { CsForm },
    props: {
        field: undefined,
        target: undefined
    } as any
})
export class CsFormField extends Vue {
    /** access the original widget from configuration */

    public target?: object;
    public field?: IFormFieldOptions;
    public datestring?: string;
    public dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10));
    public dateMenu = false;
    public timeMenu = false;
    public items: any[] = [];

    private fieldUpdatedDebounce = debounce(this.fieldUpdated, 200);

    private rules: { [key: string]: Function } = {
        required: val => { if (this.field?.required && !val) return this.$cs.Translate('FIELD_REQUIRED'); return true; },
        valueMin: val => {
            if (!this.field || !this.field.min) { return true; }
            if (typeof +val === 'number' && +val >= this.field.min) { return true; }
            return this.$cs.Translate(`Value should be >= ${this.field.min}`);
        },
        valueMax: val => {
            if (!this.field || !this.field.max) { return true; }
            if (typeof +val === 'number' && +val <= this.field.max) { return true; }
            return this.$cs.Translate(`Value should be <= ${this.field.max}`);
        }
    };

    @Emit()
    public changed(field: IFormFieldOptions) { }

    @Emit()
    public triggered(field: IFormFieldOptions) { }

    public async mounted() {        
        if (!this.field?.options) { return; }
        if (typeof this.field.options === 'function') {
            let res = this.field.options();
            if (Promise.resolve(res) == res) {
                Vue.set(this, 'items', await this.field.options());                
            } else {
                this.items = this.field.options() as any[];
            }                        
        } else {
            return this.items = this.field.options;                        
        }
    }

    public triggerClick(field: IFormFieldOptions) {
        if (field.triggerCallback && this.target) {
            field.triggerCallback(this.target, field);
        }
        this.triggered(field);
    }

    public getVisibleArray(field: IFormFieldOptions) {        
        if (!this.target || !field?._key) { return []; }
        if (field.arrayFilter && typeof(field.arrayFilter) === 'function' ) {
            return field.arrayFilter(this.target[field._key]);
        } else {
            return this.target[field._key];
        }
    }

    public get selectedObject(): any | undefined {
        if (this.field && this.field.options && this.field && this.field.keyValue && this.target) {
            let o = this.items; //(Array.isArray(this.field.options)) ? this.field.options : this.field.options();
            return o.find(s => s[this.field!.keyValue!] == this.target![this.field!._key!])
        }
    }

    public set selectedObject(s: any) {
        if (this.target && this.field && this.field.keyValue && this.field._key) {
            this.target[this.field!._key] = s;
        }
    }

    private getComponent(field: IFormFieldOptions) {
        if (field && field.component) {
            return field.component;
        }
    }

    public genColor(i: number) {
        if (this.field && this.field.colors) {
            return this.field.colors[i];
        }
    };

    // public gettanggal(str: number) {
    //     if (str != null) {
    //         const s = new Date(str).toISOString();
    //         return s.substring(8, 10) + '/' + s.substring(5, 7) + '/' + s.substring(0, 4);
    //     }
    //     return '';
    // }

    public get ColorValue(): string | any {
        if (this.target && this.field && this.field._key) {
            return this.target[this.field._key];
        } else {
            return "";
        }
    }

    public set ColorValue(v: string | any) {
        if (v && this.target && this.field && this.field._key) {
            if (typeof (v) === 'string') {
                if (v.toString().match(/#[a-zA-Z0-9]{8}/)) {
                    v = v.substr(0, 7);
                }
                this.target[this.field._key] = v;
            } else {
                if (v.hasOwnProperty('hex')) {
                    this.target[this.field._key] = v.hex;
                }
            }
            // this.changed(this.field);
        }
    }

    // public get EpochDateValue(): string | undefined {
    //     if (this.target && this.field && this.field._key) {
    //         return this.formattedDate(this.target[this.field._key]);
    //     } else {
    //         return "";
    //     }
    // }

    // public set EpochDateValue(v: string | undefined) {
    //     if (v && this.target && this.field && this.field._key) {
    //         const [year, month, day] = v.split('-');
    //         let date = new Date(this.target[this.field._key]);
    //         date.setFullYear(parseInt(year));
    //         date.setMonth(parseInt(month) - 1);
    //         date.setDate(parseInt(day));
    //         this.target[this.field._key] = date.getTime();
    //         // this.changed(this.field);
    //     }
    // }

    public get DateValue(): string | undefined {
        if (this.target && this.field && this.field._key) {
            return this.formattedDate(this.target[this.field._key]);
        } else {
            return "";
        }
    }

    public set DateValue(v: string | undefined) {
        if (v && this.target && this.field && this.field._key) {
            const [year, month, day] = v.split('-');
            let date = new Date(this.target[this.field._key]);
            date.setFullYear(parseInt(year));
            date.setMonth(parseInt(month) - 1);
            date.setDate(parseInt(day));
            this.target[this.field._key] = date.getTime();
            // this.changed(this.field);
        }
    }

    public get TimeValue(): string | undefined {
        if (this.target && this.field && this.field._key) {
            return this.formattedTime(this.target[this.field._key]);
        } else {
            return "";
        }
    }

    public set TimeValue(v: string | undefined) {
        if (v && this.target && this.field && this.field._key) {
            console.log(v);
            const [hour, minute] = v.split(':');
            let date = new Date(this.target[this.field._key]);
            date.setHours(parseInt(hour));
            date.setMinutes(parseInt(minute));
            this.target[this.field._key] = date.getTime();
            // this.changed(this.field);
        }
    }

    public formattedDate(date: number): string | undefined {
        if (date) {
            return format(new Date(date), 'yyyy-MM-dd');
        }
    }

    public formattedTime(date: number): string | undefined {
        if (date) {
            return format(new Date(date), 'HH:mm');
        }
    }

    public formatDate(date: string): string | undefined {
        if (!date) { return undefined }
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    }

    public parseDate(date) {
        if (!date) { return null; }
        if (typeof (date) === 'number') {
            const nd = new Date(date);
            return `${nd.getFullYear}-${nd.getMonth().toString().padStart(2, '0')}-${nd.getDate().toString().padStart(2, '0')}`;
        } else {
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }

    public deleteFromArray(key: string, index: number) {
        if (
            key !== undefined &&            
            this.field &&
            this.target !== undefined            
        ) {                        
            if (this.target.hasOwnProperty(key)) {
                (this.target[key] as Array<any>).splice(index, 1);
                this.fieldUpdated(this.field);
                this.$forceUpdate();            
            }
        }
    }

    public deleteKeyFromObject(key: string, field: IFormFieldOptions) {
        if (
            key !== undefined &&
            field !== undefined &&
            this.target !== undefined &&
            field._key &&
            this.target.hasOwnProperty(field._key)
        ) {
            if (this.target[field._key].hasOwnProperty(key)) {
                delete this.target[field._key][key];
                this.$forceUpdate();
            }
        }
    }

    public fieldUpdated(field: IFormFieldOptions) {
        if (!field._isError) {
            field._appendIcon = '';
            this.changed(field);
            this.$forceUpdate();
        }
    }

    public fieldOptions(field: IFormFieldOptions) {     
        console.log('field options')   ;
        if (typeof field.options === 'function') {
            const items = field.options(); 
            return items;            
        } else {
            return field.options;                        
        }
    }

    public fieldError(error: boolean) {
        if (this.field) {
            this.field._isError = error;
        }
    }

    public updateKey(key: string, field: IFormFieldOptions) {
        console.log('Update key');
        if (
            key !== undefined &&
            field !== undefined &&
            this.target !== undefined &&
            field._key &&
            this.target.hasOwnProperty(field._key)
        ) {
            if (this.target[field._key].hasOwnProperty(key)) {
                // delete this.target[field._key][key];
                this.$forceUpdate();
            }
        }
    }

    public addObject(field: IFormFieldOptions) {
        if (
            !this.target ||
            !field._key ||
            !field.keyValuesType
        ) {
            return;
        }
        if (!this.target.hasOwnProperty(field._key)) {
            this.target[field._key] = []; 
        }
        // check if field already exists, if not create one
        if (field.newItem) {
            this.target[field._key].push(field.newItem());
        } else {        
            this.target[field._key].push({});
        }
        this.fieldUpdated(field);
        if (field.addUsingDialog) {
            // let form = new CsForm();
            // this.$cs.TriggerDialog({
            //     component: CsForm,
            //     data: this.target[field._key]['new'],
            //     toolbar: true,
            //     title: field.title
            // } as IDialog);
        }
        this.$forceUpdate();
    }

    public addKeyObject(field: IFormFieldOptions) {
        if (
            !this.target ||
            !field._key ||
            !field.keyValuesType
        ) {
            return;
        }
        // check if field already exists, if not create one
        if (this.target[field._key] === undefined) {
            this.target[field._key] = {};
        }

        this.target[field._key].new = field.keyValuesType();
        if (field.addUsingDialog) {
            // let form = new CsForm();
            // this.$cs.TriggerDialog({
            //     component: CsForm,
            //     data: this.target[field._key]['new'],
            //     toolbar: true,
            //     title: field.title
            // } as IDialog);
        }
        this.$forceUpdate();
    }

    public keyObjectChange(field: IFormFieldOptions, oldValue: string, newValue: string) {
        const renameProp = (
            oldProp,
            newProp,
            { [oldProp]: old, ...others }
        ) => ({
            [newProp]: old,
            ...others
        });

        if (
            !this.target ||
            !field._key ||
            !field.keyValuesType ||
            !this.target.hasOwnProperty(field._key)
        ) {
            return;
        }

        this.target[field._key] = renameProp(oldValue, newValue, this.target[field._key]);

        console.log('Key event');
        console.log(oldValue + ' -> ' + newValue);
    }

    public fieldInput(field: IFormFieldOptions) {
        if (field) {
            field._appendIcon = 'save'
        }
    }

}

Vue.component('cs-formfield', CsFormField);

