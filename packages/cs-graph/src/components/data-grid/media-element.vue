<template>
  <div v-if="getType() === 'image'" class="media-element grey lighten-2">
  <v-img 
    :src="element.properties[gridOptions.imageProperty]"
    :lazy-src="element.properties[gridOptions.imagePreviewProperty]"
    aspect-ratio="1"
    
  >
  </v-img>
  <v-btn @click.stop="openDetails()" class="media-details" fab elevation="0" x-small><v-icon>mdi-image</v-icon></v-btn>
  </div>
  <div v-else class="media-element">
  
    <v-btn @click.stop="openDetails()" class="media-details" fab elevation="0" x-small><v-icon>mdi-video</v-icon></v-btn>
  
  </div>
    
</template>

<style lang="css" scoped>

.media-element {
  position: relative;  
  min-height: 125px;
  height: 100%;
}

.media-details {
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 10;
}
.video-placeholder {
    background-color: #fff;
}
</style>
<script lang="ts">
import { GraphElement } from '@csnext/cs-data';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { DocDatasource } from '../..';
import { DataGridGridOptions } from './data-grid-options';

@Component({
  name: 'media-element',
})
export default class MediaElement extends Vue {
  @Prop()
  public source!: DocDatasource;

  @Prop()
  public element!: GraphElement;

  @Prop()
  public gridOptions!: DataGridGridOptions;

  public openDetails() {
    if (!this.source) {}
    this.source.selectElement(this.element, true);    
  }

  public getType(): 'image' | 'video' {
    if (!this.gridOptions.contentTypeProperty || !this.element.properties) {
      return 'image';
    }
    const type = this.element.properties[this.gridOptions.contentTypeProperty];
    if (type.startsWith('video')) {
        return 'video';
    }
    return 'image';
  }
}
</script>
