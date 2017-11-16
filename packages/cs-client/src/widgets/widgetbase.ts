import { Widget } from '@csnext/cs-core';
import { AppState, Logger, guidGenerator } from './../index';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

@Component(<any>{
    name: 'dashboard',
    props: {
        widget: null
    }
})
export class WidgetBase extends Vue {

    widget: Widget;
   
    protected L = Logger.Instance;

    public beforeMount() {
        this.L.info('widget', 'init widget - ' + this.widget.id);
    }

}