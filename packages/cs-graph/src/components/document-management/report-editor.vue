<template>
  <simplebar
    style="height: 100%; padding: 5px"
    v-if="source && document && document.properties && formDef !== null"
  >
    <h1>{{ document._featureType.title }}</h1>
    <v-layout v-if="document._originals">
      <v-card
        v-for="original in document._originals"
        :key="original.id"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">
              {{ original.properties.format }}
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{ original.properties.id }}
            </v-list-item-title>     
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text @click="openViewer(original)">
            Open
          </v-btn>
        </v-card-actions>
      </v-card>

      <!-- <v-card @click="openViewer(original)" v-for="original in document._originals" :key="original.id">
            <v-card-title>{{original.properties.id}}</v-card-title>
            <v-card-title>{{original.properties.format}}</v-card-title>
          </v-card> -->
    </v-layout>
    <cs-form
      :data="document.properties"
      :formdef="formDef"
      class="pt-2"
      id="detailcsform"
      @saved="updateDocument"
    ></cs-form>
  </simplebar>
</template>

<style scoped>
.card-class-title {
  margin-left: 5px;
}

.entity-card {
  width: 110px;
  height: 110px;
  margin: 5px;
  /* float:left; */
  border: 1px solid;
}
.entity-link {
  margin: 5px;

  padding: 5px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import { IFormOptions } from "@csnext/cs-core";

import simplebar from "simplebar-vue";
import { GraphDocument } from "../../classes/document/graph-document";
import { NodeLink } from "@csnext/cs-map";
import { GraphElement } from "@csnext/cs-data";

@Component({
  components: { simplebar, NodeLink },
})
export default class DocumentEditor extends WidgetBase {
  public formDef: IFormOptions | null = null;

  public openEntity(entity: GraphElement) {
    if (this.source) {
      this.source.selectElement(entity);
    }
  }

  private getEntityColor(entity?: GraphElement) {
    if (entity) {
      return GraphElement.getBackgroundColor(entity);
    } else {
      return "gray";
    }
  }

  public openViewer(element: GraphDocument) {
    if (!this.source || !this.document) { return; }
    if (element.properties?.format && this.source?.viewerPlugins) {
      const viewer = this.source.viewerPlugins.find(
        (v) => v.formats && v.formats.includes(element.properties!.format)
      );
      if (viewer) {
        viewer.call(element, this.document, this.source);
      }
    }
  }

  public updateDocument() {
    if (!this.source || !this.document) {
      return;
    }
    if (
      this.document.sourceId &&
      (!this.document._source ||
        this.document._source.id !== this.document.sourceId)
    ) {
      // remove existing link
      // source changed
      // alert('source changed');
    }

    this.source.saveDocument(this.document);
  }

  public approvedObservations() {
    if (!this.source || !this.source.activeDocument?._outgoing) {
      return;
    }
    return this.source.activeDocument._outgoing
      .filter((o) => o.classId === "CONTAINS_OBSERVATION" && o.to)
      .map((o) => o.to);
  }

  public approvedElements() {
    if (!this.source || !this.source.activeDocument?._outgoing) {
      return;
    }
    return this.source.activeDocument._outgoing
      .filter((o) => o.classId === "CONTAINS" && o.to)
      .map((o) => o.to);
  }

  public get formDef2(): IFormOptions {
    return {
      showToolbar: false,
      hideTitle: true,
      isPanel: false,
      optionalSupport: true,
      fields: [
        {
          title: "ID",
          _key: "id",
          type: "string",
          readonly: true,
        },
        {
          title: "TITLE",
          _key: "title",
          type: "string",
        },
        {
          title: "NOTE",
          _key: "note",
          type: "textarea",
        },
        {
          title: "SOURCE",
          _key: "sourceId",
          type: "combobox-objects",
          keyText: "title",
          keyValue: "id",
          options: this.source!.sources,
        },
        {
          title: "RELIABILITY",
          _key: "reliability",
          type: "selection",
          group: "score",
          options: [
            "Completely reliable",
            "Usually reliable",
            "Fairly reliable",
            "Not usually reliable",
            "Unreliable",
            "Reliability cannot be judged",
          ],
        },
        {
          title: "CREDIBILITY",
          _key: "credibility",
          type: "selection",
          group: "score",
          options: [
            "Confirmed by other sources",
            "Probably True",
            "Possibly True",
            "Doubtful",
            "Improbable",
            "Truth cannot be judged",
          ],
        },
      ],
    } as IFormOptions;
  }

  public document?: GraphDocument | null = null;

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
    if (this.widget?.data?.source) {
      return this.widget.data.source as DocDatasource;
    }
  }

  public updateForm() {
    if (!this.source || !this.document) { return; }
    this.source.updateDocumentOriginals(this.document);    
    const form = this.source.elementEditorForm(this.document);
    Vue.set(this, "formDef", form);
    
  }

  public contentLoaded() {
    if (!this.source) {
      return;
    }
    this.document = this.source.activeDocument;
    this.updateForm();

    // this.document.updateOriginals();
    
    this.busManager.subscribe(
      this.source!.bus,
      DocDatasource.DOCUMENT,
      (a: string, d: any) => {        
        this.document = d;        
        this.updateForm();        
        this.$forceUpdate();
      }
    );        
  }

  mounted() {
    if (this.source?.activeDocument) {
      this.contentLoaded();
    }
    // this.updateForm();
  }
}
</script>
