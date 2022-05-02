<template>
  <v-container v-if="startMenu">
    <div class="start-menu-title">
      {{ $cs.Translate('START_DOCUMENT_TITLE') }}
    </div>
    <v-container class="doc-action-cards d-flex flex-wrap">
      <v-hover class="doc-action-card" v-for="ip in source.importPlugins" :key="ip.id">
        <template v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="200" height="200" @click="doImport(ip)">
            <v-img contain max-height="100" :src="ip.image"></v-img>
            <v-btn class="doc-action-btn" text>{{ $cs.Translate(ip.title) }}</v-btn>
          </v-card>
        </template>
      </v-hover>
    </v-container>
  </v-container>

  <div v-else-if="loaded && currentDocument" class="editor-grid" v-show="!startMenu">
    <v-toolbar flat class="graph-menu" v-if="currentDocument && !hideHeader">
      <v-layout id="dropdown-example-2" class="graph-toolbar-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn depressed fab icon outlined v-bind="attrs" v-on="on" raised>
              <v-icon v-if="currentDocument.properties.editor_mode === 'EDIT'">mdi-pencil</v-icon>
              <v-icon v-if="currentDocument.properties.editor_mode === 'VIEW'">mdi-eye</v-icon>
              <v-icon v-if="currentDocument.properties.editor_mode === 'LEARN'">mdi-school</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setEditorMode('EDIT')">
              <v-icon>mdi-pencil</v-icon>
              <v-list-item-title>Edit Mode</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setEditorMode('VIEW')">
              <v-icon>mdi-eye</v-icon>
              <v-list-item-title>View Mode</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setEditorMode('LEARN')">
              <v-icon>mdi-school</v-icon>
              <v-list-item-title>Learn Mode</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <template v-if="currentDocument.properties.editor_mode && currentDocument.properties.editor_mode === 'LEARN'">
          <v-layout class="learn-toolbar">
            <v-radio-group v-model="currentDocument.properties.learn_mode" row>
              <v-radio label="Review" value="REVIEW"></v-radio>
              <v-radio label="Learn" value="LEARN"></v-radio>
            </v-radio-group>

            <!-- v-if="currentDocument.properties.learn_mode === 'LEARN'"  -->
            <v-select v-model="currentDocument.activeLearningType" :items="Object.values(source.featureTypes)" item-text="title" item-value="id">
            </v-select>
          </v-layout>
        </template>
        <template v-else>
          
          <v-sheet class="document-entities-sheet">
         <v-slide-group class="document-entities-group" show-arrows v-if="currentDocument && currentDocument._entityTypes" >
            <v-slide-item v-for="(type, tid) of currentDocument._entityTypes" :key="tid">
              <v-chip
                :outlined="!type._selected"
                @click="type._selected = !type._selected"                
                :color="type.color"
                small
                class="ml-2"
                v-if="currentDocument._flat.show_all_entities || type._featureType"
              >
                <v-icon small v-if="type._featureType && type._featureType.icon" left>{{ type._featureType.icon }}</v-icon>
                {{ type.title }}
                <v-avatar right dark class="darken-4">
                  {{ type.count }}
                </v-avatar>
              </v-chip>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
        </template>
        <v-spacer></v-spacer>
        <v-switch v-model="currentDocument._flat.show_all_entities"> </v-switch>

        <v-btn icon @click="selectDocumentAction(action)" v-for="action in documentActionsMenu" :key="action.id">
          <v-icon>{{ action.icon }}</v-icon>
        </v-btn>
        <v-btn @click="startMenu = !startMenu" icon>
          <v-icon>mdi-import</v-icon>
        </v-btn>
        <v-btn @click="save()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn @click="openDetails()" icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </v-layout>
      <template v-slot:extension v-if="currentDocument.properties.editor_mode === 'EDIT'">
        <v-sheet  v-if="editor" class="document-tools-sheet">
          <v-slide-group show-arrows v-if="documentToolsMenu" class="document-tools-group">
            <v-slide-item v-for="(tool, ti) in documentToolsMenu"  :key="ti" v-slot="{ active }">
            <v-btn icon @click="selectDocumentTool(tool)" :class="{ 'is-active': tool.isActive }" :key="tool.id">
              <v-icon>{{ tool.icon }}</v-icon>
            </v-btn>
            </v-slide-item>
            <!-- <v-btn-toggle dense group> -->
            <!-- <v-btn @click="setTextEntity()"><v-icon>mdi-label</v-icon></v-btn> -->
            <!-- <v-btn @click="editor.chain().focus().toggleElementProperty().run()" :class="{ 'is-active': editor.isActive('element-property') }"
                ><v-icon>mdi-pencil</v-icon></v-btn
              > -->
            <!-- <v-btn @click="setElementCard()" :class="{ 'is-active': editor.isActive('element-card') }"><v-icon>mdi-card</v-icon></v-btn> -->
            
            
            
            
            
            
            
            
            
            
            <!-- <v-btn @click="setNodeParagraph()" :class="{ 'is-active': editor.isActive('node-paragraph') }"
              ><v-icon>mdi-format-paragraph</v-icon></v-btn
            >
            

            <v-btn @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
              <v-icon>mdi-segment</v-icon>
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{
                'is-active': editor.isActive('heading', { level: 1 }),
              }"
            >
              h1
            </v-btn>
            <v-btn
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{
                'is-active': editor.isActive('heading', { level: 2 }),
              }"
            >
              h2
            </v-btn>
            <v-btn @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
              <v-icon>mdi-code-tags</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
              <v-icon>mdi-format-quote-close</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().setHorizontalRule().run()">
              <v-icon>mdi-reorder-horizontal</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().undo().run()"><v-icon>mdi-undo</v-icon></v-btn>
            <v-btn @click="editor.chain().focus().redo().run()"><v-icon>mdi-redo</v-icon></v-btn> -->
            <!-- </v-btn-toggle> -->
          </v-slide-group>
        </v-sheet>
      </template>
    </v-toolbar>

    <!-- <div > -->

    <div class="editor-row" v-if="currentDocument && currentDocument.properties">
      <div class="document-container">
        
        <div class="document-title">
          <v-layout>
            <v-btn icon @click="toggleTitle()">
              <v-icon v-if="editTitle">mdi-content-save</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
            <v-text-field v-if="editTitle" single-line v-model="currentDocument.properties.name" label="title"></v-text-field>
            <span v-else>{{ currentDocument.properties.name }}</span>
          </v-layout>
        </div>
        <div class="document-source">
          Created {{ publishedDate() }} ago,
          <simple-relation-line-section :source="source" :section="{ direction: 'outgoing', relation: 'HAS_SOURCE' }" :node="currentDocument">
          </simple-relation-line-section>
        </div>
        <!-- <floating-menu :editor="editor" v-if="editor && currentDocument.properties.editor_mode === 'EDIT'">
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            H1
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            H2
          </button>
          <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            Bullet List
          </button>
        </floating-menu> -->
        <!-- <mention-list :editor="editor" v-if="editor"></mention-list> -->
        <!-- <bubble-menu :editor="editor" v-if="editor">
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
        </bubble-menu> -->
        <editor-content
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          v-scroll-stop="true"
          class="document-editor editor__content"
          :editor="editor"
        />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { WidgetBase } from '@csnext/cs-client';
