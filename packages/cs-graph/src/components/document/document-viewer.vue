<template>
  <div>
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
    <v-container v-if="startMenu">
      <div class="start-menu-title">
        {{ $cs.Translate("START_DOCUMENT_TITLE") }}
      </div>
      <v-layout justify-center class="doc-action-cards">
        <v-hover class="doc-action-card">
          <template v-slot:default="{ hover }">
            <v-card
              @click="uploadPdf()"
              :elevation="hover ? 16 : 2"
              width="200"
              height="200"
            >
              <v-img contain max-height="100" src="images/pdf.svg"></v-img>
              <v-btn class="doc-action-btn" text>{{
                $cs.Translate("IMPORT_PDF")
              }}</v-btn>
            </v-card>
          </template>
        </v-hover>
        <v-hover class="doc-action-card">
          <template v-slot:default="{ hover }">
            <v-card
              @click="createEmptyDocument()"
              :elevation="hover ? 16 : 2"
              width="200"
              height="200"
            >
              <v-img contain max-height="100" src="images/empty.svg"></v-img>
              <v-btn class="doc-action-btn" text>{{
                $cs.Translate("EMPTY_DOCUMENT")
              }}</v-btn>
            </v-card>
          </template>
        </v-hover>
        <v-hover class="doc-action-card">
          <template v-slot:default="{ hover }">
            <v-card
              disabled
              @click="createTemplate()"
              :elevation="hover ? 16 : 2"
              width="200"
              height="200"
            >
              <v-img contain max-height="100" src="images/template.svg"></v-img>
              <v-btn class="doc-action-btn" text>{{
                $cs.Translate("TEMPLATE_DOCUMENT")
              }}</v-btn>
            </v-card>
          </template>
        </v-hover>
        <v-hover class="doc-action-card">
          <template v-slot:default="{ hover }">
            <v-card
              disabled
              @click="importUrl()"
              :elevation="hover ? 16 : 2"
              width="200"
              height="200"
            >
              <v-img contain max-height="100" src="images/template.svg"></v-img>
              <v-btn class="doc-action-btn" text>{{
                $cs.Translate("OPEN_URL")
              }}</v-btn>
            </v-card>
          </template>
        </v-hover>
      </v-layout>
    </v-container>

    <div class="editor-grid" v-show="!startMenu" v-if="loaded">
      <div class="filter-row">
          <v-combobox
            v-model="isrd.visibleViewTypes"
            v-if="isrd.viewTypes"
            :items="Object.values(isrd.viewTypes)"
            item-text="id"
            return-object
            chips
            flat
            @change="updateViewTypes()"
            label="Select entity types"
            multiple
            prepend-icon="label"
            solo
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggleEntities()">
                <v-list-item-action>                  
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select / Deselect All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>

            <template v-slot:selection="{ attrs, item, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                :color="item.color"
              >
                <strong>{{ item.title }}</strong
                >&nbsp;
              </v-chip>
            </template>
          </v-combobox>
      </div>
      
          <div v-if="editor" class="editor-menu-row">
            <div class="document-title">
              {{ isrd.activeDocument.properties.name }}
            </div>            
            <div class="editor-menu">
              <v-btn-toggle>
                
                <v-btn
                  @click="editor.chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
                >
                  <v-icon>format_bold</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
                >
                  <v-icon>format_italic</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
                >
                  <v-icon>format_strikethrough</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleHighlight().run()"
                  :class="{ 'is-active': editor.isActive('highlight') }"
                >
                  <v-icon>highlight</v-icon>
                </v-btn>
             
                <v-btn
                  @click="editor.chain().focus().setParagraph().run()"
                  :class="{ 'is-active': editor.isActive('paragraph') }"
                >
                  <v-icon>segment</v-icon>
                </v-btn>
                <v-btn
                  @click="
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  "
                  :class="{
                    'is-active': editor.isActive('heading', { level: 1 }),
                  }"
                >
                  h1
                </v-btn>
                <v-btn
                  @click="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  "
                  :class="{
                    'is-active': editor.isActive('heading', { level: 2 }),
                  }"
                >
                  h2
                </v-btn>              
                <v-btn
                  @click="editor.chain().focus().toggleBulletList().run()"
                  :class="{ 'is-active': editor.isActive('bulletList') }"
                >
                  <v-icon>format_list_bulleted</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleOrderedList().run()"
                  :class="{ 'is-active': editor.isActive('orderedList') }"
                >
                  <v-icon>format_list_numbered</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleCodeBlock().run()"
                  :class="{ 'is-active': editor.isActive('codeBlock') }"
                >
                  <v-icon>code</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().toggleBlockquote().run()"
                  :class="{ 'is-active': editor.isActive('blockquote') }"
                >
                  <v-icon>format_quote</v-icon>
                </v-btn>
                <v-btn
                  @click="editor.chain().focus().setHorizontalRule().run()"
                >
                  <v-icon>horizontal_rule</v-icon>
                </v-btn>                
                <v-btn @click="editor.chain().focus().undo().run()"
                  ><v-icon>undo</v-icon></v-btn
                >
                <v-btn @click="editor.chain().focus().redo().run()"
                  ><v-icon>redo</v-icon></v-btn
                >

                <v-btn @click="setTextEntity()">entity</v-btn>
              </v-btn-toggle>              
            </div>
          </div>
       
    
          <!-- <div > -->
          <simplebar class="editor-row">
            <bubble-menu :editor="editor" v-if="editor">    
              <v-autocomplete
                v-if="!editor.isActive('text-entity')"
                auto-select-first
                v-model="entityBubbleSelection"
                :items="Object.values(isrd.featureTypes)"
                item-text="title"
                return-object
                @change="setEntity(entityBubbleSelection)"
                dense
                rounded
                filled
              ></v-autocomplete>
            </bubble-menu>
            <editor-content
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              class="document-editor editor__content"
              :editor="editor"
            />
          </simplebar>
          <!-- </div> -->
    </div>    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { TextEntity } from "@csnext/cs-data";
