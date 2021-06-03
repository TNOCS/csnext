<template>
<v-container v-if="isrd !== null && document!==null">
    <h1><cs-label label="NEW_REPORT"></cs-label> - {{ document._featureType.title }} </h1>
  <simplebar style="height: 100%; padding: 5px" >
    <cs-form :data="document.properties" :formdef="formDef" class="pt-2" id="detailcsform" @saved="updateDocument"></cs-form>
     
  </simplebar>
</v-container>
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
import { Component } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import { guidGenerator, IFormObject, IFormOptions} from '@csnext/cs-core';

import simplebar from "simplebar-vue";

import { IntelDocument } from "../../classes/document/intel-document";
import { FeatureType } from "@csnext/cs-data";


@Component({
  components: { simplebar }
})
export default class NewDocument extends WidgetBase {

 public document?: IntelDocument | null = null;

 public isrd?: DocDatasource | null = null;


  public updateDocument() {
    
    if (!this.isrd || !this.document) { return; }    
    if (this.document.sourceId && (!this.document._source || this.document._source.id !== this.document.sourceId)) {
      // remove existing link
      


      // source changed
      // alert('source changed');
    }

    
    
    this.isrd.saveDocument(this.document);

  }  

  

   public get formDef(): IFormOptions {
      if (!this.isrd || !this.document) { return {}; }
      return this.isrd.elementEditorForm(this.document);

   }

 

  constructor() {
    super();
  }

  public contentLoaded(d: DocDatasource) {
    this.isrd = d;
    console.log('content loaded');
    console.log(d);
    this.initDocument();
  }

  public initDocument(): Promise<IntelDocument> {
    return new Promise((resolve, reject) => {

    

    if (!this.isrd) { reject(); return; }
    const document_type = this.widget.data?.document_type ?? 'input';
        
    if (!this.document) {
      // find featuretype
      const type = this.isrd.findObservation(document_type);
      console.log(type);
      this.document = new IntelDocument({        
        type: 'node',
        _featureType: type,
        classId: document_type,
        properties: {
          name: 'new document',
          type: document_type,
          classId: document_type
        }
      })
      this.isrd.addNode(this.document);
      return this.isrd.saveDocument(this.document);      
    }
    })
  }

  mounted() {
    
    

    
  }
}
</script>
