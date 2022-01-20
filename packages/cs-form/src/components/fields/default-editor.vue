<template>
  
</template>
<style scoped>
</style>
<script lang="ts">
import { IFormFieldOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
const debounce = require('lodash/debounce');

@Component({
  name: 'default-editor',
  components: {},
})
export default class DefaultEditor extends Vue {

  private fieldUpdatedDebounce = debounce(this.fieldUpdated, 200);

  @Prop()
  public fieldIndex?: number;

  @Prop()
  public target?: any;

  @Prop()
  public field?: IFormFieldOptions;

  @Emit()
  public changed(field: IFormFieldOptions) {}

  @Emit()
  public triggered(field: IFormFieldOptions) {}

  public get val() : any {
    if (!this.target  || !this.field?._key) { return; }
    if (this.fieldIndex !== undefined) {
      return  this.target[this.field._key]![this.fieldIndex]!;
    } else {
      return this.target[this.field._key];
    }    
  }

  public set val(v: any) {
    if (!this.target  || !this.field?._key) { return; }
    if (this.fieldIndex  !== undefined) {
      this.target[this.field._key]![this.fieldIndex]! = v;
    } else {
      this.target[this.field._key]! = v;
    }        
  }

  public items: any[] = [];

  public updateValue() {
    if (!this.target || !this.field?._key) {
      return;
    }
    // this.items = this.target[this.field._key]
  }

  public async updateOptions(force = false) {
    if (!this.field?.options) {
      return;
    }
    if (Array.isArray(this.field.options)) {
      Vue.set(this, 'items', this.field.options);
    }
    if (typeof this.field.options === 'function' && force) {
      let res = this.field.options();
      if (Promise.resolve(res) === res) {
        Vue.set(this, 'items', await this.field.options());
      } else {
        Vue.set(this, 'items', res);
      }
    }
    //  else {
    //   Vue.set(this, 'items', this.field.options);
    // }
  }

  public getOptions() {
    this.updateOptions(true);
  }

  public async search() {
    this.updateOptions(true);
    return this.items;
  }

   private rules: { [key: string]: Function } = {
    required: (val) => {
      if (this.field?.required && !val)
        return this.$cs.Translate('FIELD_REQUIRED');
      return true;
    },
    valueMin: (val) => {
      if (!this.field || !this.field.min) {
        return true;
      }
      if (typeof +val === 'number' && +val >= this.field.min) {
        return true;
      }
      return this.$cs.Translate(`Value should be >= ${this.field.min}`);
    },
    valueMax: (val) => {
      if (!this.field || !this.field.max) {
        return true;
      }
      if (typeof +val === 'number' && +val <= this.field.max) {
        return true;
      }
      return this.$cs.Translate(`Value should be <= ${this.field.max}`);
    },
  };

  public async mounted() {  
    this.updateOptions();  
    this.updateValue();
  }

  public fieldError(error: boolean) {
    if (this.field) {
      this.field._isError = error;
    }
  }
  

  public fieldUpdated(field: IFormFieldOptions) {
    if (!field._isError) {
      field._appendIcon = '';
      this.changed(field);
      this.$forceUpdate();
    }
  }

  public fieldOptions(field: IFormFieldOptions) {
    console.log('field options');
    if (typeof field.options === 'function') {
      const items = field.options();
      return items;
    } else {
      return field.options;
    }
  }

  public fieldInput(field: IFormFieldOptions) {
    if (field) {
      field._appendIcon = 'mdi-content-save';
    }
  }

}
</script>
