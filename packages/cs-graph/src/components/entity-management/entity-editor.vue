<template>
  <div style="height: 100%; padding: 5px" v-if="source">
    <h1>Entity Editor</h1>
    <cs-form :data="entity" :formdef="formDef" class="pt-2" id="detailcsform" @saved="updateEntity(entity)"></cs-form>
  </div>
</template>

<style>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import { IFormObject} from '@csnext/cs-core';

import simplebar from "simplebar-vue";
import { SearchEntity } from "../../classes/document/search-entity";

@Component({
  components: { simplebar }
})
export default class EntityEditor extends WidgetBase {

  public updateEntity(entity: SearchEntity) {
    console.log(this.updateEntity);
    // this.source?.
  }


   public get formDef(): IFormObject {
        return {                
            showToolbar: false,
            hideTitle: true,
            isPanel: false,
            fields: [
              {
                title: 'TITLE',
                _key: 'entity',
                type: 'string'                
              },
              {
                title: 'ID',
                _key: 'id',
                type: 'string'                
              },
              {
                title: 'CLASS',
                _key: 'ent_class',
                type: 'string'                
              },
              {
                title: 'PRIVATE',
                _key: 'private',
                type: 'checkbox'                
              },
              {
                title: 'ALTERNATIVES',
                _key: 'aka',
                type: 'chips'                
              }              
            ]            
        } as IFormObject;
   }

  public get entity(): SearchEntity | undefined {
    if (this.widget?.data) {
      return this.widget.data.entity as SearchEntity;
    }
  }

  public get source(): DocDatasource | undefined {
    if (this.widget?.data) {
      return this.widget.data.source as DocDatasource;
    }
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
