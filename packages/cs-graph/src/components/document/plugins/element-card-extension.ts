import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ElementCardComponent from './element-card-component.vue'
import { GraphElement } from '@csnext/cs-data'
import Paragraph from '@tiptap/extension-paragraph';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        elementCard: {
            /**
             * Add a text entity
             */
             setElementCard: (entity?: GraphElement) => any,            
             toggleElementCard: (attributes?: any) => ReturnType;
        }
    }
}


export default Paragraph.extend({
    name: 'element-card',

    draggable: true,
    group: 'block',
    atom: true,
    
    addAttributes() {
        return {            
            elementId: { default: undefined}            
        }
        
    },

    parseHTML() {
        return [
          {
            tag: 'element-card',
          },
        ]
      },
    
    
      renderHTML({ HTMLAttributes }) {
        return ['element-card', mergeAttributes(HTMLAttributes), 0]
      },

    addCommands() {
        return {     
            toggleElementCard: attributes => ({ commands }) => {
                return commands.toggleNode('element-card', 'paragraph', attributes)
              },       
              setElementCard: (entity?: GraphElement) => ({ tr, dispatch }) => {
                // debugger;
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
        return VueNodeViewRenderer(ElementCardComponent)
    },
})