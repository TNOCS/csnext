<template>
  <div>    
    <v-container v-if="startMenu">
      <div class="start-menu-title">
        {{ $cs.Translate("START_DOCUMENT_TITLE") }}
      </div>
      <v-layout justify-center class="doc-action-cards">
        <v-hover class="doc-action-card" v-for="ip in source.importPlugins" :key="ip.id">
          <template v-slot:default="{ hover }">
            <v-card              
              :elevation="hover ? 16 : 2"
              width="200"
              height="200"
              @click="doImport(ip)"
            >
              <v-img contain max-height="100" :src="ip.image"></v-img>
              <v-btn class="doc-action-btn" text>{{
                $cs.Translate(ip.title)
              }}</v-btn>
            </v-card>
          </template>
        </v-hover>
        <!-- 
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
        </v-hover> -->
      </v-layout>
    </v-container>

    <div class="editor-grid" v-show="!startMenu" v-if="loaded">
      <div class="filter-row">
        <v-layout>
          <v-combobox
            v-model="source.visibleViewTypes"
            v-if="source.viewTypes"
            :items="Object.values(source.viewTypes)"
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
          <v-tooltip>
          <template v-slot:activator="{ on }">
          <v-btn icon @click="toggleEntities()"><v-icon>done_all</v-icon></v-btn>
          </template>
          {{$cs.Translate('TOGGLE_ENTITIES')}}
          </v-tooltip>
        </v-layout>
      </div>
      
          <div v-if="editor" class="editor-menu-row">
            <div class="document-title">
              {{ source.activeDocument.properties.name }}
            </div>            
            <div class="editor-menu">
              <v-btn-toggle dense>
                
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

                <v-btn @click="setTextEntity()"><v-icon>label</v-icon></v-btn>
                <v-btn @click="setNodeParagraph()"
                :class="{ 'is-active': editor.isActive('node-paragraph') }"
                ><v-icon>description</v-icon></v-btn>
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
                :items="Object.values(source.featureTypes)"
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
import simplebar from "simplebar-vue";

