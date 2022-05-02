<template>
  <v-card class="action-list-card">
    
    <v-list ref="menu" two-line>
      <v-list-item v-for="(action, ai) in visibleActions" :key="ai" dense @click="selectAction(action)" :class="{ 'is-selected': ai === selectedIndex }">
        <!-- <v-list-item-avatar>
          <v-icon>mdi-pencil</v-icon>            
        </v-list-item-avatar> -->
        <v-list-item-content>
          <v-list-item-title>
            {{ action.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ action.subTitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
   
  </v-card>
</template>

<script lang="ts">
import { GraphElement, PropertyValueType } from '@csnext/cs-data';
import { Editor, Range } from '@tiptap/vue-2';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { GraphDocument } from '../../../../classes';

export class ActionItem {
  public title!: string;
  public subTitle!: string;
  public icon!: string;
  public action!: () => void;
  public command?: () => void;
}

@Component({
  components: { },
})
export default class ActionList extends Vue {
  @Prop()
  command!: Function;

  public actions: ActionItem[] = [];
  public visibleActions: ActionItem[] = [];

  @Prop()
  query!: string;

  @Prop()
  document!: GraphDocument;

  public selectedIndex = 0;

  @Watch('items')
  updateItems() {
    // this.selectedIndex! = 0;
  }

  @Watch('query')
  updateQuery() {
    this.visibleActions =
      this.query.length === 0
        ? this.actions
        : this.actions.filter((a) => `${a.title} ${a.subTitle}`.toLowerCase().includes(this.query.toLowerCase()));
  }

  @Prop()
  public range!: Range;

  @Prop()
  public editor!: Editor;

  private onKeyDown({ event }) {
    if (event.key === 'ArrowUp') {
      this.upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      this.downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      this.enterHandler();
      return true;
    }
  }

  //  public get visibleActions() {
  //    if (!this._props?)
  //  }

  upHandler() {
    this.selectedIndex! = (this.selectedIndex! + this.actions.length - 1) % this.actions.length;
  }

  beforeMount() {
    this.actions = [
      {
        title: 'Heading 1',
        subTitle: 'Create large heading',
        icon: 'mdi-format-header-1',
        action: () => {
          this.editor.chain().focus().toggleHeading({ level: 1 }).run();
        },
      },
      {
        title: 'Heading 2',
        subTitle: 'Create middle large heading',
        icon: 'mdi-format-header-2',
        action: () => {
          this.editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
      },
      {
        title: 'Heading 3',
        subTitle: 'Create middle large heading',
        icon: 'mdi-format-header-3',
        action: () => {
          this.editor.chain().focus().toggleHeading({ level: 3 }).run();
        },
      },
      {
        title: 'Bullet list',
        subTitle: 'Create bullet list',
        icon: 'mdi-format-list-bulleted',
        action: () => {
          this.editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        title: 'Numbered list',
        subTitle: 'Create numbered list',
        icon: 'mdi-format-list-numbered',
        action: () => {
          this.editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        title: 'Task list',
        subTitle: 'Create task list',
        icon: 'mdi-format-list-checks',
        action: () => {
          this.editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        title: 'Code',
        subTitle: 'Create code',
        icon: 'mdi-code-tags',
        action: () => {
          this.editor.chain().focus().toggleCodeBlock().run();
        },
      },
      {
        title: 'Quote',
        subTitle: 'Create quote',
        icon: 'mdi-format-quote-close',
        action: () => {
          this.editor.chain().focus().toggleBlockquote().run();
        },
      },
      {
        title: 'Horizontal Line',
        subTitle: 'Create horizontal line',
        icon: 'mdi-minus',
        action: () => {
          this.editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        title: 'Highlight',
        subTitle: 'Create highlight',
        icon: 'mdi-marker',
        action: () => {
          this.editor.chain().focus().toggleHighlight().run();
        },
      },
      {
        title: 'Paragraph',
        subTitle: 'Create paragraph',
        icon: 'mdi-format-paragraph',
        action: () => {
          this.editor.chain().focus().toggleNodeParagraph().run();
        },
      },
      {
        title: 'Element Card',
        subTitle: 'Create element card',
        icon: 'mdi-card',
        action: () => {
          this.editor.chain().focus().toggleElementCard().run();
        },
      },

      // {
      //   title: 'Link',
      //   subTitle: 'Create link',
      //   icon: 'mdi-link',
      //   action: () => {
      //     this.editor.chain().focus().toggleOrderedList().run();
      //   },
      // },
      // {
      //   title: 'Table',
      //   subTitle: 'Create table',
      //   icon: 'mdi-table',
      //   action: () => {
      //     this.editor.chain().focus().tabl().run();
      //   },
      // },
      {
        title: 'Code',
        subTitle: 'Create code',
        icon: 'mdi-code-tags',
        action: () => {
          this.editor.chain().focus().toggleCodeBlock().run();
        },
      },
    ];
    console.log(this.document);
    if (this.document?._featureType?.properties) {
      for (const prop of this.document._featureType.properties) {
        if (prop.type && prop.type === PropertyValueType.string) {
          this.actions.push({
            title: prop.label ?? '',
            subTitle: 'property',
            icon: prop._icon!,
            action: () => {
              this.editor.chain().focus().toggleElementProperty({ key: prop.key }).run();
            },
          });
        }
      }
    }
    this.updateQuery();
  }

  public onExit() {}

  selectAction(action: ActionItem) {
    action.action();
    // this.$destroy();
  }

  downHandler() {
    this.selectedIndex! = (this.selectedIndex! + 1) % this.visibleActions.length;
  }

  enterHandler() {
    // remove existing query text
    this.editor.chain().focus().deleteRange(this.range).run();
    this.selectAction(this.visibleActions[this.selectedIndex!]);
    // this.enterHandler();
  }

  selectItem(index) {
    const action = this.visibleActions[index];
  }
}
</script>
<style scoped>
.action-list-card {
  max-height: 500px;
  display: block;
  overflow-y: auto;
}
.is-selected {
  background-color: #1976d2;
}
</style>
