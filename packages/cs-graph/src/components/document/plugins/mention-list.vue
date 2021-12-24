<template>
  <div class="items-list" v-if="items">
    <!-- {{ items }} -->
    
    <v-select rounded filled :items="items" item-text="item.property.name" item-value="item.id"></v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

@Component({
  components: {  
  },
})
export default class MentionList extends Vue {

  @Prop()
  items: any[] | null = null;
    
  

  

  
  
}
</script>
<style scoped>

.items-list {
  background-color: red;
}

</style>