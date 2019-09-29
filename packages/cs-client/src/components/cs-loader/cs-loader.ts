import Component from 'vue-class-component';
import Vue from 'vue';
import { pleaseWait } from 'please-wait';
import 'please-wait/build/please-wait.css';
import { Watch } from 'vue-property-decorator';

@Component({
  name: 'cs-loader',
  props: ['isLoading'],
  template: require('./cs-loader.html')
} as any)
export class CsLoader extends Vue {

  @Watch('isLoading')
  public loadingChanged(d: any) {
    console.log('Loading changed 2');
  }
}
