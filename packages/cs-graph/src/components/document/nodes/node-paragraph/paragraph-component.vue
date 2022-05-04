<template>
  <node-view-wrapper class="paragraph-component" @drop="onDrop">
    <v-menu offset-y >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dense class="paragraph-menu" icon v-bind="attrs" elevation="0" v-on="on">
          <v-icon small>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-delete</v-icon></v-list-item-icon>
          <v-list-item-title>delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- <span class="language-identifier"  v-if="node.attrs">{{node.attrs.language_code}}</span> -->

    <!-- <v-icon aria-hidden="true" class="paragraph-button" x-small>mdi-drag</v-icon> -->
    <!-- <v-icon class="paragraph-button" x-small>mdi-drag</v-icon> -->
    <node-view-content :ref="'paragraph-' + this.node.attrs.id" class="paragraph-content" />

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

.paragraph-menu {
   float: left;
  margin-left: -20px;
  margin-top: -4px;
  font-size: 15px;
  margin-top: 10px;
}

.language-identifier {
  float: left;
  margin-left: -20px;
  font-size: 15px;
  margin-top: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-2';
import { DragUtils } from '@csnext/cs-map';

@Component({
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
})
export default class ParagraphComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  @Prop()
  node: any;

   public async onDrop(event: DragEvent) {
    console.log(event);    
    const {elementid, ft } = DragUtils.getElementData(event);
    if (elementid) {
      alert(elementid)
    }    
  }

}
</script>

<style lang="css" scoped>
.paragraph-component {
  position: relative;
}

.paragraph-component::before {
  content: '';
}

.paragraph-button {
  display: none;
  position: absolute;

  left: -30px;
  /* width: 24px;
  height: 24px;
  transform: translateX(-20px);
  background: white;   */
}

.paragraph-content {
  padding: 10px;
}
</style>
