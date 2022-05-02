import { VueRenderer } from '@tiptap/vue-2';
import tippy from 'tippy.js';
import Vue from 'vue';
import { DocDatasource, DocUtils, GraphDocument } from '../../../..';
import ActionList from './text-action-list.vue';
import { PluginKey } from "prosemirror-state";

export default {
  name: 'text-action',
  char: '/',
  pluginKey: new PluginKey('text-action'),

  items: (props) => {    
    return [];  
  },

  command: (a) => {
    console.log(a);
    Vue.nextTick(async () => {
      
      // a.editor.chain().focus().setTextSelection(a.range).setTextEntity(a.props).run();
      // const source = a?.editor?.view?._props?.source;
      // if (source && a?.editor?.view?._props?.document) {
      //   DocUtils.syncEntities(a.editor.view._props.document as GraphDocument, source, undefined, true);
      //   await source.entityParser.callDocument(a.editor.view._props.document, source);
      // }
    });

    return;
  },

  

  render: () => {
    let component: VueRenderer;
    let popup;
    let source: DocDatasource;

    return {
      onStart: (props) => {        
        source = props.editor.view._props.source as DocDatasource;
        props.source = source;
        props.document = props.editor.view._props.document as GraphDocument;
        
        component = new VueRenderer(ActionList, {
          parent: this,
          propsData: props,
          $vuetify: $cs.vuetify
        });

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.getElementById('app') as HTMLElement,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        if (component) {
          component.updateProps(props);
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }
        return (component.ref! as any).onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        if (component) {
          component.destroy();
        }
      },
    };
  },
};
