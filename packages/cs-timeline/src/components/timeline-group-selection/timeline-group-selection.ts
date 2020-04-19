import Component from 'vue-class-component';
import { AppState, WidgetBase } from '@csnext/cs-client';
import './timeline-group-selection.css';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { CsTimeline } from '../cs-timeline/cs-timeline';
import { DataGroup } from 'vis-timeline/esnext';

@Component({
  name: 'timeline-group-selection',
  template: require('./timeline-group-selection.html')
} as any)
export class TimelineGroupSelection extends Vue {
  public appState = AppState.Instance;

  @Prop()
  public data?: any;
  // public viewSelector: string = 'Drukte';

  created() {

  }

  updateFilter() { }

  toggle(group: DataGroup) {
    if (this.data) {
      (this.data as CsTimeline).setGroupVisibility(group, group.visible);
    }

  }


}
