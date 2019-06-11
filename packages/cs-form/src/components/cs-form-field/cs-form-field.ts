import Vue from 'vue';
import {
    IFormFieldOptions,
    IDialog
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form-field.css';
import 'reflect-metadata';
import { CsForm } from '../..';
import dayjs from 'dayjs';
import "./v-datetime-picker";

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
    public timepickermenu = false;

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

        this.target[field._key]['new'] = field.keyValuesType();
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

    keyObjectChange(field: IFormFieldOptions, oldValue: string, newValue: string) {
        let renameProp = (
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

    mounted() {
        if (this.field && this.field.type === 'form') {
        }
    }
}

Vue.component('cs-formfield', CsFormField);

