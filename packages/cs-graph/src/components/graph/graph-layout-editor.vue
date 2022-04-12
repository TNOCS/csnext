<template>
  <div v-if="preset">
    <cs-form :data="preset.properties.graphLayout" :formdef="graphFormDef" class="pt-2 pa-3" @saved="updatePreset"></cs-form>
  </div>
    
</template>

<style scoped>

</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { CsToolbarMenus } from "@csnext/cs-client";
import GraphRuleFilter from "./graph-rule-filter.vue";
import GraphRuleEditor from "./graph-rule-editor.vue";
import { DocDatasource } from "../../";
import { GraphDatasource, GraphLayout, GraphPreset } from "@csnext/cs-data";
import { IFormObject } from "@csnext/cs-core";

@Component({
  components: { CsToolbarMenus, GraphRuleFilter, GraphRuleEditor },
})
export default class GraphLayoutEditor extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public preset!: GraphPreset;

  public updatePreset() {
    if (!this.source?.events || !this.preset) {
      return;
    }
    this.source.events.publish(GraphDatasource.PRESET_EVENTS, GraphDatasource.PRESET_LAYOUT_CHANGED, this.preset);
  }

    public get graphFormDef(): IFormObject {
    const isLayout = (config: GraphLayout, layout: string | string[]) => {
      if (typeof layout === 'string') {
        return config.layout && config.layout === layout;
      }

      return config.layout && layout.includes(config.layout);
    };

    return {
      hideTitle: true,
      isPanel: false,

      fields: [
        {
          title: 'LAYOUT',
          _key: 'layout',
          type: 'selection',
          icon: 'mdi-graph-outline',
          readonly: false,
          options: ['manual', 'circular', 'radial', 'concentric', 'grid', 'mds', 'fruchterman', 'force', 'forceAtlas2', 'gForce', 'dagre'],
        },
        {
          title: 'PINNED_TYPES',
          _key: 'pinnedFeatureTypes',
          type: 'selection',
          array: true,
          icon: 'mdi-pin',
          multiple: true,
          readonly: false,
          options: (this.source?.featureTypes) ? Object.keys(this.source.featureTypes) : []
        },
        {
          title: 'ANIMATE',
          _key: 'animate',
          icon: 'mdi-animation',
          type: 'checkbox'
        },
          {
          title: 'FIT_VIEW',
          _key: 'fitAll',
          type: 'checkbox',
          icon: 'mdi-fit-to-screen'
        },
        {
          title: 'NODE_SIZE',
          _key: 'nodeSize',
          type: 'slider',
          icon: 'mdi-arrow-top-right-thin-circle-outline',
          min: 10,
          max: 300,
        },
        {
          title: 'GRAVITY',
          _key: 'gravity',
          type: 'slider',
          icon: 'mdi-earth',
          min: 0,
          max: 10,
          step: 0.1,
          requirements: [(v: GraphLayout) => isLayout(v, 'fruchterman')],
        },
        {
          title: 'SPEED',
          _key: 'speed',
          type: 'slider',
          icon: 'mdi-speedometer',
          min: 0,
          max: 50,
          step: 0.1,
          requirements: [(v: GraphLayout) => isLayout(v, ['fruchterman', 'force'])],
        },
        {
          title: 'CLUSTERING',
          _key: 'clustering',
          icon: 'mdi-select-group',
          type: 'checkbox',
          requirements: [(v: GraphLayout) => isLayout(v, ['fruchterman', 'froce'])],
        },
        {
          title: 'CLUSTER_GRAVITY',
          _key: 'clusterGravity',
          type: 'slider',
          icon: 'mdi-earth',
          min: 0,
          max: 20,
          step: 0.1,
          requirements: [(v: GraphLayout) => isLayout(v, 'fruchterman'), (v: GraphLayout) => v.clustering],
        },
        {
          title: 'DIRECTION',
          icon: 'mdi-arrow-right',
          _key: 'rankdir',
          type: 'selection',        
          options: ['TB', 'BT', 'LR', 'RL'],
          requirements: [(v: GraphLayout) => isLayout(v, 'dagre')],
        },
        {
          title: 'ALIGN',
          _key: 'align',
          icon: 'mdi-align-horizontal-center',
          type: 'selection',
          options: ['UL', 'UR', 'DL', 'DR'],
          requirements: [(v: GraphLayout) => isLayout(v, 'dagre')],
        },
        {
          title: 'COLLIDE_STRENGTH',
          _key: 'colideStrength',
          type: 'slider',
          min: 0,
          max: 0.5,
          step: 0.1,
          default: 0.1,
          requirements: [(v: GraphLayout) => isLayout(v, ['force'])],
        },
        {
          title: 'EDGE_STRENGTH',
          _key: 'edgeStrength',
          type: 'slider',
          min: 0,
          max: 1000,
          step: 10,
          default: 200,
          requirements: [(v: GraphLayout) => isLayout(v, ['gForce'])],
        },
        {
          title: 'NODE_STRENGTH',
          _key: 'nodeStrength',
          type: 'slider',
          min: 1,
          max: 5000,
          default: 150,
          requirements: [(v: GraphLayout) => isLayout(v, ['gForce', 'force'])],
        },
        {
          title: 'LINK_DISTANCE',
          _key: 'linkDistance',
          type: 'slider',
          min: 1,
          default: 150,
          max: 500,
          requirements: [(v: GraphLayout) => isLayout(v, ['radial', 'mds', 'gForce', 'force'])],
        },
        {
          title: 'UNIT_RADIUS',
          _key: 'unitRadius',
          type: 'slider',
          min: 10,
          max: 300,
          requirements: [(v: GraphLayout) => isLayout(v, 'radial')],
        },
        {
          title: 'Repulsive parameter',
          _key: 'kr',
          type: 'slider',
          min: 0,
          max: 10,
          default: 5,
          requirements: [(v: GraphLayout) => isLayout(v, 'forceAtlas2')],
        },
        {
          title: 'MAX_ITERATION',
          _key: 'maxIteration',
          type: 'slider',
          min: 0,
          max: 10000,
          default: 500,
          requirements: [(v: GraphLayout) => isLayout(v, 'gForce')],
        },
        {
          title: 'Gravity parameter',
          _key: 'kg',
          type: 'slider',
          min: 0,
          max: 10,
          default: 5,
          requirements: [(v: GraphLayout) => isLayout(v, 'forceAtlas2')],
        },
        {
          title: 'RADIUS',
          _key: 'radius',
          type: 'slider',
          min: 10,
          max: 1000,
          requirements: [(v: GraphLayout) => isLayout(v, 'circular')],
        },
        {
          title: 'FONT_SIZE',
          _key: 'globalFontSize',
          icon: 'mdi-format-size',
          type: 'slider',
          min: 8,
          max: 24,
          default: 12,
        },
        {
          title: 'HIDE_NODE_LABEL',
          _key: 'hideNodeLabel',
          type: 'checkbox',
        },
        {
          title: 'HIDE_EDGE_LABEL',
          _key: 'hideEdgeLabel',
          type: 'checkbox',
        },
        {
          title: 'DISABLED_CUSTOM_NODES',
          _key: 'disableCustomNodes',
          type: 'checkbox'
        }
      ],
    } as IFormObject;
  }

  public mounted() {}

 

}
</script>