import { DateUtils, FeatureType, TextEntity } from '@csnext/cs-data';
import { SimpleRelationLineSection } from '@csnext/cs-map';
import Dropcursor from '@tiptap/extension-dropcursor';
import Mention from '@tiptap/extension-mention';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { BubbleMenu, Editor, EditorContent, FloatingMenu, Node } from '@tiptap/vue-2';
// import simplebar from 'simplebar-vue';
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import { IImportPlugin, suggestion } from '../..';
import { DocUtils } from '../../utils/doc-utils';
import { DocDatasource, GraphDocument, ITool } from './../../';
import Commands from './plugins/commands/commands';
import commandSuggestion from './plugins/commands/commands-suggestion';
import ElementCardExtension from './nodes/element-card/element-card-extension';

import ParagraphExtension from './nodes/node-paragraph/paragraph-extension';
import ElementPropertyExtension from './nodes/element-property/element-property-extension';

import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import ActionList from './plugins/text-action/text-action-list.vue';
import textAction from './plugins/text-action/text-action';

import TextExtension from './nodes/text-entity/text-extension';
import SelectionPopup from './selection-popup.vue';
import { IMenu } from '@csnext/cs-core';

@Component({
  components: {
    // simplebar,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    SimpleRelationLineSection,
    ActionList,
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

  public dragInitialized = false;
  public contextMenuitems: any[] = [];

  // actions that apply to part of document (bold, heading, etc.)
  public documentToolsMenu: IMenu[] = [];

  // tools that apply to whole document
  public documentActionsMenu: IMenu[] = [];

  public set editor(value: Editor | undefined | null) {
    if (this.source) {
      this.source.editor = value;
    }
  }

  public get hideHeader(): boolean {
    return (this.widget?.options as any).hideHeader || false;
  }

  public toggleTitle() {
    this.editTitle = !this.editTitle;
    if (!this.editTitle && this.source && this.currentDocument) {
      this.source.saveNode(this.currentDocument);
    }
  }

  public async selectDocumentTool(tool: IMenu) {
    if (tool.action && this.currentDocument) {
      await tool.action(tool);
    }
  }

  public async selectDocumentAction(tool: IMenu) {
    if (tool.action && this.currentDocument) {
      await tool.action(tool);
    }
  }

  public updateDocumentTools() {
    this.documentToolsMenu = [
      {
        icon: 'mdi-label',
        action: (m, a) => {
          this.setTextEntity();
        },
        isActive: false,
      },
      {
        icon: 'mdi-card',
        action: () => {
          this.setElementCard();
        },
      },
      {
        icon: 'mdi-format-bold',
        action: () => {
          this.editor!.chain().focus().toggleBold().run();
        },
        isActive: ()=> this.editor!.isActive('bold')
      },
      {
        icon: 'mdi-format-italic',
        action: () => {
          this.editor!.chain().focus().toggleItalic().run();
        },
      },
      {
        icon: 'mdi-format-strikethrough',
        action: () => {
          this.editor!.chain().focus().toggleStrike().run();
        },
      },
    ];
  }

  // <v-btn @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
  //             <v-icon>mdi-format-bold</v-icon>
  //           </v-btn>
  //           <v-btn @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
  //             <v-icon>mdi-format-italic</v-icon>
  //           </v-btn>
  //           <v-btn @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
  //             <v-icon>mdi-format-strikethrough</v-icon>
  //           </v-btn>
  //           <v-btn @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
  //             <v-icon>mdi-marker</v-icon>
  //           </v-btn>

  public updateDocumentActions() {
    if (!this.source?.tools || !this.currentDocument) {
      return;
    }
    this.documentActionsMenu.splice(0, this.documentToolsMenu.length);
    for (const tool of this.source.tools) {
      if (tool.documentActions && typeof tool.documentActions === 'function') {
        let actions = tool.documentActions(this.currentDocument);
        if (actions) {
          for (const mi of actions) {
            this.documentActionsMenu.push(mi);
          }
        }
      }
    }
  }

  @Prop()
  public content?: any;
  @Ref()
  public uploader!: HTMLElement;
  public selectedEntity?: TextEntity | null = null;
  public keepInBounds = true;
  public selection?: any = null;
  public editMode = true;
  public loaded = false;
  public startMenu = false;
  public selectionText? = '';
  public selectionFrom?: number = 0;
  public selectionTo?: number = 0;
  public isLoading?: boolean;
  public showPopup = true;
  public extendedToolbar = false;
  public editTitle = false;
  // public document?: GraphDocument;
  public node?: Node;
  // v-if="selectionTo !== undefined && selectionFrom !== undefined"

  // public highlight?: Highlight;
  public source: DocDatasource | undefined = undefined;
  public entityBubbleSelection: FeatureType | null = null;

  public doc;

  public setEntity() {
    if (!this.source || !this.currentDocument || !this.editor || !this.entityBubbleSelection?.type) {
      return;
    }

    this.editor.chain().focus().setTextEntity({ spacy_label: this.entityBubbleSelection?.type }).run();
    this.syncDocumentState();
    DocUtils.syncEntities(this.currentDocument, this.source, this.currentDocument.properties?.doc?.content, true);
  }

  public setEditorMode(mode: string) {
    Vue.set(this.currentDocument!.properties!, 'editor_mode', mode);
    if (this.editor) {
      this.editor!.setEditable(mode === 'EDIT');
    }
    this.$forceUpdate();
  }

  public setElementCard() {
    if (!this.currentDocument || !this.editor) {
      return;
    }

    this.editor.chain().focus().toggleElementCard().run();
  }

  private publishedDate() {
    if (!this.currentDocument) {
      return;
    }
    return DateUtils.dateDistanceString(this.currentDocument);
  }

  public setNodeParagraph() {
    if (!this.currentDocument || !this.editor) {
      return;
    }

    this.editor.chain().focus().toggleNodeParagraph().run();
  }

  public updateContextMenu() {
    this.contextMenuitems = [];
    this.contextMenuitems.push({
      title: 'entity',
      icon: 'label',
      action: () => {
        alert('hide');
      },
    });
  }

  public async clear() {
    if ((await $cs.triggerYesNoQuestionDialog('EMPTY_DOCUMENT', 'EMPTY_DOCUMENT_TEXT')) === 'YES') {
      if (!this.source || !this.currentDocument || !this.editor) {
        return;
      }
      if (this.currentDocument._entities) {
        for (const entity of this.currentDocument._entities) {
          this.source.removeEntityFromDocument(entity, this.currentDocument);
        }
        this.currentDocument._entities = [];
      }
      this.editor?.commands.clearContent();
      this.syncDocumentState();
      DocUtils.syncEntities(this.currentDocument, this.source, this.currentDocument.properties?.doc?.content, true);
      this.startMenu = true;
    }
  }

  public setTextEntity() {
    if (!this.source || !this.currentDocument || !this.editor) {
      return;
    }

    this.editor.chain().focus().setTextEntity().run();
    this.syncDocumentState();
    DocUtils.syncEntities(this.currentDocument, this.source, this.currentDocument.properties?.doc?.content, true);
  }

  public beforeDestroy() {
    if (!this.editor) {
      return;
    }

    if (this.source) {
      this.source.removeWidgetTools(this.widget.id!);
    }

    this.editor.destroy();
  }

  private tempDocument: GraphDocument | undefined = undefined;

  constructor() {
    super();
  }

  public currentDocument: GraphDocument | undefined;

  public openElement(document: GraphDocument) {
    Vue.nextTick(()=> {
      this.loadDocument(document);    
      this.updateEditor();
      this.updateContent();
      this.initTools();
    })
  }

  public testEntity() {
    if (!this.editor) {
      return;
    }
    alert('test entity');
  }

  updateEntityTypes() {
    console.log('update entity types');
    if (!this.currentDocument) {
      return;
    }

    for (const type in this.currentDocument._entityTypes) {
      if (this.currentDocument._entityTypes.hasOwnProperty(type)) {
        const entityType = this.currentDocument._entityTypes[type];
        entityType._selected = true;
      }
    }

    this.$forceUpdate();
  }

  private dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  public openDetails() {
    if (this.source && this.currentDocument) {
      this.source.selectElement(this.currentDocument, true);
    }
  }

  public updateStartMenu() {
    if (!this.currentDocument?.properties?.doc) {
      this.startMenu = true;
    } else {
      this.startMenu = false;
    }
  }

  public updateEditor(destroy = true) {
    console.log('update editor');
    if (!this.source || !this.currentDocument) {
      return;
    }

    if (this.editor && destroy) {
      this.editor.destroy();
      this.source.editor = undefined;
    }
    if (!this.editor) {
      this.editor = new Editor({
        
        extensions: [
          StarterKit,
          // SmilieReplacer,
          TextExtension,
          Dropcursor,
          ParagraphExtension,
          ElementCardExtension,
          ElementPropertyExtension,
          TaskList,
          TaskItem,
          Highlight,
          Placeholder,
          Commands.configure({
            commandSuggestion,
          }),
          Mention.extend({
            document: this.currentDocument,
            name: 'text-action',
          }).configure({
            suggestion: textAction,
          }),
          Mention.configure({
            HTMLAttributes: {
              class: 'text-entity',
              name: 'text-entity',
            },
            suggestion,
          }),
        ],
        onTransaction({ transaction }) {},
        content: this.currentDocument?.properties?.doc,
        editable: true,
        editorProps: {
          document: this.currentDocument,
          source: this.source,
          attributes: {
            spellcheck: 'false',
          },
        } as any,
      });
      if (this.currentDocument.properties && !this.currentDocument.properties.editor_mode) {
        this.currentDocument.properties.editor_mode = 'EDIT';
      }
      this.setEditorMode(this.currentDocument.properties!.editor_mode!);
    }
  }

  public loadDocument(doc: GraphDocument) {
    if (this.source && doc) {
      if (!doc.properties) {
        doc.properties = {};
      }
      if (!doc.properties.doc) {
        doc.properties.doc = {
          type: 'doc',
          content: [
            {
              type: 'node-paragraph',
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        };
      }
      this.currentDocument = doc;
      this.state.element = doc;
      
      // check if entities from document are also included in doc._entities
      DocUtils.syncEntities(doc, this.source!, doc.properties.doc.content, false);    

      // link doc._entities to graph entities
      this.source.parseEntities(doc);
      this.loaded = true;
    }
  }

  createKG() {
    if (this.source && this.currentDocument) {
      this.source.createKGView([this.currentDocument], 'default', true);
    }
  }

  updateContent() {
    Vue.nextTick(() => {
      if (!this.source || !this.currentDocument) {
        return;
      }

      // this.checkOriginal();

      if (this.currentDocument.properties?.doc?.content && this.currentDocument.properties.doc.content.length === 0) {
        let paragraphs = this.currentDocument!.properties?.text?.split('\n\n');
        for (const par of paragraphs) {
          const n = {
            type: 'paragraph',
            attrs: { length: par.length },
            content: [] as any[],
          };
          let lines = par.split('\n');
          if (lines) {
            for (const line of lines) {
              if (line.length > 0) {
                n.content.push({ type: 'text', text: line });
              }
            }
          }
          this.currentDocument.properties?.doc?.content.push(n);
        }
      }

      this.currentDocument._entities = [];

      DocUtils.syncEntities(this.currentDocument, this.source, this.currentDocument.properties?.doc.content, false);
      if (!this.editor) {
        this.updateEditor();
      }

      this.editor?.chain().clearContent().setContent(this.currentDocument.properties?.doc, false).run();
      this.updateEntityTypes();
    });
  }

  getText(j: any): string {
    let res = '';
    if (j.content && Array.isArray(j.content)) {
      for (const content of j.content) {
        if (content.hasOwnProperty('type')) {
          switch (content.type) {
            case 'node-paragraph':
            case 'paragraph':
              res += this.getText(content) + '\n\n';
              break;
            case 'text':
              res += content.text ?? '';
              break;
            case 'text-entity':
              res += content.attrs.text ?? '';
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

  public async refresh(ignorePopup = false) {
    console.log('refresh');
    if (!this.source) {
      this.contentLoaded(this.widget.content);
      this.source = this.widget.content;
    }
    if (!this.source || !this.currentDocument || !this.editor) {
      return;
    }

    if (
      !this.currentDocument._entities ||
      this.currentDocument._entities.length === 0 ||
      (await $cs.triggerYesNoQuestionDialog('Update entities', 'This will reset all existing entities (currently not supported!!!)')) === 'YES'
    ) {
      const json = this.editor.getJSON();
      const text = this.getText(json);
      this.currentDocument._entities = [];
      this.currentDocument.properties!.text = text;
      this.currentDocument.properties!.doc = json;
      this.source.parseDocument(this.currentDocument).then((d) => {
        if (this.currentDocument && d.properties?.doc) {
          this.currentDocument.properties!.doc = d.properties.doc;
          this.updateContent();
          DocUtils.syncEntities(this.currentDocument!, this.source!, this.currentDocument!.properties!.doc, true);
          this.source!.parseEntities(this.currentDocument!);
        }
      });
    }
  }

  public syncDocumentState() {
    if (!this.source || !this.currentDocument || !this.editor) {
      return;
    }
    const json = this.editor.getJSON();
    const text = this.getText(json);
    this.currentDocument.properties!.text = text;
    this.currentDocument.properties!.doc = json;
    this.updateEntityTypes();
  }

  public doImport(plugin: IImportPlugin) {
    if (!this.source || !this.currentDocument) {
      return;
    }
    plugin
      .callImport(this.currentDocument, this.source)
      .then((r) => {
        this.updateContent();
      })
      .catch((e) => {})
      .finally(() => {
        this.startMenu = false;
      });
  }

  public save() {
    console.log('save');
    if (!this.source || !this.currentDocument || !this.editor) {
      return;
    }

    this.syncDocumentState();
    console.log(JSON.stringify(this.currentDocument?.doc));
    this.source.saveDocument(this.currentDocument);
  }

  public contentLoaded(source: DocDatasource) {
    if (this.source !== undefined || !source) {
      return;
    }
    this.source = source;
        
    console.log('document content loaded');
    this.busManager.subscribe(this.source!.bus, DocDatasource.DOCUMENT_ENTITIES, (a: string, d: any) => {
      if (a === DocDatasource.ENTITIES_UPDATED) {
        console.log('document content updated from messagebus');
        // this.checkDocumentIdQuery();        
      }
    });
    this.busManager.subscribe(this.source!.bus, 'document', (a: string, d: any) => {
      console.log('document updated');
      this.$forceUpdate();
      // this.updateEditor();
      // this.updateContent();
      // this.initTools();
    });
    if (this.state && this.state.elementid) {
      const doc = this.source.getElement(this.state.elementid) as GraphDocument;
      this.openElement(doc);      
    } else if (this.checkDocumentIdQuery()) {
      console.log('got from uri')
    } else {
      if (this.state?.element) {
        this.openElement(this.state.element);
      }
    }
    
    // this.initTools();
    this.initDragging();
    this.updateContextMenu();
  }

  private checkDocumentIdQuery() : boolean {
    if (!$cs.router || !this.source) {
      return false;
    }

    if ($cs.router.currentRoute?.query?.docid) {
      if (this.currentDocument?.id !== $cs.router!.currentRoute?.query?.docid) {
        const doc = this.source.getElement($cs.router.currentRoute.query.docid as string) as GraphDocument;
        if (doc) {
          this.openElement(doc);
        }
      } else {
        this.openElement(this.currentDocument);
      }
      return true;
    } else { 
      return false;
    }
    
    // else {
    //   let d: GraphDocument = (this.source.activeElement as GraphDocument) || this.currentDocument;
    //   if (d) {
    //     this.openElement(d);

    //     const combined = {
    //       ...$cs.router!.currentRoute.query,
    //       ...{ docid: d.id },
    //     };
    //     $cs.router.replace(
    //       { path: $cs.router!.currentRoute.params[0], query: combined },
    //       () => {},
    //       () => {
    //         // console.log(err);
    //       }
    //     );
    //   }
    
  }

  private dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  private initializeDragDrop() {
    const position = { x: 0, y: 0 };
    //   interact('.entity-drag')
    //     .draggable({
    //       manualStart: true,
    //       listeners: {
    //         start(event) {
    //           const { currentTarget, interaction } = event;
    //           let element = currentTarget;
    //           var clientRect = element.getBoundingClientRect();
    //           position.x = clientRect.left + document.body.scrollLeft;
    //           position.y = clientRect.top + document.body.scrollTop;
    //         },
    //         move(event) {
    //           position.x += event.dx;
    //           position.y += event.dy;
    //           event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    //         },
    //       },
    //     })
    //     .on('move', (event) => {
    //       const { currentTarget, interaction } = event;
    //       let element = currentTarget;

    //       // If we are dragging an item from the sidebar, its transform value will be ''
    //       // We need to clone it, and then start moving the clone
    //       if (interaction.pointerIsDown && !interaction.interacting() && currentTarget.style.transform === '') {
    //         element = currentTarget.cloneNode(true);
    //         var clientRect = element.getBoundingClientRect();

    //         // Add absolute positioning so that cloned object lives
    //         // right on top of the original object
    //         element.style.position = 'absolute';
    //         element.style.left = 0;
    //         element.style.top = 0;

    //         // Add the cloned object to the document
    //         const container = document.querySelector('.document-editor');
    //         container && container.appendChild(element);

    //         const { offsetTop, offsetLeft } = currentTarget;
    //         position.x = offsetLeft;
    //         position.y = offsetTop;

    //         // If we are moving an already existing item, we need to make sure
    //         // the position object has the correct values before we start dragging it
    //       } else if (interaction.pointerIsDown && !interaction.interacting()) {
    //         const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
    //         const transform = regex.exec(currentTarget.style.transform);

    //         if (transform && transform.length > 1) {
    //           position.x = Number(transform[1]);
    //           position.y = Number(transform[2]);
    //         }
    //       }

    //       // Start the drag event
    //       interaction.start({ name: 'drag' }, event.interactable, element);
    //     });
  }

  public initTools() {
    if (!this.source) {
      return;
    }
    this.updateStartMenu();
    this.source.addTool({
      id: 'article_importer',
      title: 'Article Importer',
      widget: this.widget,
      subtitle: 'Article import',
      image: 'images/entity_analysis.png',
      action: async () => {
        try {
          // find article import
          if (this.source?.importPlugins && this.currentDocument) {
            const importPlugin = this.source.importPlugins.find((i) => i.id === 'online-document');
            if (importPlugin) {
              await importPlugin.callImport(this.currentDocument, this.source);
              await this.refresh();
              return Promise.resolve(true);
            } else {
              return Promise.resolve(false);
            }
          }
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
    this.source.addTool({
      id: 'entity_analysis',
      title: 'Entity Analysis',
      widget: this.widget,
      subtitle: 'Entity Recognition, Search, Linking, Geo/time recognition',
      image: 'images/entity_analysis.png',
      documentActions: (e) => {
        return [
          {
            icon: 'mdi-sim-outline',
            title: 'Entity Recognition',
            action: async () => {              
              await this.refresh();
              this.updateEntityTypes();
            },
          },
        ];
      },
      action: async () => {
        try {
          this.updateEntityTypes();
          await this.refresh();
          return Promise.resolve(true);
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
    this.updateDocumentActions();
    this.updateDocumentTools();
  }

  initDragging() {
    if (this.dragInitialized) {
      return;
    }
    this.dragInitialized = true;
    const position = { x: 0, y: 0 };

    // interact('.paragraph-component')
    // interact('#doc-editor')
    //   .dropzone({
    //     ondrop: async (e) => {
    //       e.stopImmediatePropagation();
    //       let pos = { x: 100, y: 100 };
    //       // if (e._interaction?.coords?.cur?.client) {
    //       //   pos = this.graph!.getPointByClient(e._interaction.coords.cur.client.x, e._interaction.coords.cur.client.y);
    //       // }

    //       if (e.interaction?.element) {
    //         e.interaction.element.remove();
    //       }
    //     //   if (e.relatedTarget?.dataset?.elementid) {
    //     //     // find element
    //     //     const existingElement = this.source!.getElement(e.relatedTarget.dataset.elementid);
    //     //     if (existingElement?.id && this.activePreset?.properties?.nodes) {
    //     //       this.activePreset.properties.nodes[existingElement.id] = {
    //     //         x: pos.x,
    //     //         y: pos.y,
    //     //       };

    //     //       this.addElement(existingElement);

    //     //       this.updateGraph(this.source!.graph);
    //     //     }
    //     //   }
    //     //   if (e.relatedTarget?.dataset?.id) {
    //     //     const type = e.relatedTarget?.dataset?.id;

    //     //     if (type && this.graph && this.source) {
    //     //       const ft = this.source.getFeatureTypeById(type);
    //     //       if (ft?.type) {
    //     //         const newNode = await this.source.addNewNode({
    //     //           id: `${ft.type}-${guidGenerator()}`,
    //     //           properties: { type, name: ft.title },
    //     //           classId: ft.type,
    //     //         });

    //     //         if (newNode?.id && this.activePreset?.properties?.nodes) {
    //     //           this.activePreset.properties.nodes[newNode.id] = {
    //     //             x: pos.x,
    //     //             y: pos.y,
    //     //           };

    //     //           this.addElement(newNode);
    //     //           this.updateGraph(this.source!.graph);
    //     //           this.source.selectElement(newNode, true)
    //     //         }
    //     //       }
    //     //     }

    //     //     //

    //     //     // this.graph.getCanvasByPoint()

    //     //     // if (newNode?.id && element.id && props?.relation?.type) {
    //     //     //   await this.source.addEdge({
    //     //     //     classId: props.relation.type,
    //     //     //     fromId: element.id,
    //     //     //     toId: newNode.id,
    //     //     //   } as GraphElement);

    //     //     // this.source.createKGView([newNode], this.activePreset.id, true);
    //     //     // }

    //     //     // alert(ft.title)
    //     //   }

    //     //   // console.log(e.draggable.featureType);
    //     //   // console.log();

    //     //   console.log(e);
    //     },
    //   })
    //   .on('dropactivate', () => {
    //     // event.target.classList.add('drop-activated')
    //   });

    // interact('.drag-type')
    //   .draggable({
    //     manualStart: true,
    //     listeners: {
    //       move(event) {
    //         position.x += event.dx;
    //         position.y += event.dy;
    //         event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    //       },
    //     },
    //   })

    //   // This only gets called when we trigger it below using interact.start(...)
    //   .on('move', (event) => {
    //     const { currentTarget, interaction } = event;
    //     let element = currentTarget;

    //     // If we are dragging an item from the sidebar, its transform value will be ''
    //     // We need to clone it, and then start moving the clone
    //     if (interaction.pointerIsDown && !interaction.interacting() && currentTarget.style.transform === '') {
    //       element = currentTarget.cloneNode(true);

    //       // Add absolute positioning so that cloned object lives right on top of the original object
    //       element.style.position = 'absolute';
    //       element.style.left = 0;
    //       element.style.top = 0;
    //       event.interactable.featureType = 'testje';

    //       // Add the cloned object to the document
    //       const container = document.querySelector('.drag-types-container');
    //       container && container.appendChild(element);

    //       const { offsetTop, offsetLeft } = currentTarget;
    //       position.x = offsetLeft;
    //       position.y = offsetTop;

    //       // If we are moving an already existing item, we need to make sure the position object has
    //       // the correct values before we start dragging it
    //     } else if (interaction.pointerIsDown && !interaction.interacting()) {
    //       const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
    //       const transform = regex.exec(currentTarget.style.transform);

    //       if (transform && transform.length > 1) {
    //         position.x = Number(transform[1]);
    //         position.y = Number(transform[2]);
    //       }
    //     }

    //     // Start the drag event
    //     interaction.start({ name: 'drag' }, event.interactable, element);
    //   });
  }

  public mounted() {
    if (this.widget?.content) {
      this.contentLoaded(this.widget?.content);
    }
  }
}
</script>

<style lang="scss">
ul[data-type='taskList'] {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
  }
}
</style>

<style>
.document-container {
  margin-top: 5px;
  margin-left: 20px;
  /* background-color: #BDBDBD; */
  /* padding: 20px; */
}
.drag-type {
  cursor: crosshair;
}

.document-source {
  font-style: italic;
}

.learn-toolbar {
  margin-left: 20px;
  margin-top: 20px;
}

.graph-toolbar-menu {
  align-items: center;
}

.graph-menu {
  border-bottom-style:solid;
  border-bottom-width: 1px;
  border-bottom-color: grey;
  /* position: absolute; */

  /* left: 0;
  right: 0;
  top: 0; */
}

.editor-grid {
  /* position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0; */
  /* padding: 5px; */
  /* display: grid;
  grid-template-rows: 115px 100%; */
  /* padding: 5px;
  max-height: 100%;
  display: grid;
  grid-template-rows: 50px 100px 100%;
  grid-gap: 10px;
  max-height: calc(100vh - 276px); */
}
.filter-row {
  /* grid-row: 1; */
}
.editor-menu-row {
  /* grid-row: 2; */
}
.editor-row {
  padding: 0px;
  /* position: absolute;
    top: 120px;
    bottom: 0;
    left: 0;
    right: 0; */
  /* grid-row: 3; */
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
  font-size: 18px;
  height: 100%;
}

.linked-entity {
  background-color: 'lightgray';
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
  /* border: 1px solid black; */
  /* width: 50%; */
      overflow-y: auto;
    height: calc(100% - 200px);
    
    position: absolute;
}

.find {
  background: orange;
}

.find:hover {
  border-color: black;
  background: yellow;
}

.document-tools-sheet {
  position: relative;
  width: 100%;
  align-self: baseline;
}

.document-tools-group {
   max-width: calc(100% - 10px);
  position: absolute;  
  padding-right: 5px;
  top: -5px;
}

.document-entities-sheet {
  position: relative;
  width: 100%;
  align-self: baseline;
}

.document-entities-group {
  max-width: calc(100% - 10px);
  position: absolute;  
  padding-right: 5px;
  top: 10px;
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
  /* background: darkgray !important; */
  /* color: white !important; */
  font-weight: 700;
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
  content: '';
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
  content: '';
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
  max-width: 36px !important;
  min-width: 36px !important;
  /* margin: 4px; */
}
</style>

function async(arg0: (e: any) => { icon: string; title: string; action: any; }[]): (element:
import("@csnext/cs-data").GraphElement<import("@csnext/cs-data").BaseElementProperties>) => import("@csnext/cs-core").IMenu[] { throw new
Error('Function not implemented.'); }
