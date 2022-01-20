import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
import { InfoPanelSection } from '@csnext/cs-data';
import { NodeChip } from './node-link'

@Component({
  name: 'relation-line-section',
  components: { NodeChip },
  props: [ 'source'],
  template: `<div>  
  <div class="list-section" v-if="node && node._outgoing">        
    <node-chip class="mr-2 list-item" v-for="(relation,inx) in node._outging" :source="source" :key="inx" :node="relation"></node-chip>    
  </div>
</div>
`
})
export class RelationLineSection extends BaseSection {



  private relationName(n?: string) {
    if (!n) { return '';}
    return n.toLowerCase();
  }


public mounted() {
    
}
     

}
