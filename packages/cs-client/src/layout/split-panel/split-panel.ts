import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import { LayoutManager } from '../..';
import VueSplit from 'vue-split-panel';
import './split-panel.css';

@Component({
  template: require('./split-panel.html'),
  props: {
    dashboard: null
  }
} as any)
export class SplitPanel extends Vue {
  public dashboard?: IDashboard;
  public $refs!: {
    mySplit: any;
  };

  public mounted() {
    setTimeout(() => {
      console.log(this.$refs.mySplit.getSizes());
    }, 2000);
  }
}

Vue.use(VueSplit);

LayoutManager.add({
  id: 'split-panel',
  name: 'split panels',
  component: SplitPanel
} as ILayoutManagerConfig);
