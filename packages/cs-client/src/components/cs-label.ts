import Vue, { VNode } from 'vue';

Vue.component('cs-label', {
    props: ['label'],
    render(createElement): VNode {
        return createElement('span', $cs.Translate(this.label));
    }
});