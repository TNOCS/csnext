<template>
  <v-container v-if="settings && source">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-slider v-model="settings.nodeStrength" min=0 max=2000></v-slider>
          
          {{ settings.nodeSize}}
          <v-slider v-model="settings.nodeSize" min=0 max=200></v-slider>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <h3>{{$cs.Translate('NODES')}}</h3>
          <template v-for="(el, key, index) in source.typeStats"
            >
          
          <v-checkbox
            :color="getColor(el)"
            :key="index"
            v-if="el.elementCount > 0 "
            :label="`${el.type.title} - ${el.elementCount}`"            
            @change="filterChanged"
            hide-details>
          </v-checkbox>
          </template>
          <!-- <div v-for="(el, key, index) in source.featureTypes"
            :key="index">
            {{index}} - {{ el.title }}
          </div> -->
        </v-col>
        <v-col>
          <h3>{{$cs.Translate('EDGES')}}</h3>
          <v-checkbox
            :color="getColor(el)"
            v-for="(el, key) in source.availableEdgeTypes"
            :key="key"
            :label="el.key"
            v-model="el._visible"
            @change="filterChanged"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
      <!-- <v-switch v-model="settings.showDataModel" inset dense label="Data model tonen"></v-switch>     -->
    <!-- <v-switch v-model="settings.showInstance" inset dense label="Instances tonen"></v-switch>    
    <v-switch v-model="settings.showExternal" inset dense label="Externe links"></v-switch>
    <v-switch v-model="settings.autoFocus" inset dense label="Auto focus"></v-switch>
    <v-switch v-model="settings.showReliability" inset dense label="Toon betrouwbaarheid"></v-switch>
    <v-switch v-model="settings.filterTimeline" inset dense label="Tijdlijn filter"></v-switch>
    <v-switch v-model="settings.showAllOnMap" @change="source.updateLayer()" inset dense label="Show all on map"></v-switch> -->
    <!-- <v-switch v-model="settings.filterStep" inset dense label="Filter active step"></v-switch>
    
    <v-switch v-model="settings.showAllOnTimeline" inset dense label="Show all on timeline"></v-switch> -->
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphElement, GraphSettings, GraphDatasource } from "@csnext/cs-data";
import { DocDatasource } from "../../datasources/doc-datasource";

@Component({
  components: {}
})
export default class GraphSettingsWidget extends WidgetBase {
  public get source(): GraphDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  

  public getVisible(el: GraphElement) {
    return !el._hidden
  }

  public getColor(el: GraphElement): string {
    return GraphElement.getBackgroundColor(el);
  }

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) { return; }    
    
    // for (const element in ) {
      

      
    // }
  }

  

  public filterChanged() {
    this.source!.bus.publish("filter", "changed");
  }

  public get settings(): GraphSettings | undefined {
    if (this.source) {
      return this.source.graphSettings;
    }
    return new GraphSettings();
  }

  constructor() {
    super();
  }
}
</script>
