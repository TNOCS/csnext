<template>
  <div class="element-card">
    <template v-if="element._featureType && element._featureType.icon">
      <v-icon :color="element._featureType.color" class="element-icon">{{ element._featureType.icon }}</v-icon>
    </template>
    <!-- <img class="element-icon" v-if="element._featureType.icon" :src="element._featureType.icon" /> -->
    <!-- {{ element._featureType.infoPanels.popup}} -->
    <div class="element-card-content">
      <div class="element-title">{{ element.properties.name }}</div>
      <div class="element-type">{{ element._featureType.title }}</div>
      <div class="element-description">{{ element.properties.description }}</div>
    </div>
  </div>
</template>
<style scoped>
.element-card {
  padding: 5px;
  display: grid;
  grid-template-columns: 40px 1fr; /* padding: 4px; */
}
.element-card-content {
  height: 100%;
  grid-column: 2;
  /* float: left; */
}

.element-icon {
  margin: 5px;
  max-width: 50px;
  align-items: start;

  grid-column: 1;
}

.element-description {
  margin-top: 5px;
}

.element-title {
  font-size: 26px;
  font-weight: 600;
}

.element-type {
  font-size: 14px;
  margin-top: -4px;
}
</style>
<script lang="ts">
import { GraphElement } from '@csnext/cs-data';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../../..';

@Component({
  name: 'default-element-card',
  components: {},
})
export default class DefaultElementCard extends Vue {
  @Prop()
  public source?: DocDatasource;

  @Prop({ default: null })
  public element!: GraphElement | null;

  public getCardBackgroundImage() {
    if (this.element?._featureType?.attributes?.cardImageProperty && this.element.properties && this.element.properties.hasOwnProperty(this.element._featureType.attributes.cardImageProperty)) {
      return this.element.properties[this.element._featureType.attributes.cardImageProperty];
    }

  }

}
</script>
