<template>  
</template>

<style scoped>

</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';

import Vue from 'vue';
import { ElementDataGrid, DocDatasource } from '../../..';


@Component({
  name: 'base-grid-view',
  components: {
    
  },
})
export default class BaseGridView extends Vue {

    @Prop()
    public source!: DocDatasource;

    @Prop()
    public grid!: ElementDataGrid;




}
</script>
