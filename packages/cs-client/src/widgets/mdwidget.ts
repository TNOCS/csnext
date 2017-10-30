
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component(<any>{
    name: 'mdwidget',
    template: '<div>{{ widget.data }}</div>'
})
// tslint:disable-next-line:class-name
export class mdwidget extends Vue {

    private widget: Widget;
    
    created() {        
        this.widget = <Widget>this.$parent['widget'];
    }

}