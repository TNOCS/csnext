<template>
  <div v-if="field">
    <div v-if="field.data.relation.multiple">
      <v-autocomplete
        auto-select-first
        v-model="links"
        :items="getItems()"
        chips
        @change="updateLinks()"
        :label="$cs.Translate(field.title)"
        :hint="field.hint"
        :persistentHint="field.persistentHint"
        append-outer-icon="mdi-plus"
        @click:append-outer="createElement()"
        clearable
        item-text="element.properties.name"
        multiple
        return-object
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            :color="data.item.color"
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar left v-if="data.item.element._featureType.icon">
              <v-icon>{{ data.item.element._featureType.icon }}</v-icon>
            </v-avatar>
            {{ data.item.element.properties.name }}
          </v-chip>
        </template>
      </v-autocomplete>
      <!-- <v-layout
        >{{ field.title }}
        <v-btn @click="addNewObjectRelation()" icon style="margin-top: -5px"
          ><v-icon>mdi-plus</v-icon></v-btn
        ></v-layout
      >
      <v-layout class="flex-wrap" v-if="links">
        <v-card
          v-for="(link, indx) in links"
          :key="indx"
          outlined
          class="relation-card"
        >
          <v-card-subtitle
            ><node-link :source="graph" :node="link.element"></node-link
          ></v-card-subtitle>
          <v-card-actions class="relation-card-actions">
            <v-btn
              class="relation-card-action"
              small
              icon
              @click="deleteLink(link)"
              ><v-icon small>mdi-delete</v-icon></v-btn
            >
            <v-btn
              class="relation-card-action"
              small
              icon
              @click="duplicate(link)"
              ><v-icon small>mdi-content-copy</v-icon></v-btn
            >
            <v-btn
              class="relation-card-action"
              small
              icon
              @click="editLink(link)"
              ><v-icon small>mdi-pencil</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-layout>
      <v-combobox
        :items="getItems()"
        v-model="newRelation"
        :label="$cs.Translate(field.title)"
        :hint="field.hint"
        itemText="title"
        prepend-icon="mdi-playlist-plus"
        hide-no-data
        return-object
        clearable
        itemValue="id"
        :persistentHint="field.persistentHint"
        :disabled="field.readonly"
        :append-outer-icon="field._appendIcon"
        @change="addNewRelation()"
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
      </v-combobox> -->
    </div>
    <div v-else>
      <v-autocomplete
        :items="getItems()"
        v-model="activeRelation"
        :label="$cs.Translate(field.title) + ' (' + field.data.relation.type + ')'"
        :hint="field.hint"
        item-text="element.properties.name"
        hide-no-data
        clearable
        @change="updateRelation()"
        return-object
        item-value="element.id"
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
  </div>
</template>

