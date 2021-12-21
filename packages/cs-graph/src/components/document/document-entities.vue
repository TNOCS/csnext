<template>
  <simplebar
    style="margin-left: 5px; margin-top: -25px; height: calc(100%-80px)"
    v-if="source && source.activeDocument && nodeGroups"
  >
    <!-- <v-row v-masonry transition-duration="0.3s" cols="3"  column-width="300" item-selector=".group-column" style="margin-left: 5px; margin-right: 10px"> -->
    <isotope
      :options="getIsoOptions()"
      ref="iso"
      :list="nodeGroups"
      
      class="isotope-grid"
    >
      <div
        v-for="(group, index) in nodeGroups"
        :key="index"
        class="group-column"
      >
        <div class="group-title">
          {{ group.title }}
          <v-btn
            v-if="!group._adding"
            @click.stop="
              group._adding = true;
              updateLayout();
            "
            icon
            class="group-add-button"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            v-if="group._adding"
            @click="
              group._adding = false;
              updateLayout();
            "
            icon
            class="group-add-button"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
        </div>
        <v-card class="entity-add-card" v-if="group._adding">
          <!-- <v-card-title>{{ entity.text }}</v-card-title> -->
          <!-- <v-card-subtitle>{{ entity.entity_class }}</v-card-subtitle> -->

          <v-container>
            <v-radio-group v-model="searchMode" row>
              <v-radio label="KG" value="KG"></v-radio>
              <v-radio label="New" value="new"></v-radio>
              <v-radio label="Online" value="online"></v-radio>
            </v-radio-group>
            <v-layout v-if="searchMode === 'KG'">
              <v-combobox
                :items="source.getClassElements(group.id)"
                v-model="newEntityNode"
                item-text="properties.name"
                label="node"
                return-object
              ></v-combobox>
              <v-btn @click.stop="linkNode(group)" fab x-small class="mt-4 primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-layout>
            <v-layout v-if="searchMode === 'new'">
              <v-text-field
                v-model="newCategory"
                :label="'new ' + group.id"
              ></v-text-field>
              <v-btn @click.stop="linkNode(group)" fab x-small class="mt-4 primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-layout>
            <v-layout>
              <v-combobox
                v-if="searchMode === 'online'"
                :items="Object.values(source.graph)"
                v-model="searchOnline"
                item-text="properties.name"
                label="node"
                return-object
              ></v-combobox>
            </v-layout>
          </v-container>
        </v-card>

        <template v-if="group">
        <v-card          
          outlined          
          @click="selectNodeInfo(entity.node)"
          @mouseenter="entity._hover = true; highlight(entity)"
          @mouseleave="entity._hover = false; clearHighlight()"
          :style="{
            'background-color': !entity._approved
              ? 'transparent'
              : getEntityColor(entity.node),
            'border-color': getEntityColor(entity.node),
            'border-width': '3px',
          }"
          v-for="(entity, eindex) in group.entities"
          :key="eindex"
          class="entity-card mt-2"
        >

          <data-info-panel v-if="entity.node" :data="entity.node.properties" :node="entity.node" :featureType="entity.node._featureType" panel="popup" ></data-info-panel>
          
          <div v-else>          
            {{entity.id}}
            </div>
          <!-- <v-img
            v-if="entity.node"
            :src="entity.node.properties.flagimage"
          ></v-img> -->
          <!-- <v-card-title class="pa-1">
            <span v-if="entity.node">
              {{ entity.node.title }}              
            </span>
            <span v-else>
              {{ entity.id }}
            </span>
          </v-card-title> -->
          <div style="min-height: 36px">
            
            <span v-if="entity._hover">

              <v-btn v-if="entity.instances.length>0" icon @click.stop="toggleApproveEntity(entity)"
                ><v-icon v-if="entity._approved">mdi-minus</v-icon
                ><v-icon v-else>mdi-plus</v-icon></v-btn
              >
              <v-btn v-if="entity.instances.length === 0" icon @click="deleteEntities(entity)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="!entity._approved"
                @click="deleteEntities(entity)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
              <v-btn
                icon
                v-if="!entity._approved"
                @click="ignoreEntity(entity)"
                ><v-icon>mdi-delete-sweep</v-icon></v-btn
              >
            </span>
            <span style="float: right">
              <v-btn v-if="entity._relations>0" @click="entity._togglemore = !entity._togglemore; updateLayout();" icon>{{ entity._relations }}<v-icon>view_headline</v-icon></v-btn>
              <v-btn
                v-if="entity.instances.length > 0"
                icon                
                @click="
                  entity._togglemore = !entity._togglemore;
                  updateLayout();"
                >{{ entity.instances.length
                }}<v-icon>mdi-message-bulleted</v-icon></v-btn
              >                                        
              <!-- <v-btn              
                v-if="entity.node"
                @click="selectNodeInfo(entity.node)"
                icon
                ><v-icon>mdi-information-outline</v-icon></v-btn
              > -->
            </span>

            <!-- <v-btn v-if="!entity.node" icon><v-icon>link</v-icon></v-btn> -->
          </div>
          <div v-if="entity._togglemore">
            <div v-for="e in entity.instances" :key="e.id">
              {{ e.text }}
              <span v-if="e._relations">{{ e._relations.length}}</span>
            </div>
          </div>
        </v-card>
        </template>
      </div>
    </isotope>
  </simplebar>
