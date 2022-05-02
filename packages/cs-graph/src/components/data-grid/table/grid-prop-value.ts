

import { PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode, CreateElement } from 'vue'

export default Vue.extend({
    name: 'grid-prop-value',
    template: '<prop-value :value="value" :proptype="proptype" :element="element"></prop-value>',
    // props: ['params'],
    data: {
        params: undefined,
        value: null,
        proptype: null,
        element: null
    },
    beforeMount() {
         if (this.params) {
            const params = this.params as any;
            const key = params.colDef.field.replace('properties.', '');
            this.value = params.value;
            this.proptype = params.data._featureType.propertyMap[key];
            this.element = params.data;
        }   
    }
    // render(createElement: CreateElement): VNode {          
    //     return createElement('span', { class:'info-prop-text'}, 'test');
    // }
});