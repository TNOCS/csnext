import { WidgetBase, AppState } from '@csnext/cs-client';
import './cs-log-details.css';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  name: 'cs-log-details',
  template: require('./cs-log-details.html')
} as any)
export class CsLogDetails extends WidgetBase {
  
  mounted() {
  
  }
}


Vue.filter('json', (value: any) => {
  if (value !== undefined) {        
    return JSON.stringify(value,undefined, 2);
  }
});
