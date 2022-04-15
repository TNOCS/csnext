<template>
   
   <v-menu
      :close-on-content-click="false"
      :offset-x='isOffsetX'
      :offset-y='isOffsetY'
      :open-on-hover='isOpenOnHover'
      :transition='transition'
      :value="openMenu"
      v-model="menuOpened"
    >
      <template
        v-slot:activator="{ on }"
      >
        <v-btn
          
          v-if='icon'
          v-on="on"
        >
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-btn>
        <v-list-item
          class='d-flex justify-space-between'
          v-else-if='isSubMenu'
          v-on="on"
        >
          {{ name }}
          <div class="flex-grow-1">
          </div>
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-list-item>
        <v-btn
          
          @click="openMenu=true"
          text
          v-else
          v-on="on"
        >
          {{ name }}
        </v-btn>
      </template>
      <v-list>
        <template
          v-for="(item, index) in menuItems"
        >
          <v-divider
            :key='index'
            v-if='item.isDivider'
          />
          <sub-menu
            :is-offset-x=true
            :is-offset-y=false
            :is-open-on-hover=false
            :is-sub-menu=true
            :key='index'
            :menu-items='item.menu'
            :name='item.name'
            @sub-menu-click='emitClickEvent'
            v-else-if='item.menu'
          />
          <v-list-item
            :key='index'
            @click='emitClickEvent(item)'
            v-else
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
</template>

<script lang="ts">
import { idGenerator } from '@csnext/cs-core';
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';


@Component({
  components: { },
})
export default class SubMenu extends Vue {

  @Prop()
  items!: any[];

  @Prop()
  command!: Function;

  public menuOpened = true;

@Prop()
  public name!: String;
  @Prop({ type: String, default: "secondary"})
    public icon!: String;
    @Prop()
    public menuItems!: any[];
    @Prop({ type: String, default: "secondary" })
    public color!: string;
    @Prop({ type: Boolean, default: false })
    public isOffsetX!: boolean;
    @Prop({ type: Boolean, default: true })    
    public isOffsetY!: boolean;
    @Prop({ type: Boolean, default: true })
    public isOpenOnHover!: boolean;
    @Prop({ type: Boolean, default: false })
    public isSubMenu!: boolean;
    @Prop({ type: String, default: "scale-transition" })
    public transition!: string;
    openMenu = false;

    public emitClickEvent(item) {
      this.$emit("sub-menu-click", item);
      this.openMenu = false;
      this.menuOpened = true;
    }

  public selectedIndex = 0;

  @Watch('menuOpened')
  menuOpenedChanged() {
    this.isOpenOnHover = !this.menuOpened;
  }

  @Watch('items') 
  updateItems() {
    this.selectedIndex! = 0;
  }
  
//    private onKeyDown({event}) {
//      if (event.key === 'ArrowUp') {
//         this.upHandler();        
//         return true;
//       }

//       if (event.key === 'ArrowDown') {
//         this.downHandler();        
//         return true;
//       }

//       if (event.key === 'Enter') {
//         this.enterHandler();
//         return true;
//       }

//    }

    upHandler() {
      
      this.selectedIndex! = (this.selectedIndex! + this.items.length - 1) % this.items.length;
    }

    downHandler() {
      
      this.selectedIndex! = (this.selectedIndex! + 1) % this.items.length;
    }

    enterHandler() {
      this.selectItem(this.selectedIndex!);
    }

    selectItem(index) {
      const item = this.items[index];
      // this.$options.propsData.editor.chain().focus().setTextEntity({ spacy_label: this.entityBubbleSelection?.type }).run();
      // setTextEntity({ spacy_label: this.entityBubbleSelection?.type });
      // console.log(item);
      if (item) {
        this.command({ name:'text-entity', id: `entity-${idGenerator()}`, label: item.item.properties.name, text: item.item.properties.name, spacy_label: item.item._featureType.type, kg_id: item.item.id });
      }
    }

   
  }

</script>
<style scoped>
.is-selected {
  background-color: #1976d2;
}

</style>