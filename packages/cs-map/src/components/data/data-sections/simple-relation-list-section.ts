import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
import { NodeLink } from './node-link';
@Component({
  name: 'simple-relation-list-section',
  components: { NodeLink },
  template: `<div>  
  <div class="list-section" v-if="node && node._outgoing">        
      <v-layout>
        <div @click="toggleExpand()" class="section-title" v-if="section.title">{{section.title}}<span v-if="!expanded"> ({{total}})</span></div><v-spacer></v-spacer>
        <v-btn icon v-if="node && node._isEditting"><v-icon>add</v-icon></v-btn>
        <v-btn v-if="expanded" @click="toggleExpand()" icon><v-icon>expand_more</v-icon></v-btn>
        <v-btn v-else @click="toggleExpand()" icon><v-icon>expand_less</v-icon></v-btn>
      </v-layout>
      <div class="d-flex flex-wrap" v-if="expanded">
        <node-link class="mr-2 list-item" v-for="(relation,inx) in list()" :source="source" :key="inx" :node="relation"></node-link>
        <v-btn v-if="total>10" text class="mr-2 list-item" @click="showMore = !showMore"><span v-if="showMore">show less</span><span v-else>show more</span></v-btn>
      </div>
      
  </div>
</div>
`
})
export class SimpleRelationListSection extends BaseSection {

    private showMore = false;
    private total?: number;
    
    private expanded = true;
  
    private toggleExpand() {
      this.expanded = !this.expanded;
    }
  
    private list() {        
      let res : any[] | undefined = [];
      if (this.section?.filter && this.node?._incomming) {
        res = this.node._incomming?.filter(r => r.from?.classId === this.section?.filter).map(r=> r.from); //.filter(r => r.classId === 'INSTANCE_OF');      
      } else if (this.section?.relation && this.section?.incomming && this.node?._outgoing) {      
        res = this.node._incomming?.filter(r => r.classId === this.section?.relation).map(r => r.from);      
      } else if (this.section?.relation && this.node?._outgoing) {      
        res = this.node._outgoing?.filter(r => r.classId === this.section?.relation).map(r => r.to);      
      } else {
        res = [];
      }
      this.total = res!.length;
      if (this.showMore || this.total < 11 ) {
        return res;
      } else {
        return res?.slice(0,11);
      }
    }
  
  public mounted() {
      
  }
       
  
  }
