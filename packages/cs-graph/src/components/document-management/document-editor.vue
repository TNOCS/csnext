<template>
    <!-- <h1>Document Editor</h1> -->
  <simplebar style="height: 100%; padding: 5px" v-if="source && source.activeDocument">
    <cs-form :data="source.activeDocument" :formdef="formDef" class="pt-2" id="detailcsform" @saved="updateDocument"></cs-form>
    <!-- <h3>Notes</h3> -->
    <v-layout>
      </v-layout>
    <h3>Entities</h3>
    <v-container class="elevation-0"><v-row><v-col cols="2" v-for="(element, indx) in approvedElements()" :key="indx">
      <v-card :style="{'border-color': getEntityColor(element)}"  @click="openEntity(element)" class="entity-card">
        <!-- <div class="overline card-class-title">{{element.class._title}}</div> -->
        <node-link class="entity-link" :source="source" :node="element" >{{element.properties.name}}</node-link>
        
        </v-card>
        </v-col></v-row></v-container>
    <h3>Observations</h3>
    <v-container class="elevation-0"><v-row><v-col cols="2" v-for="(element, indx) in approvedObservations()" :key="indx">
      <v-card :style="{'border-color': getEntityColor(element)}" @click="openEntity(element)" class="entity-card">        
        <node-link class="entity-link" :source="source" :node="element" >{{element.properties.name}}</node-link></v-card></v-col></v-row></v-container>
    <!-- <v-layout><node-link class="entity-link" v-for="(element, indx) in approvedObservations()" :source="source" :node="element" :key="indx">{{element._title}}</node-link></v-layout> -->
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
import { IFormObject} from '@csnext/cs-core';

import simplebar from "simplebar-vue";
import { GraphDocument } from "../../classes/document/graph-document";
import { NodeLink } from "@csnext/cs-map"
import { GraphElement } from '@csnext/cs-data';

@Component({
  components: { simplebar, NodeLink }
})
export default class DocumentEditor extends WidgetBase {

  public openEntity(entity: GraphElement) {
    if (this.source) {
      this.source.selectElement(entity);
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
    
    if (!this.source || !this.document) { return; }    
    // if (this.document.sourceId && (!this.document._source || this.document._source.id !== this.document.sourceId)) {
    //   // remove existing link
      


    //   // source changed
    //   // alert('source changed');
    // }

    
    
    this.source.saveDocument(this.document);

  }  

  public approvedObservations() {
    if (!this.source || !this.source.activeDocument?._node?._outgoing) { return; }
    return this.source.activeDocument._node._outgoing.filter(o => o.classId === 'CONTAINS_OBSERVATION' && o.to).map(o => o.to);
  }

  public approvedElements() {
    if (!this.source || !this.source.activeDocument?._node?._outgoing) { return; }
    return this.source.activeDocument._node._outgoing.filter(o => o.classId === 'CONTAINS' && o.to).map(o => o.to);
  }

   public get formDef(): IFormObject {
        return {                
            showToolbar: false,
            hideTitle: true,
            isPanel: false,
            fields: [
               {
                title: 'ID',
                _key: 'id',
                type: 'string',
                readonly: true                
              },
              {
                title: 'NAME',
                _key: 'properties.name',
                type: 'string'                
              },             
              {
                title: 'NOTE',
                _key: 'note',
                type: 'textarea'                
              },
              // {
              //   title: 'SOURCE',
              //   _key: 'sourceId',
              //   type: 'combobox-objects',
              //   keyText: 'title',
              //   keyValue: 'id',
              //   options: this.source!.sources             
              // },
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
        } as IFormObject;
   }

  public document?: GraphDocument | null = null;

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
    if (this.widget?.data) {
      return this.widget.data.source as DocDatasource;
    }
  }

  constructor() {
    super();
  }

  public contentLoaded() {
    this.$forceUpdate();
    this.busManager.subscribe(this.source!.bus, 'document', (a: string, d:any) => {
        // alert('document loaded');
        this.document = d;      
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

  mounted() {}
}
</script>
