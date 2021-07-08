<template>
  <simplebar class="full-page" v-if="source">
    <v-data-table :headers="headers" sort-by="count" sort-desc show-group-by :search="search" :disable-pagination="true" :items="Object.values(source.featureTypes)" item-key="type" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{$cs.Translate('FEATURE_TYPES')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            style="margin-right: 10px"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
           <v-btn @click="addType()">
            <v-icon>add</v-icon>
            <!-- {{$cs.Translate('ADD_TYPE')}} -->
          </v-btn>
          
        </v-toolbar>
        
      </template>   
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editEntity(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="addEntity(item)"
      >
        add
      </v-icon>
      </template>  
    </v-data-table>
  </simplebar>
</template>

<style>
.full-page {
  position:absolute;left:0;top:0;right:0;bottom:0
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";

import simplebar from "simplebar-vue";
import { SearchEntity } from "../../classes/document/search-entity";
import { FeatureType } from "@csnext/cs-data";

@Component({
  components: { simplebar }
})
export default class ClassOverview extends WidgetBase {
  public search = "";
  public headers = [
    
    { text: 'title', value: 'title', groupable: false},
    // { text: "type", value: "properties" },
    // { text: "count", value: "count", groupable: false },
    // { text: "properties", value: "properties.length", groupable: false },
    // { text: "relations", value: "relations.length", groupable: false },
    { text: "Actions", value: "actions", groupable: false, sortable: false }
  ];

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public addEntity(type: FeatureType) {
    this.source?.addNewNode(
      { id: 'new entity', classId: type.type}).then(e => {
        this.source?.startEditElement(e);
      }).catch(e => {
        alert('error creating entity')
      })    
  }

  public editEntity(type: FeatureType) {    
    this.source?.openFeatureTypeEditor(type);
  }

  public deleteEntity(entity: SearchEntity) {
    alert('delete');
  }

  public addType() {
    $cs.triggerInputDialog('NEW_TYPE','TYPE_ID').then(v => {
      if (v && this.source?.featureTypes && !this.source?.featureTypes?.hasOwnProperty(v)) {
        let newType = {
          type: v,
          title: v,
          properties: [],
          baseType: ['node']
        } as FeatureType;
        this.source.featureTypes[v] = newType;
        this.source.saveFeatureType(newType);
      }
      
      // alert('add type');

    }).catch(e => {

    });
    
  }

  constructor() {
    super();
  }

  public contentLoaded() {
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
