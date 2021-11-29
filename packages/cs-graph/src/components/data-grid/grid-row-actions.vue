<template>
  <v-layout>
    <v-btn v-if="params.options.canDelete" small icon @click.stop="deleteRow"
      ><v-icon>delete</v-icon></v-btn
    >
    <v-btn v-if="params.options.canGraph" small icon @click.stop="graphRow"
      ><v-icon>scatter_plot</v-icon></v-btn
    >
  </v-layout>
</template>
<script lang="ts">
import { GraphElement, PropertyValueType } from "@csnext/cs-data";
import Vue, { VNode, CreateElement } from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "grid-row-actions",
})
export default class GridRowActions extends Vue {
  public params?: any;
  public element?: GraphElement;

  public deleteRow() {
    if (this.element) {
      this.params.delete(this.element);
    }
  }

  public graphRow() {
    if (this.element) {
      this.params.graphNode(this.element);
    }
  }

  beforeMount() {
    if (this.params) {
      const params = this.params as any;
      this.element = params.data;
    }
  }
  // render(createElement: CreateElement): VNode {
  //     return createElement('v-layout', [
  //         createElement('v-icon', { on: {
  //             click: (e: MouseEvent) => {
  //                 e.cancelBubble = true;
  //                 (this.params as any).delete(this.element);
  //             }
  //         }}, 'delete')
  //     ])

  // }
}
</script>