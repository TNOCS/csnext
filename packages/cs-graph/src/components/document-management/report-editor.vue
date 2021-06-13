<template>


  <simplebar style="height: 100%; padding: 5px" v-if="isrd && document && document.properties && formDef !== null">
        <h1>{{document._featureType.title}}</h1>
    <cs-form :data="document.properties" :formdef="formDef" class="pt-2" id="detailcsform" @saved="updateDocument"></cs-form>
    
  </simplebar>
</template>

<style scoped>

.card-class-title {
  margin-left: 5px;
}

.entity-card {
  width: 110px;
  height:110px;
  margin: 5px;
  /* float:left; */
  border: 1px solid;
}
.entity-link {
  margin: 5px;      
  
  padding: 5px;
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import { IFormOptions } from '@csnext/cs-core';

import simplebar from "simplebar-vue";
import { GraphDocument } from "../../classes/document/graph-document";
import { NodeLink } from "@csnext/cs-map"
import { GraphElement } from '@csnext/cs-data';

@Component({
  components: { simplebar, NodeLink }
})
export default class DocumentEditor extends WidgetBase {

  public formDef : IFormOptions | null = null;

  public openEntity(entity: GraphElement) {
    if (this.isrd) {
      this.isrd.selectElement(entity);
    }
  }

  private getEntityColor(entity?: GraphElement) {
    if (entity) {
      return GraphElement.getBackgroundColor(entity);
    } else {
      return "gray";
    }
  }

  public updateDocument() {
    
    if (!this.isrd || !this.document) { return; }    
    if (this.document.sourceId && (!this.document._source || this.document._source.id !== this.document.sourceId)) {
      // remove existing link
      


      // source changed
      // alert('source changed');
    }

    
    
    this.isrd.saveDocument(this.document);

  }  

  public approvedObservations() {
    if (!this.isrd || !this.isrd.activeDocument?._outgoing) { return; }
    return this.isrd.activeDocument._outgoing.filter(o => o.classId === 'CONTAINS_OBSERVATION' && o.to).map(o => o.to);
  }

  public approvedElements() {
    if (!this.isrd || !this.isrd.activeDocument?._outgoing) { return; }
    return this.isrd.activeDocument._outgoing.filter(o => o.classId === 'CONTAINS' && o.to).map(o => o.to);
  }

   public get formDef2(): IFormOptions {
        return {                
            showToolbar: false,
            hideTitle: true,
            isPanel: false,
            optionalSupport: true,
            fields: [
               {
                title: 'ID',
                _key: 'id',
                type: 'string',
                readonly: true                
              },
              {
                title: 'TITLE',
                _key: 'title',
                type: 'string'                
              },             
              {
                title: 'NOTE',
                _key: 'note',
                type: 'textarea'                
              },
              {
                title: 'SOURCE',
                _key: 'sourceId',
                type: 'combobox-objects',
                keyText: 'title',
                keyValue: 'id',
                options: this.isrd!.sources             
              },
              {
                title: 'RELIABILITY',
                _key: 'reliability',
                type: 'selection',
                group: 'score',
                options: ['Completely reliable', 'Usually reliable', 'Fairly reliable', 'Not usually reliable', 'Unreliable', 'Reliability cannot be judged']             
              },
              {
                title: 'CREDIBILITY',
                _key: 'credibility',
                type: 'selection',
                group: 'score',
                options: ['Confirmed by other sources', 'Probably True', 'Possibly True', 'Doubtful', 'Improbable', 'Truth cannot be judged']             
              },                         
            ]
        } as IFormOptions;
   }

  public document?: GraphDocument | null = null;

  public get isrd(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
    if (this.widget?.data?.isrd) {
      return this.widget.data.isrd as DocDatasource;
    }
  }

  public updateForm() {
    if (this.isrd && this.document?._featureType) {      
      const form = this.isrd.elementEditorForm(this.document);
      Vue.set(this, 'formDef', form);
    }    
  }

  constructor() {
    super();
  }

  public contentLoaded() {
    if (!this.isrd) { return; }
    this.document = this.isrd.activeDocument;
    this.updateForm();
    this.$forceUpdate();    
    this.busManager.subscribe(this.isrd!.bus, 'document', (a: string, d:any) => {
        // alert('document loaded');
        this.document = d;   
        console.log('init report');
        console.log(this.document);
        this.updateForm();
        // this.updateContent();
        this.$forceUpdate();
    })
    if (this.widget.options) {
      
      // let selectionSizePlugin = new Plugin({
      //   view(editorView) {
      //     return new SelectionSizeTooltip(editorView);
      //   }
      // });
    }
  }

  mounted() {
    if (this.isrd?.activeDocument) { 
      
      this.contentLoaded();
       }
    // this.updateForm();
  }
}
</script>
