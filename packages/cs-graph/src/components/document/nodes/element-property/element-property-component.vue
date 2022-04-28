<template>
  <node-view-wrapper class="element-property">    
    {{value}} <v-icon v-if="icon">{{icon}}</v-icon>
    <!-- <v-text-field v-model="value"></v-text-field><v-icon v-if="icon">{{icon}}</v-icon> -->
  </node-view-wrapper>
</template>

<style scoped>
.element-property {
  display: inline;

  border-radius: 6px;  
  border-style: none;
  background-color: lightgray;
  border-width: 0.5px;
  min-width: 50px;
  padding: 2px;

}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NodeViewWrapper, NodeViewContent, Editor } from '@tiptap/vue-2';
import { GraphDocument } from '../../../../classes';
import { FeatureType } from '@csnext/cs-data';

@Component({
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
})
export default class ElementPropertyComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  @Prop()
  node!: any;

  @Prop()
  editor!: Editor;

  public icon: string | null = null;

  
  public get featureType() : FeatureType | undefined {
    return this.document?._featureType;
  }

  public get value() : any | null {
    if (this.document?.properties && this.key) {
      return this.document.properties[this.key];
    }
  }

  public set value(v: any | null) {
if (this.document?.properties && this.key) {
      this.document.properties[this.key] = v;
    }
  }

  public get propertyType() : FeatureType | undefined {
    if (this.key && this.featureType?.propertyMap && this.featureType.propertyMap.hasOwnProperty(this.key)){
      return this.featureType?.propertyMap[this.key];
    }    
  }

  get key(): string | undefined {
    return this.node?.attrs?.key;
  }

  get document() : GraphDocument {
    return (this.editor.view as any)._props.document as GraphDocument;
  }

  setStyle() {
    if (this.propertyType) {
      this.icon = (this.propertyType as any)._icon;

      // this.style = {
      //   backgroundColor: this.propertyType.color,
      //   color: this.propertyType.textColor,
      // };
    }

  }

  mounted() {    
    if (this.node?.attrs) {
      if (this.node?.attrs?.key && this.document && this.document?.properties && this.document.properties.hasOwnProperty(this.node.attrs.key)) {
        // this.value = this.document.properties[this.node.attrs.key];
        this.setStyle();
      }      
    }

    // const a = annotate( '.paragraph-content', { type: 'bracket', color:'blue'});
    // a.show();
  }
}
</script>
