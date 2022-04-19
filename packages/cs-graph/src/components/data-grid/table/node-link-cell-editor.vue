<template>
  <v-combobox
    :items="getItems()"
    v-model="activeRelation"
    itemText="properties.name"
    filled
    dense
    autofocus
    :clearable="proptype.required"
    hide-no-data
    @change="updatedValue"
    :return-object="true"
    itemValue="id"
  >
    <template v-slot:item="props">
      <span v-if="props"
        ><v-img
          :src="props.item.image"
          max-height="48"
          max-width="48"
          style="float: left; margin-right: 10px"
        ></v-img
        >{{ props.item.title }}</span
      >
    </template>
  </v-combobox>
</template>
<style scoped>
.editor-card {
  min-height: 400px;
  position: absolute;
}
</style>
<script lang="ts">
import { GraphElement, PropertyType, RelationType } from '@csnext/cs-data';
import { DocDatasource } from '../../..';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'node-link-cell-editor'
})
export default class NodeLinkCellEditor extends Vue {
  public params?: any;
  public element?: GraphElement;
  public value?: any | null = null;
  public options = [];
  public key?: string;
  public proptype: PropertyType | null = null;
  public graph?: DocDatasource;
  public relation?: RelationType;
  public activeRelation?: any = null;
  public field?: any = null;

  public updatedValue(value: GraphElement) {
    if (!this.graph || !value?.id || !this.element || !this.relation?.type) {
      return;
    }
    this.graph
      .addNewEdge(
        {
          fromId: this.element.id,
          toId: value.id,
          classId: this.relation.type
        } as GraphElement
      )
      .then(async (e: any) => {})
      .catch((e: any) => {})
      .finally(() => {
        // this.newRelation = undefined;
        // this.setLinks();
        this.$forceUpdate();
      });
  }

  public getValue(): any {
    if (!this.key || !this.element?.properties) {
      return;
    }
    return this.element.properties[this.key];
  }

  public getItems() {
    if (this.graph && this.relation?.objectType) {
      console.log('Get items---');
      console.log(this.relation);
      return this.graph!.getClassElements(this.relation.objectType, true);
    } else {
      return [];
    }
  }

  public updateRelation() {}

  beforeMount() {
    if (this.params) {
      console.log(this.params);
      const params = this.params as any;
      this.graph = this.params.source;
      this.element = params.data;
      this.key = params.colDef.field.replace('properties.', '');
      if (this.key) {
        this.proptype = params.data._featureType.propertyMap[this.key];
        if (this.proptype?.relation) {
          this.relation = this.proptype.relation;
          if (this.proptype?.options) {
            Vue.set(this, 'options', this.proptype.options);
          }
        }
        Vue.set(this, 'value', params.value);
      }
    }
  }
}
</script>