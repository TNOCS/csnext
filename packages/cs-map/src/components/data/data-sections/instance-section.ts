import { BaseSection } from './base-section';
import { Component } from "vue-property-decorator";
@Component({
  name: 'title-section',
  template: `<div class="instance-section">                      
        <v-chip outlined class="mr-2" v-for="(instance,inx) in instances()" :key="inx">{{instance.title}}</v-chip>                
    </div>`
})
export default class InstanceSection extends BaseSection {

  public instances() {    
    if (this.node?._outgoing) {      
      let res = this.node._outgoing.filter(r => r.classId === 'INSTANCE_OF' && r.to).map(r => r.to);
      if (this.node.class) { res.concat(this.node.class); }      
      return res;
    } else {
      return [];
    }
  }


public mounted() {
    
}
     

}
