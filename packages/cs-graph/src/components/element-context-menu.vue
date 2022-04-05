<template>
  <v-menu v-if="source" v-model="showContextMenu" :position-x="x" :position-y="y" absolute :close-on-content-click="true" open-on-hover offset-y>
    <v-list>
      <v-list-group v-for="(item, i) in contextMenuitems" :key="i" v-model="item.active" :prepend-icon="item.icon" no-action @click="item.action">
        <template v-slot:appendIcon>
          <span v-if="item.items && item.items.length > 0">{{ item.items.length }}</span>
          <span v-else></span>
        </template>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title :color="item.color" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <template v-if="item.items">
          <v-list-item v-for="(subItem, si) in item.items" :key="si" :prepend-icon="subItem.icon" @click="subItem.action">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
  </v-menu>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Emit, Prop } from 'vue-property-decorator';
import { IMenu } from '@csnext/cs-core';
import { GraphElement } from '@csnext/cs-data';
import Vue from 'vue';
import { DocDatasource } from '../datasources/doc-datasource';

@Component({
  components: {},
})
export default class ElementContextMenu extends Vue {
  @Prop()
  public x!: number;

  @Prop()
  public y!: number;

  @Prop()
  public element!: GraphElement;

  @Prop()
  public source!: DocDatasource;

  @Prop()
  public showContextMenu!: boolean;

  @Emit('itemUpdated')
  public itemUpdated() {}

  @Emit('listUpdated')
  public listUpdated() {}

  public contextMenuitems: IMenu[] = [];

  public initMenu() {
    if (!this.source) { return; }
    this.contextMenuitems.push({
      title: 'duplicate',
      icon: 'mdi-plus-circle-multiple-outline',
      action: async () => {
        this.showContextMenu = false;
        const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${this.element.properties?.name} - copy`);
        await this.source.duplicateNode(this.element, name);
        this.listUpdated();
      },
    });
    this.contextMenuitems.push({
      title: 'rename',
      icon: 'mdi-form-textbox',
      action: async () => {
        this.showContextMenu = false;
        const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', this.element.properties?.name);
        this.element.properties = { ... this.element.properties, ...{name}};
        await this.source.saveNode(this.element);
        this.itemUpdated();
      },
    });
    this.contextMenuitems.push({
      title: 'delete',
      icon: 'mdi-delete',
      color: '#eb4034',
      action: async () => {
        this.showContextMenu = false;
        await this.source.removeNode(this.element);
        this.listUpdated();
      },
    });
  }

  mounted() {
    console.log('open context menu');
    this.initMenu();
  }
}
</script>
