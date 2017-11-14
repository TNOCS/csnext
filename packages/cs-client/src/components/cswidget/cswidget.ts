import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, Widget, WidgetOptions } from '@csnext/cs-core';

@Component(<any>{
    name: 'cswidget',
    template: require('./cswidget.html'),
})
// tslint:disable-next-line:class-name
export class cswidget extends Vue {

    widget: Widget;

    constructor() {
        super();
    }

    get computedOptions() {
        if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
            return this.widget._dashboard.defaultWidgetOptions;
        }
        return this.widget.options;
    }


    created() {

        this.widget = <Widget>this.$attrs['widget'];
    }

}