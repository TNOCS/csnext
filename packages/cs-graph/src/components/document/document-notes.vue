<template >
  <div style="height: 100%" v-if="isrd">
    
  </div>
</template>

<style>

</style>


<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import SelectionPopup from "./selection-popup.vue";


// don't forget to import CSS styles
import "../../assets/sass/main.scss";
import simplebar from "simplebar-vue";
// import { Decoration, DecorationSet } from "prosemirror-view";
import { DocDatasource } from "./../../datasources/doc-datasource";
import { IntelDocument } from "./../../classes/document/intel-document";

@Component({
  components: {
    simplebar,
    EditorMenuBar,
    EditorContent,
    EditorMenuBubble,
    SelectionPopup
  }
})
export default class DocumentNotes extends WidgetBase {
  public editor?: any = null;
  @Prop()
  public content?: any;
 

  public get isrd(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public get document(): IntelDocument | undefined {
    if (this.isrd?.activeDocument) {
      return this.isrd.activeDocument;
    }
  }

  
  constructor() {
    super();
  }


  public contentLoaded() {
    if (this.widget.options) {
      if (this.document) {
        this.isrd?.openDocumentDetails(this.document!, false);
      }
      
      this.busManager.subscribe(this.isrd!.bus, 'input', (a: string, d:any) => {
        alert('document loaded');
      
        // this.updateContent();
        // this.$forceUpdate();
    })
    }
  }

  mounted() {
    
  }
}
</script>
