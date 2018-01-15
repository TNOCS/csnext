import { IWidget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from '../index';
import { Watch, Prop } from 'vue-property-decorator';

@Component({
    name: 'mdwidget',
    template: '<div>{{ widget.data }}</div>'
} as any)
// tslint:disable-next-line:class-name
export class mdwidget extends WidgetBase {

}
