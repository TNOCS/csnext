<template>
  <v-menu v-if="source" v-model="showContextMenu" :position-x="x" :position-y="y" absolute :close-on-content-click="false" open-on-hover offset-y>
    <v-list>
      <v-list-group v-for="(item, i) in contextMenuitems" :key="i" v-model="item.active" :prepend-icon="item.icon" no-action @click="callAction(item)">
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
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { IMenu } from '@csnext/cs-core';
import { GraphElement, FilterGraphElement } from '@csnext/cs-data';
import Vue from 'vue';
import { DocDatasource } from '../../datasources/doc-datasource';
import { ElementActions } from './element-actions'

@Component({
  components: {},
})
export default class ElementContextMenu extends Vue {
  @Prop()
  public x!: number;

  @Prop()
  public y!: number;

  @Prop()
  public element: GraphElement | undefined;

  @Prop()
  public source!: DocDatasource;

  @Prop()
  public showContextMenu!: boolean;

  @Emit('itemUpdated')
  public itemUpdated() {}

  @Emit('listUpdated')
  public listUpdated() {}

  public contextMenuitems: IMenu[] = [];

  private async callAction(i: IMenu) {
    if (i.action && typeof i.action === 'function') {
      await i.action(i);
    }
  }

  
  public async linkToTarget(target: GraphElement, type: string) {
    if (this.source && target.id && this.element?.id)
    {
      const edge = {
        fromId: this.element.id,
        toId: target.id,
        classId: 'LINKED_TO',
        properties: {
          "relation_type": type
        }
      } as GraphElement
      try {
        await this.source.addNewEdge(edge);   
      } catch (e) {
        console.error(e);
      }
      
    }
  }

  @Watch('element')
  elementChanged(e: GraphElement | undefined) {
    this.element = e;
    this.initMenu();
    
  }

  public initMenu() {
    if (!this.source || !this.element) { return; }
    this.contextMenuitems = ElementActions.getElementActions(this.element, this.source, undefined, (i,m) => {
      // this.showContextMenu = false;
      this.listUpdated();
    });
    // this.contextMenuitems.push({
    //   title: 'duplicate',
    //   icon: 'mdi-plus-circle-multiple-outline',
    //   action: async () => {
    //     this.showContextMenu = false;
    //     const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${this.element.properties?.name} - copy`);
    //     await this.source.duplicateNode(this.element, name);
    //     this.listUpdated();
    //   },
    // });
    // this.contextMenuitems.push({
    //   title: 'add to visualisation',
    //   icon: 'mdi-playlist-plus',
    //   action: async (i: IMenu) => {
    //     i.items = [];
    //     // this.showContextMenu = false;
    //     let presets = this.source.getClassElements('graph_preset', true);
    //     presets.forEach(p => {
    //       i.items!.push({
    //         title: p.properties?.name,
    //         icon: p._featureType?.icon,
    //         action: async () => {
    //           FilterGraphElement.addElementRule(p as FilterGraphElement, this.element);
    //           // alert(`add to ${p.properties.name}`)
    //         }
    //       });
    //     })
    //     console.log(presets);
    //     // const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${this.element.properties?.name} - copy`);
    //     // await this.source.duplicateNode(this.element, name);
    //     // this.listUpdated();
    //   },
    // });
    // this.contextMenuitems.push({
    //   title: 'link to',
    //   icon: 'mdi-playlist-plus',
    //   action: async (i: IMenu) => {
    //     i.items = [];
    //     // this.showContextMenu = false;
    //     let targets = this.source.getClassElements('indicator', true);
    //     targets.forEach(p => {
    //       i.items!.push({
    //         title: p.properties?.name,
    //         icon: p._featureType?.icon,
    //         action: async () => {
    //           this.linkToTarget(p, 'supports');
              
    //           // FilterGraphElement.addElementRule(p as FilterGraphElement, this.element);
    //           // alert(`add to ${p.properties.name}`)
    //         }
    //       });
    //     })
    //     console.log(targets);
    //     // const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${this.element.properties?.name} - copy`);
    //     // await this.source.duplicateNode(this.element, name);
    //     // this.listUpdated();
    //   },
    // });
    // this.contextMenuitems.push({
    //   title: 'rename',
    //   icon: 'mdi-form-textbox',
    //   action: async () => {
    //     this.showContextMenu = false;
    //     const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', this.element.properties?.name);
    //     this.element.properties = { ... this.element.properties, ...{name}};
    //     await this.source.saveNode(this.element);
    //     this.itemUpdated();
    //   },
    // });
    // this.contextMenuitems.push({
    //   title: 'delete',
    //   icon: 'mdi-delete',
    //   color: '#eb4034',
    //   action: async () => {
    //     this.showContextMenu = false;
    //     await this.source.removeNode(this.element);
    //     this.listUpdated();
    //   },
    // });
  }

  mounted() {    
    this.initMenu();
  }
}
</script>
