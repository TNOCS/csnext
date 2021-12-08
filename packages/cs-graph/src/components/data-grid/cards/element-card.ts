import Vue, { VNode, CreateElement } from 'vue'

export default Vue.extend({
    name: 'element-card',
    props: ['source', 'element'],
    
  render(createElement: CreateElement): VNode {   
    return createElement('span', 'test');
    // return cre('div', this.$scopedSlots.default!({}))
  }
})
