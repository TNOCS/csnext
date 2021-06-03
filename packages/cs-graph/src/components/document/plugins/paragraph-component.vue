<template>
  <node-view-wrapper
    class="paragraph-component"        
  >
   <node-view-content class="content-dom" />
        <!-- <span          
          class="content"
          v-bind="attrs"
          v-on="on"
          >test paragraph
        </span> -->
   
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

<style lang="scss" scoped>
.paragraph-component {
  // position: relative;
  display: inline;
  // background: lightgray;
  border-radius: 6px;
  border-color: black;
  border-style: dashed;
  border-width: 0.5px;
  margin-right: 2px;
}

.label {
  margin-left: 1rem;
  background-color: #0d0d0d;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  padding: 5px;
  cursor: pointer;
  // margin-top: 1.5rem;
  // padding: 1rem;
}
</style>