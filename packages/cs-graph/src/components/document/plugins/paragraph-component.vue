<template>
  <node-view-wrapper
    class="paragraph-component"        
  >
  <span class="language-identifier"  v-if="node.attrs">{{node.attrs.language_code}}</span>

     <!-- <v-icon aria-hidden="true" class="paragraph-button" x-small>mdi-drag</v-icon> -->
<!-- <v-icon class="paragraph-button" x-small>mdi-drag</v-icon> -->
   <node-view-content class="paragraph-content" />
   
        <!-- <span          
          class="content"
          v-bind="attrs"
          v-on="on"
          >test paragraph
        </span> -->
   <!-- </v-layout> -->
  </node-view-wrapper>  
</template>

<style scoped>
.language-identifier {
  float: left;
    margin-left: -20px;
    font-size: 15px;
    margin-top: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  NodeViewWrapper,
  NodeViewContent
} from "@tiptap/vue-2";


@Component({
  components: {
    NodeViewWrapper,
    NodeViewContent    
  },
})
export default class ParagraphComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  @Prop()
  node: any;

  mounted() {
    console.log(this);
    if (this.node?.attrs) {
      console.log(this.node.attrs);
    }
  }

}
</script>

<style lang="css" scoped>
.paragraph-component {  
  position: relative;
}

.paragraph-component::before {
  content: "";
}


.paragraph-button {
  display: none;
  position: absolute;

  left: -20px;
  /* width: 24px;
  height: 24px;
  transform: translateX(-20px);
  background: white;   */
}

.paragraph-content {
  padding: 5px;  
}
</style>