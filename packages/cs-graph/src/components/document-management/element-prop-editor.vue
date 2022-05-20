<template>
  <div v-if="field">
      <v-autocomplete
        :items="items"
        
        :search-input.sync="search"
        v-model="activeElement"
        :label="$cs.Translate(field.title) + ' (' + field.data.elementType + ')'"
        :hint="field.hint"
        item-text="properties.name"
        hide-no-data        
        @focus="loadAllItems()"
        clearable
        @change="updateElement()"
        return-object
        :filled="field.filled"
        :rounded="field.rounded"
        item-value="id"
        :persistentHint="field.persistentHint"
        :disabled="field.readonly"
        :append-outer-icon="field._appendIcon"        
      >
        <!-- <template v-slot:item="props">
          <span v-if="props"
            ><v-img :src="props.item.image" max-height="48" max-width="48" style="float: left; margin-right: 10px"></v-img
            >{{ props.item.properties.name }}</span
          >
        </template> -->
      </v-autocomplete>

  </div>
</template>

<style scoped>
.relation-card {
  margin: 5px;
  width: 150px;
  height: 100px;
}

.can-drop {
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.relation-card-actions {
  position: absolute;
  bottom: -10px;
  right: -10px;
}

.relation-card-action {
  margin: 0 !important;
}
</style>

<script lang="ts">
import { Component, Emit, Watch } from 'vue-property-decorator';
import { IFormFieldOptions, IFormOptions } from '@csnext/cs-core';
import { NodeLink, NodeChip, DataInfoPanel, DragUtils } from '@csnext/cs-map';
import Vue from 'vue';
import { DocDatasource } from '../../datasources/doc-datasource';
import { LinkInfo, GraphElement } from '@csnext/cs-data';

@Component({
  props: {
    field: undefined,
    target: undefined,
  } as any,
  components: { NodeLink, NodeChip, DataInfoPanel },
})
export default class ElementPropEditor extends Vue {
  public links: LinkInfo[] | null = null;
  public linkIds: string[] = [];
  public items: GraphElement[] = [];
  private search: string | null = null;
  private itemsLoaded: boolean = false;
  private startDrop: boolean = false;

  @Watch('search')
  private loadAllItems() {
    // load all items
    if (!this.itemsLoaded) {
      this.items = this.getItems();
    }
  }

  public updateElement() {
    console.log(this);
    console.log('update element');
    if (this.target && this.field?._key) {
      if (!this.activeElement) {
        delete this.target[this.field._key];
        this.$emit('updated');        
      } else if (!this.target.hasOwnProperty(this.field._key) || this.target[this.field._key] !== this.activeElement.id) {
        this.target[this.field._key] = this.activeElement.id;
        this.$emit('updated');
      }        
    }
  }


  public getItems(): GraphElement[] {    
    const res: GraphElement[] = [];
    this.itemsLoaded = true;
    if (this.graph && this.field?.data?.elementType) {
      const elements = this.graph!.getClassElements(this.field.data.elementType, true);
      if (elements && this.node) {
        for (const el of elements) {
          if (el.id !== this.node.id) {
            res.push(el)
          }
        }
      }
    }
    return res;
  }

  public get node(): GraphElement | undefined {
    if (this.field?.data?.node) {
      return this.field.data.node;
    }
  }

  public get graph(): DocDatasource | undefined {
    if (this.field?.data?.graph) {
      return this.field.data.graph as DocDatasource;
    }
  }

  @Watch('field.data')
  private dataChanged() {    
    this.getActiveElement();    
    
  }

  public async editLink(l: LinkInfo) {
    if (!l.element || !this.graph) {
      return;
    }
    this.graph.openElement(l.element);
  }

  public formDef: IFormOptions | null = null;
  public field?: IFormFieldOptions;
  public target?: object;    
  public activeElement?: GraphElement | null = null;

  public getActiveElement() {
    
    
    console.log('get active element');
    if (this.field?._key && this.node?._elements && this.node._elements.hasOwnProperty(this.field?._key)) {
      const value = this.node._elements[this.field._key];
      if (!Array.isArray(value))
      this.activeElement = value;
      if (this.activeElement && !this.items.includes(this.activeElement)) {
        this.items.push(this.activeElement);
      }
    }
    
  }

  

  mounted() {
    this.getActiveElement();    
  }
}
</script>
