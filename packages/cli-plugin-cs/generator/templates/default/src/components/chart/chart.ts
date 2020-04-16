import Component from 'vue-class-component';
import { WidgetBase, AppState } from '@csnext/cs-client';
import { Watch, Vue } from 'vue-property-decorator';
import './chart.css';

@Component({
  name: 'actions',
  template: require('./chart.html'),
} as any)
export class Chart extends WidgetBase {}
