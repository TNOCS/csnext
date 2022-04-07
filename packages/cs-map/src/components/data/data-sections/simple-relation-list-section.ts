import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
import { NodeChip } from './node-link';
import Vue from 'vue';
@Component({
  name: 'simple-relation-list-section',
  components: { NodeChip },
  props: ['source'],
  template: `<div>  
  <div class="list-section" v-if="node">        
      <v-layout>
        <div @click="toggleExpand()" class="section-title" v-if="section.title">
        {{section.title}} <span v-if="total>1">({{total}})</span></div><v-spacer></v-spacer>
        <v-btn icon v-if="node && node._isEditting"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn v-if="expanded" @click="toggleExpand()" icon><v-icon>mdi-chevron-up</v-icon></v-btn>
        <v-btn v-else @click="toggleExpand()" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
      </v-layout>
      <div class="d-flex flex-wrap" v-if="expanded">
        <node-chip class="mr-2 simple-list-item" v-for="(relation,inx) in list()" :source="source" :key="inx" :node="relation"></node-chip>
        <v-btn v-if="total>5" text class="mr-2 list-item" @click="showMore = !showMore"><span v-if="showMore">show less</span><span v-else>show more</span></v-btn>
      </div>
      
  </div>
</div>
`
})
export class SimpleRelationListSection extends BaseSection {

    private showMore = false;
    private total: number = 0;
    
    private expanded = true;
  
    private toggleExpand() {
      this.expanded = !this.expanded;
    }
  
    private list() {        
      let res : any[] | undefined = [];
      if (this.section?.direction === 'incoming' && this.section?.relation && this.node?._incomming) {
        res = this.node._incomming?.filter(r => r.classId === this.section?.relation).map(r=> r.from); //.filter(r => r.classId === 'INSTANCE_OF');      
      // } else if (this.section?.direction === 'outgoing' && this.section?.relation && this.section?.incomming && this.node?._outgoing) {      
        // res = this.node._incomming?.filter(r => r.classId === this.section?.relation).map(r => r.from);      
      } 
      else if (this.section?.direction === 'outgoing' && this.section?.relation && this.node?._outgoing) {      
        res = this.node._outgoing?.filter(r => r.classId === this.section?.relation).map(r => r.to);      
      } else if (this.section?.direction === 'property' && this.node?._elements && this.section?.property) {
        const p = this.node._elements![this.section.property];
        res = Array.isArray(p) ? p : [p];
      }
      Vue.set(this, 'total', res!.length);
      // this.total = res!.length;
      if (this.showMore || this.total < 6 ) {
        return res;
      } else {
        return res?.slice(0,6);
      }
    }
  
  public mounted() {
      
  }
       
  
  }
