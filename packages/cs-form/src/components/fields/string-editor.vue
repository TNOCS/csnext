<template>
  <div>
    <v-text-field
      v-if="field._key"
      v-model.lazy="val"
      :label="$cs.Translate(field.title)"
      :required="field.required"
      :clearable="field.clearable"
      :rules="field.required ? [rules.required] : []"
      :disabled="field.readonly"
      :placeholder="field.placeholder"
      :append-outer-icon="field._appendIcon"
      @update:error="fieldError"
      @input="fieldInput(field)"
      :hint="field.hint"
      :persistentHint="field.persistentHint"
      @click:append-outer="fieldUpdated(field)"
      @change="fieldUpdated(field)"
    ></v-text-field>
    <v-text-field
      v-if="field._index"
      v-model="target[field._index]"
      :label="$cs.Translate(field.title)"
      :required="field.required"
      :disabled="field.readonly"
      :clearable="field.clearable"
      @change="fieldUpdated(field)"
    ></v-text-field>
  </div>
</template>
<style scoped>
</style>
<script lang="ts">
import DefaultEditor from './default-editor.vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'string-editor',
  components: {},
})
export default class StringEditor extends DefaultEditor {
  
}
</script>
