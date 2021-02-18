
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
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: 'title-section',
  template: `<div class="title-section">
  <div class="infopanel-title">{{data[infoPanel.title]}}</div>
  <div class="infopanel-subtitle">{{data[infoPanel.subtitle]}} <span class="infopanel-aliases" v-if="data[infoPanel.aliases]"> ({{data[infoPanel.aliases]}})</span></div>
</div>`
})
export default class TitleSection extends BaseSection {

public mounted() {  
    
}
     

}
