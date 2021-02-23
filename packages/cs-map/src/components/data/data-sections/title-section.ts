
// <style scoped>
// .title-section {
//   margin: 5px;
// }

// .infopanel-aliases {
//   font-style: italic;
// }
// </style>

// <script lang="ts">
import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";

@Component({
  name: 'title-section',
  template: `<div class="title-section" v-if="data && panel">
  <div class="infopanel-title">{{data[panel.title]}}</div>
  <div class="infopanel-subtitle">{{data[panel.subtitle]}} <span class="infopanel-aliases" v-if="data[panel.aliases]"> ({{data[panel.aliases]}})</span></div>
</div>`
})
export default class TitleSection extends BaseSection {

public mounted() {  
    
}
     

}
