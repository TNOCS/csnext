<template>
    <v-select
          :items="options"
          filled
          autofocus
          @change="updatedValue"
          :value="value"
          :clearable="!proptype.required"
          dense             
        ></v-select>
</template>
<script lang="ts">
import { GraphElement, PropertyType, PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator';

@Component({
  name: "options-cell-editor",  
})
export default class OptionsCellEditor extends Vue {
    
    public params?: any;
    public element?: GraphElement;
    public value?: any | null = null;
    public options = [];
    public key?: string;
    public proptype: PropertyType | null = null;

    public updatedValue(value: any) {
        if (!this.key || !this.element?.properties) { return; }
        this.element.properties[this.key] = value;
        this.params.updatedCell(this.element);
    }

    public getValue() : any {
        if (!this.key || !this.element?.properties) { return; }
        return this.element.properties[this.key];        
    }

    
    beforeMount() {
         if (this.params) {
            console.log(this.params);
            const params = this.params as any;
            this.element = params.data;
            this.key = params.colDef.field.replace('properties.', '');
            if (this.key) {
                this.proptype = params.data._featureType.propertyMap[this.key];
                if (this.proptype?.options) {
                    Vue.set(this, 'options', this.proptype.options);
                }
                Vue.set(this, 'value', params.value);                        
            }
        }   
    }
    
};

</script>