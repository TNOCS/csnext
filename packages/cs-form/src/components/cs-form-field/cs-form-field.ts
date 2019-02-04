import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import {
    IWidget,
    IFormFieldOptions
} from '@csnext/cs-core';
import Component from 'vue-class-component';
import './cs-form-field.css';
import 'reflect-metadata';
import { CsForm } from '../..';

@Component({
    name: 'cs-formfield',
    template: require('./cs-form-field.html'),
    components: {CsForm},
    props: {
        field: null,
        target: null
    } as any
})
export class CsFormField extends Vue {
    /** access the original widget from configuration */

    public target? : object;
    public field? : IFormFieldOptions;

}

Vue.component('cs-formfield', CsFormField);
