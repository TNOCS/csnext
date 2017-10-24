
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger } from './../index';
import Component from 'vue-class-component';

// import './home.scss';
@Component({
    name: 'mdwidget',
    template: '<h1> {{ widget.data }} </h1>'
})
// tslint:disable-next-line:class-name
export class mdwidget extends Vue {

    private widget: Widget;
    private L = Logger.Instance;

    constructor() {
        super();
    }

    created() {
        this.widget = <Widget><any>this.$parent.$attrs['widget'];
    }

}