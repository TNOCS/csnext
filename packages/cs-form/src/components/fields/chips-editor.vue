<template>
  <div>
    {{ $cs.Translate(field.title) }}
    <v-combobox
      v-model="target[field._key]"
      :items="items"
      :disabled="field.readonly"
      flat
      chips
      :hint="field.hint"
      :persistentHint="field.persistentHint"
      :clearable="field.clearable"
      solo
      multiple
      text
      @change="fieldUpdated(field)"
    >
    </v-combobox>
  </div>
</template>
<style scoped>
</style>
<script lang="ts">
import DefaultEditor from './default-editor.vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'chips-editor',
  components: {},
})
export default class ChipsEditor extends DefaultEditor {
  
}
</script>
