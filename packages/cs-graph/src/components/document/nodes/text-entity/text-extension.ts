import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import EntityComponent from './text-entity-component.vue'
import { TextSelection } from 'prosemirror-state'
import { guidGenerator } from '@csnext/cs-core'
import { FeatureType, TextEntity } from '@csnext/cs-data'
import Text from '@tiptap/extension-text';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textEntity: {
            /**
             * Add a text entity
             */
            setTextEntity: (entity?: TextEntity) => any,
            setTextEntityType: (entity?: FeatureType) => any,
            toggleTextEntity: (attributes?: any) => ReturnType;
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
            text: { default: '' },
            kg_id: { default: undefined },
            label: { default: null},
            source: { default: null},
            spacy_label: { default: null},            
            wkt: { default: undefined},
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
            toggleTextEntity: attributes => ({ commands }) => {
                return commands.toggleNode('text-entity', 'text-entity', attributes)
              },            
            setTextEntity: (entity?: TextEntity) => ({ tr, dispatch }) => {
                if (dispatch) {                            
                    const node = tr.doc.nodeAt(tr.selection.from);
                    if (!entity) { entity = {}}
                    let text = entity?.text ?? (tr.doc as any).textBetween(tr.selection.from, tr.selection.to -1);
                    
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
                    if (!entity.spacy_label) { entity.spacy_label = 'NODE'};
                    if (!entity.type) { entity.type = entity.spacy_label; }
                    
                    const newEntity = this.type.create();
                    newEntity.attrs = {...{ id : id, text: text }, ...entity};
                    delete newEntity.attrs._node;
                    newEntity.text = text;
                    tr.replaceSelectionWith(newEntity)
                    
                    // end of document
                    if (!nodeAfter) {                        
                        const nodeA = parent.type.contentMatch.defaultType ?.create();
                        if (nodeA) {
                            tr.insert(posAfter, nodeA)
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