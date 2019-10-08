import { CsFormField } from './components/cs-form-field/cs-form-field';
import vue from 'vue';
import { CsForm } from './components/cs-form/cs-form';

// components
export * from './components/cs-form/cs-form';
export * from './components/cs-form-field/cs-form-field';

vue.component('cs-form', CsForm);
