import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
import { NodeChip } from './node-link';
import Vue from 'vue';
@Component({
  name: 'simple-relation-line-section',
  components: { NodeChip },
  props: ['source'],
  template: `<span v-if="node">
      <node-chip class="mr-2 simple-list-item" v-for="(relation,inx) in list()" :source="source" :key="inx" :node="relation"></node-chip>           
    </span>`
})

export class SimpleRelationLineSection extends BaseSection {
  // 
    private list() {        
      let res : any[] | undefined = [];
      if (this.section?.direction === 'incoming' && this.section?.relation && this.node?._incomming) {
        res = this.node._incomming?.filter(r => r.classId === this.section?.relation).map(r=> r.from); 
      } 
      else if (this.section?.direction === 'outgoing' && this.section?.relation && this.node?._outgoing) {      
        res = this.node._outgoing?.filter(r => r.classId === this.section?.relation).map(r => r.to);      
      } else {
        res = [];
      }
      return res;      
    }
  
  public mounted() {
      
  }
       
  
  }
