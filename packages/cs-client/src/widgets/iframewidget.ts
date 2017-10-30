
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';

// import './home.scss';
@Component(<any>{
    name: 'iframewidget',
    template: '<iframe :src="widget.data.url" width="100%" height="100%" frameborder="0"></iframe>'    
})
// tslint:disable-next-line:class-name
export class iframewidget extends Vue {

    private widget: Widget;    

    created() {                
        this.widget = <Widget>this.$parent['widget'];
    }

}