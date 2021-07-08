<template>
  <div v-if="field">
    <div v-if="field.data.relation.multiple">
      <v-layout
        >{{ field.title }}
        <v-btn @click="addNewObjectRelation()" icon style="margin-top: -5px"
          ><v-icon>add</v-icon></v-btn
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
              ><v-icon small>delete</v-icon></v-btn
            >
            <v-btn
              class="relation-card-action"
              small
              icon
              @click="duplicate(link)"
              ><v-icon small>content_copy</v-icon></v-btn
            >
            <v-btn
              class="relation-card-action"
              small
              icon
              @click="editLink(link)"
              ><v-icon small>edit</v-icon></v-btn
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
        prepend-icon="playlist_add"
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
      </v-combobox>
    </div>
    <div v-else>
      <v-combobox
        :items="getItems()"
        v-model="activeRelation"
        :label="
          $cs.Translate(field.title) + ' (' + field.data.relation.type + ')'
        "
        :hint="field.hint"
        itemText="_title"
        hide-no-data
        clearable
        @change="updateRelation()"
        :return-object="true"
        itemValue="id"
        :persistentHint="field.persistentHint"
        :disabled="field.readonly"
        :append-outer-icon="field._appendIcon"
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
import { Component } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import {
  guidGenerator,
  IFormFieldOptions,
  IFormOptions,
} from "@csnext/cs-core";

import simplebar from "simplebar-vue";

import { NodeLink, DataInfoPanel } from "@csnext/cs-map";
import Vue from "vue";
import { DocDatasource } from "../../datasources/doc-datasource";
import { RelationType } from "@csnext/cs-data";
import { LinkInfo, GraphElement } from '@csnext/cs-data';

@Component({
  props: {
    field: undefined,
    target: undefined,
  } as any,
  components: { simplebar, NodeLink, DataInfoPanel },
})
export default class RelationEditor extends Vue {

  public links : LinkInfo[] | null = null;

  public getItems() {
    if (this.graph && this.relation?.objectType) {
      console.log("Get items---");
      console.log(this.relation);
      return this.graph!.getClassElements(this.relation.objectType, true);
    } else {
      return [];
    }
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
    let title = "new " + obs.title;

    this.graph
      .addNewNode({
        id: obs.type + "-" + guidGenerator(),        
        classId: obs.type,
        kb_source: "collator",
      })
      .then(async (n) => {
        obs._node = n;
        obs.typeId = this.relation!.type;
        this.graph?.addNode(n);

        this.graph!.addNewEdge({
          fromId: this.node!.id,
          toId: n.id,
          classId: this.relation!.type,
        } as GraphElement)
          .then(async (e) => {
            if (this.graph) {
              await this.graph.addEdge(e);
              await this.graph.parseEntities();
              await this.graph.updateEdges();
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
        res.push({ direction: "to", element: link.to, link });
      }
    }
    this.links= res;
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
    console.log("Add new relation");
    console.log(this.newRelation);
    this.graph
      .addNewEdge({
        fromId: this.node.id,
        toId: this.newRelation.id,
        classId: this.relation.type,
      } as GraphElement)
      .then(async (e) => {
        await this.graph!.addEdge(e);
        await this.graph!.updateEdges();
        await this.graph!.parseEntities();        
      })
      .catch((e) => {})
      .finally(() => {
        this.newRelation = undefined;
        this.setLinks();
        this.$forceUpdate();
      });
  }

  public getActiveRelation() {
    let rel = this.node?._outgoing?.find(r => r.classId === this.relation?.type);
    if (rel) {
      this.activeRelation = rel?.to;
      this.oldRelation = rel;
    }
    
  }

  public async updateRelation() {
    if (!this.graph || !this.node || !this.relation || !this.activeRelation) {
      return;
    }
    console.log("new relation");
    console.log(this.activeRelation);

    if (this.oldRelation) {
      await this.graph.removeEdge(this.oldRelation);
      delete this.oldRelation;
    }
    
    // if (this.node._outgoing)

    this.graph
      .addNewEdge({
        fromId: this.node.id,
        toId: this.activeRelation.id,
        classId: this.relation.type,
      } as GraphElement)
      .then(async (e) => {
        await this.graph!.addEdge(e);
        await this.graph!.updateEdges();
        await this.graph!.parseEntities();
        this.getActiveRelation();
      })
      .catch((e) => {})
      .finally(() => {   
        this.setLinks();     
      });

    // alert('update relation');
  }

  mounted() {
    this.getActiveRelation();
    this.setLinks();
    console.log("relation graph");
    if (this.field) {
      console.log(this.field);
      // conso
      // console.log(this.field!.data)
    }
  }
}
</script>
