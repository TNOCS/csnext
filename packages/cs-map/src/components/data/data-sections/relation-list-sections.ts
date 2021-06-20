import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
import { InfoPanelSection } from '@csnext/cs-data';
import { SimpleRelationListSection } from './simple-relation-list-section';
@Component({
  name: 'relation-list-sections',
  components: { SimpleRelationListSection},
  props: [ 'source'],
  template: `<div>  
  <div class="list-section" v-if="node && node._outgoing">        
    <div v-for="(list,indx) in lists()" :key="indx">      
      <simple-relation-list-section  :source="source" :data="data" :node="node" :section="list" :featureType="featureType" :infoPanel="infoPanel"></simple-relation-list-section>
    </div>
  </div>
  </div>
</div>
`
})
export class RelationListSections extends BaseSection {

  private showMore = false;
  private total?: number;

  private relationName(n?: string) {
    if (!n) { return '';}
    return n.toLowerCase();
  }

  private lists() {
    if (!this.node) { return []; }
    let res: InfoPanelSection[] = [];
    
    if (this.node._incomming) {
      let outgoing = this.node._incomming.filter(i => i.classId !== 'INSTANCE_OF');
      for (const o of outgoing) {
        if (res.findIndex(r => o.from && r.filter === o.from.classId) === -1) {
          res.push({ sectionType: 'simple-relation-list-section', title: `${o.from!.classId}`, filter: o.from!.classId })        
        }        
      }
    }

    if (this.node._outgoing) {
      let outgoing = this.node._outgoing.filter(i => i.classId !== 'INSTANCE_OF');
      for (const o of outgoing) {
        if (res.findIndex(r => o.to && r.relation === o.classId) === -1) {
          res.push({ sectionType: 'simple-relation-list-section', title: this.relationName(o.classId ?? o._title ), relation: o.classId}); // filter: o.to!.classId })        
        }        
      }
    }


    // if (this.node._incomming) {
    //   let incomming = [...new Set(this.node._incomming.map(item => item.classId))];
    //   for (const i of incomming) {
    //     res.push({ sectionType: 'simple-relation-list-section', title: i, incomming: true, relation: i})        
    //   }
    // }
    return res;


  }


public mounted() {
    
}
     

}
