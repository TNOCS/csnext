
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from '../index';

@Component(<any>{
    name: 'mdwidget',
    template: '<div>{{ widget.data }}</div>'
})
// tslint:disable-next-line:class-name
export class mdwidget extends WidgetBase {

    beforeMount() {
        this.beforeMount();
    }

}