import { Editor, EditorContent, Node, BubbleMenu } from "@tiptap/vue-2";
import SelectionPopup from "./selection-popup.vue";
// import "../../assets/sass/main.scss";
import simplebar from "simplebar-vue";

import { DocDatasource } from "./../../datasources/doc-datasource";
import { IntelDocument } from "./../../classes/document/intel-document";
import { ViewType } from "./../../classes/document/view-type";
import { defaultExtensions } from "@tiptap/starter-kit";
import TextExtension from "./plugins/text-extension";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
// import TextParagraph from "./plugins/text-paragraph";
// import BubbleMenu from '@tiptap/extension-bubble-menu';
import Axios from "axios";
// import { FeatureType } from "../../classes";
import { Drag, Drop } from "vue-drag-drop";
import { FeatureType } from "@csnext/cs-data";

@Component({
  components: {
    simplebar,
    EditorContent,
    BubbleMenu,
    // EditorMenuBubble,
    SelectionPopup,
  },
})
export default class DocumentViewer extends WidgetBase {
  public get editor(): Editor | undefined | null {
    if (this.isrd) {
      return this.isrd.editor;
    }
  }

  public contextMenuitems: any[] = [];

  public set editor(value: Editor | undefined | null) {
    if (this.isrd) {
      this.isrd.editor = value;
    }
  }

  @Prop()
  public content?: any;
  @Ref()
  public uploader!: HTMLElement;
  public selectedEntity?: TextEntity | null = null;
  public keepInBounds = true;
  public selection?: any = null;
  public loaded = false;
  public startMenu = false;
  public selectionText? = "";
  public selectionFrom?: number = 0;
  public selectionTo?: number = 0;
  public isLoading?: boolean;
  public showPopup = true;
  // public document?: IntelDocument;
  public node?: Node;
  // v-if="selectionTo !== undefined && selectionFrom !== undefined"

  // public highlight?: Highlight;
  public isrd: DocDatasource | undefined = undefined;
  public entityBubbleSelection: FeatureType | null = null;
  

  public setEntity() {
    if (
      !this.isrd?.activeDocument ||
      !this.editor ||
      !this.entityBubbleSelection?.type
    ) {
      return;
    }

    this.editor
      .chain()
      .focus()
      .setTextEntity({ class: this.entityBubbleSelection?.type })
      .run();
    this.syncDocumentState();
    this.isrd.syncEntities(
      this.isrd.activeDocument,
      this.isrd.activeDocument.doc.content,
      true
    );

    // alert(this.entityBubbleSelection?.title);
  }

