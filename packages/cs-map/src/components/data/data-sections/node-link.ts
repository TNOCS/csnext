// import { GraphElement } from '../../../classes';
import { IDatasource} from '@csnext/cs-core';
import { Component, Vue, Watch } from "vue-property-decorator";
import { DataInfoPanel } from './../data-info-panel/data-info-panel';

@Component({
  name: 'node-link',
  props: ['node', 'source'],
  template: `<div>
  <v-tooltip transition="undefined" open-delay="100" bottom color="transparent">
      <template v-slot:activator="{ on }">
        <span class="link-title" @click="activate()" v-on="on">{{node.title}}</span>
      </template>
      <v-card outlined class="darker node-popup">
        <data-info-panel :data="node.properties" :node="node" :featureType="node._featureType" panel="popup"></data-info-panel>        
      </v-card>
  </v-tooltip>    
</div>`,
  components: { }
})
export default class NodeLink extends Vue {

  // private node?: GraphElement;
  // private source?: IDatasource;

  
  // private activate() {
  //   if (this.node && this.source?.bus) {
  //     this.source.bus.publish('nodelink', 'activated', this.node);
  //   }
  // }

}

