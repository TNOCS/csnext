// components
export * from './components/cs-log-list/cs-log-list';
export * from './classes/log-list-options';
export * from './components/cs-log-details/cs-log-details';

import Vue from 'vue';
import { CsLogDetails } from './components/cs-log-details/cs-log-details';

Vue.component('cs-log-details', CsLogDetails);
