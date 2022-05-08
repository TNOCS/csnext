<template>
  <node-view-wrapper
    v-if="node"
     
    class="text-entity-component"
    :style="style"
    
  >
<!-- :class="{ highlight: entity && entity._linked }" -->
  <!-- excluded: entity && !entity._linked && !entity._highlight, hide: !visible -->
    <v-menu offset-y  v-model="openMenu" :close-on-content-click="false">

      <!-- open-on-hover open-delay="10" -->
      <template v-slot:activator="{ on, attrs }">
        <!-- <drag tag="span" :transfer-data="{ node: node }"> -->
        <span  @click.stop="selectEntity()" class="content entity-drag" :id="'drag-' + node.attrs.id" v-bind="attrs" v-on="on">
          <v-icon v-if="node.attrs.type === 'DATE'" small>mdi-calendar-range</v-icon>
          <v-icon v-else-if="entity && entity._location" small>mdi-map-marker-outline</v-icon>
          <img v-else-if="icon" :src="icon" class="icon-image" />
          <v-icon v-else-if="element && element._featureType.icon" small>{{ element._featureType.icon }}</v-icon>
          {{ node.attrs.text }}
          <!-- : <span v-if="entity">{{ entity._linked}}</span> -->

          <!-- <span v-if="entity">   
              {{ entity._included}}      
            </span> -->
          <!-- <template v-if="entity">
            <v-icon v-if="entity._included" small>remove</v-icon>
            <v-icon v-else small>mdi-plus</v-icon>
            </template> -->
          <!-- <v-menu top          >
        <template v-slot:activator="{ on, attrs }">        
            <v-icon  v-bind="attrs"
            v-on="on" small>more_vert</v-icon>        
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="item.action()"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>            -->
        </span>
        <!-- </drag>           -->
      </template>
      <selection-popup :editor="editor" :entity="entity" :source="source" :document="document"> </selection-popup>
      <!-- 
          <v-card>
            <v-card-title>{{ node.attrs.type }}</v-card-title>
            <template v-if="element">
            </template>
            <span v-else>
              no element
            </span>

            <template v-if="entity">
              
              entity {{JSON.stringify(entity)}}
            </template>
            <span v-else>error</span>
            <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="item.action()"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list> 
          </v-card>        -->
    </v-menu>
  </node-view-wrapper>
</template>

<style scoped>
.entity-available {
  background-color: 'red' !important;
}

.draggable-entity {
  display: inline;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Editor, NodeViewWrapper } from '@tiptap/vue-2';
import { GraphDatasource, GraphElement, TextEntity } from '@csnext/cs-data';
import SelectionPopup from '../../selection-popup.vue';

import { DocDatasource } from '../../../../datasources/doc-datasource';
import { GraphDocument } from '../../../../classes/document/graph-document';
import { DragUtils } from '@csnext/cs-map';

@Component({
  components: {
    NodeViewWrapper,
    SelectionPopup,
  },
})
export default class TextEntityComponent extends Vue {
  @Prop()
  nodeViewProps: any;

  public document: GraphDocument | null = null;
  public entity?: TextEntity | null = null;
  public element?: GraphElement | null = null;
  public visible: boolean = false;
  // public editor?: Editor | null = null;
  // public node?: any | null = null;
  public openMenu = false;
  public source?: DocDatasource | null = null;
  public text?: string;
  public icon?: string | null = null;
  public style?: CSSStyleDeclaration | null = null;
  public node?: any;
  public showPopup = false;
  private detailed = true;
  public color: string = '#ffffff';

  public menuItems: any[] = [];

  public increase() {
    // this.updateAttributes({
    //   count: this.node.attrs.count + 1,
    // })
  }

  private dragstart_handler(evt : DragEvent) {
    if (this.element) {
      DragUtils.setElementData(evt, this.element);
    }
  }

  public selectEntity() {
    // alert('select');
  }

  @Watch('entity._linked')
  updatedViewTypes() {
    this.setStyle();
  }

  public isLocation(node: any) {
    if (this.element?.properties?.location) {
      return true;
    }
    return node.attrs.type === 'location';
  }

  @Watch('document.activeLearningType')
  @Watch('document.properties.learn_mode')
  @Watch('entity._linked')
  public setStyle() {
    if (!this.source || !this.document) {
      return {} as CSSStyleDeclaration;
    }

    if (!this.element) {
      this.style = {
        backgroundColor: 'transparent', // GraphElement.getBackgroundColor(this.element),
        borderStyle: 'solid', //this.visible ? 'solid' : 'none',
        borderColor: '#e0e0e0',
      } as CSSStyleDeclaration;
    } else {
      this.style = {
        backgroundColor: this.entity?._linked ? this.color : 'transparent', // GraphElement.getBackgroundColor(this.element),
        borderStyle: 'solid', //this.visible ? 'solid' : 'none',
        borderColor: this.color,
      } as CSSStyleDeclaration;
    }
    // if (
    //   this.document?.properties?.editor_mode === 'LEARN' &&
    //   this.document.properties.learn_mode === 'REVIEW' &&
    //   this.document.activeLearningType !== this.element?.classId
    // ) {
    //   this.style.backgroundColor = 'blue';
    //   this.$forceUpdate();
    // }
  }

  private updateEntity() {
    // find entity
      if (this.source && this.document?._entities && this.node?.attrs.id) {        
        this.entity = this.document._entities.find((e) => e.id === this.node.attrs.id);
        if (!this.element && this.node?.attrs?.kg_id) {
          this.element = this.source.getElement(this.node.attrs.kg_id);
        }
       
        if (this.entity?._node) {
          this.element = this.entity._node;
          this.color = GraphElement.getBackgroundColor(this.element);
        }

        if (this.element?.properties && this.element._featureType?.infoPanels?.popup) {
          const popup = this.element._featureType?.infoPanels?.popup;
          if (popup && popup.iconImageProperty && this.element.properties.hasOwnProperty(popup.iconImageProperty)) {
            this.icon = this.element.properties[popup.iconImageProperty];
          }
        }
      }

      this.setStyle();
  }

  public mounted() {
    const editor = (this as any).editor as Editor;
    const node = (this as any).node;

    this.source = (this as any).editor?.options?.editorProps?.source;
    if (!this.source) {
      return;
    }
    if ((editor?.options?.editorProps as any)?.document) {
      // find document
      if (!node?.attrs) {
        return;
      }

      this.document = (editor?.options?.editorProps as any)?.document;

      this.source.events.subscribe(GraphDatasource.GRAPH_EVENTS, (a: string, e: GraphElement) => {
        if (this.document?.id && a === GraphDatasource.ELEMENT_UPDATED && e.id === this.document.id) {
          this.updateEntity();
        }
      }) 

      this.menuItems.push({
        title: 'remove',
        action: () => {
          alert('remove');
        },
      });

      
      this.updateEntity();
      
      

      
    }
  }
}
</script>

<style lang="css" scoped>
.text-entity-component {
  display: inline;
  border-radius: 6px;
  border-color: black;
  border-style: solid;
  border-width: 0.5px;
}

.label {
  margin-left: 1rem;
  background-color: #0d0d0d;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.highlight {
  background-color: yellow !important;
}

.hide:hover {
  background-color: lightgray !important;
}

.excluded {
  /* background-color: rgba(0, 0, 0, 0.06) !important; */
}

.icon-image {
  max-width: 20px;
  max-height: 20px;
}

.content {
  padding: 5px;
  cursor: pointer;
}
</style>
