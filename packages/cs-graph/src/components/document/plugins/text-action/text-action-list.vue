<template>
  <v-card>    
    <sub-menu
      name='New Menu'
      :menu-items='fileMenuItems'  
      menu-opened    
      @sub-menu-click='onMenuItemClick'
    />
    
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SubMenu from './sub-menu.vue';

@Component({
  components: { SubMenu},
})
export default class ActionList extends Vue {

  

  onMenuItemClick(item) {
      console.log(`onMenuItemClick(), item=${item}`);
      if (item.action) {
        item.action();
      }
    }

  public fileMenuItems = [
      {
        name: "Menu Item 1",
        action: () => {
          console.log("menu-item-1");
        }
      },
      { isDivider: true },
      // { name: "Menu Item 2" },
      // {
      //   name: "Sub 1",
      //   menu: [
      //     { name: "1.1" },
      //     { name: "1.2" },
      //     {
      //       name: "Sub-menu 2",
      //       menu: [
      //         { name: "2.1" },
      //         { name: "2.2" },
      //         {
      //           name: "Sub-menu 3",
      //           menu: [
      //             { name: "3.1" },
      //             { name: "3.2" },
      //             {
      //               name: "Sub-menu 4",
      //               menu: [{ name: "4.1" }, { name: "4.2" }, { name: "4.3" }]
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },

      // { name: "Menu Item 3" },
      // { isDivider: true },
      // {
      //   name: "Menu Item 4",
      //   action: () => {
      //     console.log("menu-item-4");
      //   }
      // },
      // {
      //   name: "Menu Item 5",
      //   action: () => {
      //     console.log("menu-item-5");
      //   }
      // }
    ]
  
  
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
        // this.enterHandler();
        return true;
      }

   }

    upHandler() {
      
      // this.selectedIndex! = (this.selectedIndex! + this.items.length - 1) % this.items.length;
    }

    downHandler() {
      
      // this.selectedIndex! = (this.selectedIndex! + 1) % this.items.length;
    }

    // enterHandler() {
    //   this.selectItem(this.selectedIndex!);
    // }

    // selectItem(index) {
    //   const item = this.items[index];
    //   // this.$options.propsData.editor.chain().focus().setTextEntity({ spacy_label: this.entityBubbleSelection?.type }).run();
    //   // setTextEntity({ spacy_label: this.entityBubbleSelection?.type });
    //   // console.log(item);
    //   if (item) {
    //     this.command({ name:'text-entity', id: `entity-${idGenerator()}`, label: item.item.properties.name, text: item.item.properties.name, spacy_label: item.item._featureType.type, kg_id: item.item.id });
    //   }
    // }

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
<style scoped>
.is-selected {
  background-color: #1976d2;
}

</style>