
import { BaseSection } from './base-section';
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
    name: 'image-section',
    template: `<v-img v-if="data[section.property]" class="section-image" height="200px" :src="data[section.property]"></v-img>`
})
export default class ImageSection extends BaseSection {
    public mounted() {
       
        
    }
}
