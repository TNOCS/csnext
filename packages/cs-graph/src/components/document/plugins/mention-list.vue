<template>
  <v-card>    
    <v-list ref="menu" two-line >
      <v-list-item v-for="(item, index) in _props.items" :key="index" @click="selectItem(index)" :class="{ 'is-selected': index === selectedIndex }">
        <!-- <v-list-item-avatar v-if="item.item._featureType.icon">
          <v-icon>{{item.item._featureType.icon}}</v-icon>
          </v-list-item-avatar> -->
        <v-list-item-content>
        <!-- <v-list-item-icon>
          <v-icon v-text="item.item._featureType.icon"></v-icon>
        </v-list-item-icon> -->
        <v-list-item-title>
          {{ item.item.properties.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.item.properties.description }}
        </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
  </v-card>
</template>

<script lang="ts">
import { guidGenerator, idGenerator } from '@csnext/cs-core';
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';


@Component({
  components: { },
})
export default class MentionList extends Vue {

  @Prop()
  items!: any[];

  @Prop()
  command!: Function;

  public selectedIndex = 0;

  @Watch('items') 
  updateItems() {
    this.selectedIndex! = 0;
  }
  
  // props: {
  //   items: {
  //     type: Array,
  //     required: true,
  //   },

  //   command: {
  //     type: Function,
  //     required: true,
  //   },
  // },

  // data() {
  //   return {
  //     selectedIndex: 0,
  //   };
  // },

  // watch: {
  //   items() {
  //     this.selectedIndex! = 0;
  //   },
  // },
  // methods: {
  //   onKeyDown({ event }) {
  //     if (event.key === 'ArrowUp') {
  //       this.upHandler();        
  //       return true;
  //     }

  //     if (event.key === 'ArrowDown') {
  //       this.downHandler();        
  //       return true;
  //     }

  //     if (event.key === 'Enter') {
  //       this.enterHandler();
  //       return true;
  //     }

  //     return false;
  //   },
   private onKeyDown({event}) {
     if (event.key === 'ArrowUp') {
        this.upHandler();        
        return true;
      }

      if (event.key === 'ArrowDown') {
        this.downHandler();        
        return true;
      }

      if (event.key === 'Enter') {
        this.enterHandler();
        return true;
      }

   }

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

    //   public selectedIndex = 0;
    //   public testitems = ['Foo', 'Bar', 'Fizz', 'Buzz'];

    //  onKeyDown({ event }) {
    //       if (event.key === 'ArrowUp') {
    //         this.upHandler()
    //         return true
    //       }

    //       if (event.key === 'ArrowDown') {
    //         this.downHandler()
    //         return true
    //       }

    //       if (event.key === 'Enter') {
    //         this.enterHandler()
    //         return true
    //       }

    //       return false
    //     }

    //     upHandler() {
    //       this.selectedIndex! = ((this.selectedIndex! + this.items.length) - 1) % this.items.length
    //     }

    //     downHandler() {
    //       this.selectedIndex! = (this.selectedIndex! + 1) % this.items.length
    //     }

    //     enterHandler() {
    //       this.selectItem(this.selectedIndex!)
    //     }

    //     selectItem(index) {
    //       const item = this.items[index]

    //       // if (item) {
    //       //   this.command({ id: item })
    //       // }
    //     }

    //   mounted() {
    //     console.log(this);

    //     console.log(this.$options.propsData);
    //     console.log('init mention list');
    //     // setInterval(()=> {
    //     //   this.$forceUpdate();
    //     // }, 2000)
    //     // alert('added');
    //   }
  }

</script>
<style>
.is-selected {
  background-color: red;
}

</style>