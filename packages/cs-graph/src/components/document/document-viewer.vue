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
    <v-toolbar flat outlined class="graph-menu" v-if="currentDocument && !hideHeader">
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
          <v-layout v-if="currentDocument && currentDocument._entityTypes" class="drag-types-container">
            <template v-for="(type, id) of currentDocument._entityTypes">
              <v-chip
                :outlined="!type._selected"
                @click="type._selected = !type._selected"
                :key="id"
                :color="type.color"
                class="ml-2 drag-type"
                v-if="!currentDocument.properties.hide_unknowns || type._featureType"
              >
                <v-icon v-if="type._featureType && type._featureType.icon" left>{{ type._featureType.icon }}</v-icon>
                {{ type.title }}
                <v-avatar right dark class="darken-4">
                  {{ type.count }}
                </v-avatar>
              </v-chip>
            </template>
          </v-layout>
        </template>
        <v-spacer></v-spacer>
        <v-switch v-model="currentDocument.properties.hide_unknowns"> </v-switch>
        <v-btn @click="save()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn @click="openDetails()" icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </v-layout>
      <template v-slot:extension v-if="currentDocument.properties.editor_mode === 'EDIT'">
        <div v-if="editor">
          <v-slide-group show-arrows>
            <v-btn-toggle dense group>
              <v-btn @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
              <v-btn @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
              <v-btn @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                <v-icon>mdi-format-strikethrough</v-icon>
              </v-btn>
              <v-btn @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
                <v-icon>mdi-marker</v-icon>
              </v-btn>

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
              <v-btn @click="editor.chain().focus().redo().run()"><v-icon>mdi-redo</v-icon></v-btn>

              <v-btn @click="setTextEntity()"><v-icon>mdi-label</v-icon></v-btn>
              <v-btn @click="setNodeParagraph()" :class="{ 'is-active': editor.isActive('node-paragraph') }"
                ><v-icon>mdi-format-paragraph</v-icon></v-btn
              >
              <v-btn @click="setElementCard()" :class="{ 'is-active': editor.isActive('element-card') }"><v-icon>mdi-card</v-icon></v-btn>
            </v-btn-toggle>
          </v-slide-group>
        </div>
      </template>
    </v-toolbar>

    <!-- <div > -->

    <simplebar class="editor-row" v-if="currentDocument && currentDocument.properties">
      <div class="document-container">
        <div class="document-title">
          {{ currentDocument.properties.name }}
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
    </simplebar>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { SimpleRelationLineSection } from '@csnext/cs-map';

import { Editor, EditorContent, Node, BubbleMenu, FloatingMenu } from '@tiptap/vue-2';
import SelectionPopup from './selection-popup.vue';
// import Mention from '@tiptap/extension-mention';
import simplebar from 'simplebar-vue';
import { TextMention } from './plugins/text-mention';
import { DocDatasource, ITool, GraphDocument } from './../../';
import StarterKit from '@tiptap/starter-kit';
import TextExtension from './plugins/text-extension';
import ParagraphExtension from './plugins/paragraph-extension';
import ElementCardExtension from './plugins/element-card-extension';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { FeatureType, TextEntity, DateUtils } from '@csnext/cs-data';
import { IImportPlugin } from '../..';
import { DocUtils } from '../../utils/doc-utils';
import Dropcursor from '@tiptap/extension-dropcursor';
import suggestion from './plugins/suggestion';
import Commands from './plugins/commands/commands';
import commandSuggestion from './plugins/commands/commands-suggestion';

import MentionList from './plugins/mention-list.vue';
import SnippetList from './plugins/snippet-list.vue';

