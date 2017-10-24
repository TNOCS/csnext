import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, Widget } from '@csnext/cs-core';

@Component(<any>{
    name: 'cswidget',
    template: require('./cswidget.html'),
})
// tslint:disable-next-line:class-name
export class cswidget extends Vue {

    widget: Widget;
    
    created() {
        this.widget = <Widget>this.$attrs['widget'];
    }

}