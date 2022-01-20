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
      append-outer-icon="mdi-open-in-new"
      @update:error="fieldError"
      @input="fieldInput(field)"
      :hint="field.hint"
      :persistentHint="field.persistentHint"
      @click:append-outer="openLink()"
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
  name: 'url-editor',
  components: {},
})
export default class UrlEditor extends DefaultEditor {

  private openLink() {
    if (!this.val) { return;}

    let url = !this.val.startsWith('http') ? 'https://' + this.val : this.val;
    if (this.field?.urlTemplate) {
      url = this.field?.urlTemplate.replace('$1', this.val);
    }
    if (url && url !== null) {
      window.open(url, '_blank')!.focus();
    }

  }
  
}
</script>
