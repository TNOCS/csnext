<template>
  <div style="height: 100%; padding: 5px" v-if="source">
    <v-data-table :headers="headers" :search="search" :items="source.searchEntities" item-key="id" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{$cs.Translate('ENTITIES')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            style="margin-right: 10px"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn @click="addEntity()">
            <v-icon>add</v-icon>{{$cs.Translate('ADD_ENTITY')}}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.private="{ item }">
        <v-simple-checkbox v-model="item.private"></v-simple-checkbox>
      </template>
      <template v-slot:item.aka="{ item }">
        <v-chip v-for="a in item.aka" :key="a" style="margin-right:5px">{{a}}</v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
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
        @click="deleteEntity(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </div>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";

import simplebar from "simplebar-vue";
import { TextEntity } from "@csnext/cs-data";
import { SearchEntity } from "../../classes/document/search-entity";

@Component({
  components: { simplebar }
})
export default class SourceManagement extends WidgetBase {
  public search = "";
  public headers = [
    {
      text: "id",
      align: "start",
      sortable: true,
      value: "id"
    },
    { text: "entity", value: "entity" },
    { text: "class", value: "ent_class" },
    { text: "source", value: "kb_source"},
    { text: "alternatives", value: "aka" },
    { text: "private", value: "private"},    
    { text: "Actions", value: "actions", sortable: false }
  ];

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public addEntity() {
    const newEntity = { id: 'new entity', entity: 'new entity', ent_class: 'WEAPONS', aka: []};
    this.source?.searchEntities?.push(newEntity)
    this.source?.openEntityEditor(newEntity);
  }

  public editEntity(entity: SearchEntity) {
    console.log(entity);
    this.source?.openEntityEditor(entity);
  }

  public deleteEntity(entity: SearchEntity) {
    alert('delete');
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
