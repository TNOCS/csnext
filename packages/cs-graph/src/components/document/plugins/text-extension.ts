import { Node, mergeAttributes } from '@tiptap/core'
import { Command, VueNodeViewRenderer } from '@tiptap/vue-2'
import EntityComponent from './text-entity-component.vue'
import { TextSelection } from 'prosemirror-state'
import { guidGenerator } from '@csnext/cs-core'
import { FeatureType, TextEntity } from '@csnext/cs-data'
import Text from '@tiptap/extension-text';

declare module '@tiptap/core' {
    interface Commands {
        textEntity: {
            /**
             * Add a text entity
             */
            setTextEntity: (entity?: TextEntity) => any,
            setTextEntityType: (entity?: FeatureType) => any,
        }
    }
}

function getSelection(selection: any) {


}

export default Text.extend({
    name: 'text-entity',

    group: 'inline',

    draggable: true,
    // content: 'inline*',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            id: { default: null },            
            type: { default: 'person' },
            text: { default: '' }            
        }
    },

    parseHTML() {
        return [
            {
                tag: 'text-entity',
            },
        ]
    },

    renderText({ node }) {
        return `${node.attrs.text}`
      },

    

    addCommands() {
        return {            
            setTextEntity: (entity?: TextEntity) => ({ tr, dispatch }) => {
                if (dispatch) {                    
                    const node = tr.doc.nodeAt(tr.selection.from);
                    let text = (tr.doc as any).textBetween(tr.selection.from, tr.selection.to -1);
                    // const text = (node.text as string).substring();
                    if (entity?.text !== text) {                        
                        tr.selection.$from.pos = tr.selection.from - 1;
                        text = (tr.doc as any).textBetween(tr.selection.from, tr.selection.to).trim();                        
                    }

                    // if (entity?.text !== text) {                        
                    //     tr.selection.$from.pos = tr.selection.from + 2;
                    //     text = tr.doc.textBetween(tr.selection.from , tr.selection.to);
                    // }

                    // if (entity?.text === text) {

                    // console.log(text);

                    const { parent, pos } = tr.selection.$from
                    const posAfter = pos + 1;
                    const nodeAfter = tr.doc.nodeAt(posAfter)
                    const id = entity?.id ?? guidGenerator();
                    const type = entity?.spacy_label ?? 'node';

                    const newEntity = this.type.create();
                    newEntity.attrs = { id : id, type, text: text };
                    newEntity.text = text;
                    tr.replaceSelectionWith(newEntity)
                    
                    // end of document
                    if (!nodeAfter) {                        
                        const node = parent.type.contentMatch.defaultType ?.create();
                        if (node) {
                            tr.insert(posAfter, node)
                            tr.setSelection(TextSelection.create(tr.doc, posAfter))
                        }
                    }
                    tr.scrollIntoView();    
                    
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

    

    renderHTML({ node, HTMLAttributes }) {
        return ['text-entity', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(EntityComponent)
    },
})