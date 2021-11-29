<template>
  <div v-if="activePreset && rule">
    <v-layout>
      <span class="rule-legend" :style="getRuleStyle(rule)"></span>
      <span class="rule-type">{{ rule._featureType.title }}</span
      >
      <v-btn @click="addElement(rule)"><v-icon>mdi-add</v-icon></v-btn>
      <v-spacer /><v-btn icon @click="toggleRule(rule)">
        <v-icon v-if="rule.disabled === true">visibility_off</v-icon><v-icon v-else>visibility</v-icon></v-btn
      >
    </v-layout>
  </div>
</template>

<style scoped>
.rule-type {
  font-size: 22px;
}

.rule-legend {
  border-radius: 5px;
  width: 25px;
  height: 25px;
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import Vue from 'vue';
import { FeatureType, GraphElement, GraphPreset, IGraphFilter, NodeRule } from '@csnext/cs-data';

@Component({
  components: {}
})
export default class GraphRuleEditor extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public activePreset!: GraphPreset;

  @Prop()
  public rule!: any;

  public getRuleStyle(rule: NodeRule) : any { 
    return { 
      'background-color' : rule._featureType?.color ?? 'gray'
    }
  }

  public async addElement(rule: NodeRule) {
    if (rule._featureType) {
      const element = await this.source.createEntity(rule._featureType, true);    
    }
  }

  public toggleRule(rule: NodeRule) {
    rule.disabled = !rule.disabled;
    this.$forceUpdate();
    this.source.events.publish(IGraphFilter.GRAPH_FILTER, IGraphFilter.RULES_CHANGED, rule);
  }

  public updateTypes() {
    if (!this.source?.featureTypes || !this.source.graph) {
      return;
    }
  }

  mounted() {}

  constructor() {
    super();
  }
}
</script>
