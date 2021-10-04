import { Node, mergeAttributes } from '@tiptap/core'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import Vue from 'vue';

export type EntityOptions = {
  HTMLAttributes: Record<string, any>,
  suggestion: Omit<SuggestionOptions, 'editor'>,
}

export const Entity = Node.create<EntityOptions>({
  name: 'entity',

  defaultOptions: {
    HTMLAttributes: {},
    suggestion: {
      char: '#',
      command: ({ editor, range, props }) => {
        (editor
          .chain()
          .focus() as any)
          .replaceRange(range, 'entity', props)
          .insertContent(' ')
          .run()
      },
      allow: ({ editor, range }) => {
        return (editor.can() as any).replaceRange(range, 'entity')
      },
    },
  },

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => {
          return {
            id: element.getAttribute('data-entity'),
          }
        },
        renderHTML: attributes => {
          if (!attributes.id) {
            return {}
          }

          return {
            'data-entity': attributes.id,
          }
        },
      },
    }
  },

  parseHTML() {
    return [        
      {
        tag: 'span[data-entity]',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), `#${node.attrs.id}`]
  },

  renderText({ node }) {
    return `@${node.attrs.id}`
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isEntity = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node: any, pos: any) => {
          if (node.type.name === 'entity') {
            isEntity = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isEntity
      }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})