  public filesChange(fieldName: string, fileList: any[]) {
    // alert('upload');
    this.startMenu = false;

    // if (!this.newReportType) { return; }
    // // handle file changes
    const formData = new FormData();
    if (!fileList.length) return;
    // append the files to FormData

    Array.from(Array(fileList.length).keys()).map((x) => {
      formData.append("file", fileList[x], fileList[x].name);
    });
    console.log("parsing pdf");
    this.isLoading = true;
    $cs.loader.addLoader("pdfimport");
    $cs.triggerNotification({
      title: $cs.Translate("PDF_IMPORT_STARTED"),
      color: "green",
    });
    Axios.post("http://localhost:5003", formData, {
      timeout: 1000 * 60 * 5,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((r) => {
        this.isLoading = false;
        if (this.isrd?.activeDocument && r.data?.message) {
          this.isrd.activeDocument.doc = undefined;
          this.isrd.activeDocument.entities = undefined;
          // this.isrd.activeDocument.properties!.originalText = r.data.message;
          this.isrd.activeDocument.properties!.text = r.data.message;
          this.updateContent();
          // this.save();
          // this.loadDocument(this.isrd.activeDocument);

          //   this.isrd.addNewReport(this.newReportType!).then((r) => {
          //   if (r?.id) {
          //     this.openDocument(r.id);
          //   }
          // });

          // create document
        }
      })
      .catch((e) => {
        this.isLoading = false;
        console.log(e);
      })
      .finally(() => {
        $cs.loader.removeLoader("pdfimport");
      });
  }

  public toggleEntities() {
    if (!this.isrd?.visibleViewTypes) {
      return;
    }
    if (this.isrd.visibleViewTypes!.length > 0) {
      this.isrd.visibleViewTypes = [];
    } else {
      this.isrd.visibleViewTypes = Object.values(this.isrd!.viewTypes);
    }
    this.updateViewTypes();
  }

  // public get document(): IntelDocument | undefined {
  //   if (this.isrd?.activeDocument) {
  //     return this.isrd.activeDocument;
  //   }
  // }

  public updateContextMenu() {
    this.contextMenuitems = [];
    this.contextMenuitems.push({
      title: "entity",
      icon: "label",
      action: () => {
        alert("hide");
      },
    });
  }

  public mergeEntitites() {
    // this.updateContent();
  }

  public async clear() {
    if (
      (await $cs.triggerYesNoQuestionDialog(
        "EMPTY_DOCUMENT",
        "EMPTY_DOCUMENT_TEXT"
      )) === "YES"
    ) {
      if (!this.isrd?.activeDocument || !this.editor) {
        return;
      }
      if (this.isrd.activeDocument.entities) {
        for (const entity of this.isrd.activeDocument.entities) {
          this.isrd.removeEntityFromDocument(entity, this.isrd.activeDocument);
        }
        this.isrd.activeDocument.entities = [];
      }
      this.editor?.commands.clearContent();
      this.syncDocumentState();
      this.isrd.syncEntities(
        this.isrd.activeDocument,
        this.isrd.activeDocument.doc.content,
        true
      );
      this.startMenu = true;
    }
  }

  public setTextEntity() {
    if (!this.isrd?.activeDocument || !this.editor) {
      return;
    }

    this.editor.chain().focus().setTextEntity().run();
    this.syncDocumentState();
    this.isrd.syncEntities(
      this.isrd.activeDocument,
      this.isrd.activeDocument.doc.content,
      true
    );
  }

  // public setTextParagraph() {
  //   if (!this.isrd?.activeDocument || !this.editor) {
  //     return;
  //   }
  //   this.editor.chain().focus().setTextParagraph().run();
  //   this.syncDocumentState();
  //   this.isrd.syncEntities(
  //     this.isrd.activeDocument,
  //     this.isrd.activeDocument.doc.content,
  //     true
  //   );
  // }

  public beforeDestroy() {
    if (!this.editor) {
      return;
    }
    this.editor.destroy();
  }

  constructor() {
    super();
  }

  public testEntity() {
    if (!this.editor) {
      return;
    }
    alert("test entity");
  }

  updateViewTypes() {
    console.log("update view types");
    if (!this.isrd) {
      return;
    }

    for (const type in this.isrd!.viewTypes) {
      if (this.isrd!.viewTypes.hasOwnProperty(type)) {
        const viewType = this.isrd!.viewTypes[type];
        viewType._selected =
          this.isrd.visibleViewTypes &&
          this.isrd.visibleViewTypes.includes(viewType);
      }
    }

    // this.updateEditor();
    // this.$forceUpdate();
    // this.editor.commands.find("living");
  }

  public createTextEntities() {
    console.log("create text entities");

    // find all entities without node

    if (
      !this.isrd?.activeDocument?.entities ||
      !this.isrd?.activeDocument?.doc ||
      !this.editor
    ) {
      return;
    }
    let chain = this.editor.chain();
    let additional = -1;
    const pOffset: number[] = [];
    let offset = 0;
    // this.editor.state.doc.

    for (const p of (this.editor.state.doc.content as any).content) {
      console.log(p.textContent);
      offset += p.textContent.length - 1;
      pOffset.push(offset);
    }

    console.log(pOffset);

    for (const entity of this.isrd.activeDocument.entities.filter(
      (e) => !e._docEntity && e.position_start && e.position_end
    )) {
      try {
        const paragraph = pOffset.findIndex((v) => entity.position_start! < v);
        const to = entity.position_end! - additional + paragraph;
        const from = entity.position_start! - additional + paragraph;
        console.log(`${entity.text} : ${paragraph} : ${from} + ${to}`);
        // const docent = { id: entity.entity_idx, text: entity.text, type: 'city' };
        chain.setTextSelection({ from, to }).setTextEntity(entity);
        // this.editor.commands.replaceRange({
        //   from: entity.position_start! - additional,
        //   to: entity.position_end! - additional
        // }, "text-entity", docent );
        // entity._docEntity = docent as any;
      } catch (e) {
        console.log(entity);
        console.log(e);
      }
      additional += entity.position_end! - entity.position_start! - 1;
    }
    chain.run();
  }

  public checkDocument() {
    if (!this.isrd?.activeDocument) {
      return;
    }
    if (!this.isrd.activeDocument.doc) {
      this.isrd.activeDocument.doc = {
        type: "doc",
        content: [],
      };
    }
  }

  public updateEditor(destroy = true) {
    console.log("update editor");
    if (!this.isrd?.activeDocument) {
      return;
    }
    this.checkDocument();
    // this.highlight = new Highlight({
    //   disableRegex: false,
    //   // entities: this.isrd?.activeDocument?.entities
    // });

    if (this.editor && destroy) {
      this.editor.destroy();
      this.isrd.editor = undefined;
    }

    this.isrd.syncEntities(
      this.isrd.activeDocument,
      this.isrd.activeDocument.doc.content,
      true
    );
    // this.isrd.parseEntities();
    // this.createTextEntities();

    if (!this.editor) {
      if (
        !this.isrd.activeDocument.properties?.text ||
        this.isrd.activeDocument.properties.text.length === 0
      ) {
        this.startMenu = true;
      }
      this.editor = new Editor({
        extensions: [
          ...defaultExtensions(),
          // SmilieReplacer,
          TextExtension,
          Highlight,
          Placeholder,
          // BubbleMenu.configure({
          //   element: document.querySelector('.menu'),
          // }),
          // CodeBlockLowlight
          // .extend({
          //   addNodeView() {
          //     return VueNodeViewRenderer(CodeBlockComponent)
          //   },
          // }).configure({}),
          // .configure({ lowlight }),
          // DragHandle,
          // TextParagraph,
          // Entity.configure({
          //   HTMLAttributes: {
          //     class: 'text-entity',
          //   },
          //   suggestion: {
          //     items: (query:any) => {
          //       return Object.values(this.isrd!.graph).filter(item => item._title && item._title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
          //     },
          //     render: () => {
          //       let component: any;
          //       let popup: any;

          //       return {
          //         onStart: (props: any) => {
          //           component = new VueRenderer(EntityList, {
          //             parent: this,
          //             propsData: props,
          //           });

          //           console.log(props);
          //           console.log(component);

          //           popup = tippy('body', {
          //             getReferenceClientRect: props.clientRect,
          //             appendTo: () => document.body,
          //             content: component.element,
          //             showOnCreate: true,
          //             interactive: true,
          //             trigger: 'manual',
          //             placement: 'bottom-start',
          //           })
          //         },
          //         onUpdate(props: any) {
          //           console.log('update entity');
          //           component.updateProps(props)

          //           popup[0].setProps({
          //             getReferenceClientRect: props.clientRect,
          //           })
          //         },
          //         onKeyDown(props: any) {
          //           return component.ref?.onKeyDown(props)
          //         },
          //         onExit() {
          //           popup[0].destroy()
          //           component.destroy()
          //         },
          //       }
          //     },
          //   },
          // }),
        ],
        onTransaction({ transaction }) {
          //  transaction.
          //   if (transaction.steps) {
          //       for (const step of transaction.steps) {
          //         console.log(step);
          //       }
          //   }
          //   console.log(transaction);
          // debugger;
        },
        // content: `
        //   <p>
        //     This is still the text editor you’re used to, but enriched with node views.
        //   </p>
        //   <text-entity id="Q1773">component 1</text-entity>
        //   <p>
        //     Did you see that? That’s a Vue component. We are really living in the future.
        //   </p>
        // `,
        content: this.isrd?.activeDocument.doc,
        editorProps: {
          document: this.isrd!.activeDocument,
          source: this.isrd,
          attributes: {
            spellcheck: "false",
          },
        } as any,
      });
    }

    // this.editor.content = ; // this.isrd?.activeDocument?.originalText;
    // this.editor.options./ = false;
    // this.editor.on("transaction", (a: any) => {
    //   // console.log(a);
    //   const state = a.state;
    //   if (state.selection && this.isrd?.activeDocument?.entities) {
    //     this.selection = state.selection;
    //     const from = state.selection.from;
    //     const to = state.selection.to;
    //     this.selectionFrom = from;
    //     this.selectionTo = to;
    //     // no selection, use cursor pos
    //     if (from === to) {
    //       let pos = this.selection?.$cursor?.pos;
    //       // console.log('cursor: ' + pos);
    //       // console.log('anchor ' + this.selection?.$anchor?.pos);
    //       // console.log('head ' + this.selection?.$head?.pos);

    //       if (pos) {
    //       const entity = this.isrd.activeDocument.entities.find(
    //         (e) =>
    //           e.position_start !== undefined &&
    //           e.position_end !== undefined &&
    //           e.position_end >= pos &&
    //           e.position_start <= pos
    //       );
    //       if (this.isrd && entity) {
    //         this.selectedEntity = entity;
    //         // console.log(this.selectedEntity.text);
    //         // console.log(this.selectedEntity.position_start +  ' - ' + this.selectedEntity.position_end);
    //         if (this.selectedEntity.position_start && this.selectedEntity.position_end) {
    //           this.editor.setSelection(this.selectedEntity.position_start + 1, this.selectedEntity.position_end);
    //           this.editor.focus();
    //         }

    //         // const transaction = a.setSelection(new TextSelection(this.selectedEntity.position_start, this.selectedEntity.position_end));
    //         // this.editor!.dispatch(transaction);

    //         if (entity._node) {
    //           // this.isrd.toggleElement(entity._node);
    //           this.isrd.selectElement(entity._node, false);
    //           // this.isrd!.selectElement(entity._node, true);
    //         } else {

    //         }
    //       } else {
    //         this.selectedEntity = undefined;
    //       }
    //       }
    //       // const entity = this.isrd.activeDocument.entities.find(
    //       //   (e) =>
    //       //     e.position_start !== undefined &&
    //       //     e.position_end !== undefined &&
    //       //     e.position_end >= from &&
    //       //     e.position_start <= from
    //       // );

    //     } else {
    //       // if (to - from < 20) {
    //       this.selectionText = this.isrd.activeDocument.originalText!.substring(
    //         from - 1,
    //         to - 1
    //       );
    //       // } else {
    //       //   this.selectionText = undefined;

    //       // }
    //     }
    //   }
    // });
  }

  public loadDocument(doc: IntelDocument) {
    if (this.isrd && doc) {
      // if (this.isrd.activeDocument === doc) {
      //   return;
      // }

      console.log("load document");
      this.isrd.activateDocument(doc).then(() => {
        this.widget.options!.title = doc.name;
        // this.isrd!.activeDocument = doc;
        if (this.isrd?.activeDocument) {
          this.isrd?.openDocumentDetails(this.isrd.activeDocument, false);
          if (this.isrd.activeDocument.entities) {
            for (const ent of this.isrd.activeDocument.entities) {
              if (ent._node) {
                // ent._node._included = true;
              }
            }
          }

          this.loaded = true;

          this.busManager.subscribe(this.isrd!.bus, "document-entities", () => {
            // if (a === "updateHighlights" && this.highlight) {
            //   this.refreshHighlights();
            //   this.$forceUpdate();
            // } else {
            //   this.updateContent();
            //   this.refreshHighlights();
            //   this.$forceUpdate();
            // }
          });
          //   this.isrd?.selectElement(this.isrd?.activeDocument?._node);
        }
      });
      this.mergeEntitites();
    }
  }

  createKG() {
    // debugger;
    if (this.isrd?.activeDocument) {
      this.isrd.createKGView([this.isrd?.activeDocument], true);
    }
  }

  updateContent() {
    Vue.nextTick(() => {
      console.log("update content");
      if (!this.isrd?.activeDocument) {
        return;
      }

      this.checkDocument();

      if (
        this.isrd.activeDocument.doc.content &&
        this.isrd.activeDocument.doc.content.length === 0
      ) {
        //   this.isrd.activeDocument.doc = JSON.parse(this.isrd.activeDocument?._node.properties?.document); // this.editor?.commands.setContent(html, true);
        // } else {
        let paragraphs = this.isrd.activeDocument!.properties?.text?.split(
          "\n\n"
        );
        for (const par of paragraphs) {
          const n = {
            type: "paragraph",
            attrs: { length: par.length },
            content: [] as any[],
          };
          let lines = par.split("\n");
          if (lines) {
            for (const line of lines) {
              if (line.length > 0) {
                n.content.push({ type: "text", text: line });
              }
            }
          }
          this.isrd.activeDocument.doc.content.push(n);
        }
      }

      this.isrd.syncEntities(
        this.isrd.activeDocument,
        this.isrd.activeDocument.doc.content
      );
      if (!this.editor) {
        this.updateEditor();
      }

      this.editor
        ?.chain()
        .clearContent()
        .setContent(this.isrd.activeDocument.doc, false)
        .run();

      // this.editor.setContent(document, true); //  = document; // this.isrd.activeDocument!.originalText; //document; // setContent(document, true);

      // console.log('document');
      //         console.log(document);

      // this.editor.setContent(
      //   {
      //     type: "doc",
      //     content: [
      //       {
      //         type: "paragraph",
      //         content: [
      //           {
      //             type: "text",
      //             text: this.isrd.activeDocument!.originalText,
      //           }
      //         ],
      //       }
      //     ],
      //   },
      //   true
      // );

      // const view = this.editor.view;
      // const state = this.editor.view.state;
      // this.highlight!.options.entities = this.isrd.activeDocument!.entities;
      // this.highlight!.options.isrd = this.isrd;
      // this.updateCssClasses();
      // this.refreshHighlights();
      // this.createTextEntities();
      // this.$forceUpdate();
    });
  }

  getText(j: any): string {
    let res = "";
    if (j.content && Array.isArray(j.content)) {
      for (const content of j.content) {
        if (content.hasOwnProperty("type")) {
          switch (content.type) {
            case "paragraph":
              res += this.getText(content) + "\n";
              break;
            case "text":
              res += content.text ?? "";
              break;
            case "text-entity":
              res += content.attrs.text ?? "";
              break;
          }
        }
      }
    }
    return res;
  }

  public refreshHighlights() {
    // this.editor.commands.find("living");
    // alert('hi');
  }

  public removeViewType(type: ViewType) {
    if (this.isrd && this.isrd.visibleViewTypes) {
      Vue.set(
        this,
        "visibleViewTypes",
        this.isrd.visibleViewTypes.filter((vt) => vt.id !== type.id)
      );
      this.updateViewTypes();
    }
  }

  public async refresh(ignorePopup = false) {
    console.log("refresh");
    if (!this.isrd) {
      this.contentLoaded(this.widget.content);
      this.isrd = this.widget.content;
    }
    if (!this.isrd || !this.isrd.activeDocument || !this.editor) {
      return;
    }

    if (
      !this.isrd.activeDocument.entities ||
      this.isrd.activeDocument.entities.length === 0 ||
      (await $cs.triggerYesNoQuestionDialog(
        "Update entities",
        "This will reset all existing entities"
      )) === "YES"
    ) {
      const json = this.editor.getJSON();
      const text = this.getText(json);
      this.isrd.activeDocument.entities = [];
      this.isrd.activeDocument.originalText = text;
      this.isrd.activeDocument.doc = json;
      // console.log(text);
      // this.isrd.activeDocument.originalText = this.content;
      this.isrd.parseDocument(this.isrd.activeDocument).then(() => {
        // this.updateContent();
        this.createTextEntities();
        this.syncDocumentState();
        this.isrd!.syncEntities(
          this.isrd!.activeDocument!,
          this.isrd!.activeDocument!.doc.content,
          true
        );

        // this.$forceUpdate();
        // this.contentLoaded();
      });
    }
  }

  public syncDocumentState() {
    if (!this.isrd?.activeDocument || !this.editor) {
      return;
    }
    const json = this.editor.getJSON();
    const text = this.getText(json);
    this.isrd.activeDocument.originalText = text;
    // this.isrd.activeDocument._node.properties!.document =
    this.isrd.activeDocument.doc = json;
  }

  public uploadPdf() {
    this.uploader.click();
  }

  public createEmptyDocument() {
    this.startMenu = false;
  }

  public createTemplate() {
    this.startMenu = false;
  }

  public save() {
    console.log("save");
    if (!this.isrd || !this.isrd.activeDocument || !this.editor) {
      return;
    }

    this.syncDocumentState();
    console.log(JSON.stringify(this.isrd?.activeDocument?.doc));
    this.isrd.saveDocument(this.isrd.activeDocument);
    // this.updateEditor();

    // console.log(text);
    // // this.isrd.activeDocument.originalText = this.content;
    // this.isrd.parseDocument(this.isrd.activeDocument).then(r=> {
    //   this.contentLoaded();
    // })
  }

  // public async refreshEntities() {
  //   if (!this.isrd || !this.document) {
  //     return;
  //   }

  //   // const data = this.editor!.getJSON();
  //   if (this.doc) {
  //     const text = this.doc;
  //     if (text.length > 0) {
  //       this.document.originalText = text;
  //       await this.isrd.callEntityRecognize(this.isrd.activeDocument);

  //     }
  //   }

  //   // this.isrd.activeDocument.originalText = this.editor!.getHTML();
  // }

  public contentLoaded(isrd: DocDatasource) {
    if (this.isrd !== undefined || !isrd) {
      return;
    }
    this.isrd = isrd;
    this.updateContextMenu();
    console.log("content loaded");
    // console.log(isrd);
    this.busManager.subscribe(
      this.isrd!.bus,
      "document",
      (a: string, d: any) => {
        // alert('document loaded');
        // this.document = d;
        // this.checkDocumentIdQuery();
        this.updateEditor();
        this.updateContent();
        // console.log('init report');
        // console.log(this.document);
      }
    );
    // this.busManager.subscribe(
    //   isrd.bus,
    //   GraphDatasource.GRAPH_EVENTS,
    //   (a: string) => {
    //     if (a === GraphDatasource.GRAPH_LOADED) {
    //       console.log("Graph Loaded");
    //       this.checkDocumentIdQuery();
    //     }
    //   }
    // );
    this.checkDocumentIdQuery();

    // this.updateEditor();
    // this.updateContent();
  }

  private checkDocumentIdQuery() {
    console.log("check document query");
    if (!$cs.router || !this.isrd) {
      return;
    }

    // alert('checking docs:' + this.isrd?.documents?.length);
    if ($cs.router.currentRoute?.query?.id) {
      if (
        this.isrd.activeDocument?.id !== $cs.router!.currentRoute?.query?.id
      ) {
        const doc = this.isrd.documents.find(
          (d) => d.id === $cs.router!.currentRoute?.query?.id
        );
        if (doc) {
          this.loadDocument(doc);
        }
      } else {
        // this.document = this.isrd.activeDocument;
        this.loadDocument(this.isrd.activeDocument);
        // this.updateEditor();
        // this.$forceUpdate();
        // alert('jop')
        // this.document = this.isrd.activeDocument;
        // this.updateEditor();
        // this.loadDocument(this.isrd.activeDocument);
      }
    } else {
      if (this.isrd.activeDocument) {
        this.loadDocument(this.isrd.activeDocument);

        const combined = {
          ...$cs.router!.currentRoute.query,
          ...{ id: this.isrd.activeDocument.id },
        };
        $cs.router.replace(
          { path: $cs.router!.currentRoute.params[0], query: combined },
          () => {},
          () => {
            // console.log(err);
          }
        );
      }
      // this.$router.currentRoute?.query?.id
    }
  }

  public mounted() {
    console.log("mounted");
    // this.updateEditor();

    // console.log("isrd");
    // console.log(this.isrd);
    // this.checkDocumentIdQuery();

    // if (this.isrd?.activeDocument) {
    //   this.loadDocument(this.isrd.activeDocument);
    // }
    if (!this.isrd) {
      this.contentLoaded(this.widget.content);
    }
    // this.refresh();
  }
}
</script>


<style>


.editor-grid {
  padding: 5px;
  max-height: 100%;
  display: grid;  
  grid-template-rows: 50px 100px 100%;
  grid-gap: 10px;
  max-height: calc(100vh - 276px);
}
.filter-row
{
  grid-row: 1;

}
.editor-menu-row
{
  grid-row: 2;

}
.editor-row
{
grid-row: 3;
/* overflow-x:hidden;
overflow-y: auto; */
/* max-height: 300px; */
}



.editor-scroll {
  /* height: 300px; */
  /* position: absolute; */
  /* height: calc(100vh - 400px); */
  /* top: 0px;
  bottom: 0px;
  left: 0px; 
  right: 0; */
  /* width: 100%; */
  /* right: 4px; */
}
.tag-list {
  margin-left: 10px;
  margin-right: 5px;
}
.ProseMirror {
  outline-style: none !important;
  padding: 5px;
  font-size: 25px;
  height: 100%;
}

.linked-entity {
  background-color: "lightgray";
  border-width: 2px !important;
}

/* .linked-entity.image {
   content:url(http://placehold.it/350x150);
}​ */

.rec-entity {
  background: lightgray;
}

.deselected-entity {
  background: transparent !important;
  border-style: dotted !important;
  /* border-color: lightgray !important;   */
}

.highlight-entity {
  background: yellow !important;
  border-color: yellow;
  border-width: 3px;
  cursor: pointer;
}

.country {
  background: lightblue;
}

.doc-entity {
  margin: 3px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: gray;
  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;

  cursor: pointer;
}

/* .weapon-entity:before {  
   content:url(http://placehold.it/15x15);
} */

.document-editor {
  /* margin-left: 30px; */
  /* width: 50%; */
}

.find {
  background: orange;
}

.find:hover {
  border-color: black;
  background: yellow;
}

.details-description-editor {
  padding: 5px;
  height: 100%;
}

.document-title {
  font-size: 30px;
  font-weight: bold;
}

.is-active {
  background: darkgray !important;
  color: white !important;
}

.tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 20;
  background: white;
  border: 1px solid silver;
  border-radius: 2px;
  padding: 2px 10px;
  margin-bottom: 7px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.tooltip:before {
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -6px;
  border: 5px solid transparent;
  border-bottom-width: 0;
  border-top-color: silver;
}
.tooltip:after {
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -4.5px;
  border: 5px solid transparent;
  border-bottom-width: 0;
  border-top-color: white;
}

.start-menu-title {
  margin-top: 100px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 50px;
}

.doc-action-cards {
}

.doc-action-btn {
  width: 100%;
}

.doc-action-card {
  padding-top: 20px;
  margin: 10px;
}

.text-entity {
  color: black;
  background-color: lightgrey;
  border-radius: 0.3rem;
  padding: 0.1rem 0.3rem;
}

.editor-menu .v-btn {
  background: lightgrey;
  /* margin: 4px; */
}
</style>


// <style lang="scss">
// $color: red;
// .global-drag-handle {
//   position: absolute;

//   &::after {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 1rem;
//     height: 1.25rem;
//     content: "⠿";
//     font-weight: 700;
//     cursor: grab;
//     background: #0d0d0d10;
//     color: #0d0d0d50;
//     border-radius: 0.25rem;
//   }
// }
// </style>