<template>
  <v-container v-if="preset && graphPlugin" class="routing-container">      
      <v-layout>
        <v-autocomplete
          clearable
          v-model="graphPlugin.followNode"
          class="routeNode"
          :items="preset._visibleNodes"
          item-text="properties.name"
          item-value="id"
          label="From"
          return-object
          @change="graphPlugin.calculateRoutes()"
        ></v-autocomplete>
        <v-icon class="ma-3">mdi-arrow-right</v-icon>
        <v-autocomplete
          clearable
          v-model="graphPlugin.targetNode"
          class="routeNode"
          :items="preset._visibleNodes"
          item-text="properties.name"
          item-value="id"
          label="To"
          return-object
          @change="graphPlugin.calculateRoutes()"
        ></v-autocomplete>
      </v-layout>
  </v-container>
    
</template>

<style scoped>

.routing-container {
    margin-right: 20px;
    margin-left: 20px;
}

</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { CsToolbarMenus } from "@csnext/cs-client";
import { DocDatasource } from "./../../../..";
import { GraphPreset } from "@csnext/cs-data";
import NetworkGraph from "./../../graph.vue";
import { GraphRoutingPlugin } from "./graph-routing-plugin";

@Component({
  components: { CsToolbarMenus },
})
export default class GraphRules extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public preset!: GraphPreset;

  @Prop()
  public graphComponent!: NetworkGraph;

  @Prop()
  public graphPlugin?: GraphRoutingPlugin;


  

  public mounted() {
      
    
  }

}
</script>
