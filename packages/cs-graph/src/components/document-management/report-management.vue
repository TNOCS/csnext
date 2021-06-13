<template>
  <simplebar class="full-page">
    <v-data-table
      v-if="isrd"
      :search="search"
      :headers="headers"
      :disable-pagination="true"
      :items="reports"
      item-key="id"
      :options="tableOptions"
      show-group-by
      group-by="classId"
      class="elevation-0"
      :custom-filter="filterDocuments"
      @click:row="documentSelected"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $cs.Translate("DOCUMENTS") }}</v-toolbar-title>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- <vue-dropzone :options="dropzoneOptions" :useCustomSlot="true">
            <div class="dropzone-custom-content">
              <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
              <div class="subtitle">...or click to select a file from your computer</div>
            </div>
          </vue-dropzone> -->
          <v-btn color="primary" class="ma-2" @click="addDocument()">
            <v-icon>add</v-icon>
            {{ $cs.Translate("ADD_DOCUMENT") }}
          </v-btn>

          <input
            class="d-none input-file"
            ref="uploader"
            type="file"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept=".pdf"
          />

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" class="ma-2" v-on="on" :loading="isLoading">
                <v-icon>publish</v-icon>
                {{ $cs.Translate("UPLOAD_REPORT") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in reportTypes"
                :key="index"
                @click="uploadReport(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" class="ma-2" v-on="on">
                <v-icon>add</v-icon>
                {{ $cs.Translate("NEW_REPORT") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in reportTypes"
                :key="index"
                @click="addReport(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn @click="isrd.simulate()">simulate</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click.stop="editDocument(item)">mdi-pencil</v-icon>
        <v-icon @click.stop="deleteItem(item)">mdi-delete</v-icon>
      </template>    
    </v-data-table>
  </simplebar>
</template>

<style>

.dialog-style {
  min-height: 500px;
}

.full-page {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.text-start {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { DocDatasource } from "../../datasources/doc-datasource";
import NewDocument from "./new-document.vue";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

import simplebar from "simplebar-vue";
import { GraphDocument } from "../../classes/document/graph-document";
import { FeatureType } from "@csnext/cs-data";
import { GraphElement } from '@csnext/cs-data';
import Axios from "axios";
import { WidgetOptions } from "@csnext/cs-core";

@Component({
  components: { simplebar, vueDropzone },
})
export default class DocumentManagement extends WidgetBase {
  @Ref()
  public file!: HTMLElement;
  @Ref()
  public uploader!: HTMLElement;
  public uploadFile: any;
  public uploadFieldName: string = "";
  public isLoading = false;
  public headers = [
    { text: "name", value: "properties.name" },
    { text: "type", value: "properties.classId", groupable: true },
    { text: "source", value: "_source._title", groupable: true },
    { text: "reliability", value: "reliability", groupable: true },
    { text: "credibility", value: "credibility", groupable: true },    
    { text: "Actions", value: "actions", sortable: false },
  ];

  public search = "";

  public tableOptions = {
    pagination: {
      itemsPerPage: 100,
    },
  };
  public newReportType?: FeatureType;

  public get isrd(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public get reportTypes(): FeatureType[] | undefined {
    if (this.isrd?.featureTypes) {
      return Object.values(this.isrd.featureTypes).filter((ft) =>
        ft.baseType?.includes("report")
      );
    }
  }

  // public reports : GraphElement[] | null = null;

  public get reports() : GraphElement[] | null {

    
    if (!this.isrd) {
      return null;
    }

    console.log('get reports');

    if (this.widget?.data?.operation) {
      const reports = this.isrd.getClassElements("document", true, {
        hasObjectTypeRelation: {
          PART_OF_OPERATION: this.widget.data.operation,
        },
      }) ?? null;
      return reports;
      // alert(this.widget.data.operation);      
    } else {      
      const reports = this.isrd.getClassElements("document", true) ?? null;
      return reports;
    }
  }

  public filterDocuments(value: string, search: string, item: GraphElement) {
    return value != null && search != null && value.indexOf(search) !== -1;
  }

  public openDocument(id: string) {
    $cs.router?.push(`/document?id=${id}`);
  }

  filesChange(fieldName: string, fileList: any[]) {

    if (!this.newReportType) { return; }
    // handle file changes
    const formData = new FormData();
    if (!fileList.length) return;
    // append the files to FormData

    Array.from(Array(fileList.length).keys()).map((x) => {
      formData.append("file", fileList[x], fileList[x].name);
    });
    this.isLoading = true;
    Axios.post("http://localhost:5003", formData, {
      timeout: 1000 * 60 * 5,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((r) => {
        this.isLoading = false;
        if (this.isrd && r.data?.message) {
          this.isrd.addNewReport(this.newReportType!).then((r) => {
          if (r?.id) {
            this.openDocument(r.id);
          }
        });

          // create document
        }
      })
      .catch((e) => {
        this.isLoading = false;
        console.log(e);
      })
  }
 
  public async addDocument() {
   
            
    this.isrd?.addNewDocument(true).then((r) => {
      if (r?.id) {
        this.openDocument(r.id);
      }
    });
  }

  public uploadReport(type: FeatureType): void {
    this.newReportType = type;
    this.uploader.click();
  }

  public async addReport(type: FeatureType) {

    this.newReportType = type;
    
     $cs.triggerDialog({
                widget: {
                    component: NewDocument,
                    options: {
                        hideColorBar: true,
                        class: 'dialog-style',
                        itemPropertyKey: 'layerDirectory', detailWidgetKey: 'layer', title: 'LAYERS_AVAILABLE',
                        showItemImage: true, itemImageProperty: 'icon',
                        actions: [
                            { icon: 'add', ddAction: 'event', eventId: 'include', title: 'ADD_LAYER' }
                        ], sortProperties: ['title'],
                    } as unknown as WidgetOptions,
                    datasource: 'isrd',
                    data: {
                      document_type: this.newReportType?.type
                    }
                },
                fullscreen: false,
                hide: false,
                visible: true,
                width: 700
            }).then(r => {
                alert('add report');
            })
    // this.isrd!.addNewReport(type).then((r) => {
    //   if (r?.id) {
    //     this.openDocument(r.id);
    //   }
    // });
  }

  public documentSelected(doc: GraphDocument) {
    if (doc?.id) {
      this.openDocument(doc.id);
    }
  }

  public deleteItem(doc: GraphDocument) {
    this.isrd?.deleteDocument(doc);
  }

  public editDocument(doc: GraphElement) {
    // this.isrd?.activateDocument(doc);
    // this.isrd?.openDocumentDetails(doc);
    if (doc && this.isrd) {
      this.isrd?.selectElement(doc, true);
    }
  }

  public getDocuments(): GraphDocument[] | undefined {
    return undefined;
  }

  constructor() {
    super();
  }

  public contentLoaded() {
    if (this.isrd?.events) {
      this.busManager.subscribe(this.isrd.events, IsrdDatasource.DOCUMENT, (a: string, d: any) => {        
        // this.updateReports();
        this.$forceUpdate();
      })      
    }
    // this.updateReports();
    if (this.widget.options) {
      // let selectionSizePlugin = new Plugin({
      //   view(editorView) {
      //     return new SelectionSizeTooltip(editorView);
      //   }
      // });
    }
  }



  mounted() {
    // this.updateReports();
  }
}
</script>
