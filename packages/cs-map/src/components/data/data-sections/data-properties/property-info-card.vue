<template>
  <v-card v-if="property">
    <v-card-title>
      {{ property.label }}
    </v-card-title>
    <v-card-subtitle>{{ property.type }}</v-card-subtitle>
    <v-card-text>
      {{ property.description }}
    </v-card-text>
  </v-card>
</template>

<style></style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { GraphDatasource, GraphElement } from '@csnext/cs-data';
import { PropertyType } from '@csnext/cs-data';

// import IndicatorEditor from "../indicator/indicator-editor.vue";

@Component({
  components: {},
})
export default class PropertyInfoCard extends WidgetBase {
  @Prop()
  public feature!: GraphElement;

  @Prop()
  public source!: GraphDatasource;

  @Prop()
  public property!: PropertyType;
}
</script>
