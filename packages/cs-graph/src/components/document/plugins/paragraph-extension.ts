import { Node, mergeAttributes } from '@tiptap/core'
import { Command, VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './paragraph-component.vue'
import { TextSelection } from 'prosemirror-state'
import { guidGenerator } from '@csnext/cs-core'
import { FeatureType, GraphElement, TextEntity } from '@csnext/cs-data'
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        nodeParagraph: {
            /**
             * Add a text entity
             */
             setNodeParagraph: (entity?: GraphElement) => any,            
             toggleNodeParagraph: (attributes?: any) => ReturnType;
        }
    }
}


export default Paragraph.extend({
    name: 'node-paragraph',

    draggable: true,
    group: 'block',
    content: 'inline*',
    // content: 'inline*',

    addAttributes() {
        return {
            id: { default: null },            
            type: { default: 'person' }            
        }
    },

    parseHTML() {
        return [
          {
            tag: 'node-paragraph',
          },
        ]
      },
    
    
      renderHTML({ HTMLAttributes }) {
        return ['node-paragraph', mergeAttributes(HTMLAttributes), 0]
      },

    addCommands() {
        return {     
            toggleNodeParagraph: attributes => ({ commands }) => {
                return commands.toggleNode('node-paragraph', 'paragraph', attributes)
              },       
            setNodeParagraph: (entity?: GraphElement) => ({ tr, dispatch }) => {
                debugger;
                if (dispatch) {                    
                    
                // } else {
                //     // debugger;
                // }
                }

                return true
            },
        }
    },

    // onUpdate(a: any) {
    //     console.log(a)
    //     // debugger;
    //   },

    
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})