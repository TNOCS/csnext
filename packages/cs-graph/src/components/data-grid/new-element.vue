<template>
  <simplebar class="new-element-form">
    <v-container v-if="source !== null && document !== null">
      <h1>
        <cs-label label="NEW_REPORT"></cs-label> -
        {{ document._featureType.title }}
      </h1>
      <!--  -->
      <cs-form
        :data="document.properties"
        :formdef="formDef"
        class="pt-2 new-element-form"
        id="detailcsform"
        @saved="updateDocument"
      ></cs-form>

      <!-- </simplebar> -->
    </v-container>
  </simplebar>
</template>

<style scoped>
.card-class-title {
  margin-left: 5px;
}

.new-element-form {
  height: 100%;
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */
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
import { Component } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import { guidGenerator, IFormObject, IFormOptions } from "@csnext/cs-core";

import simplebar from "simplebar-vue";

import { GraphDocument } from "../../classes/document/graph-document";
import { FeatureType } from "@csnext/cs-data";

@Component({
  components: { simplebar },
})
export default class NewElement extends WidgetBase {
  public document?: GraphDocument | null = null;

  public source?: DocDatasource | null = null;

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

  public get formDef(): IFormOptions {
    if (!this.source || !this.document) {
      return {};
    }
    return this.source.elementEditorForm(this.document);
  }

  constructor() {
    super();
  }

  public contentLoaded(d: DocDatasource) {
    this.source = d;
    console.log("content loaded");
    console.log(d);
    this.initDocument();
  }

  public initDocument(): Promise<GraphDocument> {
    return new Promise((resolve, reject) => {
      if (!this.source) {
        reject();
        return;
      }
      const document_type = this.widget.data?.document_type ?? "document";

      if (!this.document) {
        // find featuretype
        const type = this.source.findObservation(document_type);
        console.log(type);
        this.document = new GraphDocument({
          type: "node",
          _featureType: type,
          classId: document_type,
          properties: {
            name: "new document",
            type: document_type,
            classId: document_type,
          },
        });
        this.source.addNode(this.document);
        return this.source.saveDocument(this.document);
      }
    });
  }

  mounted() {}
}
</script>
