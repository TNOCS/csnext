import { GraphElement } from '@csnext/cs-data'
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import { DocDatasource, Suggestions } from '../../..'
import MentionList  from './mention-list.vue'

export default {
  items: (props) => {
    const source = props.editor.view._props.source as DocDatasource;
    const query = props.query;
        let res : any[]= [];
        if (query && source?.fuse) {
            res = source.fuse.search(query);
            return res;            
        } else 
        {
            return [];
        }    
  },
 

  render: () => {
    let component
    let popup
    let source: DocDatasource

    return {
        
      onStart: props => {
          
        
        source = props.editor.view._props.source as DocDatasource;
        props.source = source;
        // props.items = source.getClassElements('country');
        component = new VueRenderer(MentionList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor,
          source
        })
        

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)
        // const query = props.query;
        // let res : any[]= [];
        // if (query && source?.fuse) {
        //     res = source.fuse.search(query);
        //     console.log(res);
        // }
        popup[0].setProps({
          getReferenceClientRect: props.clientRect          
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }
        return false; // component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}