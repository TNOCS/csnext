import { IDatasource } from '@csnext/cs-core';
import { Component, Vue } from "vue-property-decorator";
import { GraphElement } from '@csnext/cs-data';
import { CsMap } from '../../cs-map/cs-map';


@Component({
  name: 'node-link',
  props: ['node', 'source'],
  template: `<div>
  <v-tooltip transition="undefined" open-delay="100" bottom color="transparent">
      <template v-slot:activator="{ on }">
        <span class="link-title" @click.stop="activate()" v-on="on">{{node.title}}</span>
      </template>
      <v-card outlined class="darker node-popup">
        <data-info-panel :data="node.properties" :node="node" :featureType="node._featureType" panel="popup"></data-info-panel>        
      </v-card>
  </v-tooltip>    
</div>`,
  components: { }
})
export class NodeLink extends Vue {

  private node?: GraphElement;
  private source?: IDatasource;

  
  private activate() {
    if (this.node && this.source?.events) {
      this.source.events.publish(CsMap.NODE, CsMap.NODE_SELECT, this.node);
    }
  }

}

