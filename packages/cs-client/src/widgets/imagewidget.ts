
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from '../index';

@Component(<any>{
    name: 'imagewidget',
    template: '<img :src="widget.data.src" style="width:100%;height: 100%"></img>'
})
// tslint:disable-next-line:class-name
export class imagewidget extends WidgetBase {

    beforeMount() {
        this.beforeMount();
    }

}