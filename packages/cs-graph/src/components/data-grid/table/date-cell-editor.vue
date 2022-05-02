<template>
   <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="value"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="value"            
            autofocus
            type="date"
            
            v-bind="attrs"            
            v-on="on"
            :clearable="!proptype.required"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="value"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(value)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
</template>
<script lang="ts">
import { GraphElement, PropertyType, PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode, CreateElement } from 'vue'
import { Component } from 'vue-property-decorator';



@Component({
  name: "date-cell-editor",  
})
export default class DateCellEditor extends Vue {
    // public date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    public menu = false;
    public modal = false;
    public menu2 = false;
    public params?: any;
    public element?: GraphElement;
    public _value?: string = '';
    public options = [];
    public key?: string;
    public proptype: PropertyType | null = null;

    public get value() : string {
      console.log(this._value);
      return this._value ?? '';
    }

    public set value(value: string) {
      if (!this.key || !this.element?.properties) { return; }
      if (value === null) {
        this._value = undefined;
        this.element.properties[this.key] = undefined;
      } else {
        this._value = value;           
        this.element.properties[this.key] = new Date(value).getTime();              
      }      
    }

    public updatedValue() {      
      const newValue = new Date(this.value).getTime();      
      if (!this.key || !this.element?.properties || !newValue || (newValue === this.element.properties[this.key])) { return; }
      this.element!.properties[this.key] = newValue;        
      
    }

    public getValue()  {
      if (!this.element?.properties || !this.key) { return; }
      this.params.updatedCell(this.element);
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
              const d = params.value; // ?? Date.now()
              if (d !== undefined) {
                this.value = new Date(d).toISOString().substr(0, 10);
              }
            }

            // Vue.set(this, 'value', params.value);
            // this.value = params.value;
            console.log(this);
        }   
    }
};

</script>