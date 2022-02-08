<template>
  <node-view-wrapper    
  >
   
   <v-layout>
  <v-card class="element-card-component" elevation="2">
    <component v-if="element !== null" :is="getComponentCard(element)" :element="element" :source="source" />
    <v-autocomplete v-else :items="Object.values(source.graph)" item-text="properties.name" v-model="elementId" item-value="id" label="Select element" class="ma-5" @change="selectElement()" ></v-autocomplete>
    <!-- <v-btn class="primary">select - {{node.attrs.elementId}} {{elementId}}</v-btn>
     -->
    <!-- <v-card-title><node-view-content class="paragraph-content" /></v-card-title> -->

  </v-card>
  <div><v-btn icon @click="openElement()"><v-icon>mdi-information-outline</v-icon></v-btn>
    <v-btn icon @click="removeCard()"><v-icon>mdi-delete</v-icon></v-btn>
  </div>
  </v-layout>

  <node-view-content class="element-card-content" />
  
  </node-view-wrapper>  
</template>

<style scoped>
.element-card-component
{
  min-width: 300px;
  min-height: 200px;
}

.element-card-content {
  display: none;
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  NodeViewWrapper,
  NodeViewContent,
  Editor
} from "@tiptap/vue-2";
import { GraphElement } from "@csnext/cs-data";
import { DocDatasource, ElementCardManager } from "../../..";
import DefaultElementCard from "../../data-grid/cards/default-element-card.vue";

@Component({
  components: {
    NodeViewWrapper,
    NodeViewContent,
    DefaultElementCard    
  },
})
export default class ElementCardComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  @Prop()
  node: any;

  private element : GraphElement | null = null;

  private editor?: Editor;

  private selectElement() {
    this.checkElement();
    // this.$forceUpdate());
  }

  private get source(): DocDatasource | undefined {
    
    return (this as any).editor?.options?.editorProps?.source;

  }

  private set elementId(id: string) {    
    (this as any).updateAttributes({
      elementId: id    
    })    
  }

  private get elementId() : string {
    if (this.node?.attrs?.elementId) {
      return this.node.attrs.elementId;
    }
    return '';
  }

  private openElement() {
    if (this.source && this.element) {
      this.source.selectElement(this.element, true);
    }
  }

   private getComponentCard(element: GraphElement) {
    const id = element.classId;
    if (id && ElementCardManager.cards?.hasOwnProperty(id)) {
      return ElementCardManager.cards[id];
    }
    if (element.properties && element.properties.hasTimeseries) {
      return ElementCardManager.cards['indicator'];
    }
    return 'default-element-card';
  }

  private checkElement() {
    if (this.elementId !== '' && this.source) {
      this.element = this.source.getElement(this.elementId) as GraphElement
    }
  }

  mounted() {
    console.log(this);
    if (this.node?.attrs) {
      console.log(this.node.attrs);
    }
    this.checkElement();
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