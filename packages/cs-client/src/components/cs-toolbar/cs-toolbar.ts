import Vue from 'vue';
import Component from 'vue-class-component';
import {
  IDashboard} from '@csnext/cs-core';
import './cs-toolbar.css';

@Component({
  name: 'cs-toolbar',
  template: require('./cs-toolbar.html'),
  props: {
    dashboard: null
  }
} as any)
export class CsToolbar extends Vue {
  public dashboard?: IDashboard;
}
