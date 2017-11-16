import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from '../index';
import { Watch, Prop } from 'vue-property-decorator';

@Component(<any>{
    name: 'mdwidget',
    template: '<div>{{ widget.data }}</div>'
})
// tslint:disable-next-line:class-name
export class mdwidget extends WidgetBase {

}