import { DocDatasource } from "./../../datasources/doc-datasource";
import { GraphDocument } from "./../../classes/document/graph-document";
import { ViewType } from "./../../classes/document/view-type";
import { defaultExtensions } from "@tiptap/starter-kit";
import TextExtension from "./plugins/text-extension";
import ParagraphExtension from "./plugins/paragraph-extension";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Axios from "axios";
import { FeatureType } from "@csnext/cs-data";
import { IImportPlugin } from "../..";
import interact from 'interactjs';

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
    if (this.source) {
      return this.source.editor;
    }
  }

  public contextMenuitems: any[] = [];

  public set editor(value: Editor | undefined | null) {
    if (this.source) {
      this.source.editor = value;
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
  // public document?: GraphDocument;
  public node?: Node;
  // v-if="selectionTo !== undefined && selectionFrom !== undefined"

  // public highlight?: Highlight;
  public source: DocDatasource | undefined = undefined;
  public entityBubbleSelection: FeatureType | null = null;
  

  public setEntity() {
    if (
      !this.source?.activeDocument ||
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
    this.source.syncEntities(
      this.source.activeDocument,
      this.source.activeDocument.doc.content,
      true
    );

    // alert(this.entityBubbleSelection?.title);
  }

  public setNodeParagraph() {
    if (
      !this.source?.activeDocument ||
      !this.editor      
    ) {
      return;
    }

    this.editor
      .chain()
      .focus()
      .toggleNodeParagraph()
      .run();
    // this.syncDocumentState();
    // this.source.syncEntities(
    //   this.source.activeDocument,
    //   this.source.activeDocument.doc.content,
    //   true
    // );

    // alert(this.entityBubbleSelection?.title);
  }

  
  public toggleEntities() {
    if (!this.source?.visibleViewTypes) {
      return;
    }
    if (this.source.visibleViewTypes!.length > 0) {
      this.source.visibleViewTypes = [];
    } else {
      this.source.visibleViewTypes = Object.values(this.source!.viewTypes);
    }
    this.updateViewTypes();
  }

  // public get document(): GraphDocument | undefined {
  //   if (this.source?.activeDocument) {
  //     return this.source.activeDocument;
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
      if (!this.source?.activeDocument || !this.editor) {
        return;
      }
      if (this.source.activeDocument.entities) {
        for (const entity of this.source.activeDocument.entities) {
          this.source.removeEntityFromDocument(entity, this.source.activeDocument);
        }
        this.source.activeDocument.entities = [];
      }
      this.editor?.commands.clearContent();
      this.syncDocumentState();
      this.source.syncEntities(
        this.source.activeDocument,
        this.source.activeDocument.doc.content,
        true
      );
      this.startMenu = true;
    }
  }

  public setTextEntity() {
    if (!this.source?.activeDocument || !this.editor) {
      return;
    }

    this.editor.chain().focus().setTextEntity().run();
    this.syncDocumentState();
    this.source.syncEntities(
      this.source.activeDocument,
      this.source.activeDocument.doc.content,
      true
    );
  }

  // public setTextParagraph() {
  //   if (!this.source?.activeDocument || !this.editor) {
  //     return;
  //   }
  //   this.editor.chain().focus().setTextParagraph().run();
  //   this.syncDocumentState();
  //   this.source.syncEntities(
  //     this.source.activeDocument,
  //     this.source.activeDocument.doc.content,
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
    if (!this.source) {
      return;
    }

    for (const type in this.source!.viewTypes) {
      if (this.source!.viewTypes.hasOwnProperty(type)) {
        const viewType = this.source!.viewTypes[type];
        viewType._selected =
          this.source.visibleViewTypes &&
          this.source.visibleViewTypes.includes(viewType);
      }
    }

    // this.updateEditor();
    // this.$forceUpdate();
    // this.editor.commands.find("living");
  }

  private dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

  public createTextEntities() {
    console.log("create text entities");

    // find all entities without node

    if (
      !this.source?.activeDocument?.entities ||
      !this.source?.activeDocument?.doc ||
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

    const entities = this.source.activeDocument.entities.filter(
      (e) => !e._docEntity && e.position_start && e.position_end
    ).sort(this.dynamicSort('position_start'));

    console.log(entities.map(r => r.position_start));

    for (const entity of entities) {
      try {
        const paragraph = 0; // (pOffset.findIndex((v) => entity.position_start! < v));
        const to = entity.position_end! - additional + paragraph;
        const from = entity.position_start! - additional + paragraph;
        // console.log(`${entity.text} : ${paragraph} : ${from} + ${to}`);
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
    if (!this.source?.activeDocument) {
      return;
    }
    if (!this.source.activeDocument.doc) {
      this.source.activeDocument.doc = {
        type: "doc",
        content: [],
      };
    }
  }

  public updateEditor(destroy = true) {
    console.log("update editor");
    if (!this.source || !this.source?.activeDocument) {
      return;
    }
    this.checkDocument();
    // this.highlight = new Highlight({
    //   disableRegex: false,
    //   // entities: this.source?.activeDocument?.entities
    // });

    if (this.editor && destroy) {
      this.editor.destroy();
      this.source.editor = undefined;
    }

    this.source.syncEntities(
      this.source.activeDocument,
      this.source.activeDocument.doc.content,
      true
    );
    // this.source.parseEntities();
    // this.createTextEntities();

    if (!this.editor) {
      if (
        !this.source.activeDocument.properties?.text ||
        this.source.activeDocument.properties.text.length === 0
      ) {
        this.startMenu = true;
      }
      this.editor = new Editor({
        extensions: [
          ...defaultExtensions(),
          // SmilieReplacer,
          TextExtension,
          ParagraphExtension,
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
          //       return Object.values(this.source!.graph).filter(item => item._title && item._title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
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
        content: this.source?.activeDocument.doc,
        editorProps: {
          document: this.source!.activeDocument,
          source: this.source,
          attributes: {
            spellcheck: "false",
          },
        } as any,
      });
    }

    // this.editor.content = ; // this.source?.activeDocument?.originalText;
    // this.editor.options./ = false;
    // this.editor.on("transaction", (a: any) => {
    //   // console.log(a);
    //   const state = a.state;
    //   if (state.selection && this.source?.activeDocument?.entities) {
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
    //       const entity = this.source.activeDocument.entities.find(
    //         (e) =>
    //           e.position_start !== undefined &&
    //           e.position_end !== undefined &&
    //           e.position_end >= pos &&
    //           e.position_start <= pos
    //       );
    //       if (this.source && entity) {
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
    //           // this.source.toggleElement(entity._node);
    //           this.source.selectElement(entity._node, false);
    //           // this.source!.selectElement(entity._node, true);
    //         } else {

    //         }
    //       } else {
    //         this.selectedEntity = undefined;
    //       }
    //       }
    //       // const entity = this.source.activeDocument.entities.find(
    //       //   (e) =>
    //       //     e.position_start !== undefined &&
    //       //     e.position_end !== undefined &&
    //       //     e.position_end >= from &&
    //       //     e.position_start <= from
    //       // );

    //     } else {
    //       // if (to - from < 20) {
    //       this.selectionText = this.source.activeDocument.originalText!.substring(
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

  public loadDocument(doc: GraphDocument) {
    if (this.source && doc) {
      // if (this.source.activeDocument === doc) {
      //   return;
      // }

      console.log("load document");
      this.source.activateDocument(doc).then(() => {
        this.widget.options!.title = doc.name;        
        if (this.source?.activeDocument) {
          // this.source?.openDocumentDetails(this.source.activeDocument, false);
          if (this.source.activeDocument.entities) {
            for (const ent of this.source.activeDocument.entities) {
              if (ent._node) {
                // ent._node._included = true;
              }
            }
          }

          this.loaded = true;

          this.busManager.subscribe(this.source!.bus, "document-entities", () => {        
          });          
        }
      });
      this.mergeEntitites();
    }
  }

  createKG() {
    // debugger;
    if (this.source?.activeDocument) {
      this.source.createKGView([this.source?.activeDocument], true);
    }
  }

  updateContent() {
    Vue.nextTick(() => {
      console.log("update content");
      if (!this.source?.activeDocument) {
        return;
      }

      this.checkDocument();
      // this.checkOriginal();

      if (
        this.source.activeDocument.doc.content &&
        this.source.activeDocument.doc.content.length === 0
      ) {        
        let paragraphs = this.source.activeDocument!.properties?.text?.split(
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
          this.source.activeDocument.doc.content.push(n);
        }
      }

      this.source.syncEntities(
        this.source.activeDocument,
        this.source.activeDocument.doc.content
      );
      if (!this.editor) {
        this.updateEditor();
      }

      this.editor
        ?.chain()
        .clearContent()
        .setContent(this.source.activeDocument.doc, false)
        .run();     
      this.updateViewTypes();
    });
  }

  getText(j: any): string {
    let res = "";
    if (j.content && Array.isArray(j.content)) {
      for (const content of j.content) {
        if (content.hasOwnProperty("type")) {
          switch (content.type) {
            case "node-paragraph":
            case "paragraph":
              res += this.getText(content) + "\n\n";
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
    if (this.source && this.source.visibleViewTypes) {
      Vue.set(
        this,
        "visibleViewTypes",
        this.source.visibleViewTypes.filter((vt) => vt.id !== type.id)
      );
      this.updateViewTypes();
    }
  }

  public async refresh(ignorePopup = false) {
    console.log("refresh");
    if (!this.source) {
      this.contentLoaded(this.widget.content);
      this.source = this.widget.content;
    }
    if (!this.source || !this.source.activeDocument || !this.editor) {
      return;
    }

    if (
      !this.source.activeDocument.entities ||
      this.source.activeDocument.entities.length === 0 ||
      (await $cs.triggerYesNoQuestionDialog(
        "Update entities",
        "This will reset all existing entities"
      )) === "YES"
    ) {
      const json = this.editor.getJSON();
      const text = this.getText(json);
      this.source.activeDocument.entities = [];      
      this.source.activeDocument.properties!.text = text;
      this.source.activeDocument.doc = json;
      this.source.parseDocument(this.source.activeDocument).then(() => {        
        this.createTextEntities();
        this.syncDocumentState();
        this.source!.syncEntities(
          this.source!.activeDocument!,
          this.source!.activeDocument!.doc.content,
          true
        );
      });
    }
  }

  public syncDocumentState() {
    if (!this.source?.activeDocument || !this.editor) {
      return;
    }
    const json = this.editor.getJSON();
    const text = this.getText(json);
    this.source.activeDocument.properties!.text = text;    
    this.source.activeDocument.doc = json;
    this.updateViewTypes();
  }

  public doImport(plugin: IImportPlugin) {
    if (!this.source?.activeDocument)  { return; }
    plugin.callImport(this.source.activeDocument, this.source).then(r => {      
      this.updateContent();
    }).catch(e => {

    }).finally(()=> {
      this.startMenu = false;
    })    
  }
  

  public save() {
    console.log("save");
    if (!this.source || !this.source.activeDocument || !this.editor) {
      return;
    }

    this.syncDocumentState();
    console.log(JSON.stringify(this.source?.activeDocument?.doc));
    this.source.saveDocument(this.source.activeDocument);    
  }


  public contentLoaded(source: DocDatasource) {
    if (this.source !== undefined || !source) {
      return;
    }
    this.source = source;
    this.updateContextMenu();
    console.log("content loaded");    
    this.busManager.subscribe(
      this.source!.bus,
      "document",
      (a: string, d: any) => {        
        this.updateEditor();
        this.updateContent();        
      }
    );    
    this.checkDocumentIdQuery();
  }

  private checkDocumentIdQuery() {
    console.log("check document query");
    if (!$cs.router || !this.source) {
      return;
    }

    if ($cs.router.currentRoute?.query?.id) {
      if (
        this.source.activeDocument?.id !== $cs.router!.currentRoute?.query?.id
      ) {
        
        const doc = this.source.getElement($cs.router.currentRoute.query.id as string) as GraphDocument        
        if (doc) {
          this.loadDocument(doc);
        }
      } else {        
        this.loadDocument(this.source.activeDocument);        
      }
    } else {
      if (this.source.activeDocument) {
        this.loadDocument(this.source.activeDocument);

        const combined = {
          ...$cs.router!.currentRoute.query,
          ...{ id: this.source.activeDocument.id },
        };
        $cs.router.replace(
          { path: $cs.router!.currentRoute.params[0], query: combined },
          () => {},
          () => {
            // console.log(err);
          }
        );
      }      
    }
  }

   private dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  private initializeDragDrop() {
    const position = { x: 0, y: 0 };
     interact('.entity-drag').draggable({
       manualStart: true,
        listeners: {
          start(event) {
            const { currentTarget, interaction } = event;
    let element = currentTarget;
    var clientRect = element.getBoundingClientRect();
            position.x = clientRect.left + document.body.scrollLeft;
            position.y = clientRect.top + document.body.scrollTop;
          },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
      }).on("move", (event) => {        
    const { currentTarget, interaction } = event;
    let element = currentTarget;

    // If we are dragging an item from the sidebar, its transform value will be ''
    // We need to clone it, and then start moving the clone
    if (
      interaction.pointerIsDown &&
      !interaction.interacting() &&
      currentTarget.style.transform === ""
    ) {
      element = currentTarget.cloneNode(true);
      var clientRect = element.getBoundingClientRect();

      // Add absolute positioning so that cloned object lives
      // right on top of the original object
      element.style.position = "absolute";
      element.style.left = 0;
      element.style.top = 0;

      // Add the cloned object to the document
      const container = document.querySelector(".document-editor");
      container && container.appendChild(element);

      const { offsetTop, offsetLeft } = currentTarget;
      position.x = offsetLeft;
      position.y = offsetTop;

      // If we are moving an already existing item, we need to make sure
      // the position object has the correct values before we start dragging it
    } else if (interaction.pointerIsDown && !interaction.interacting()) {
      const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
      const transform = regex.exec(currentTarget.style.transform);

      if (transform && transform.length > 1) {
        position.x = Number(transform[1]);
        position.y = Number(transform[2]);
      }
    }

    // Start the drag event
    interaction.start({ name: "drag" }, event.interactable, element);
  });
  }

  public mounted() {
    console.log("mounted");
    if (!this.source) {
      this.contentLoaded(this.widget.content);
    }    
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
  font-size: 24px;
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
  max-width: 30px !important;
  /* margin: 4px; */
}


</style>