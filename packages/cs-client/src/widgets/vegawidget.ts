
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from './widgetbase';


// import './home.scss';
@Component(<any>{
    name: 'iframewidget',
    template: '<iframe :src="widget.data.url" width="100%" height="100%" frameborder="0"></iframe>'    
})
// tslint:disable-next-line:class-name
export class iframewidget extends WidgetBase {

    beforeMount() {
        this.beforeMount();
    }

}