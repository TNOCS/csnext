import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, ILayoutManagerConfig } from '@csnext/cs-core';
import VueSplit from 'vue-split-panel';
import './split-panel.css';

const splitComponent = Vue.component('split-comp', {
  template: require('./split-comp.html'),
  props: ['options', 'dashboard'],
  // data: { dashboard: null },
  methods: {
    getWidget: (id: string, dashboard: IDashboard) => {
      if (dashboard && dashboard.widgets) {
        return dashboard.widgets.find(w => w.id === id);
      }
    }
  }
});

@Component({
  template: require('./split-panel.html'),
  props: {
    dashboard: null
  }
} as any)
export class SplitPanel extends Vue {
  public dashboard!: IDashboard;
  public $refs!: {
    mySplit: any;
  };
}

Vue.use(VueSplit);

