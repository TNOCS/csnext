<template>
  <v-container v-if="preset && graphPlugin" class="routing-container">      
      <v-chip
        class="mr-2"                
                v-for="(stats, tag, id) of preset._tags"
                :key="id"
                label
                @click="toggleTag(tag)"
                :outlined="stats.hide"                               
              >                
                {{ tag }}
                <v-avatar right dark class="darken-4">
                  {{ stats.count }}
                </v-avatar>
              </v-chip>
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
import { DocDatasource } from "../../../../";
import { GraphPreset } from "@csnext/cs-data";
import NetworkGraph from "../../graph.vue";
import { GraphTagsPlugin } from "./graph-tags-plugin";

@Component({
  components: {  },
})
export default class GraphTags extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public preset!: GraphPreset;

  @Prop()
  public graphComponent!: NetworkGraph;

  @Prop()
  public graphPlugin?: GraphTagsPlugin;


  public toggleTag(tag: string) {
    if (!this.preset.properties?.graphLayout) {
      return;
    }
    if (!this.preset.properties?.graphLayout.hiddenTags) {
      this.preset.properties.graphLayout.hiddenTags = [];
    }
    if (this.preset.properties.graphLayout.hiddenTags.includes(tag)) {
      this.preset.properties.graphLayout.hiddenTags.splice(
        this.preset.properties.graphLayout.hiddenTags.indexOf(tag),
        1
      );
    } else {
      this.preset.properties.graphLayout.hiddenTags.push(tag);
    }    
    this.$forceUpdate();
    if (this.graphComponent) {
      this.graphComponent.updateGraph();
    }
  }
  

  public mounted() {
      
    
  }

}
</script>
