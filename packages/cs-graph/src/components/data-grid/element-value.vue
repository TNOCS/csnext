<template>
  <div>      
      <prop-value :value="value()" :proptype="header.propType" :element="item"></prop-value>    
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphElement } from "@csnext/cs-data";
// import { PropValue } from "@csnext/cs-map";


@Component({
  components: {  }
})
export default class ElementValue extends WidgetBase {
    
  @Prop()
  public header? : any;

  @Prop()
  public item?: GraphElement;

  public value() : string {
      if (!this.item?.properties || !this.header?.key) { return ''; }
      return this.item.properties[this.header.key];
  }
}
</script>
