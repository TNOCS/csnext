<template>
  <div v-if="activePreset">
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>{{ activePreset.title }} </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="refresh()">
        <v-icon>refresh</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" class="elevation-2">
          <v-tab href="#tab-RULES">{{ $cs.Translate('RULES') }}</v-tab>
          <v-tab href="#tab-LAYOUT">{{ $cs.Translate('LAYOUT') }}</v-tab>

          <!-- <v-tab href="#tab-facts">{{ $cs.Translate('FACTS') }}</v-tab> -->
          <!-- <v-tab href="#tab-instances">{{ $cs.Translate('INSTANCES') }}</v-tab> -->
          <!-- <v-tab href="#tab-documents">{{ $cs.Translate('DOCUMENTS') }}</v-tab> -->
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" style="margin-bottom: 200px">
      <v-tab-item value="tab-RULES">
        <v-container fluid v-if="activePreset.nodeRules">
          Rules
          <graph-rule-editor
            v-for="(rule, i) in activePreset.nodeRules"
            :key="i"
            :source="source"
            :activePreset="activePreset"
            :rule="rule"
          ></graph-rule-editor>
        </v-container>
      </v-tab-item>
      <v-tab-item value="tab-LAYOUT">
        <v-container fluid>
          <v-row>
            <v-col>
              <cs-form
                :data="activePreset"
                :formdef="formDef"
                class="pt-2 pa-3"
                @saved="updateGraph"
              ></cs-form>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { GraphElement, GraphPreset, GraphDatasource } from '@csnext/cs-data';
import { DocDatasource } from '../..';
import { IFormObject } from '@csnext/cs-core';
import Vue from 'vue';
import GraphRuleEditor from './graph-rule-editor.vue';

@Component({
  components: { GraphRuleEditor }
})
export default class GraphSettings extends WidgetBase {
  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public tab = 'RULES';
  public activePreset?: GraphPreset | null = null;

  public addPreset() {
    $cs
      .triggerInputDialog('GRAPH_PRESET', 'GRAPH_PRESET_TITLE', 'preset')
      .then((r) => {
        if (!this.source) {
          return;
        }
        this.source.addGraphPreset({ ...new GraphPreset(this.source), ...{ title: r } }, true);
      })
      .catch((e) => {});
  }

  public updateGraph() {
    console.log('update graph');
    if (!this.source?.events || !this.activePreset) {
      return;
    }
    this.source.events.publish(
      GraphDatasource.PRESET_EVENTS,
      GraphDatasource.PRESET_CHANGED,
      this.activePreset
    );
  }

  public applyPreset(preset: GraphPreset) {
    if (!this.source) {
      return;
    }
    this.source.applyGraphPreset(preset);
    this.$forceUpdate();
  }

  public savePreset() {
    if (!this.source?.graphPresets) {
      return;
    }
    this.source.saveGraphPresets();
  }

  public refresh() {
    if (this.activePreset) {
      this.applyPreset(this.activePreset);
    }
  }

  public getVisible(el: GraphElement) {
    return !el._hidden;
  }

  public getColor(el: GraphElement): string {
    return GraphElement.getBackgroundColor(el);
  }