@Component({
  components: {
    simplebar,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    SimpleRelationLineSection,
    MentionList,
    SnippetList,
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

  public set editor(value: Editor | undefined | null) {
    if (this.source) {
      this.source.editor = value;
    }
  }

  public get hideHeader(): boolean {
    return ((this.widget?.options) as any).hideHeader || false;
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
  // public document?: GraphDocument;
  public node?: Node;
  // v-if="selectionTo !== undefined && selectionFrom !== undefined"

  // public highlight?: Highlight;
  public source: DocDatasource | undefined = undefined;
  public entityBubbleSelection: FeatureType | null = null;

  public setEntity() {
    if (!this.source || !this.currentDocument || !this.editor || !this.entityBubbleSelection?.type) {
      return;
    }

    this.editor.chain().focus().setTextEntity({ spacy_label: this.entityBubbleSelection?.type }).run();
    this.syncDocumentState();
    DocUtils.syncEntities(this.currentDocument, this.source, this.currentDocument.properties?.doc?.content, true);

    // alert(this.entityBubbleSelection?.title);
  }

  public setEditorMode(mode: string) {
    Vue.set(this.currentDocument!.properties!, 'editor_mode', mode);
    if (this.editor) {
      this.editor!.setEditable(mode === 'EDIT');
    }
    this.$forceUpdate();
    // this.currentDocument!.properties!.edit_mode = mode;
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
    // this.syncDocumentState();
    // this.source.syncEntities(
    //   this.currentDocument,
    //   this.currentDocument.doc.content,
    //   true
    // );

    // alert(this.entityBubbleSelection?.title);
  }

  // public get document(): GraphDocument | undefined {
  //   if (this.currentDocument) {
  //     return this.currentDocument;
  //   }
  // }

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

  // public setTextParagraph() {
  //   if (!this.currentDocument || !this.editor) {
  //     return;
  //   }
  //   this.editor.chain().focus().setTextParagraph().run();
  //   this.syncDocumentState();
  //   this.source.syncEntities(
  //     this.currentDocument,
  //     this.currentDocument.doc.content,
  //     true
  //   );
  // }

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
    this.loadDocument(document);
    this.updateEditor();
    this.updateContent();
    this.initTools();
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

    
    // this.highlight = new Highlight({
    //   disableRegex: false,
    //   // entities: this.currentDocument?.entities
    // });

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
          Highlight,
          Placeholder,
          Commands.configure({
            commandSuggestion,
          }),
          TextMention.configure({
            // renderLabel: (props) => {
            //   return 'text-entity'
            // },
            HTMLAttributes: {
              class: 'text-entity',
              name: 'text-entity',
            },
            suggestion,
          }),
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
              type: 'paragraph',
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

      this.loaded = true;

      // this.source.activateDocument(doc).then(() => {
      //   this.widget.options!.title = doc.name;
      //   if (this.currentDocument) {
      //     // this.source?.openDocumentDetails(this.currentDocument, false);
      //     if (this.currentDocument._entities) {
      //       for (const ent of this.currentDocument._entities) {
      //         if (ent._node) {
      //           // ent._node._included = true;
      //         }
      //       }
      //     }

      //     this.loaded = true;
      //     this.busManager.subscribe(this.source!.bus, 'document-entities', () => {});
      //   }
      // });
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

      if (this.currentDocument.properties?.doc) {
        // this.currentDocument.properties.doc = JSON.parse(
        // JSON.stringify(this.currentDocument.properties.doc, (key, value: any) => {
        //   if (value === null) {
        //     return undefined;
        //   }
        //   return value;
        // }))
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

    // if (this.currentDocument.entities && this.currentDocument.entities.length > 0) {
    //   $cs.triggerNotification({
    //     title: 'currently re-running the pipeline is not supported',
    //   });
    //   return;
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
        // this.currentDocument.properties = r.properties;
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
    this.updateContextMenu();
    console.log('document content loaded');
    this.busManager.subscribe(this.source!.bus, DocDatasource.DOCUMENT_ENTITIES, (a: string, d: any) => {
      if (a === DocDatasource.ENTITIES_UPDATED) {
        console.log('document content updated from messagebus');
        this.checkDocumentIdQuery();
        this.updateEditor();
        this.updateContent();
        this.initTools();
        this.$forceUpdate();
      }
    });
    this.busManager.subscribe(this.source!.bus, 'document', (a: string, d: any) => {
      this.updateEditor();
      this.updateContent();
      this.initTools();
    });
    if (this.state && this.state.elementId) {
      const doc = this.source.getElement(this.state.elementId) as GraphDocument;
      this.loadDocument(doc);
      this.updateEditor();
      this.updateContent();
      this.initTools();
    } else {
      this.checkDocumentIdQuery();
      this.updateEditor();
      this.updateContent();
      this.initTools();
    }
    // this.initTools();
    this.initDragging();
  }

  private checkDocumentIdQuery() {
    if (!$cs.router || !this.source) {
      return;
    }

    if ($cs.router.currentRoute?.query?.id) {
      if (this.currentDocument?.id !== $cs.router!.currentRoute?.query?.id) {
        const doc = this.source.getElement($cs.router.currentRoute.query.id as string) as GraphDocument;
        if (doc) {
          this.loadDocument(doc);
        }
      } else {
        this.loadDocument(this.currentDocument);
      }
    } else {
      let d: GraphDocument = (this.source.activeElement as GraphDocument) || this.currentDocument;
      if (d) {
        this.loadDocument(d);

        const combined = {
          ...$cs.router!.currentRoute.query,
          ...{ id: d.id },
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
    this.source.addTool({
      id: 'observation_extraction',
      title: 'Observation Extraction',
      subtitle: 'find observations',
      widget: this.widget,
      disabled: true,
      // subtitle: 'Entity Recognition, Search, Linking',
      // image: 'images/entity_analysis.png',
      action: async () => {
        try {
          // await this.refresh();
          this.updateEntityTypes();
          return Promise.resolve(true);
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
    this.source.addTool({
      id: 'geo_time_extraction',
      title: 'Geo & time extraction',
      subtitle: 'Recognize locations and time entities',
      widget: this.widget,
      disabled: true,
      // subtitle: 'Entity Recognition, Search, Linking',
      // image: 'images/entity_analysis.png',
      action: async () => {
        try {
          await this.refresh();
          return Promise.resolve(true);
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
    this.source.addTool({
      id: 'language_detection',
      title: 'Language Detection',
      disabled: true,
      widget: this.widget,
      action: async () => {
        try {
          await this.refresh();
          return Promise.resolve(true);
        } catch (e) {
          return Promise.resolve(false);
        }
      },
    } as ITool);
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
  font-size: 25px;
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
