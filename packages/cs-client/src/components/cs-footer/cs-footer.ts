import Vue from 'vue';
import Component from 'vue-class-component';
import { ISidebarOptions, IDashboard } from '@csnext/cs-core';
import { Prop, Watch } from 'vue-property-decorator';
import { AppState, Logger, CsDashboard } from '../../';
import './cs-footer.css';

@Component({
  name: 'cs-footer',
  template: require('./cs-footer.html')
} as any)
export class CsFooter extends Vue {
  public app = AppState.Instance;

  @Prop() public footer?: ISidebarOptions;

  @Watch('footer.dashboard')
  public footerChanged(n: any, o: any) {
    Vue.nextTick(() => {
      if (this.footer) {
        if (this.footer.dashboard && this.footer.dashboard.widgets) {
          this.footer.dashboard.widgets[0] = n.widgets[0];
        }

        if (!this.footer.width) {
          this.footer.width = 300;
        }
      }

      this.$forceUpdate();
    });
  }
}
