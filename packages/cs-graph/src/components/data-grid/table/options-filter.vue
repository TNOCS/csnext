<template>
    <v-select v-model="filter" dense multiple style="max-height: 20px; margin-top:-20px; padding: -5px; margin: 0"
        :items="filterItems"
    ></v-select>
</template>
<script lang="ts">
import { GraphElement, PropertyType, PropertyValueType } from '@csnext/cs-data';
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator';

@Component({
  name: "options-filter",  
})
export default class OptionsFilter extends Vue {

  public filter: string[] = [];
  public params?: any;
  public filterText?: string[] = [];
  public filterItems: string[] = [];
  
  @Watch('filterText')
  filterTextChanged() {
    this.params.filterChangedCallback();
  }

  @Watch('filter')
  filterChanged() {
    console.log(this.filter);
    if (this.params?.parentFilterInstance) {
      this.params.parentFilterInstance((instance: any) => {
        if (this.filter.length === 0) {
          instance.getFrameworkComponentInstance().myMethodForTakingValueFromFloatingFilter(null);
          // instance.onFloatingFilterChanged(null, null);
        } else {
          // instance.onFloatingFilterChanged('contains', this.filter)
          instance.getFrameworkComponentInstance().myMethodForTakingValueFromFloatingFilter(this.filter);
        }
        
        console.log(instance);

      })

    }
    // console.log(this.params);
    this.params.filterChangedCallback();
  }

  beforeMount() {        
    if (this.params?.propType?.options) {
      this.filterItems = this.params.propType.options;
    }    
  }

  myMethodForTakingValueFromFloatingFilter(value: string[]) {
    
      this.filterText = value;
    }

  isFilterActive() {
      return (
        this.filterText !== null &&
        this.filterText !== undefined &&
        this.filterText.length > 0 
      );
    }

  doesFilterPass(params: any) {
      const value = this.params.valueGetter(params);

      if (this.isFilterActive() && this.filterText) {
        if (!value) return false;
        return this.filterText.includes(value);
      }
    }


    getModel() {
      return this.isFilterActive() ? this.filterText : null;
    }

    setModel(model: string[]) {
      this.filterText = model;
    }
    
   
    
};

</script>