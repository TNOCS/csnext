<template>
  <node-view-wrapper class="block-quote code-block">
    
      <v-btn>test</v-btn>
    
    <pre><node-view-content /></pre>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,

  data() {
    return {
    //   languages: this.extension.options.lowlight.listLanguages(),
    }
  },

  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({ language })
      },
    },
  },
}
</script>

<style lang="css" scoped>
.code-block {
  position: relative;
  color: red;
  background: orange !important;

//   select {
//     position: absolute;
//     top: 0.5rem;
//     right: 0.5rem;
//   }
}
</style>