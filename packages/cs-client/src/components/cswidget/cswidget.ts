import Vue from 'vue';
import Component from 'vue-class-component';
import { Dashboard, Widget, WidgetOptions } from '@csnext/cs-core';
import { Watch, Prop } from 'vue-property-decorator';

@Component(<any>{
    name: 'cswidget',
    template: require('./cswidget.html'),
    props: {
        widget: null
    }
})
// tslint:disable-next-line:class-name
export class cswidget extends Vue {

    widget: Widget;

    public beforeCreate() {

    }

    get computedOptions() {
        if (this.widget._dashboard && this.widget._dashboard.defaultWidgetOptions) {
            return this.widget._dashboard.defaultWidgetOptions;
        }
        return this.widget.options;
    }


}