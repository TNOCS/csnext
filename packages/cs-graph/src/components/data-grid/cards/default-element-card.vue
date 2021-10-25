<template>    
    <data-info-panel
      v-if="element"
      :data="element.properties"
      :node="element"
      :featureType="element._featureType"
      panel="popup"
    ></data-info-panel>    
</template> 
<style scoped>

</style>
<script lang="ts">
import { GraphElement } from '@csnext/cs-data';
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import { DataInfoPanel } from "@csnext/cs-map";
// import { DocDatasource } from "@csnext/cs-graph";
import { DocDatasource } from '../../../datasources/doc-datasource';

@Component({
  name: "default-element-card",  
  components: {
      DataInfoPanel
  },
})

export default class DefaultElementCard extends Vue {

    @Prop() 
    public source?: DocDatasource;

    @Prop() 
    public element?: GraphElement;
    mounted() {
        // console.log(this.element);
    }

}
    

</script>