  public get formDef(): IFormObject {
    const isLayout = (config: GraphPreset, layout: string | string[]) => {
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
          readonly: false,
          options: [
            'circular',
            'radial',
            'concentric',
            'grid',
            'mds',
            'fruchterman',
            'force',
            'forceAtlas2',
            'gForce',
            'dagre'
          ]
        },
        {
          title: 'ANIMATE',
          _key: 'animate',
          type: 'checkbox'
        },
        {
          title: 'NODE_SIZE',
          _key: 'nodeSize',
          type: 'slider',
          min: 10,
          max: 300
        },
        {
          title: 'GRAVITY',
          _key: 'gravity',
          type: 'slider',
          min: 0,
          max: 10,
          step: 0.1,
          requirements: [(v: GraphPreset) => isLayout(v, 'fruchterman')]
        },
        {
          title: 'SPEED',
          _key: 'speed',
          type: 'slider',
          min: 0,
          max: 10,
          step: 0.1,
          requirements: [(v: GraphPreset) => isLayout(v, 'fruchterman')]
        },
        {
          title: 'CLUSTERING',
          _key: 'clustering',
          type: 'checkbox',
          requirements: [(v: GraphPreset) => isLayout(v, 'fruchterman')]
        },
        {
          title: 'CLUSTER_GRAVITY',
          _key: 'clusterGravity',
          type: 'slider',
          min: 0,
          max: 20,
          step: 0.1,
          requirements: [(v: GraphPreset) => isLayout(v, 'fruchterman'), (v: GraphPreset) => v.clustering]
        },
        {
          title: 'DIRECTION',
          _key: 'rankdir',
          type: 'selection',
          options: ['TB', 'BT', 'LR', 'RL'],
          requirements: [(v: GraphPreset) => isLayout(v, 'dagre')]
        },
        {
          title: 'ALIGN',
          _key: 'align',
          type: 'selection',
          options: ['UL', 'UR', 'DL', 'DR'],
          requirements: [(v: GraphPreset) => isLayout(v, 'dagre')]
        },

        {
          title: 'EDGE_STRENGTH',
          _key: 'edgeStrength',
          type: 'slider',
          min: 0,
          max: 1000,
          step: 10,
          default: 200,
          requirements: [(v: GraphPreset) => isLayout(v, ['gForce'])]
        },
        {
          title: 'NODE_STRENGTH',
          _key: 'nodeStrength',
          type: 'slider',
          min: 1,
          max: 5000,
          default: 1000,
          requirements: [(v: GraphPreset) => isLayout(v, ['gForce'])]
        },
        {
          title: 'LINK_DISTANCE',
          _key: 'linkDistance',
          type: 'slider',
          min: 1,
          max: 500,
          requirements: [(v: GraphPreset) => isLayout(v, ['radial', 'mds', 'gForce'])]
        },
        {
          title: 'UNIT_RADIUS',
          _key: 'unitRadius',
          type: 'slider',
          min: 10,
          max: 300,
          requirements: [(v: GraphPreset) => isLayout(v, 'radial')]
        },
        {
          title: 'Repulsive parameter',
          _key: 'kr',
          type: 'slider',
          min: 0,
          max: 10,
          default: 5,
          requirements: [(v: GraphPreset) => isLayout(v, 'forceAtlas2')]
        },
        {
          title: 'MAX_ITERATION',
          _key: 'maxIteration',
          type: 'slider',
          min: 0,
          max: 10000,
          default: 500,
          requirements: [(v: GraphPreset) => isLayout(v, 'gForce')]
        },
        {
          title: 'Gravity parameter',
          _key: 'kg',
          type: 'slider',
          min: 0,
          max: 10,
          default: 5,
          requirements: [(v: GraphPreset) => isLayout(v, 'forceAtlas2')]
        },
        {
          title: 'RADIUS',
          _key: 'radius',
          type: 'slider',
          min: 10,
          max: 1000,
          requirements: [(v: GraphPreset) => isLayout(v, 'circular')]
        },
        {
          title: 'FONT_SIZE',
          _key: 'globalFontSize',
          type: 'slider',
          min: 8,
          max: 24,
          default: 12
        },
        {
          title: 'HIDE_NODE_LABEL',
          _key: 'hideNodeLabel',
          type: 'checkbox'
        },
        {
          title: 'HIDE_EDGE_LABEL',
          _key: 'hideEdgeLabel',
          type: 'checkbox'
        }
      ]
    } as IFormObject;
  }

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) {
      return;
    }

    // for (const element in ) {

    // }
  }

  public contentLoaded() {
    if (!this.source || !this.widget?.data?.preset) {
      return;
    }
    Vue.set(this, 'activePreset', this.source.getGraphPreset(this.widget.data.preset));

    if (!this.activePreset) {
      return;
    }
  }

  mounted() {
    this.contentLoaded();
  }

  public filterChanged() {
    this.source!.bus.publish('filter', 'changed');
  }

  constructor() {
    super();
  }
}
</script>
