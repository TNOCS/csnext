import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ElementPropertyComponent from './element-property-component.vue';
import { GraphElement } from '@csnext/cs-data'
import Paragraph from '@tiptap/extension-paragraph';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        elementProperty: {
            /**
             * Add a text entity
             */
             setElementProperty: (entity?: GraphElement) => any,            
             toggleElementProperty: (attributes?: any) => ReturnType;
        }
    }
}


export default Paragraph.extend({
    name: 'element-property',

    draggable: true,
    group: 'inline',
    content: 'inline*',
    inline: true,
    atom: true,
    // content: 'inline*',

    addAttributes() {
        return {            
            key: { default: null },            
            value: { default: undefined }
        }
        
    },

    parseHTML() {
        return [
          {
            tag: 'element-property',
          },
        ]
      },
    
    
      renderHTML({ HTMLAttributes }) {
        return ['element-property', mergeAttributes(HTMLAttributes), 0]
      },

    addCommands() {
        return {     
            toggleElementProperty: attributes => ({ commands }) => {
                return commands.setNode('element-property', attributes)
              },       
              setElementProperty: (entity?: GraphElement, key?: string, value?: any) => ({ tr, dispatch }) => {
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
        return VueNodeViewRenderer(ElementPropertyComponent)
    },
})