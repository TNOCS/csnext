<template>
  <div v-if="activePreset && rule">
    <v-layout>
      <span class="rule-type">{{ rule._featureType.title }}</span
      ><v-spacer /><v-btn icon @click="toggleRule(rule)">
        <v-icon v-if="rule.disabled === true">visibility_off</v-icon><v-icon v-else>visibility</v-icon></v-btn
      >
    </v-layout>
  </div>
</template>

<style scoped>
.rule-type {
  font-size: 22px;
}
</style>>

</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import Vue from 'vue';
import { GraphPreset, IGraphFilter, NodeRule } from '@csnext/cs-data';

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
