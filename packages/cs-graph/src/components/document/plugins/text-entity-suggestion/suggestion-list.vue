<template>
  <v-card>    
    <v-list ref="menu" two-line >
      <v-list-item v-for="(item, index) in _props.items" :key="index" @click="selectItem(index)" :class="{ 'is-selected': index === selectedIndex }">
         
        <v-list-item-content>
        <v-list-item-title>
          {{ item.item.properties.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.item.properties.description }}
        </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
  </v-card>
</template>

<script lang="ts">
import { idGenerator } from '@csnext/cs-core';
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';


@Component({
  components: { },
})
export default class MentionList extends Vue {

  @Prop()
  items!: any[];

  @Prop()
  command!: Function;

  public selectedIndex = 0;

  @Watch('items') 
  updateItems() {
    this.selectedIndex! = 0;
  }
  
   private onKeyDown({event}) {
     if (event.key === 'ArrowUp') {
        this.upHandler();        
        return true;
      }

      if (event.key === 'ArrowDown') {
        this.downHandler();        
        return true;
      }

      if (event.key === 'Enter') {
        this.enterHandler();
        return true;
      }

   }

    upHandler() {
      
      this.selectedIndex! = (this.selectedIndex! + this.items.length - 1) % this.items.length;
    }

    downHandler() {
      
      this.selectedIndex! = (this.selectedIndex! + 1) % this.items.length;
    }

    enterHandler() {
      this.selectItem(this.selectedIndex!);
    }

    selectItem(index) {
      const item = this.items[index];      
      if (item) {
        this.command({ name:'text-entity', id: `entity-${idGenerator()}`, label: item.item.properties.name, text: item.item.properties.name, spacy_label: item.item._featureType.type, kg_id: item.item.id });
      }
    }
  }

</script>
<style scoped>
.is-selected {
  background-color: #1976d2;
}

</style>