</template>

<style scoped>
.isotope-grid {
  margin-bottom: 100px;
  /* width: 100%; */
  /* background-color: red; */
}

.grid-sizer,
.group-column {
  width: 300px;
  /* max-height: 300px; */
  /* height: 300px; */
  /* background-color: red; */
  /* width: 300px;
  height: 100%; */
  /* background-color: purple; */
}

.entity-card {
  min-height: 85px;
  /* width: 300px; */
  margin: 5px;
}

.group-title {
  font-size: 30px;
  font-weight: 500;
}

.group-add-button {
  float: right;
}

.entity-add-card {
  min-height: 85px;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { GraphElement } from '@csnext/cs-data';
import { GraphDocument } from "./../../classes/document/graph-document";
import { DocDatasource } from "../../datasources/doc-datasource";
import { EntityList, NodeEntities } from "./node-entities";
import simplebar from "simplebar-vue";

import isotope from "vueisotope";
import { DataInfoPanel } from '@csnext/cs-map';
require("isotope-packery");

@Component({
  components: { simplebar, isotope, DataInfoPanel },
})
export default class DocumentEntities extends WidgetBase {
  public nodeGroups: NodeEntities[] = [];
  public searchMode = "KG";
  public newEntityNode = { } as GraphElement;

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public updateLayout() {
    Vue.nextTick(() => {
      if (this.$refs.iso) {
        (this.$refs.iso as any).layout();
      }
    });
  }

  public clearHighlight() {
    if (this.source?.activeDocument?.entities) {
      for (const entity of this.source.activeDocument.entities) {
        Vue.set(entity, '_highlight', false);
        // entity._highlight = false;        
      }
      this.source?.updateHighlights();
    }
    
    
  }

  public highlight(list: EntityList) {
    for (const entity of list.instances) {
      Vue.set(entity, '_highlight', true);
      // entity._highlight = true;            
    }
    this.source?.updateHighlights();

  }

  public linkNode(group: NodeEntities) {
    if (this.source && group && this.newEntityNode && this.document?._node?.id) {
      this.source
        .addNewEdge({
          fromId: this.document?._node.id,
          toId: this.newEntityNode.id,
          classId: "CONTAINS",
        } as GraphElement, true)
        .then(async (e) => {          
          this.updateGroups();
        })
        .catch((e) => {});
    }
  }

  public get document(): GraphDocument | undefined {
    if (this.source && this.source.activeDocument) {
      return this.source.activeDocument;
    }
  }

  public getIsoOptions() {
    return {
      itemSelector: ".group-column",
      layoutMode: "packery",
      // percentPosition: true,
      // options for cellsByRow layout mode

      // options for masonry layout mode
      masonry: {
        columnWidth: ".grid-sizer",
      },
    };
  }

  public selectNodeInfo(entity: GraphElement) {
    if (entity?.id) {
      this.source?.openElement(entity);
    }
  }

  private getEntityColor(entity?: GraphElement) {
    if (entity) {
      return GraphElement.getBackgroundColor(entity);
    } else {
      return "gray";
    }
  }

  private async toggleApproveEntity(list?: EntityList) {
    if (!list?.node || !this.source || !this.source.activeDocument) {
      return;
    }
    if (list._approved && list.node) {
      list._approved = false;
      await this.source.removeEntityListFromDocument(list, this.source.activeDocument);
      // this.source.removeEdge()
      // delete link
    } else {
      list._approved = true;
      await this.source.linkEntityListToDocument(list, this.source.activeDocument);      
      // add link
    }
    this.updateGroups();
    this.$forceUpdate();
  }

  private async ignoreEntity(list: EntityList) {
    if (list.node && this.source) {
      list.node.properties!.nlp_ignore = true;
      await this.source.saveNode(list.node);
      this.source.updateSearchEntities();
      await this.deleteEntities(list);
    }
    
  }

  public deleteEntities(list: EntityList) : Promise<boolean> {    
    return new Promise(async (resolve, reject) => {
      if (!this.source?.activeDocument?.entities || !list.instances) {
        reject();
        return;
      }
      
      await this.source.removeEntityListFromDocument(list, this.source.activeDocument, true);
      await this.source.saveDocument(this.source.activeDocument);
      this.updateGroups();
      this.source!.bus.publish("document-entities", "update");
      resolve(true);
    })
  }

  @Watch("source.activeDocument.entityTypes")
  @Watch("source.activeDocument.properties.hide_unknowns")
  public updateGroups() {
    if (!this.source) {
      return;
    }
    if (!this.source?.activeDocument?.entities) {
      return;
    }
    let res: NodeEntities[] = [];
    for (const entity of this.source.activeDocument.entities) {     
      if (!this.source.activeDocument?.properties?.hide_unknowns || entity._node?._featureType)  {
      const c = entity._node?.classId ?? entity.spacy_label;
      if (c) {
        let group = res.find((g) => g.id === c);
        if (!group) {
          group = {
            id: c,
            title: c.replace('_', ' '),
            _adding: false,
            _open: true,            
            node: entity._node,
            entities: [],
          };
          res.push(group);
        }        
        let entityId = entity._node?.id ?? entity.text;
        const ent = group.entities.find((e) => e.id === entityId);

        if (!ent) {
          let edge = this.source.activeDocument._outgoing?.find(
            (o) => o.toId === entityId
          );
          // console.log(this.source.activeDocument._node?._outgoing?.map(f => f.toId));
          let el = {
            id: entityId,
            _hover: false,
            _approved: edge !== undefined,
            edge,
            node: entity._node,
            _relations: entity._relations ? entity._relations.length : 0,
            _togglemore: false,
            instances: [entity],
          } as EntityList;
          if (edge !== undefined) {
            // debugger;
          }
          group.entities.push(el);
        } else {
          ent.instances.push(entity);
          ent._relations+=entity._relations ? entity._relations.length : 0;
        }
      }
      }
    }

    // find all contains relations without entities
    if (this.source.activeDocument._outgoing) {
      for (const relation of this.source.activeDocument._outgoing
        .filter((r) => r.classId === "CONTAINS")
        .map((r) => r)) {
        if (relation && relation.to) {
          const entity = relation.to;
          // find group
          let group = res.find((g) => g.id === entity.classId);
          if (!group && entity.classId) {
            group = {
              id: entity.classId,
              title: entity._featureType?.title,
              _adding: false,
              _open: true,
              node: entity,
              entities: [],
            };
            res.push(group);
          }
          if (
            group &&
            group.entities.findIndex((i) => i.id === entity.id) === -1
          ) {
            group.entities.push({
              id: entity.id!,
              edge: relation,              
              node: entity,
              instances: [],              
              _relations: 0,
              _hover: false,
              _approved: true,
              _togglemore: false,              
            });
          }
        }
      }
      // this.updateLayout();
    }

    for (const g of res) {
      g.entities = g.entities.sort((a, b) => {
        return b.instances?.length - a.instances?.length;
      });
    }
    console.log("groups");
    console.log(res);
    Vue.set(this, "nodeGroups", res);
  }

  public contentLoaded() {
    this.updateGroups();
    if (this.source?.bus && this.busManager) {
      this.busManager.subscribe(this.source.bus, DocDatasource.DOCUMENT_ENTITIES, (a: string, d: any) => {
        if (a === DocDatasource.ENTITIES_UPDATED) {
          this.updateGroups();
        }
      })
    }
    //   alert('Content loaded');
  }

  public mounted() {
    console.log("entities");
    console.log(this.source);
    this.updateGroups();
  }

  constructor() {
    super();
  }
}
</script>
