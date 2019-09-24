import Component from 'vue-class-component';
import './cs-info.css';
import { WidgetBase } from '../../widgets/widget-base';

@Component({
  name: 'cs-info',
  template: require('./cs-info.html'),
  props: {
    widget: null
  }
} as any)
export class CsInfo extends WidgetBase {

  constructor() {
    super();
    // this.initInfo();
  }

  
}