<style scoped>
.relation-card {
  margin: 5px;
  width: 150px;
  height: 100px;
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
import { Component } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { guidGenerator, idGenerator, IFormFieldOptions, IFormOptions } from '@csnext/cs-core';

import simplebar from 'simplebar-vue';

import { NodeLink, NodeChip, DataInfoPanel } from '@csnext/cs-map';
import Vue from 'vue';
import { DocDatasource } from '../../datasources/doc-datasource';
import { FeatureType, RelationType } from '@csnext/cs-data';
import { LinkInfo, GraphElement } from '@csnext/cs-data';

@Component({
  props: {
    field: undefined,
    target: undefined,
  } as any,
  components: { simplebar, NodeLink, NodeChip, DataInfoPanel },
})
export default class RelationEditor extends Vue {
  public links: LinkInfo[] | null = null;
  public linkIds: string[] = [];

  public createElement() {
    if (!this.graph?.featureTypes || !this.relation?.objectType || !this.graph.featureTypes.hasOwnProperty(this.relation.objectType)) {
      return;
    }
    const ft = this.graph.featureTypes[this.relation.objectType];    
    if (!ft?.title) { return; }
    $cs.triggerInputDialog(ft.title, 'enter new name', '', ft.title).then((name) => {
      this.graph
        ?.addNewNode({
          id: `${this.relation!.objectType}-${idGenerator()}`,
          properties: { name },
          classId: this.relation!.objectType,
        })
        .then(async (newNode) => {
          this.graph!.addNewEdge(
          {
            fromId: this.node!.id,
            toId: newNode.id,
            classId: this.relation!.type,
          } as GraphElement
        )
          .then(async (e) => {
            this.$forceUpdate();
          });

          
        });
    });
  }

  public async updateLinks(e: any) {
    if (!this.graph || !this.links) {
      return;
    }
    for (const oldLink of this.linkIds) {
      const old = this.links.find((l) => l.link?.id === oldLink);
      if (!old && this.graph.graph.hasOwnProperty(oldLink)) {
        await this.graph.removeEdge(this.graph.graph[oldLink]);
      }
    }
    for (const currentLink of this.links) {
      if (!currentLink.link?.id || this.linkIds.indexOf(currentLink.link.id) === -1) {
        if (this.node && currentLink.element?.id) {
          try {
            await this.graph.addNewEdge(
              {
                fromId: this.node!.id,
                toId: currentLink.element.id,
                classId: this.relation!.type,
              } as GraphElement
            );
          } catch {
          } finally {
            this.setLinks();
          }
        }
      }
    }
    // for (const relation of this.links) {
    //   if (relation.link?.id && this.linkIds.indexOf(relation.link.id))

    // }
    // remove old links

    // add new links
  }

  public remove(li: LinkInfo) {
    this.links = this.links ? this.links.filter((l) => l !== li) : [];
    this.updateRelation();
  }

  public getItems(): LinkInfo[] {
    const res: LinkInfo[] = [];
    if (this.graph && this.relation?.objectType) {
      const elements = this.graph!.getClassElements(this.relation.objectType, true);
      if (elements && this.node) {
        for (const el of elements) {
          if (el.id !== this.node.id) {
            res.push({ element: el, direction: 'to', link: undefined });
          }
        }
        // return elements.map((e: GraphElement) => { element: e, direction: 'to'}) as LinkInfo[];
      }
    }
    return res;
  }

  public get relation(): RelationType | undefined {
    if (this.field?.data?.relation) {
      return this.field.data.relation;
    }
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

  public async editLink(l: LinkInfo) {
    if (!l.element || !this.graph) {
      return;
    }
    this.graph.openElement(l.element);
  }

  public async addNewObjectRelation() {
    if (!this.relation?.objectType || !this.graph || !this.node) {
      return;
    }

    // create target object
    let obs = this.graph.getObservation(this.relation.objectType)!;
    let title = 'new ' + obs.title;

    this.graph
      .addNewNode({
        id: obs.type + '-' + guidGenerator(),
        classId: obs.type,
        kb_source: 'collator',
      })
      .then(async (n) => {
        obs._node = n;
        obs.typeId = this.relation!.type;
        this.graph?.addNode(n);

        this.graph!.addNewEdge(
          {
            fromId: this.node!.id,
            toId: n.id,
            classId: this.relation!.type,
          } as GraphElement
        )
          .then(async (e) => {
            if (this.graph) {
              this.graph.openElement(n);
              this.$forceUpdate();
            }
          })
          .catch((e) => {})
          .finally(() => {
            this.newRelation = undefined;
          });
      });

    // create edge
  }

  public async deleteLink(l: LinkInfo) {
    if (!this.graph || !l.link) {
      return;
    }
    await this.graph.removeEdge(l.link).then((r) => {
      this.graph!.updateEdges();
      this.graph!.parseEntities();
      this.setLinks();
      this.$forceUpdate();
    });
  }

  public setLinks() {
    if (!this.node?._outgoing || !this.relation) {
      this.links = null;
      return;
    }
    let res: LinkInfo[] = [];
    for (const link of this.node._outgoing) {
      if (link.classId === this.relation.type) {
        res.push({ direction: 'to', element: link.to, link, color: link.to ? GraphElement.getBackgroundColor(link.to) : 'blue' });
      }
    }
    this.links = res;
    this.linkIds = this.links!.filter((l) => l.link?.id).map((l) => l.link!.id!);
  }

  public formDef: IFormOptions | null = null;
  public field?: IFormFieldOptions;
  public target?: object;
  public newRelation?: any = null;
  public activeRelation?: any = null;
  public oldRelation?: GraphElement | null = null;

  public addNewRelation() {
    if (!this.graph || !this.node || !this.relation) {
      return;
    }
    this.graph
      .addNewEdge(
        {
          fromId: this.node.id,
          toId: this.newRelation.id,
          classId: this.relation.type,
        } as GraphElement
      )
      .then(async (e) => {})
      .catch((e) => {})
      .finally(() => {
        this.newRelation = undefined;
        this.setLinks();
        this.$forceUpdate();
      });
  }

  public getActiveRelation() {
    let rel = this.node?._outgoing?.find((r) => r.classId === this.relation?.type);
    if (rel) {
      this.activeRelation = { direction: 'to', link: rel, element: rel.to, color: rel.to ? GraphElement.getBackgroundColor(rel.to) : 'blue' };

      this.oldRelation = rel;
    }
  }

  public async updateRelation() {
    if (!this.graph || !this.node || !this.relation || !this.activeRelation) {
      return;
    }

    if (this.oldRelation) {
      await this.graph.removeEdge(this.oldRelation);
      delete this.oldRelation;
    }

    this.graph
      .addNewEdge({
        fromId: this.node.id,
        toId: this.activeRelation.element.id,
        classId: this.relation.type,
      } as GraphElement)
      .then(async (e) => {
        this.getActiveRelation();
      })
      .catch((e) => {})
      .finally(() => {
        this.setLinks();
      });
  }

  mounted() {
    this.getActiveRelation();
    this.setLinks();
  }
}
</script>
