import Component from 'vue-class-component';
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';

@Component({
  name: 'cs-loader',
  props: ['isLoading'],
  template: require('./cs-loader.html')
} as any)
export class CsLoader extends Vue {

  
}
