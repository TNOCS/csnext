<template>
  <node-view-wrapper
    class="paragraph-component"        
  >
   <v-layout><div class="paragraph-control">
     <!-- <v-btn fab outlined x-small class="paragraph-button"><v-icon x-small>mdi-plus</v-icon></v-btn> -->
   </div>
   <node-view-content class="paragraph-content" />
        <!-- <span          
          class="content"
          v-bind="attrs"
          v-on="on"
          >test paragraph
        </span> -->
   </v-layout>
  </node-view-wrapper>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  NodeViewWrapper,
  NodeViewContent
} from "@tiptap/vue-2";

import { GraphElement, TextEntity } from "@csnext/cs-data";


@Component({
  components: {
    NodeViewWrapper,
    NodeViewContent    
  },
})
export default class ParagraphComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  

  public mounted() {
    // debugger;
    // console.log('mounted text entity component');    
  }
}
</script>

<style lang="css" scoped>
.paragraph-component {  
  
}


.paragraph-control {
  width: 20px;     
  margin: 5px;
  border-color: gray;
  /* border-color: red; */
  border-left-width: 2px;  
  border-left-style: solid;
}

.paragraph-button {
  width: 24px;
  height: 24px;
  transform: translateX(-12);
  background: white;  
}

.paragraph-content {
  padding: 5px;  
}
</style>