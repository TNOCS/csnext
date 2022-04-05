import { IDatasource } from '@csnext/cs-core';
import { Component, Vue } from "vue-property-decorator";
import { GraphElement } from '@csnext/cs-data';
import { CsMap } from '../../cs-map/cs-map';



@Component({
  name: 'node-span',
  props: ['node', 'source'],
  template: `<span>
  <v-tooltip transition="undefined" open-delay="100" bottom color="transparent">
      <template v-slot:activator="{ on }">
        <span class="link-title" @click.stop="activate()" v-on="on">{{node.title}}</span>
      </template>
      <v-card outlined class="darker node-popup">
        <data-info-panel :data="node.properties" :node="node" :featureType="node._featureType" panel="popup"></data-info-panel>        
      </v-card>
  </v-tooltip>    
</span>`,
  components: { }
})
export class NodeSpan extends Vue {

  private node?: GraphElement;
  private source?: IDatasource;

  
  private activate() {
    if (this.node && this.source?.events) {
      this.source.events.publish(CsMap.NODE, CsMap.NODE_SELECT, this.node);
    }
  }

}



@Component({
  name: 'node-link',
  props: ['node', 'source'],
  components: {NodeSpan},
  template: `<div><node-span :node="node" :source="source"/></div>`,

})
export class NodeLink extends Vue {

  private node?: GraphElement;
  private source?: IDatasource;

}

@Component({
  name: 'node-chip',
  props: ['node', 'source'],
  components: {NodeSpan},    
  template: `<span>
  <v-tooltip transition="undefined" open-delay="100" bottom color="transparent">
      <template v-slot:activator="{ on }">
      <v-chip label :color="color" @click.stop="activate()" v-on="on" class="link-chip"><v-icon small v-if="node._featureType.icon">{{node._featureType.icon}}</v-icon><span v-if="node.properties" class="node-name" >{{node.properties.name}}</span></v-chip>
      </template>
      <v-card outlined class="darker node-popup" v-if="node.properties">
        <data-info-panel :data="node.properties" :node="node" :featureType="node._featureType" panel="popup"></data-info-panel>        
      </v-card>
  </v-tooltip>    
</span>`,
})
export class NodeChip extends Vue {

  private node?: GraphElement;
  private source?: IDatasource;

    
  private activate() {
    if (this.node && this.source?.events) {
      this.source.events.publish(CsMap.NODE, CsMap.NODE_SELECT, this.node);
    }
  }

  private get color() {
    if (this.node) {
      return GraphElement.getBackgroundColor(this.node);
    }
  }
}