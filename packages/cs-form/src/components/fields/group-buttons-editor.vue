<template>
  <div>
    <v-btn-toggle
        v-model="target[field._key]"
        tile
        :hint="field.hint"
        class="group-btn-toggle"
        @change="fieldUpdated(field)"
        group
      >
        <v-btn v-for="(option, oi) in items" :key="oi" :value="option">
          {{option}}
        </v-btn>
      </v-btn-toggle>
    <!-- {{ $cs.Translate(field.title) }}
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
    > -->
    <!-- </v-combobox> -->
  </div>
</template>
<style scoped>
.group-btn-toggle {
  flex-wrap: wrap;
}
</style>
<script lang="ts">
import DefaultEditor from './default-editor.vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'group-buttons-editor',
  components: {},
})
export default class GroupButtonsEditor extends DefaultEditor {
  
}
</script>
